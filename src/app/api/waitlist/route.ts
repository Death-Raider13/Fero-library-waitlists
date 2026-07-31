import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  let dbError: string | null = null
  let emailError: string | null = null

  try {
    const { email, role } = await request.json()

    if (!email || !role) {
      return NextResponse.json(
        { error: 'Email and role are required' },
        { status: 400 }
      )
    }

    // 1) Write to Firestore
    try {
      const { getAdminFirestore } = await import('@/lib/firebase/admin-simple')
      const { FieldValue } = await import('firebase-admin/firestore')
      
      const db = getAdminFirestore()
      if (db) {
        const waitlistRef = db.collection('waitlist')
        await waitlistRef.add({
          email,
          role,
          createdAt: FieldValue.serverTimestamp(),
        })
        console.log(`Saved waitlist signup to Firestore: ${email} (${role})`)
      } else {
        console.warn('Firestore Admin is not initialized, skipping database write.')
        dbError = 'Firestore Admin not initialized (check env variables)'
      }
    } catch (err: any) {
      console.error('❌ Firestore Write Error:', err.message)
      dbError = err.message
    }

    // 2) Send Welcome Email
    try {
      const { sendWaitlistEmail } = await import('@/lib/email/send-email')
      await sendWaitlistEmail(email, role)
      console.log(`Sent welcome email to: ${email}`)
    } catch (err: any) {
      console.error('❌ Send Email Error:', err.message)
      emailError = err.message
    }

    // Return success to user even if DB/Email fails behind the scenes (graceful degradation)
    return NextResponse.json({ 
      success: true,
      warnings: {
        db: dbError,
        email: emailError
      }
    })
  } catch (error: any) {
    console.error('Waitlist API Global Error:', error.message)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
