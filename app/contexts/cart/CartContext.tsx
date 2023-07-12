import { createContext, useContext, useEffect, useState } from 'react'
import { useCartCache } from '../../hooks/useCart'
import { Product } from '../ProductContext'
import { api } from '../../services/api'
import { supabaseClient } from '../../config/supabase-client'
import structuredClone from '@ungap/structured-clone'
import { Card, Router } from '../../types/global';
import { useAddressCache } from '../../hooks/useAddressCache'
import axios from 'axios'
import { useCardCache } from '../../hooks/useCardCache'
import { Alert } from 'react-native'
import { Json, Order, OrderInsert } from '../../types/supabase';


export interface CartContextProps {
  cart: Product[]
  addProductToCart: (product: Product) => void
  setCart: React.Dispatch<React.SetStateAction<Product[]>>
  removeProductFromCart: (product: Product) => void
  clearCart: () => void
  submitCart: () => void
  address: Address | null
  submitAddress: (address: Address, router: any) => void
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>
  addresses: Address[]
  getAddresses: () => void
  submitCard: (card: Card, router: Router, saveCard?: boolean) => void
  cards: Card[]
  selectedCard: Card | null
  subtractProductFromCart: (product: Product) => void
  setAddress: React.Dispatch<React.SetStateAction<Address | null>>
  createOrder: (
    cart: Json[],
    deliveryAddress: Address,
    totalAmount: number,
    router: Router,
  ) => void
}

