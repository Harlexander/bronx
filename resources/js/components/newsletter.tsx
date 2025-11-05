"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Subscribed with email:", email)
    setEmail("")
  }

  return (
    <section className="bg-[#08C6F6] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-white flex-1">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Subscribe Newsletter</h3>
            <p className="text-purple-100 text-sm">Stay up to date with the latest news and offers</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-auto flex gap-2">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white text-gray-900 border-0 px-4 py-2"
            />
            <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
