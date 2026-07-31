import { NextResponse } from 'next/server'
import { getAdminFirestore } from '@/lib/firebase/admin-simple'
import { sendWaitlistEmail } from '@/lib/email/send-email'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(request: Request) {
  try {
    const { email, role } = await request.json()

    if (!email || !role) {
      return NextResponse.json(
        { error: 'Email and role are required' },
        { status: 400 }
      )
    }

    // 1) Write to Firestore
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
    }

    // 2) Send Welcome Email
    try {
      await sendWaitlistEmail(email, role)
      console.log(`Sent welcome email to: ${email}`)
    } catch (emailError: any) {
      console.error('Failed to send waitlist email:', emailError.message)
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Waitlist API Error:', error.message)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
