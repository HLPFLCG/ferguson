import Link from 'next/link'

const exploreLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/explore', label: 'Destinations' },
  { href: '/history', label: 'History' },
  { href: '/pricing', label: 'Packages' },
  { href: '/booking', label: 'Book a Trip' },
  { href: '/hotel', label: 'Hotel Manzanillo' },
]

const socialLinks = [
  { href: 'https://instagram.com/fergusontravel', label: 'Instagram', icon: 'IG' },
  { href: 'https://facebook.com/fergusontravel', label: 'Facebook', icon: 'FB' },
]

export default function Footer() {
  return (
    <footer className="bg-jungle text-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-heading text-2xl font-bold text-sand mb-4">
              Ferguson Travel Co.
            </h3>
            <p className="text-sand/80 text-sm leading-relaxed max-w-sm">
              Curated travel to Costa Rica&apos;s Caribbean coast and beyond.
              Real trips, real places, community-rooted experiences.
            </p>
            <p className="mt-4 text-sand/60 text-xs">
              Specialists in the Caribbean coast of Costa Rica &amp; Panama
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs font-bold text-sand transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-sand mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sand/70 hover:text-sand transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-sand mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <p className="text-sand/70">
                <span className="block text-sand/50 text-xs uppercase tracking-wider mb-1">Bookings</span>
                <a
                  href="mailto:bookings@fergusontravel.com"
                  className="text-teal hover:text-teal/80 transition-colors"
                >
                  bookings@fergusontravel.com
                </a>
              </p>
              <p className="text-sand/70">
                <span className="block text-sand/50 text-xs uppercase tracking-wider mb-1">General</span>
                <a
                  href="mailto:hello@fergusontravel.com"
                  className="text-teal hover:text-teal/80 transition-colors"
                >
                  hello@fergusontravel.com
                </a>
              </p>
              <p className="text-sand/70">
                <span className="block text-sand/50 text-xs uppercase tracking-wider mb-1">Hotel</span>
                <a
                  href="mailto:hotel@fergusontravel.com"
                  className="text-teal hover:text-teal/80 transition-colors"
                >
                  hotel@fergusontravel.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-sand/50 gap-4">
          <p>© {new Date().getFullYear()} Ferguson Travel Co. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-sand/80 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-sand/80 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

