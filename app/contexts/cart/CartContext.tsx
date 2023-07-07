import { createContext, useContext, useState } from 'react'
import { useCartCache } from '../../hooks/useCart'
import { Product } from '../ProductContext'
import { api } from '../../services/api'
import { supabaseClient } from '../../config/supabase-client'
import structuredClone from '@ungap/structured-clone'


interface CartContextProps {
  cart: Product[]
  addProductToCart: (product: Product) => void
  setCart: React.Dispatch<React.SetStateAction<Product[]>>
  removeProductFromCart: (product: Product) => void
  clearCart: () => void
  submitCart: () => void
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addProductToCart: () => { },
  setCart: () => { },
  removeProductFromCart: () => { },
  clearCart: () => { },
  submitCart: () => { }
})

export const useCart = () => {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { cartInCache, setCartInCache } = useCartCache()
  const [cart, setCart] = useState<Product[]>([])

  const addProductToCart = (product: Product) => {
    const productInCartIndex = cartInCache.findIndex((item: Product) => item.id === product.id)
    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cartInCache)
      newCart[productInCartIndex].quantity++
      setCartInCache(newCart)
      setCart(newCart)
      console.log('Product already in cart', newCart)
      return newCart
    }

    const newCart = [
      ...cartInCache,
      {
        ...product,
        quantity: 1
      }
    ]
    setCartInCache(newCart)
    setCart(newCart)
    return cart
  }

  const removeProductFromCart = (product: Product) => {
    const newCart = cartInCache.filter(item => item.id !== product.id)
    setCartInCache(newCart)
    setCart(newCart)
  }

  // Submit function that calls axios to send the cart to the backend
  const submitCart = async () => {
    try {
      const {
        data: { session }, error
      } = await supabaseClient.auth.getSession();
      const token = `Bearer ${session?.access_token}`;
      console.log('Submit Cart')
      const res = await api.post('/carts', { ...cart },
        {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
            'Authorization': token,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          }
        }
      );
    }
    catch (err) {
      console.log(err.response)
    }
  }

  const clearCart = () => {
    setCartInCache([])
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      cart: cartInCache,
      setCart,
      addProductToCart,
      removeProductFromCart,
      clearCart,
      submitCart
    }}>
      {children}
    </CartContext.Provider>
  )
}