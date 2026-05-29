import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <Link href="/" className="logo">
          <Image
            src="/logo.png"
            alt="Karr Care Mobile"
            width={70}
            height={70}
            style={{ verticalAlign: 'middle', borderRadius: '50%' }}
          />
          <span style={{ marginLeft: '0.6rem', fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }}>
            Karr <span style={{ color: '#009FE3' }}>Care</span> Mobile
          </span>
        </Link>
        <nav>
          <Link href="/services">Services</Link>
          <Link href="/fleet">Fleet</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/book" className="cta-btn">Get a Quote</Link>
        </nav>
      </div>
    </header>
  )
}
