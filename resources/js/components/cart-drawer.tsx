import { X, Plus, Minus, Trash2 } from "lucide-react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useSessionCart } from "@/hooks/use-session-cart"
import { SharedData } from "@/types"
import { usePage } from "@inertiajs/react"
import { Link } from "@inertiajs/react"

export default function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { update, remove, clear } = useSessionCart()
  const { cart } = usePage<SharedData>().props

   console.log(cart)
  return (
    <Drawer open={open} direction="right" onOpenChange={onOpenChange}>
      <DrawerContent className="data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:sm:max-w-md">
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle>Cart</DrawerTitle>
          <DrawerClose asChild>
            <button className="p-2" aria-label="Close cart"><X className="w-5 h-5" /></button>
          </DrawerClose>
        </DrawerHeader>
        <div className="px-4 pb-4 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
          {cart?.items?.length === 0 && (
            <div className="text-slate-600 text-sm">Your cart is empty.</div>
          )}
          {cart?.items?.map(({ product, quantity, product: { id } }) => (
            <div key={id} className="flex gap-3 border-b pb-3">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold text-slate-900">{product.name}</div>
                <div className="text-slate-600 text-sm">{product.price}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button className="p-1 rounded border" onClick={() => update(String(id), Math.max(1, quantity - 1))}><Minus className="w-4 h-4" /></button>
                  <span className="w-8 text-center text-slate-900">{quantity}</span>
                  <button className="p-1 rounded border" onClick={() => update(String(id), quantity + 1)}><Plus className="w-4 h-4" /></button>
                  <button className="ml-auto p-1 text-red-500" onClick={() => remove(String(id))}><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <DrawerFooter>
          <div className="flex items-center justify-between">
            <span className="text-white/80">Total</span>
            <span className="text-white font-semibold">{cart?.total ?? 0}</span>
          </div>
          <div className="flex gap-2">
            <Link href="/checkout" className="flex-1">
              <Button className="w-full" style={{ backgroundColor: "#FFA500", color: "black" }}>Checkout</Button>
            </Link>
            <Button variant="outline" onClick={() => clear()}>Clear</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}


