import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

// ─────────────────────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS
//
// 1. EMAIL (EmailJS — free, no backend needed)
//    a) Go to https://www.emailjs.com and sign up with piyushpatil.da@gmail.com
//    b) Add a new "Email Service" → choose Gmail → connect your account
//       Copy the Service ID and paste it below as EMAILJS_SERVICE_ID
//    c) Go to "Email Templates" → create a new template.
//       In the template body use these variables:
//         From: {{from_name}} <{{from_email}}>
//         Subject: New NORD enquiry from {{from_name}}
//         Body:
//           Name:    {{from_name}}
//           Email:   {{from_email}}
//           Budget:  {{budget}}
//           Message: {{message}}
//       Copy the Template ID → paste as EMAILJS_TEMPLATE_ID
//    d) Go to Account → API Keys → copy your Public Key → paste as EMAILJS_PUBLIC_KEY
//
// 2. WHATSAPP
//    When a form is submitted the app opens a pre-filled WhatsApp message
//    to +91 7875417830 so you can read the enquiry immediately in WhatsApp.
//    No API key needed — it uses the free wa.me redirect.
// ─────────────────────────────────────────────────────────────────────────────

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'   // ← paste from emailjs.com
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // ← paste from emailjs.com
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'   // ← paste from emailjs.com

const OWNER_WHATSAPP = '917875417830'           // country code + number (no +)

type FormState = 'idle' | 'sending' | 'success' | 'error'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '3px',
  padding: '1rem 1.2rem',
  color: '#e8e8e8',
  fontFamily: "'Inter', sans-serif",
  fontSize: '0.875rem',
  fontWeight: 300,
  outline: 'none',
  transition: 'border-color 0.2s ease, background 0.2s ease',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '0.6rem',
  color: '#4a90b8',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  marginBottom: '0.5rem',
  display: 'block',
}

