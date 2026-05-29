'use client'

import { useState } from 'react'

const serviceOptions = [
  'Oil Change',
  'Battery Replacement',
  'Brake Services (Pads)',
  'Brake Services (Pads & Rotors)',
  'Spark Plugs',
  'Alternator / Starter Replacement',
  'Engine Air Filter',
  'Cabin Air Filter',
  'Wiper Blades',
  'Tire Rotation',
  'Mobile Diagnostic',
  'General Repair',
  'Other',
]

const partsOptions = [
  { value: 'provide', label: 'I will provide the parts' },
  { value: 'source', label: 'I need you to source the parts' },
  { value: 'either', label: 'Open to either (you decide)' },
  { value: 'unknown', label: 'Not sure yet' },
]

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    services: [] as string[],
    parts: '',
    timeframe: '',
    notes: '',
  })

  const toggleService = (svc: string) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter(s => s !== svc)
        : [...prev.services, svc],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.services.length === 0) {
      setError('Please select at least one service')
      return
    }

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error('Failed to submit')
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try calling us directly at (386) 235-3012.')
    }
  }

  if (submitted) {
    return (
      <div style={{ padding: '5rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>
          Request Received!
        </h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Thanks, <strong>{form.name}</strong>. I've got your request and will review it right away.
        </p>
        <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
          I'll text or email you at <strong>{form.phone}</strong> within a few hours with a quote.
        </p>
        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Once we agree on a price, I'll send you a direct link to book your appointment on my calendar.
        </p>
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--light)', borderRadius: 'var(--radius)' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
            Questions? Text us anytime at <strong>(386) 235-3012</strong>
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="hero">
        <h1>Get a Quote</h1>
        <p className="tagline">Step 1 of 2 — Request Your Quote</p>
        <p>Fill out the form below. I'll review your request and get back to you with a quote. Once approved, you'll book your appointment.</p>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Contact Info */}
          <div className="form-section">
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.2rem' }}>
              Your Contact Info
            </h2>
            <div className="form-grid">
              <div className="form-field">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="John Smith"
                />
              </div>
              <div className="form-field">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="(386) 555-0100"
                />
              </div>
              <div className="form-field">
                <label>Email (optional)</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="john@email.com"
                />
              </div>
            </div>
          </div>

          {/* Vehicle */}
          <div className="form-section">
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.2rem' }}>
              Vehicle Info
            </h2>
            <div className="form-field">
              <label>Year / Make / Model / Engine *</label>
              <input
                type="text"
                required
                value={form.vehicle}
                onChange={e => setForm({ ...form, vehicle: e.target.value })}
                placeholder="e.g. 2019 Honda Civic 1.5L Turbo"
              />
              <span className="field-hint">Include year, make, model, and engine size if known</span>
            </div>
          </div>

          {/* Services */}
          <div className="form-section">
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.2rem' }}>
              Services Needed
            </h2>
            <div className="services-checkboxes">
              {serviceOptions.map(svc => (
                <label key={svc} className={`service-check ${form.services.includes(svc) ? 'checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={form.services.includes(svc)}
                    onChange={() => toggleService(svc)}
                  />
                  {svc}
                </label>
              ))}
            </div>
            {form.services.length === 0 && (
              <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.5rem' }}>Please select at least one service</p>
            )}
          </div>

          {/* Parts */}
          <div className="form-section">
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.2rem' }}>
              Parts Sourcing
            </h2>
            <div className="parts-radios">
              {partsOptions.map(opt => (
                <label key={opt.value} className={`radio-option ${form.parts === opt.value ? 'checked' : ''}`}>
                  <input
                    type="radio"
                    name="parts"
                    value={opt.value}
                    checked={form.parts === opt.value}
                    onChange={e => setForm({ ...form, parts: e.target.value })}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Timeframe */}
          <div className="form-section">
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.2rem' }}>
              Preferred Time &amp; Location
            </h2>
            <div className="form-field">
              <label>When do you need service? Any time preferences?</label>
              <textarea
                rows={3}
                value={form.timeframe}
                onChange={e => setForm({ ...form, timeframe: e.target.value })}
                placeholder="e.g. Any weekday morning, preferably Tuesday or Wednesday. Vehicle is at my workplace."
              />
            </div>
          </div>

          {/* Notes */}
          <div className="form-field">
            <label>Additional Notes (optional)</label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              placeholder="Any other details that might help me give you an accurate quote"
            />
          </div>

          {error && (
            <div style={{ padding: '1rem', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 'var(--radius)', color: '#991b1b', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ fontSize: '1.1rem', padding: '1.1rem 2rem', border: 'none', cursor: 'pointer', width: '100%' }}
          >
            Submit Quote Request
          </button>

          <p style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '0.85rem' }}>
            I review every request personally and respond within a few hours. No automated responses.
          </p>
        </form>
      </section>

      <style jsx>{`
        .form-section {
          background: var(--light);
          padding: 2rem;
          border-radius: var(--radius);
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr; }
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .form-field label {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text);
        }
        .form-field input,
        .form-field textarea {
          padding: 0.75rem 1rem;
          border: 1.5px solid #d0d7de;
          border-radius: var(--radius);
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.2s;
        }
        .form-field input:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: var(--accent);
        }
        .field-hint {
          font-size: 0.8rem;
          color: var(--text-light);
        }
        .services-checkboxes {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.75rem;
        }
        .service-check {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1rem;
          background: white;
          border: 1.5px solid #d0d7de;
          border-radius: var(--radius);
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.15s;
        }
        .service-check:hover {
          border-color: var(--accent);
        }
        .service-check.checked {
          border-color: var(--accent);
          background: #fff8ed;
          color: var(--primary);
          font-weight: 600;
        }
        .service-check input {
          accent-color: var(--accent);
          width: 16px;
          height: 16px;
        }
        .parts-radios {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .radio-option {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1rem;
          background: white;
          border: 1.5px solid #d0d7de;
          border-radius: var(--radius);
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.15s;
        }
        .radio-option:hover {
          border-color: var(--accent);
        }
        .radio-option.checked {
          border-color: var(--accent);
          background: #fff8ed;
          font-weight: 600;
        }
        .radio-option input {
          accent-color: var(--accent);
        }
      `}</style>
    </>
  )
}