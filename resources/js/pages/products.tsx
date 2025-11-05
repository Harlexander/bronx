import Header from "@/components/header"
import Footer from "@/components/footer"
import { useEffect } from "react"
import { useAppearance } from "@/hooks/use-appearance"
import { create } from "zustand"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSessionCart } from "@/hooks/use-session-cart"
import { ProductType } from "@/types"


export default function Products({ products }: { products: ProductType[] }) {
  const { updateAppearance } = useAppearance()
  useEffect(() => {
    updateAppearance('light')
  }, [updateAppearance])

  const { isOpen, selectedProduct, quantity, open, close, setQuantity } = useProductDialogStore()
  const { add } = useSessionCart()

  return (
    <main className="w-full">
      <Header />

      <div className="py-12"></div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 border-b">
        <p className="text-2xl font-bold">Products</p>
        <p className="text-sm text-gray-500">Home / Products</p>
      </div>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <article
                key={p.id}
                className="group rounded-xl border border-slate-200 overflow-hidden bg-white cursor-pointer"
                onClick={() => open(p)}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-900">{p.name}</h3>
                  {p.description && <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-1">{p.description}</p>}
                  <div className="mt-4 flex items-center justify-between text-sm sm:text-base">
                    <span className="text-xs sm:text-sm font-semibold text-slate-900">{p.price}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Product dialog */}
      <Dialog open={isOpen} onOpenChange={(openNow) => !openNow && close()}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
            <DialogDescription>{selectedProduct?.subtitle}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="overflow-hidden rounded-md bg-slate-100">
              {selectedProduct && (
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-52 object-cover" />
              )}
            </div>
            <div>
              <div className="text-2xl font-semibold text-slate-900">{selectedProduct?.price}</div>
              {selectedProduct?.description && (
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{selectedProduct.description}</p>
              )}
              <div className="mt-4">
                <label className="text-sm font-medium text-slate-700">Quantity</label>
                <div className="mt-2 flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</Button>
                  <Input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                    className="w-20 text-center"
                  />
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>+</Button>
                </div>
              </div>
              <div className="mt-4 text-sm text-slate-600">
                Subtotal:{" "}
                <span className="font-semibold text-slate-900">
                  {((selectedProduct ? selectedProduct.price : 0) * quantity)}
                </span>
              </div>
              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (selectedProduct) add(selectedProduct.id, quantity)
                    close()
                  }}
                >
                  Add to cart
                </Button>
                <Button variant="ghost" onClick={close}>Cancel</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  )
}


type ProductDialogStore = {
  isOpen: boolean
  selectedProduct: ProductType | null
  quantity: number
  open: (product: ProductType) => void
  close: () => void
  setQuantity: (q: number) => void
}

const useProductDialogStore = create<ProductDialogStore>((set) => ({
  isOpen: false,
  selectedProduct: null,
  quantity: 1,
  open: (product: ProductType) => set({ isOpen: true, selectedProduct: product, quantity: 1 }),
  close: () => set({ isOpen: false, selectedProduct: null, quantity: 1 }),
  setQuantity: (q: number) => set({ quantity: q }),
}))

// Simple cart store
// cart store & helpers now come from hooks/use-cart

