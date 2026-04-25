import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-jungle text-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-heading text-2xl font-bold text-sand mb-4">
              Hotel Manzanillo
            </h3>
            <p className="text-sand/80 text-sm leading-relaxed max-w-sm">
              A boutique retreat where the rainforest meets the sea. 
              Currently being lovingly restored on Costa Rica&apos;s 
              southern Caribbean coast.
            </p>
            <p className="mt-4 text-sand/60 text-xs">
              Manzanillo, Limón Province, Costa Rica
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-sand mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/about', label: 'Our Story' },
                { href: '/explore', label: 'Activities' },
                { href: '/history', label: 'History' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/booking', label: 'Book a Room' },
              ].map((link) => (
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
                <span className="block text-sand/50 text-xs uppercase tracking-wider mb-1">Reservations</span>
                <a
                  href="mailto:reservations@manzanillo.lat"
                  className="text-teal hover:text-teal/80 transition-colors"
                >
                  reservations@manzanillo.lat
                </a>
              </p>
              <p className="text-sand/70">
                <span className="block text-sand/50 text-xs uppercase tracking-wider mb-1">General</span>
                <a
                  href="mailto:hello@manzanillo.lat"
                  className="text-teal hover:text-teal/80 transition-colors"
                >
                  hello@manzanillo.lat
                </a>
              </p>
              <div className="pt-2">
                <span className="block text-sand/50 text-xs uppercase tracking-wider mb-2">Follow Along</span>
                <div className="flex space-x-3">
                  <span className="text-sand/40 text-xs italic">Social coming soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-sand/50">
          <p>© {new Date().getFullYear()} Hotel Manzanillo. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Built with love for Manzanillo, Costa Rica 🌿
          </p>
        </div>
      </div>
    </footer>
  )
}
