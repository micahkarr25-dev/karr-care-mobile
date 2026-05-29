import Link from 'next/link'

export default function ContactPage() {
  return (
    <>
      <section className="hero">
        <h1>Contact Us</h1>
        <p className="tagline">It Takes a Karr to Know a Car</p>
        <p>Ready to book? Fill out the quote form and I'll get back to you within a few hours.</p>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Phone */}
          <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--light)', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📱</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>Call or Text</h3>
            <a href="tel:+13862353012" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)', textDecoration: 'none' }}>
              (386) 235-3012
            </a>
            <p style={{ color: 'var(--text-light)', marginTop: '0.5rem', fontSize: '0.9rem' }}>Preferred for quick questions</p>
          </div>

          {/* Book */}
          <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--light)', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>Request a Quote</h3>
            <p style={{ color: 'var(--text-light)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Fill out the booking form. I'll review and get back to you with a quote.
            </p>
            <Link href="/book" className="btn-primary">Get a Quote →</Link>
          </div>

          {/* Service Area */}
          <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--light)', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📍</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>Service Area</h3>
            <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Daytona Beach, Ormond Beach, Holly Hill & surrounding areas</p>
            <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>Extended travel: +$20–$40</p>
          </div>

          {/* Hours */}
          <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--light)', borderRadius: 'var(--radius)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⏰</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>Hours</h3>
            <p style={{ color: 'var(--text-light)' }}>Mon – Sat: Flexible scheduling</p>
            <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>After hours / weekends: +$25–$50</p>
          </div>
        </div>

        {/* Promise */}
        <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem', border: '2px solid var(--accent)', borderRadius: 'var(--radius)' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>Our Promise</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-light)' }}>
            <p>✅ Quality Work You Can Trust</p>
            <p>✅ We Get Back On Every Time</p>
            <p>✅ Honest Prices</p>
            <p>✅ Quality Work, Right Where You Are</p>
          </div>
        </div>
      </section>
    </>
  )
}
