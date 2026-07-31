import nodemailer from 'nodemailer'

const ROLE_DETAILS = {
  creator: {
    title: 'Creator / Seller',
    link: 'https://chat.whatsapp.com/F5J8Ev3hNKCB8r0s46PknO?mode=hqctswa',
    intro: 'You can write and sell summarized books or full courses, and pay token to promote them.',
    benefits: [
      'Sell digital books & summarized topics',
      'Boost search ranks by paying minor promo tokens',
      'Access professional cover designers directly'
    ]
  },
  affiliate: {
    title: 'Affiliate Promoter',
    link: 'https://chat.whatsapp.com/Jxa7snbLjAbF5d7UxXF61U?mode=gi_t',
    intro: 'You can promote creator books and courses to earn high-margin commission splits.',
    benefits: [
      'Promote e-books, summaries, and live classes',
      'Earn recurring commission on student registrations',
      'Real-time tracking of clicks, sales, and payouts'
    ]
  },
  designer: {
    title: 'Book Cover Designer',
    link: 'https://chat.whatsapp.com/Jxa7snbLjAbF5d7UxXF61U?mode=gi_t',
    intro: 'You can offer freelance graphic design services for premium book covers to creators.',
    benefits: [
      'Showcase cover portfolio to all creators',
      'Charge custom rates starting from ₦500+',
      'Direct creator hiring pipeline & quick payouts'
    ]
  },
  customer: {
    title: 'Customer / Student',
    link: 'https://chat.whatsapp.com/K0sgrx7oCId03e0jzoSuOh?mode=gi_t',
    intro: 'You can access summarized reading material and enroll in interactive live classes.',
    benefits: [
      'Browse books and simplified topic summaries',
      'Register for online live classes (Zoom & Google Meet)',
      'Refund protection for flagged materials'
    ]
  }
}

export async function sendWaitlistEmail(to: string, role: keyof typeof ROLE_DETAILS) {
  const roleInfo = ROLE_DETAILS[role]
  if (!roleInfo) {
    throw new Error(`Invalid role: ${role}`)
  }

  const from = process.env.FROM_EMAIL ? process.env.FROM_EMAIL.replace('FEROMARKETHUB', 'Fero E-Library') : '"Fero E-Library <feromarkethub@gmail.com>"'
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT || 465) === 465,
    auth: {
      user: process.env.SMTP_USER || 'feromarkethub@gmail.com',
      pass: process.env.SMTP_PASS || 'rmbyfktqutatmxci',
    },
  })

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #0f172a; margin-bottom: 8px;">Fero E-Library</h1>
        <p style="color: #64748b; font-size: 16px;">Welcome to the Early Access Waitlist!</p>
      </div>
      
      <div style="background-color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
        <h2 style="color: #0f172a; font-size: 20px; margin-top: 0;">Hi there!</h2>
        <p style="color: #334155; line-height: 1.6; font-size: 15px;">
          Thanks for joining our waitlist as a <strong>${roleInfo.title}</strong>. We're excited to have you on board!
        </p>
        <p style="color: #334155; line-height: 1.6; font-size: 15px;">
          ${roleInfo.intro}
        </p>
        
        <h3 style="color: #0f172a; font-size: 16px; margin-top: 20px; margin-bottom: 12px;">Your Benefits:</h3>
        <ul style="color: #334155; padding-left: 20px; line-height: 1.6; font-size: 14px; margin-bottom: 24px;">
          ${roleInfo.benefits.map(b => `<li style="margin-bottom: 8px;">${b}</li>`).join('')}
        </ul>
        
        <div style="text-align: center; margin-top: 20px;">
          <a href="${roleInfo.link}" target="_blank" style="background-color: #25d366; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px rgba(37, 211, 102, 0.2);">
            Join Our WhatsApp Community Group
          </a>
        </div>
      </div>
      
      <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 24px;">
        &copy; ${new Date().getFullYear()} Fero E-Library. All rights reserved.<br/>
        This email was sent to ${to} because you joined the waitlist.
      </p>
    </div>
  `

  return await transporter.sendMail({
    from,
    to,
    subject: `Welcome to Fero E-Library Waitlist - ${roleInfo.title}!`,
    html,
  })
}
