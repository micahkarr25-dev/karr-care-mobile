import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <p>© {new Date().getFullYear()} Karr Care Mobile — Daytona Beach &amp; Ormond Beach, FL</p>
      <p style={{ marginTop: '0.5rem' }}>
        <Link href="/">Home</Link> · <Link href="/services">Services</Link> · <Link href="/fleet">Fleet</Link> · <Link href="/contact">Contact</Link> · <Link href="/book">Book</Link>
      </p>
      <p style={{ marginTop: '0.5rem' }}>📞 (386) 235-3012</p>
    </footer>
  )
}
