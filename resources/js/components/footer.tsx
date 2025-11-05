import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Link } from "@inertiajs/react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-end font-bold text-2xl mb-4">
              <span className="text-white text-3xl">Bron</span>
              <span className="text-red-500">x</span>
            </div>
            <p className="text-purple-200 text-sm">Innovation in battery technology</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm text-purple-200">
              <li>
                <Link href="/" className="hover:text-yellow-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/product" className="hover:text-yellow-400 transition">
                  Product
                </Link>
              </li>
              <li>
                <a href="/about" className="hover:text-yellow-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-yellow-400 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-bold mb-4">OPENING TIME</h4>
            <p className="text-sm text-purple-200 mb-2">Monday - Friday: 9am - 5pm</p>
            <p className="text-sm text-purple-200 mb-2">Saturday: 10am - 3pm</p>
            <p className="text-sm text-purple-200">Sunday: Closed</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-primary pt-8 flex justify-between items-center">
          <p className="text-sm text-purple-200">&copy; 2025 enercos. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-purple-200 hover:text-yellow-400 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-purple-200 hover:text-yellow-400 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-purple-200 hover:text-yellow-400 transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-purple-200 hover:text-yellow-400 transition">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
