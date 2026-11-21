import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Fallback credentials provided by user
const DEFAULT_USER = 'blackgrapes.arpitjain@gmail.com';
const DEFAULT_PASS = 'qmymectgxtuuursq';
const DEFAULT_RECIPIENT = 'blackgrapes.arpitjain@gmail.com';

/**
 * Clean & sanitize string from surrounding quotes, accidental whitespace, or backslashes
 */
function cleanEnvValue(val, fallback = '') {
  if (val === undefined || val === null) return fallback;
  return String(val).replace(/["'\r\n]/g, '').trim();
}

/**
 * Extract sanitized credentials
 */
function getSmtpConfig() {
  const user = cleanEnvValue(process.env.SMTP_USER, DEFAULT_USER);
  // Strip ALL whitespace, quotes, and backslashes from App Password
  const pass = (process.env.SMTP_PASS ? String(process.env.SMTP_PASS).replace(/["'\s\\]/g, '') : DEFAULT_PASS).trim();
  const host = cleanEnvValue(process.env.SMTP_HOST, 'smtp.gmail.com');
  const port = parseInt(cleanEnvValue(process.env.SMTP_PORT, '465'), 10) || 465;
  const secure = cleanEnvValue(process.env.SMTP_SECURE, 'true') === 'true' || port === 465;

  return { user, pass, host, port, secure };
}

/**
 * Create Nodemailer transporter with connection pooling and explicit timeouts
 * Supports multiple modes: 'service' (Google default), '587' (STARTTLS), '465' (SSL)
 */
function createTransporter(mode = 'service') {
  const { user, pass, host, port, secure } = getSmtpConfig();
  const isGmail = host.includes('gmail') || user.includes('gmail');

  if (mode === 'service' && isGmail) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
      pool: true,
      maxConnections: 3,
      connectionTimeout: 12000,
      greetingTimeout: 10000,
      socketTimeout: 20000
    });
  }

  if (mode === '587' || (!secure && port === 587)) {
    return nodemailer.createTransport({
      host: isGmail ? 'smtp.gmail.com' : host,
      port: 587,
      secure: false, // STARTTLS
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 12000,
      greetingTimeout: 10000,
      socketTimeout: 20000
    });
  }

  // Default: Port 465 SSL
  return nodemailer.createTransport({
    host: isGmail ? 'smtp.gmail.com' : host,
    port: 465,
    secure: true,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 12000,
    greetingTimeout: 10000,
    socketTimeout: 20000
  });
}

/**
 * Helper to test SMTP connection across all modes
 */
export async function testSmtpConnection() {
  const { user, host } = getSmtpConfig();
  const modes = ['service', '587', '465'];
  const results = {};

  for (const mode of modes) {
    try {
      const transporter = createTransporter(mode);
      await transporter.verify();
      results[mode] = { success: true };
    } catch (err) {
      results[mode] = { success: false, error: err.message };
    }
  }

  return {
    user,
    host,
    results
  };
}

/**
 * Send real-time notification email to Admin (blackgrapes.arpitjain@gmail.com)
 * whenever ANY contact form or enquiry form is submitted
 */
export async function sendEnquiryNotification(lead = {}) {
  const recipient = cleanEnvValue(process.env.NOTIFY_EMAIL, DEFAULT_RECIPIENT);
  const senderEmail = cleanEnvValue(process.env.SMTP_USER, DEFAULT_USER);
  const fromName = cleanEnvValue(process.env.FROM_NAME, 'Black Grapes Softech Leads');

  const name = lead.name || 'Prospective Client';
  const phone = lead.phone || 'Not provided';
  const email = lead.email || 'Not provided';
  const service = lead.service || lead.requirement || 'General Inquiry';
  const message = lead.message || lead.scope || 'No additional note provided.';
  const company = lead.company || '';
  const budget = lead.budget || '';
  const timeline = lead.timeline || '';
  const source = lead.source || 'Website Contact Form';
  const ticketId = lead.ticket_id || lead.ticketId || lead.id || `BG-${Date.now().toString().slice(-6)}`;

  // Formatted date string in Indian Standard Time (IST)
  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  const cleanPhone = phone.replace(/[^0-9+]/g, '');

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website Lead</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0d0a14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0d0a14; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table role="presentation" width="100%" style="max-width: 620px; background: linear-gradient(145deg, #18112b 0%, #100b1e 100%); border: 1px solid rgba(248, 98, 0, 0.35); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);">
          
          <!-- Header Bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #f86200 0%, #ff8330 100%); padding: 18px 24px; text-align: left;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">
                      🍇 BLACK GRAPES SOFTECH
                    </h1>
                    <span style="font-size: 12px; color: rgba(255, 255, 255, 0.9); font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                      Instant Lead Notification Alert
                    </span>
                  </td>
                  <td align="right">
                    <span style="background: rgba(0, 0, 0, 0.25); border: 1px solid rgba(255, 255, 255, 0.3); padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; color: #ffffff;">
                      #${ticketId}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Notification Alert Tag -->
          <tr>
            <td style="padding: 24px 28px 10px 28px;">
              <div style="background: rgba(248, 98, 0, 0.12); border-left: 4px solid #f86200; border-radius: 4px; padding: 12px 16px; margin-bottom: 20px;">
                <strong style="color: #f86200; font-size: 14px; display: block; margin-bottom: 2px;">
                  🚀 New Client Enquiry Received!
                </strong>
                <span style="color: #cbd5e1; font-size: 13px;">
                  A user has submitted the <strong>${source}</strong> on the live website. Below are the complete submission details:
                </span>
              </div>
            </td>
          </tr>

          <!-- Client Details Table -->
          <tr>
            <td style="padding: 0 28px 20px 28px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="border-collapse: collapse;">
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                  <td width="38%" style="color: #9ca3af; font-size: 13px; font-weight: 600; text-transform: uppercase;">Client Name:</td>
                  <td width="62%" style="color: #ffffff; font-size: 15px; font-weight: 700;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                  <td style="color: #9ca3af; font-size: 13px; font-weight: 600; text-transform: uppercase;">Phone Number:</td>
                  <td style="font-size: 15px; font-weight: 700;">
                    <a href="tel:${cleanPhone}" style="color: #f86200; text-decoration: none;">📞 ${phone}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                  <td style="color: #9ca3af; font-size: 13px; font-weight: 600; text-transform: uppercase;">Email Address:</td>
                  <td style="font-size: 14px;">
                    <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">✉️ ${email}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                  <td style="color: #9ca3af; font-size: 13px; font-weight: 600; text-transform: uppercase;">Service Required:</td>
                  <td style="color: #38bdf8; font-size: 14px; font-weight: 600;">${service}</td>
                </tr>
                ${company ? `
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                  <td style="color: #9ca3af; font-size: 13px; font-weight: 600; text-transform: uppercase;">Company Name:</td>
                  <td style="color: #e2e8f0; font-size: 14px;">${company}</td>
                </tr>` : ''}
                ${budget ? `
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                  <td style="color: #9ca3af; font-size: 13px; font-weight: 600; text-transform: uppercase;">Budget Scope:</td>
                  <td style="color: #34d399; font-size: 14px; font-weight: 600;">${budget}</td>
                </tr>` : ''}
                ${timeline ? `
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                  <td style="color: #9ca3af; font-size: 13px; font-weight: 600; text-transform: uppercase;">Timeline:</td>
                  <td style="color: #e2e8f0; font-size: 14px;">${timeline}</td>
                </tr>` : ''}
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                  <td style="color: #9ca3af; font-size: 13px; font-weight: 600; text-transform: uppercase;">Form Origin:</td>
                  <td style="color: #e2e8f0; font-size: 13px;">${source}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; font-size: 13px; font-weight: 600; text-transform: uppercase;">Date & Time:</td>
                  <td style="color: #94a3b8; font-size: 13px;">${submittedAt}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Message Box -->
          <tr>
            <td style="padding: 0 28px 24px 28px;">
              <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 14px 18px;">
                <span style="display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; color: #9ca3af; margin-bottom: 6px;">
                  Message / Project Requirements:
                </span>
                <p style="margin: 0; color: #f1f5f9; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding: 0 28px 28px 28px;" align="center">
              <table role="presentation" cellspacing="0" cellpadding="0">
                <tr>
                  ${cleanPhone ? `
                  <td style="padding-right: 12px;">
                    <a href="tel:${cleanPhone}" style="display: inline-block; background: #f86200; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(248, 98, 0, 0.35);">
                      📞 Call Client Now
                    </a>
                  </td>` : ''}
                  ${email && email.includes('@') ? `
                  <td>
                    <a href="mailto:${email}?subject=Regarding%20Your%20Inquiry%20with%20Black%20Grapes%20Softech" style="display: inline-block; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.25); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px; font-weight: 600;">
                      ✉️ Reply via Email
                    </a>
                  </td>` : ''}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: rgba(0, 0, 0, 0.3); border-top: 1px solid rgba(255, 255, 255, 0.08); padding: 16px 24px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #64748b; line-height: 1.5;">
                This lead alert was automatically generated by <strong>Black Grapes Softech Website Lead System</strong>.<br>
                Recipient: <strong>${recipient}</strong> • System Server: Render Cloud
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const plainText = `
[BLACK GRAPES SOFTECH - NEW WEBSITE LEAD]
Ticket ID: #${ticketId}
Date/Time: ${submittedAt}

Client Name: ${name}
Phone: ${phone}
Email: ${email}
Service: ${service}
Company: ${company || 'N/A'}
Budget: ${budget || 'N/A'}
Timeline: ${timeline || 'N/A'}
Source: ${source}

Message:
${message}

Reply to: ${email}
Call: ${phone}
  `.trim();

  const mailOptions = {
    from: `"${fromName}" <${senderEmail}>`,
    to: recipient,
    subject: `🚨 New Lead: ${name} - ${service} [#${ticketId}]`,
    text: plainText,
    html: htmlContent,
    replyTo: (email && email.includes('@')) ? email : undefined
  };

  console.log(`[SMTP Mail] Sending new lead notification (#${ticketId}) to ${recipient}...`);

  let info = null;
  let lastError = null;

  // Step 1: Attempt standard Gmail service transport
  try {
    const transporter = createTransporter('service');
    info = await transporter.sendMail(mailOptions);
  } catch (err1) {
    console.warn(`[SMTP Warning] Method 1 (service:gmail) failed: ${err1.message}. Retrying via Port 587 STARTTLS...`);
    lastError = err1;

    // Step 2: Attempt Port 587 STARTTLS
    try {
      const transporter587 = createTransporter('587');
      info = await transporter587.sendMail(mailOptions);
    } catch (err2) {
      console.warn(`[SMTP Warning] Method 2 (port:587) failed: ${err2.message}. Retrying via Port 465 SSL...`);
      lastError = err2;

      // Step 3: Attempt Port 465 SSL
      try {
        const transporter465 = createTransporter('465');
        info = await transporter465.sendMail(mailOptions);
      } catch (err3) {
        lastError = err3;
      }
    }
  }

  if (info && info.messageId) {
    console.log(`\x1b[32m%s\x1b[0m`, `✨ [SMTP Success] Lead email dispatched to ${recipient}! Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } else {
    console.error(`\x1b[31m%s\x1b[0m`, `❌ [SMTP Error] Failed to send lead notification to ${recipient}:`, lastError?.message);
    return { success: false, error: lastError?.message };
  }
}

/**
 * Optional: Send auto-acknowledgement email to the client
 */
export async function sendClientConfirmation(lead = {}) {
  const email = cleanEnvValue(lead.email, '');
  if (!email || !email.includes('@')) return null;

  const senderEmail = cleanEnvValue(process.env.SMTP_USER, DEFAULT_USER);
  const fromName = cleanEnvValue(process.env.FROM_NAME, 'Black Grapes Softech');
  const name = lead.name || 'Valued Client';
  const service = lead.service || 'Software / IT Solutions';
  const ticketId = lead.ticket_id || lead.ticketId || `BG-${Date.now().toString().slice(-6)}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; background-color: #0f0b1a; color: #fff; padding: 25px;">
  <div style="max-width: 560px; margin: 0 auto; background: #18112b; padding: 25px; border-radius: 12px; border: 1px solid rgba(248, 98, 0, 0.4);">
    <h2 style="color: #f86200; margin-top: 0;">Thank You for Reaching Out to Black Grapes Softech!</h2>
    <p>Dear <strong>${name}</strong>,</p>
    <p>We have successfully received your inquiry regarding <strong>${service}</strong> (Reference Ticket <strong>#${ticketId}</strong>).</p>
    <p>One of our senior technical architects will review your requirements and connect with you within 2 business hours.</p>
    <p style="margin-top: 20px; font-size: 13px; color: #cbd5e1;">
      Need immediate assistance?<br>
      📞 Call: <strong>+91 91099 90057 / +91 99814 74747</strong><br>
      💬 WhatsApp: <strong>+91 99814 74747</strong><br>
      🌐 Website: <a href="https://blackgrapessoftech.com" style="color: #f86200;">blackgrapessoftech.com</a>
    </p>
    <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;">
    <p style="font-size: 11px; color: #64748b; margin: 0;">Black Grapes Softech • 252-F/H, Scheme No 54, Vijay Nagar, Indore, MP 452010</p>
  </div>
</body>
</html>
  `;

  try {
    const transporter = createTransporter('service');
    await transporter.sendMail({
      from: `"${fromName}" <${senderEmail}>`,
      to: email,
      subject: `Thank you for contacting Black Grapes Softech [#${ticketId}]`,
      html
    });
  } catch (err) {
    console.warn('[SMTP Notice] Client auto-acknowledgement skipped:', err.message);
  }
}
