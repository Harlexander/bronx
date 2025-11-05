import Header from "@/components/header"
import Footer from "@/components/footer"
import { Mail, MapPin, Phone } from "lucide-react"
import { useEffect, useState } from "react"
import { useAppearance } from "@/hooks/use-appearance"

export default function Contact() {
  const { updateAppearance } = useAppearance()
  useEffect(() => {
    updateAppearance('light')
  }, [updateAppearance])

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  return (
    <main className="w-full">
      <Header />

      <div className="py-12"></div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 border-b">
        <p className="text-2xl font-bold">Contact</p>
        <p className="text-sm text-gray-500">Home / Contact</p>
      </div>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">We’d love to hear from you</h2>
            <p className="text-slate-600">Reach out for product questions, partnerships, or support.</p>

            <div className="space-y-4">
              <Info icon={<MapPin className="h-5 w-5" />} title="Office">
                972 Sylvan Street South Angelina, NL
              </Info>
              <Info icon={<Phone className="h-5 w-5" />} title="Phone">
                (633) 497‑1888 / (062) 109‑9222
              </Info>
              <Info icon={<Mail className="h-5 w-5" />} title="Email">
                example@example.com
              </Info>
            </div>
          </div>

          <div className="md:col-span-2">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl border border-slate-200 p-6"
              onSubmit={(e) => {
                e.preventDefault()
                alert("Thanks! This demo form doesn't submit yet.")
              }}
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Name</label>
                <input
                  className="h-11 rounded-md border border-slate-300 px-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  className="h-11 rounded-md border border-slate-300 px-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Subject</label>
                <input
                  className="h-11 rounded-md border border-slate-300 px-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <textarea
                  className="min-h-32 rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center h-11 px-5 rounded-md bg-primary text-white font-medium hover:opacity-90"
                >
                  Send message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function Info({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-primary mt-0.5">{icon}</div>
      <div>
        <div className="font-medium text-slate-900">{title}</div>
        <div className="text-slate-600 text-sm">{children}</div>
      </div>
    </div>
  )
}

