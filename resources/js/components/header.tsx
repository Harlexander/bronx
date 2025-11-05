import { Menu, Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import CartDrawer from "@/components/cart-drawer"
import { SharedData } from "@/types"
import { Link, usePage } from "@inertiajs/react"


const links = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Product",
    href: "/product",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "My Account",
    href: "/dashboard",
  },
]
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cart } = usePage<SharedData>().props

  console.log(cart)
  useEffect(() => {   
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "shadow-lg" : ""}`}
      style={{
        backgroundColor: "#034EB9",
        transform: isScrolled ? "translateY(0)" : "translateY(0)",
      }}
    >
      {/* Top bar */}
      <div
        className="text-white text-sm px-4 py-2 flex justify-between items-center"
        style={{ backgroundColor: "#0340A1" }}
      >
        <span className="flex items-center gap-2">
          <Link href="/login"> <span className="text-xs">Log in</span> </Link>
          <span className="text-xs">|</span>
          <Link href="/register"> <span className="text-xs">Register</span> </Link>
        </span>
      </div>

      {/* Main header */}
      <div className="px-4 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        {/* Logo */}
        <div className="flex items-center font-bold text-2xl text-white font-sans">
          <span className="text-white">Bron</span>
          <span className="text-red-500">x</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {
            links.map((link) => (
              <a href={link.href} className="text-white hover:text-cyan-300 transition font-sans">
                {link.label}
              </a>
            ))
          }
        </nav>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-4">
          <Search className="w-5 h-5 text-white cursor-pointer hover:text-cyan-300 transition" />
          <div className="relative">
            <ShoppingCart
              className="w-5 h-5 text-white cursor-pointer hover:text-cyan-300 transition"
              onClick={() => setIsCartOpen(true)}
            />
            {cart?.items?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full px-1">
                {cart?.items?.length}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          <Search className="w-5 h-5 text-white cursor-pointer hover:text-cyan-300 transition" />
          <div className="relative">
            <ShoppingCart
              className="w-5 h-5 text-white cursor-pointer hover:text-cyan-300 transition"
              onClick={() => setIsCartOpen(true)}
            />
            {cart?.items?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full px-1">
                {cart?.items?.length}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Mobile menu items */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-4 space-y-3" style={{ backgroundColor: "#0340A1" }}>
         {
          links.map((link) => (
            <a href={link.href} className="block text-white hover:text-cyan-300 transition font-sans">
              {link.label}
            </a>
          ))
         }
        </div>
      )}
    </header>
  )
}
