import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <Image
          src="/logo.png"
          alt="Karr Care Mobile"
          width={160}
          height={160}
          style={{ borderRadius: '50%', marginBottom: '1.5rem' }}
        />
        <h1>Karr Care Mobile</h1>
        <p className="tagline">"It Takes a Karr to Know a Car"</p>
        <p>
          Professional mobile auto mechanic serving Daytona Beach, Ormond Beach &amp; Holly Hill.<br />
          We come to you — home or work. No shop fees. Honest prices.
        </p>
        <div className="hero-btns">
          <Link href="/book" className="btn-primary">Get a Quote</Link>
          <Link href="/services" className="btn-secondary">View Services</Link>
        </div>
      </section>

      {/* Why Us */}
      <section className="why-us">
        <h2 className="section-title">Why Choose Us</h2>
        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">🏠</div>
            <h3>We Come To You</h3>
            <p>Home, work, or anywhere you need us. Service on your schedule.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">💰</div>
            <h3>No Shop Fees</h3>
            <p>You save more. No overhead means better prices for you.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">⚡</div>
            <h3>Fast &amp; Convenient</h3>
            <p>Service on your time. No waiting rooms, no rides needed.</p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview">
        <h2 className="section-title">Common Services &amp; Pricing</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Oil Change</h3>
            <p className="price">$100 – $120</p>
            <p>Full service including oil and filter. Labor only from $80.</p>
          </div>
          <div className="service-card">
            <h3>Battery Replacement</h3>
            <p className="price">$60 – $120</p>
            <p>Battery cost separate. With another service: $60. Standalone: $120.</p>
          </div>
          <div className="service-card">
            <h3>Brake Services</h3>
            <p className="price">$140 – $220 / axle</p>
            <p>Pads only from $140/axle. Pads &amp; Rotors from $220/axle.</p>
          </div>
          <div className="service-card">
            <h3>Mobile Diagnostic</h3>
            <p className="price">$100</p>
            <p>Within 15 miles. Extended travel +$20–$40. Waived with most repairs.</p>
          </div>
          <div className="service-card">
            <h3>Spark Plugs</h3>
            <p className="price">$140 – $300</p>
            <p>4-cylinder from $140. V6 from $200. Prices vary by vehicle.</p>
          </div>
          <div className="service-card">
            <h3>Alternator / Starter</h3>
            <p className="price">$150 – $250</p>
            <p>Varies by vehicle. Includes diagnosis and installation.</p>
          </div>
        </div>
        <div className="view-all-services">
          <Link href="/services">View All Services &amp; Pricing →</Link>
        </div>
      </section>

      {/* Service Area */}
      <section className="service-area">
        <h2>Serving Central Florida</h2>
        <div className="areas">
          <span className="area-tag">📍 Daytona Beach</span>
          <span className="area-tag">📍 Ormond Beach</span>
          <span className="area-tag">📍 Holly Hill</span>
          <span className="area-tag">📍 Surrounding Areas</span>
        </div>
        <Link href="/book" className="btn-primary">Book Your Service</Link>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <h2>Ready to Get Your Car Fixed?</h2>
        <p>No shop fees. No hassle. Quality work, right where you are.</p>
        <Link href="/book" className="btn-primary">Get a Free Quote</Link>
      </section>
    </>
  )
}
// deployed at Fri May 29 07:13:59 UTC 2026
