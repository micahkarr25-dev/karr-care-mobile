import Link from 'next/link'

const services = [
  {
    name: 'Oil Change',
    prices: [
      { label: 'Labor Only', price: '$80' },
      { label: 'Full Service (Oil + Filter)', price: '$100–$120' },
    ],
    desc: 'Full service oil change including premium oil and quality filter. We handle most vehicles.',
  },
  {
    name: 'Battery Replacement',
    prices: [
      { label: 'With Another Service', price: '$60' },
      { label: 'Standalone Service', price: '$120' },
      { label: 'Battery Cost', price: 'Separate' },
    ],
    desc: 'Battery cost is separate and quoted based on your vehicle. We install and dispose of the old battery responsibly.',
  },
  {
    name: 'Brake Services',
    prices: [
      { label: 'Pads Only (per axle)', price: '$140' },
      { label: 'Pads & Rotors (per axle)', price: '$220' },
    ],
    desc: 'Inspection, pad replacement, and rotor service. We use quality parts and ensure proper bedding for safe stopping.',
  },
  {
    name: 'Spark Plugs',
    prices: [
      { label: '4 Cylinder', price: '$140–$180' },
      { label: 'V6', price: '$200–$300' },
    ],
    desc: 'Includes diagnosis, plug replacement, and gap adjustment. Prices vary based on your engine configuration.',
  },
  {
    name: 'Alternator / Starter Replacement',
    prices: [{ label: 'Replacement', price: '$150–$250' }],
    desc: 'Diagnosis and replacement. Price varies by vehicle make and model. We source quality OEM or equivalent parts.',
  },
  {
    name: 'General Repairs',
    prices: [{ label: 'Message for Quote', price: 'Varies' }],
    desc: 'Most repairs priced well below shop rates. Message us with your needs for an accurate quote.',
  },
]

const addOns = [
  { name: 'Engine Air Filter', price: '$25–$40' },
  { name: 'Cabin Air Filter', price: '$30–$50' },
  { name: 'Wiper Blade Installation', price: '$20' },
  { name: 'Tire Rotation', price: '$40' },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <h1>Services &amp; Pricing</h1>
        <p className="tagline">Transparent Pricing. No Surprises.</p>
        <p>All jobs subject to $120 minimum. Final quote provided before any work begins.</p>
      </section>

      {/* Services */}
      <section style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {services.map((svc) => (
            <div key={svc.name} className="service-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                {svc.name}
              </h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '1rem', fontSize: '0.95rem' }}>{svc.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {svc.prices.map((p) => (
                  <div key={p.label} style={{ background: 'var(--light)', padding: '0.6rem 1.2rem', borderRadius: 'var(--radius)' }}>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{p.label}</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 700, marginLeft: '0.5rem' }}>{p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add-Ons */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center' }}>
            Save When Bundled — Add-Ons
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {addOns.map((ao) => (
              <div key={ao.name} className="service-card" style={{ padding: '1.2rem', textAlign: 'center' }}>
                <h4 style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '0.3rem' }}>{ao.name}</h4>
                <p className="price" style={{ margin: 0 }}>{ao.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Fees */}
        <div style={{ marginTop: '3rem', background: '#fff3cd', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid #ffeaa7' }}>
          <h3 style={{ fontWeight: 700, color: '#856404', marginBottom: '1rem' }}>Additional Fees</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <strong style={{ color: '#856404' }}>Same-Day / Emergency:</strong>
              <span style={{ color: 'var(--accent)', fontWeight: 700, marginLeft: '0.5rem' }}>+$50</span>
            </div>
            <div>
              <strong style={{ color: '#856404' }}>After Hours / Weekend:</strong>
              <span style={{ color: 'var(--accent)', fontWeight: 700, marginLeft: '0.5rem' }}>+$25–$50</span>
            </div>
          </div>
        </div>

        {/* Minimum */}
        <div style={{ marginTop: '2rem', background: 'var(--light)', padding: '2rem', borderRadius: 'var(--radius)', textAlign: 'center' }}>
          <h3 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem' }}>$120 Service Minimum</h3>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
            Covers travel, time, tools, and overhead. Applies to most jobs not listed with a set price.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <h2>Need Something Not Listed?</h2>
        <p>Message us with your vehicle and service needs. We'll get back to you fast.</p>
        <Link href="/book" className="btn-primary">Get a Quote</Link>
      </section>
    </>
  )
}
