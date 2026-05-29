'use client'

import { useState, useEffect, useCallback } from 'react'

// Brake services with axle options
const brakeServices = [
  {
    id: 'brakes_pads_front',
    label: 'Brake Pads — Front Only',
    price: '$140',
    desc: 'Front axle pad replacement',
  },
  {
    id: 'brakes_pads_rear',
    label: 'Brake Pads — Rear Only',
    price: '$140',
    desc: 'Rear axle pad replacement',
  },
  {
    id: 'brakes_pads_both',
    label: 'Brake Pads — Front & Rear (Both Axles)',
    price: '$280',
    desc: 'Both axles — pads only',
  },
  {
    id: 'brakes_full_front',
    label: 'Full Brake Service — Front Only',
    price: '$220',
    desc: 'Front axle: pads + rotors',
  },
  {
    id: 'brakes_full_rear',
    label: 'Full Brake Service — Rear Only',
    price: '$220',
    desc: 'Rear axle: pads + rotors',
  },
  {
    id: 'brakes_full_both',
    label: 'Full Brake Service — Front & Rear (Both Axles)',
    price: '$440',
    desc: 'Both axles: pads + rotors',
  },
]

const otherServices = [
  'Oil Change',
  'Battery Replacement',
  'Spark Plugs (4 Cylinder)',
  'Spark Plugs (V6)',
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

// Generate years from current + back to 1980
const YEARS = Array.from({ length: new Date().getFullYear() - 1980 + 1 }, (_, i) => new Date().getFullYear() - i)

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [vinLoading, setVinLoading] = useState(false)
  const [vinError, setVinError] = useState('')

  // Vehicle state
  const [mode, setMode] = useState<'dropdown' | 'vin'>('dropdown')
  const [year, setYear] = useState('')
  const [makes, setMakes] = useState<{ MakeId: number; MakeName: string }[]>([])
  const [make, setMake] = useState('')
  const [models, setModels] = useState<{ ModelId: number; ModelName: string }[]>([])
  const [model, setModel] = useState('')
  const [engine, setEngine] = useState('')

  // Manual vehicle text (fallback)
  const [vehicleManual, setVehicleManual] = useState('')

  // Form state
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    services: [] as string[],
    parts: '',
    timeframe: '',
    notes: '',
  })

  // Load makes when year changes
  useEffect(() => {
    if (!year) { setMakes([]); setMake(''); return }
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json`)
      .then(r => r.json())
      .then(data => {
        if (data.Results) {
          const sorted = data.Results.sort((a: any, b: any) => a.MakeName.localeCompare(b.MakeName))
          setMakes(sorted)
        }
      })
    setMake('')
    setModels([])
    setModel('')
    setEngine('')
  }, [year])

  // Load models when make changes
  useEffect(() => {
    if (!year || !make) { setModels([]); setModel(''); return }
    fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/year/${year}?format=json`)
      .then(r => r.json())
      .then(data => {
        if (data.Results) {
          const sorted = data.Results.sort((a: any, b: any) => a.Model_Name.localeCompare(b.Model_Name))
          setModels(sorted)
        }
      })
    setModel('')
    setEngine('')
  }, [year, make])

  const handleVinDecode = async () => {
    if (!engine.trim() || engine.trim().length < 11) {
      setVinError('Please enter a valid 11+ character VIN')
      return
    }
    setVinLoading(true)
    setVinError('')
    try {
      const res = await fetch('/api/vin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vin: engine }),
      })
      const data = await res.json()
      if (!data.success) { setVinError(data.error || 'Could not decode VIN'); return }
      setYear(data.year || '')
      setMake(data.make || '')
      setModel(data.model || '')
      setVehicleManual(`${data.year || ''} ${data.make || ''} ${data.model || ''}`)
    } catch {
      setVinError('Decode failed. Try manual entry.')
    } finally {
      setVinLoading(false)
    }
  }

  const toggleService = (svc: string) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter(s => s !== svc)
        : [...prev.services, svc],
    }))
  }

  const buildVehicleString = useCallback(() => {
    if (mode === 'vin' && vehicleManual) return vehicleManual
    if (mode === 'dropdown' && year && make && model) {
      return `${year} ${make} ${model}${engine ? ` ${engine}` : ''}`
    }
    return vehicleManual
  }, [mode, year, make, model, engine, vehicleManual])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const vehicleStr = buildVehicleString()
    if (!form.name || !form.phone || !vehicleStr || form.services.length === 0) {
      setError('Please fill in your name, phone, vehicle, and select at least one service')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          vehicle: vehicleStr,
          services: form.services,
          parts: form.parts,
          timeframe: form.timeframe,
          notes: form.notes,
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Text us directly at (386) 235-3012.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ padding: '5rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '1rem' }}>
          Request Received!
        </h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          Thanks, <strong>{form.name}</strong>. I've got your request and will review it right away.
        </p>
        <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
          I'll reach out at <strong>{form.phone}</strong> within a few hours with a quote.
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
        <p>Fill out the form. I'll review and get back to you with a quote. Once approved, you book your appointment.</p>
      </section>

      <section style={{ padding: '3rem 2rem', maxWidth: '780px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>

          {/* Mode Toggle */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button type="button" onClick={() => { setMode('dropdown'); setVehicleManual(''); setVinError('') }}
              style={{ padding: '0.6rem 1.8rem', borderRadius: '50px', border: '2px solid', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.2s',
                background: mode === 'dropdown' ? 'var(--accent)' : 'transparent',
                borderColor: 'var(--accent)', color: mode === 'dropdown' ? 'white' : 'var(--accent)' }}>
              🔽 Search Vehicle
            </button>
            <button type="button" onClick={() => { setMode('vin'); setYear(''); setMake(''); setModel(''); setEngine('') }}
              style={{ padding: '0.6rem 1.8rem', borderRadius: '50px', border: '2px solid', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.2s',
                background: mode === 'vin' ? 'var(--accent)' : 'transparent',
                borderColor: 'var(--accent)', color: mode === 'vin' ? 'white' : 'var(--accent)' }}>
              🏷️ Enter VIN
            </button>
          </div>

          {/* Vehicle Selection */}
          <div className="form-section">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.2rem' }}>
              Vehicle {mode === 'vin' ? '(from VIN)' : 'Info'}
            </h2>

            {mode === 'dropdown' && (
              <>
                <div className="vehicle-grid">
                  <div className="form-field">
                    <label>Year *</label>
                    <select value={year} onChange={e => setYear(e.target.value)} required>
                      <option value="">Select Year</option>
                      {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Make *</label>
                    <select value={make} onChange={e => setMake(e.target.value)} disabled={!year || makes.length === 0} required>
                      <option value="">{!year ? 'Select year first' : makes.length ? 'Select Make' : 'Loading...'}</option>
                      {makes.map(m => <option key={m.MakeId} value={m.MakeName}>{m.MakeName}</option>)}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Model *</label>
                    <select value={model} onChange={e => setModel(e.target.value)} disabled={!make || models.length === 0} required>
                      <option value="">{!make ? 'Select make first' : models.length ? 'Select Model' : 'Loading...'}</option>
                      {models.map(m => <option key={m.ModelId} value={m.Model_Name}>{m.Model_Name}</option>)}
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Engine / Trim (optional)</label>
                    <input type="text" value={engine} onChange={e => setEngine(e.target.value)}
                      placeholder="e.g. 2.0L Turbo, V6" />
                  </div>
                </div>
                {year && make && model && (
                  <div style={{ marginTop: '1rem', padding: '0.8rem 1.2rem', background: 'rgba(0,158,227,0.08)', borderRadius: '6px', border: '1px solid rgba(0,158,227,0.2)', fontSize: '0.9rem', color: 'var(--text)' }}>
                    <strong style={{ color: 'var(--accent)' }}>Selected:</strong> {year} {make} {model}{engine ? ` · ${engine}` : ''}
                  </div>
                )}
              </>
            )}

            {mode === 'vin' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div className="form-field">
                  <label>VIN Number *</label>
                  <input type="text" value={engine} onChange={e => { setEngine(e.target.value.toUpperCase()); setVinError('') }}
                    placeholder="e.g. 1G1JC524717121512" maxLength={17} required
                    style={{ fontFamily: 'monospace', fontSize: '1.1rem', letterSpacing: '1px' }} />
                  <span className="field-hint">Enter the 17-character VIN from your vehicle's dashboard or door jamb</span>
                </div>
                <button type="button" onClick={handleVinDecode} disabled={vinLoading || engine.trim().length < 11}
                  style={{ alignSelf: 'flex-start', padding: '0.65rem 1.5rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', opacity: vinLoading || engine.trim().length < 11 ? 0.6 : 1, transition: 'opacity 0.2s' }}>
                  {vinLoading ? 'Decoding...' : '🔍 Decode VIN'}
                </button>
                {vinError && <p style={{ color: '#e74c3c', fontSize: '0.85rem' }}>{vinError}</p>}
                {vehicleManual && (
                  <div style={{ padding: '0.8rem 1.2rem', background: 'rgba(0,158,227,0.08)', borderRadius: '6px', border: '1px solid rgba(0,158,227,0.2)', fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--accent)' }}>Decoded:</strong> {vehicleManual}
                  </div>
                )}
                <div className="form-field" style={{ marginTop: '0.5rem' }}>
                  <label>Or enter manually (optional)</label>
                  <input type="text" value={vehicleManual} onChange={e => setVehicleManual(e.target.value)}
                    placeholder="e.g. 2019 Honda Civic 1.5L Turbo" />
                </div>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="form-section">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.2rem' }}>Your Contact Info</h2>
            <div className="form-grid">
              <div className="form-field">
                <label>Full Name *</label>
                <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith" />
              </div>
              <div className="form-field">
                <label>Phone Number *</label>
                <input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="(386) 555-0100" />
              </div>
              <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                <label>Email (optional)</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@email.com" />
              </div>
            </div>
          </div>

          {/* Services — Brake options first */}
          <div className="form-section">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.6rem' }}>Services Needed *</h2>
            <p style={{ color: 'var(--text-lighter)', fontSize: '0.8rem', marginBottom: '1.2rem' }}>Select all that apply</p>

            {/* Brake Services */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-light)', marginBottom: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Brake Services</p>
              <div className="services-checkboxes">
                {brakeServices.map(svc => (
                  <label key={svc.id} className={`service-check ${form.services.includes(svc.id) ? 'checked' : ''}`}>
                    <input type="checkbox" checked={form.services.includes(svc.id)} onChange={() => toggleService(svc.id)} />
                    <span>
                      <strong>{svc.label}</strong>
                      <span className="svc-price"> {svc.price}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Other Services */}
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-light)', marginBottom: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Other Services</p>
              <div className="services-checkboxes">
                {otherServices.map(svc => (
                  <label key={svc} className={`service-check ${form.services.includes(svc) ? 'checked' : ''}`}>
                    <input type="checkbox" checked={form.services.includes(svc)} onChange={() => toggleService(svc)} />
                    {svc}
                  </label>
                ))}
              </div>
            </div>
            {form.services.length === 0 && (
              <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.5rem' }}>Please select at least one service</p>
            )}
          </div>

          {/* Parts */}
          <div className="form-section">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.2rem' }}>Parts Sourcing</h2>
            <div className="parts-radios">
              {partsOptions.map(opt => (
                <label key={opt.value} className={`radio-option ${form.parts === opt.value ? 'checked' : ''}`}>
                  <input type="radio" name="parts" value={opt.value} checked={form.parts === opt.value} onChange={e => setForm({ ...form, parts: e.target.value })} />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Timeframe */}
          <div className="form-section">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.2rem' }}>Preferred Time &amp; Location</h2>
            <div className="form-field">
              <label>When do you need service? Any time or location preferences?</label>
              <textarea rows={3} value={form.timeframe} onChange={e => setForm({ ...form, timeframe: e.target.value })}
                placeholder="e.g. Any weekday morning, vehicle at my workplace in Daytona Beach" />
            </div>
          </div>

          {/* Notes */}
          <div className="form-field">
            <label>Additional Notes (optional)</label>
            <textarea rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
              placeholder="Any other details — symptoms, concerns, questions" />
          </div>

          {error && (
            <div style={{ padding: '1rem', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 'var(--radius)', color: '#991b1b', fontSize: '0.9rem' }}>{error}</div>
          )}

          <button type="submit" className="btn-primary"
            style={{ fontSize: '1.1rem', padding: '1.1rem 2rem', border: 'none', cursor: 'pointer', width: '100%' }}
            disabled={loading}>
            {loading ? 'Sending...' : 'Submit Quote Request'}
          </button>

          <p style={{ textAlign: 'center', color: 'var(--text-lighter)', fontSize: '0.82rem' }}>
            I review every request personally and respond within a few hours. No automated responses.
          </p>
        </form>
      </section>

      <style jsx>{`
        .form-section {
          background: var(--light);
          padding: 1.8rem;
          border-radius: var(--radius);
        }
        .vehicle-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 600px) {
          .vehicle-grid { grid-template-columns: 1fr; }
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
          font-size: 0.88rem;
          color: var(--text);
        }
        .form-field input,
        .form-field select,
        .form-field textarea {
          padding: 0.75rem 1rem;
          border: 1.5px solid var(--border);
          border-radius: var(--radius);
          font-size: 1rem;
          font-family: inherit;
          background: white;
          color: var(--text);
          transition: border-color 0.2s;
        }
        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: var(--accent);
        }
        .form-field select:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }
        .field-hint {
          font-size: 0.78rem;
          color: var(--text-lighter);
        }
        .services-checkboxes {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 0.65rem;
        }
        .service-check {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 1rem;
          background: white;
          border: 1.5px solid var(--border);
          border-radius: var(--radius);
          cursor: pointer;
          font-size: 0.88rem;
          transition: all 0.15s;
          line-height: 1.4;
        }
        .service-check:hover { border-color: var(--accent); }
        .service-check.checked {
          border-color: var(--accent);
          background: rgba(0,158,227,0.06);
          color: var(--primary);
          font-weight: 600;
        }
        .service-check input { accent-color: var(--accent); width: 16px; height: 16px; flex-shrink: 0; }
        .svc-price { color: var(--accent); font-weight: 800; }
        .parts-radios {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .radio-option {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 1rem;
          background: white;
          border: 1.5px solid var(--border);
          border-radius: var(--radius);
          cursor: pointer;
          font-size: 0.88rem;
          transition: all 0.15s;
        }
        .radio-option:hover { border-color: var(--accent); }
        .radio-option.checked {
          border-color: var(--accent);
          background: rgba(0,158,227,0.06);
          font-weight: 600;
        }
        .radio-option input { accent-color: var(--accent); }
      `}</style>
    </>
  )
}