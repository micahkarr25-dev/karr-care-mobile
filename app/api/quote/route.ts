import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend('re_5QxbG3dH_FaxGgbeEg2uwmsQ1pikWfhsC')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, vehicle, services, parts, timeframe, notes } = body

    if (!name || !phone || !vehicle || !services?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const serviceList = Array.isArray(services) ? services.join(', ') : services
    const partsLabel = parts === 'provide' ? 'Customer will provide parts' :
                       parts === 'source' ? 'Karr Care should source parts' :
                       parts === 'either' ? 'Open to either (customer\'s decision)' :
                       parts === 'unknown' ? 'Not specified' : parts || 'Not specified'

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #1a3a5c, #0d1b2a); color: white; padding: 24px 20px;">
          <h2 style="margin: 0; font-size: 20px;">🚗 New Quote Request — Karr Care Mobile</h2>
          <p style="margin: 8px 0 0 0; opacity: 0.7; font-size: 13px;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div style="padding: 24px 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a3a5c; width: 130px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a3a5c;">Phone</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px;"><a href="tel:${phone}" style="color: #009FE3; text-decoration: none;">${phone}</a></td>
            </tr>
            ${email ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a3a5c;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px;"><a href="mailto:${email}" style="color: #009FE3; text-decoration: none;">${email}</a></td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a3a5c;">Vehicle</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; font-weight: 600;">${vehicle}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a3a5c;">Services</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
                <span style="background: #fff8ed; color: #009FE3; font-weight: 700; padding: 3px 10px; border-radius: 4px; font-size: 13px;">${serviceList}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a3a5c;">Parts</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px;">${partsLabel}</td>
            </tr>
            ${timeframe ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #1a3a5c;">Time Preference</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px;">${timeframe}</td>
            </tr>` : ''}
            ${notes ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #1a3a5c;">Notes</td>
              <td style="padding: 10px 0; font-size: 15px;">${notes}</td>
            </tr>` : ''}
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #f0f7ff; border-left: 4px solid #009FE3; border-radius: 4px;">
            <p style="margin: 0 0 6px 0; color: #1a3a5c; font-size: 13px; font-weight: bold;">NEXT STEPS:</p>
            <ol style="margin: 0; padding-left: 20px; color: #444; font-size: 13px; line-height: 1.8;">
              <li>Review this request</li>
              <li>Call or text the customer at <a href="tel:${phone}" style="color: #009FE3;">${phone}</a></li>
              <li>Agree on a price</li>
              <li>Send them your booking link below</li>
            </ol>
          </div>

          <div style="margin-top: 16px; text-align: center;">
            <a href="https://cal.com/micah-karr-gkvstd" style="display: inline-block; background: #009FE3; color: white; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 15px;">
              📅 Send Booking Link — cal.com/micah-karr-gkvstd
            </a>
          </div>
        </div>
      </div>
    `

    await resend.emails.send({
      from: 'Karr Care Mobile <onboarding@resend.dev>',
      to: ['micahkarr25@gmail.com'],
      subject: `New Quote Request — ${name} | ${vehicle}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
