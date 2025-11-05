import { useEffect, useCallback } from "react"
import { router } from "@inertiajs/react"
import { useCartStore, type CartItem, type CartProduct } from "@/hooks/use-cart"

type CartPage = { props: { cart?: { items: CartItem[] } } }

export function useSessionCart() {
  const add = (productId: number, quantity: number) => {
    router.post(
      "/cart/add",
      { product_id: productId, quantity },
      { preserveScroll: true }
    )
  }

  const update = (itemId: string, quantity: number) => {
    router.visit(`/cart/update/${itemId}`, {
      method: "put",
      data: { quantity },
      preserveScroll: true,
    })
  }

  const remove = (itemId: string) => {
    router.delete(`/cart/remove/${itemId}`, { preserveScroll: true })
  }

  const clear = () => {
    router.delete("/cart/clear", { preserveScroll: true })
  } 

  return { add, update, remove, clear }
}


