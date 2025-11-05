import Header from "@/components/header"
import Footer from "@/components/footer"
import { useEffect, useState } from "react"
import { useAppearance } from "@/hooks/use-appearance"
import { usePage } from "@inertiajs/react"
import { SharedData } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Minus, Trash2 } from "lucide-react"
import { useSessionCart } from "@/hooks/use-session-cart"
import axios from "axios"
import LoginDialog from "@/components/login-dialog"
import CurrencyFormat from "@/components/currency"

export default function Checkout() {
  const { updateAppearance } = useAppearance()
  const { auth, cart } = usePage<SharedData>().props
  const { update, remove } = useSessionCart()
  const isGuest = !auth?.user

  const [showSignIn, setShowSignIn] = useState(false)
  const [guestForm, setGuestForm] = useState({
    name: "",
    email: "",
    password: "",
    delivery_address: "",
  })
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  })
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("espees")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    updateAppearance("light")
  }, [updateAppearance])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // If user is not authenticated and not in explicit sign-in mode,
      // attempt registration first (only when a password is supplied).
      if (isGuest && !showSignIn && guestForm.password && guestForm.password.trim().length >= 6) {
        try {
          await axios.post('/register', {
            name: guestForm.name,
            email: guestForm.email,
            password: guestForm.password,
            password_confirmation: guestForm.password,
          })
        } catch (regErr: any) {
          // Surface registration validation or server errors and stop
          setError(
            regErr.response?.data?.message ||
              regErr.response?.data?.error ||
              'Unable to register. Please check your details and try again.'
          )
          setIsSubmitting(false)
          return
        }
      }

      // Get delivery address based on mode
      const address = isGuest
        ? showSignIn
          ? deliveryAddress
          : guestForm.delivery_address
        : deliveryAddress

      if (!address || address.trim() === "") {
        setError("Please provide a delivery address")
        setIsSubmitting(false)
        return
      }

      // Handle login separately if sign-in mode (not implemented): proceed as guest

      // Submit checkout
      const payload: { payment_method: string; delivery_address: string; email?: string } = {
        payment_method: paymentMethod,
        delivery_address: address,
      }

      // Include email for guest checkout when still unauthenticated
      if (isGuest) {
        if (showSignIn) {
          payload.email = signInForm.email
        } else {
          payload.email = guestForm.email
        }
      }

      const response = await axios.post("/checkout/create-order", payload)

      if (response.data.success && response.data.payment_url) {
        // Redirect to payment URL
        window.location.href = response.data.payment_url
      } else {
        setError(response.data.error || "Failed to initialize payment")
        setIsSubmitting(false)
      }
    } catch (err: any) {
        console.log({err})
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "An error occurred during checkout. Please try again."
      )
      setIsSubmitting(false)
    }
  }

  if (!cart?.items || cart.items.length === 0) {
    return (
      <main className="w-full">
        <Header />
        <div className="py-12"></div>
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <a href="/product" className="text-primary hover:underline">Continue shopping</a>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="w-full">
      <Header />
      <div className="py-12"></div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 border-b">
        <p className="text-2xl font-bold">Checkout</p>
        <p className="text-sm text-gray-500">Home / Checkout</p>
      </div>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Form */}
            <div className="lg:col-span-2 space-y-6">
              {isGuest && (
                <div className="rounded-xl border border-slate-200 p-6">
                  <h2 className="text-xl font-semibold mb-4">Checkout Information</h2>
                  
                  {/* Sign In Form */}
                  {showSignIn ? (
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">Email</label>
                        <Input
                          type="email"
                          required
                          value={signInForm.email}
                          onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">Password</label>
                        <Input
                          type="password"
                          required
                          value={signInForm.password}
                          onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                          placeholder="Enter your password"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">Delivery Address</label>
                        <Input
                          required
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="123 Main St, City, State ZIP"
                        />
                      </div>
                      <div className="text-sm text-slate-600">
                        Don't have an account?{" "}
                        <button
                          type="button"
                          onClick={() => setShowSignIn(false)}
                          className="text-primary hover:underline font-medium"
                        >
                          Continue as guest
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Guest Checkout Form */}
                      <div className="space-y-4">
                        <div className="mb-4 text-sm text-slate-600">
                          Do you have an account?{" "}
                          <LoginDialog text="Login here" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700">Full Name</label>
                            <Input
                              required
                              value={guestForm.name}
                              onChange={(e) => setGuestForm({ ...guestForm, name: e.target.value })}
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700">Email</label>
                            <Input
                              type="email"
                              required
                              value={guestForm.email}
                              onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                              placeholder="john@example.com"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700">Password (Optional)</label>
                            <Input
                              type="password"
                              value={guestForm.password}
                              onChange={(e) => setGuestForm({ ...guestForm, password: e.target.value })}
                              placeholder="Create password to save account"
                            />
                            <p className="text-xs text-slate-500">Leave blank to checkout without account</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700">Delivery Address</label>
                            <Input
                              required
                              value={guestForm.delivery_address}
                              onChange={(e) => setGuestForm({ ...guestForm, delivery_address: e.target.value })}
                              placeholder="123 Main St, City, State ZIP"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {!isGuest && (
                <div className="rounded-xl border border-slate-200 p-6">
                  <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">Delivery Address</label>
                    <Input
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="123 Main St, City, State ZIP"
                    />
                  </div>
                </div>
              )}

              <div className="rounded-xl border border-slate-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-slate-50">
                    <input
                      type="radio"
                      name="payment"
                      value="espees"
                      checked={paymentMethod === "espees"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <CurrencyFormat>
                      <span className="font-medium">Espees</span>
                    </CurrencyFormat>
                  </label>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>

            {/* Right column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-slate-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-3 border-b pb-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">{item.product.name}</div>
                        <div className="text-slate-600 text-sm">{item.product.price}</div>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            className="p-1 rounded border hover:bg-slate-50"
                            onClick={() => update(String(item.id), Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-slate-900">{item.quantity}</span>
                          <button
                            type="button"
                            className="p-1 rounded border hover:bg-slate-50"
                            onClick={() => update(String(item.id), item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="ml-auto p-1 text-red-500 hover:text-red-700"
                            onClick={() => remove(String(item.id))}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <CurrencyFormat>
                      <span>{cart.total}</span>
                    </CurrencyFormat>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <CurrencyFormat>
                      <span>0.00</span>
                    </CurrencyFormat>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>  
                    <CurrencyFormat>
                      <span>{cart.total}</span>
                    </CurrencyFormat>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  style={{ backgroundColor: "#FFA500", color: "black" }}
                >
                  {isSubmitting ? "Processing..." : "Complete Order"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}