export type Address = {
  // id: number
  address: string
  city: string
  country: string
  phone: string
  full_name: string
  is_primary: boolean
  user_id: string
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addProductToCart: () => { },
  setCart: () => { },
  removeProductFromCart: () => { },
  clearCart: () => { },
  submitCart: () => { },
  address: null,
  submitAddress: () => { },
  setAddresses: () => { },
  addresses: [],
  getAddresses: () => { },
  submitCard: () => { },
  cards: [],
  selectedCard: null,
  subtractProductFromCart: () => { },
  setAddress: () => { },
  createOrder: () => { },
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
  const { cardsInCache, setCardsInCache } = useCardCache()
  const [cards, setCard] = useState<Card[]>([])
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const { addressInCache, setAddressInCache } = useAddressCache()
  const [address, setAddress] = useState<Address | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [router, setRouter] = useState<Router | null>(null)

  useEffect(() => {
    // console.log('Addresses useEffect', addresses)
  }, [addresses])

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

  // subtract one from the quantity of the product in the cart
  const subtractProductFromCart = (product: Product) => {
    const productInCartIndex = cartInCache.findIndex((item: Product) => item.id === product.id)
    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cartInCache)
      newCart[productInCartIndex].quantity--
      setCartInCache(newCart)
      setCart(newCart)
      console.log('Product already in cart', newCart, newCart[productInCartIndex].quantity)
      return newCart
    }
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

  // Get call to get the addresses of the user
  const getAddresses = async () => {
    try {
      const {
        data: { session }, error
      } = await supabaseClient.auth.getSession();
      const token = `Bearer ${session?.access_token}`;
      console.log('GET Addresses')
      const addresses = await api.get(`/addresses?user_id=eq.${session?.user.id}&select=*`, {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
          'Authorization': token,
        }
      });
      // console.log('Addresses-> GET', addresses.data)
      const primaryAddress = addresses.data.find((address: Address) => address.is_primary)
      setAddress(primaryAddress ? primaryAddress : null)
      setAddresses(addresses.data)
    }
    catch (err) {
      console.log(err.response)
    }
  }

  // Submit an address to addresses table
  const submitAddress = async (newAddress: Address, router: Router) => {
    setRouter(router)
    try {
      const {
        data: { session }, error
      } = await supabaseClient.auth.getSession();
      const token = `Bearer ${session?.access_token}`;
      console.log('Submit Address: \n')
      // console.log(newAddress)
      const isFirstAddress = addresses.length === 0
      if (isFirstAddress) {
        newAddress.is_primary = true
      }

      // Create new address in api
      const res = await api.post('/addresses', {
        ...newAddress
      },
        {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
            'Authorization': token,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          }
        });
      console.log('Address-> POST parsed', JSON.parse(res.request.response)[0])
      const newAddressRes = JSON.parse(res.request.response)[0]
      if (isFirstAddress) {
        setAddress(newAddressRes)
        setAddresses([newAddressRes])
        router.back()
      } else {
        const newAddresses: Address[] = [...addresses, newAddressRes]
        // Update all addresses to is_primary = false
        const moreThanOnePrimary = newAddresses.filter((address: Address) => address.is_primary)
        const hasManyAddresses = moreThanOnePrimary.length > 1
        let addressesToUpdate: Address[] = []
        console.log('hasManyAddresses', hasManyAddresses)
        console.log('newAddressRes?.is_primary', newAddressRes?.is_primary)
        if (hasManyAddresses && newAddressRes?.is_primary) {
          const updatedAddresses = moreThanOnePrimary.map((addressToCheck: Address & { id?: string }) => {
            console.log('mapping addresses', addressToCheck)
            if (addressToCheck.id !== newAddressRes.id) {
              console.log('address.id !== res.data.id')
              addressToCheck.is_primary = false
              console.log(addressToCheck.id, addressToCheck.is_primary)
            }
            return addressToCheck
          })
          addressesToUpdate = updatedAddresses
        } else {
          console.log('ROUTING-BACK')
          router?.back()
          return
        }

        try {
          const {
            data: { session }, error
          } = await supabaseClient.auth.getSession();
          console.log('updatedAddresses', addressesToUpdate, addressesToUpdate.length)
          const apiCalls = addressesToUpdate.map(async (address: Address, index) => {
            // Revisit RLS in Supabase
            return api.post(`/addresses`, { ...address },
              {
                headers: {
                  'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
                  'Authorization': session?.access_token,
                  'Content-Type': 'application/json',
                  'Prefer': 'resolution=merge-duplicates'
                }
              })
          })

          {
            await axios.all(apiCalls)
            await getAddresses()
            router.replace('/(tabs)/cart')
          }
        } catch (error) {
          console.log('Error updating error', error)
          console.log('Error updating addresses', error.response)
        }

      }

      // Save for later
      // updatedAddresses.forEach(async (address: Address, index) => {
      //   const 
      //   const { data: newAddress } = await api.patch(`/addresses?id=eq.${address.id}`, { ...address },
      //     {
      //       headers: {
      //         'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
      //         'Authorization': token,
      //         'Content-Type': 'application/json',
      //         'Prefer': 'return=minimal'
      //       }
      //     });
      //   console.log(`Addresses-> PATCH #${index}`, newAddress)
      // })
      // console.log(`Addresses-> PATCH #${index}`, newAddresses)
      // setAddresses(newAddresses)
      // router.back()
    }
    catch (err) {
      console.log(err.response)
    }
  }

  // Add Card to state
  const submitCard = (card: Card, router: Router, saveCard: boolean = false): Card => {
    debugger
    if (!saveCard) {

      setSelectedCard(card)
      router.back()
      return card
    }
    const cardInCardsIndex = cardsInCache.findIndex((item: Card) => item.card_number === card.card_number)
    if (cardInCardsIndex !== 0) {
      const newCard = [
        ...cardsInCache,
        {
          ...card,
        }
      ]
      setCardsInCache(newCard)
      setCard(newCard)
      router.back()
      return card
    }
    router.back()
    Alert.alert('Card already exists')
    return card

  }

  // Add order to api
  const createOrder = async (
    cart: Product[],
    deliveryAddress: Address,
    totalAmount: number,
    router: Router,
  ) => {
    try {
      const {
        data: { session }, error
      } = await supabaseClient.auth.getSession();
      const token = `Bearer ${session?.access_token}`;
      const orderItems = cart.map((product: Product) => {
        return {
          product_id: product.id,
          quantity: product.quantity,
          price: product.price,
        }
      })
      const order: OrderInsert = {
        shipping_address: `${deliveryAddress.address}, ${deliveryAddress.city}, ${deliveryAddress.country}`,
        total_amount: totalAmount,
        user_id: session?.user.id || null,
        orderItems: orderItems,
      }
      console.log('Submit Cart')
      const res = await api.post('/orders', { ...order },
        {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidWRjaHp6bGtvenhid3BjdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3NjcxMzksImV4cCI6MjAwMjM0MzEzOX0.OodwJcw12wGRJzJBzZU3ijUb4wALBGuzahwAsgSdT14',
            'Authorization': token,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          }
        }
      );
      console.log('Order', res)

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
      cards: cardsInCache,
      setCart,
      addProductToCart,
      removeProductFromCart,
      clearCart,
      submitCart,
      submitAddress,
      address,
      addresses,
      setAddresses,
      getAddresses,
      submitCard,
      selectedCard,
      subtractProductFromCart,
      setAddress,
      createOrder,
    }}>
      {children}
    </CartContext.Provider>
  )
}