const budgets = ['< ₹5K', '₹5K – ₹50K', '₹50K – ₹1L', '₹1L+', 'Let\'s talk']

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState<FormState>('idle')
  const [fields, setFields] = useState({
    from_name: '',
    from_email: '',
    budget: '',
    message: '',
  })

  const set = (key: keyof typeof fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFields(f => ({ ...f, [key]: e.target.value }))

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `🚀 *New NORD Enquiry*\n\n` +
      `*Name:* ${fields.from_name}\n` +
      `*Email:* ${fields.from_email}\n` +
      `*Budget:* ${fields.budget || 'Not specified'}\n\n` +
      `*Message:*\n${fields.message}`
    )
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${text}`, '_blank')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!fields.from_name || !fields.from_email || !fields.message) return

    setFormState('sending')

    try {
      // Send email via EmailJS
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        { publicKey: EMAILJS_PUBLIC_KEY }
      )

      setFormState('success')

      // Auto-open WhatsApp with pre-filled message (fires after short delay
      // so the success state is visible first)
      setTimeout(openWhatsApp, 800)
    } catch (err) {
      console.error('EmailJS error:', err)
      // If EmailJS not yet configured, still open WhatsApp so no lead is lost
      setFormState('error')
      setTimeout(openWhatsApp, 600)
    }
  }

  const focusStyle = {
    borderColor: 'rgba(200,240,255,0.25)',
    background: 'rgba(255,255,255,0.05)',
  }

  return (
    <section
      id="contact"
      style={{ background: 'transparent', padding: '8rem 6vw 6rem', position: 'relative', overflow: 'hidden' }}
    >
      {/* Large background watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-2rem',
          left: '-2vw',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(6rem, 18vw, 18rem)',
          fontWeight: 700,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.025)',
          letterSpacing: '-0.06em',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        NORD
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
        >
          <div style={{ width: '40px', height: '1px', background: '#4a90b8' }} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              color: '#4a90b8',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            Get In Touch
          </span>
        </motion.div>

        {/* Two-column layout: headline + form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '5rem',
            alignItems: 'start',
          }}
        >
          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.05em',
                lineHeight: 0.95,
                margin: '0 0 2rem 0',
              }}
            >
              Ready to build
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #c8f0ff, #7ab8d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                something
              </span>
              <br />
              <span style={{ color: '#1a1a1a', WebkitTextStroke: '1px #555555' }}>
                unbreakable?
              </span>
            </h2>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.9rem',
                color: '#888888',
                lineHeight: 1.7,
                fontWeight: 300,
                marginBottom: '2.5rem',
              }}
            >
              Fill in the form and we'll reply within 24 hours. You'll also get
              an instant WhatsApp message so we can connect right away.
            </p>

            {/* Contact info pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="mailto:piyushpatil.da@gmail.com"
                id="contact-email-direct"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textDecoration: 'none',
                  color: '#888888',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#c8f0ff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#888888' }}
              >
                <span style={{ color: '#4a90b8' }}>✉</span>
                piyushpatil.da@gmail.com
              </a>
              <a
                href={`https://wa.me/${OWNER_WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                id="contact-whatsapp-direct"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textDecoration: 'none',
                  color: '#888888',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#4ade80' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#888888' }}
              >
                <span style={{ color: '#4ade80' }}>●</span>
                +91 7875417830 (WhatsApp)
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{
                    background: 'rgba(74,222,128,0.05)',
                    border: '1px solid rgba(74,222,128,0.2)',
                    borderRadius: '6px',
                    padding: '3rem 2rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✓</div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#4ade80',
                      margin: '0 0 0.75rem',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    Message sent!
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.875rem',
                      color: '#888888',
                      lineHeight: 1.7,
                      margin: '0 0 1.5rem',
                    }}
                  >
                    Email delivered to Piyush. WhatsApp is opening now — just hit send.
                  </p>
                  <button
                    onClick={openWhatsApp}
                    style={{
                      background: '#25d366',
                      color: '#050505',
                      border: 'none',
                      borderRadius: '3px',
                      padding: '0.75rem 1.5rem',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Open WhatsApp Again
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '6px',
                    padding: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem',
                  }}
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" style={labelStyle}>Your Name *</label>
                    <input
                      id="contact-name"
                      name="from_name"
                      type="text"
                      required
                      placeholder="Alex Johnson"
                      value={fields.from_name}
                      onChange={set('from_name')}
                      style={inputStyle}
                      onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" style={labelStyle}>Email Address *</label>
                    <input
                      id="contact-email"
                      name="from_email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={fields.from_email}
                      onChange={set('from_email')}
                      style={inputStyle}
                      onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                      }}
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="contact-budget" style={labelStyle}>Project Budget</label>
                    <select
                      id="contact-budget"
                      name="budget"
                      value={fields.budget}
                      onChange={set('budget')}
                      style={{
                        ...inputStyle,
                        cursor: 'pointer',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%234a90b8' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        paddingRight: '2.5rem',
                      }}
                      onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                      }}
                    >
                      <option value="" style={{ background: '#0d0d0d' }}>Select range…</option>
                      {budgets.map(b => (
                        <option key={b} value={b} style={{ background: '#0d0d0d' }}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" style={labelStyle}>Project Brief *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your 3D project — what you want to build, your timeline, and any technical constraints…"
                      value={fields.message}
                      onChange={set('message')}
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                        minHeight: '120px',
                        lineHeight: 1.6,
                      }}
                      onFocus={e => Object.assign(e.currentTarget.style, focusStyle)}
                      onBlur={e => {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                      }}
                    />
                  </div>

                  {/* Error banner */}
                  {formState === 'error' && (
                    <div
                      style={{
                        background: 'rgba(251,191,36,0.08)',
                        border: '1px solid rgba(251,191,36,0.2)',
                        borderRadius: '3px',
                        padding: '0.75rem 1rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.65rem',
                        color: '#fbbf24',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Email config not set — opening WhatsApp instead. No lead lost.
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={formState === 'sending'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.7rem',
                      background: formState === 'sending' ? 'rgba(200,240,255,0.5)' : '#c8f0ff',
                      color: '#050505',
                      border: 'none',
                      borderRadius: '3px',
                      padding: '1rem 2rem',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      letterSpacing: '0.06em',
                      cursor: formState === 'sending' ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      marginTop: '0.25rem',
                    }}
                    onMouseEnter={e => {
                      if (formState !== 'sending')
                        (e.currentTarget as HTMLButtonElement).style.background = '#ffffff'
                    }}
                    onMouseLeave={e => {
                      if (formState !== 'sending')
                        (e.currentTarget as HTMLButtonElement).style.background = '#c8f0ff'
                    }}
                  >
                    {formState === 'sending' ? (
                      <>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '14px',
                            height: '14px',
                            border: '2px solid #050505',
                            borderTopColor: 'transparent',
                            borderRadius: '50%',
                            animation: 'spin 0.7s linear infinite',
                          }}
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send via Email + WhatsApp
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 7h12M7 1l6 6-6 6" stroke="#050505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.58rem',
                      color: '#444444',
                      letterSpacing: '0.08em',
                      textAlign: 'center',
                      margin: 0,
                    }}
                  >
                    ✉ piyushpatil.da@gmail.com · 📱 +91 78754 17830
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '6rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.04)',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#4a4a4a',
              letterSpacing: '-0.04em',
            }}
          >
            NORD STUDIOS
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem',
              color: '#555555',
              letterSpacing: '0.15em',
            }}
          >
            © 2026 NORD Studio. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 6px #4ade80',
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.55rem',
                color: '#4ade80',
                letterSpacing: '0.15em',
              }}
            >
              ALL SYSTEMS NOMINAL
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        select option {
          background: #0d0d0d;
          color: #e8e8e8;
        }
      `}</style>
    </section>
  )
}
