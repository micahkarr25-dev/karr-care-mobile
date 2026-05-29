import Link from 'next/link'

export default function FleetPage() {
  return (
    <>
      <section className="hero">
        <h1>Fleet Services</h1>
        <p className="tagline">Keep Your Entire Fleet Moving — Without the Downtime</p>
        <p>On-site maintenance and repairs for businesses in Daytona Beach, Ormond Beach &amp; Holly Hill.</p>
      </section>

      <section style={{ padding: '4rem 2rem', maxWidth: '850px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem' }}>
            Why Businesses Choose Karr Care Mobile
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
            Your employees lose hours dropping vehicles at shops. We come to your lot, your warehouse, your jobsite.
            No fleet downtime. No shop coordination. Just results.
          </p>
        </div>

        <div className="why-grid" style={{ marginBottom: '3rem' }}>
          <div className="why-card">
            <div className="why-icon">🚚</div>
            <h3>We Come To You</h3>
            <p>We service vehicles at your location — lot, warehouse, or jobsite. No fleet downtime.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">📅</div>
            <h3>Scheduled Maintenance</h3>
            <p>We work with your schedule to minimize disruption. Preventive maintenance programs available.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">💰</div>
            <h3>Volume Pricing</h3>
            <p>Fleet accounts get preferential rates. Custom packages for businesses with 3+ vehicles.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">📋</div>
            <h3>Full Service Records</h3>
            <p>We document every service, repair, and recommendation. Keeps your fleet organized.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">⚡</div>
            <h3>Fast Turnaround</h3>
            <p>Same-day and next-day service available. Most repairs done on-site in one visit.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">🤝</div>
            <h3>Dedicated Point of Contact</h3>
            <p>One person — me. Direct line, no gatekeepers. You deal with the owner every time.</p>
          </div>
        </div>

        {/* Services for Fleets */}
        <div style={{ background: 'var(--light)', padding: '2.5rem', borderRadius: 'var(--radius)', marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem' }}>
            Fleet Services Include:
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.95rem' }}>
            {[
              'Oil Changes & Fluid Services',
              'Brake Inspection & Replacement',
              'Battery Testing & Replacement',
              'Tire Services & Rotation',
              'Pre-Trip Inspections',
              'Engine Diagnostics',
              'Alternator / Starter Services',
              'Wiper & Filter Replacement',
              'Scheduled Maintenance Programs',
              'Emergency Roadside Service',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Serve */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>
            Industries We Serve:
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {['Small Business Fleets', 'Delivery Services', 'Contractors', 'Property Management', 'Landscaping', ' HVAC / Service Techs', 'Delivery Drivers', 'Rideshare / Commercial'].map(ind => (
              <span key={ind} style={{ background: 'var(--primary)', color: 'white', padding: '0.5rem 1.2rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--accent)', padding: '2.5rem', borderRadius: 'var(--radius)', textAlign: 'center', color: 'white' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.8rem' }}>
            Let's Build a Maintenance Plan for Your Fleet
          </h3>
          <p style={{ marginBottom: '1.8rem', opacity: 0.95 }}>
            Free fleet assessment. No commitment. Tell me about your vehicles and needs.
          </p>
          <Link href="/book" className="btn-primary" style={{ background: 'white', color: 'var(--accent)' }}>
            Request Fleet Quote
          </Link>
        </div>
      </section>
    </>
  )
}
