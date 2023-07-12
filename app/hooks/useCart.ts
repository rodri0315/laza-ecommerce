import { useEffect, useState } from 'react'
import { Product } from '../contexts/ProductContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function useCartCache() {
  console.log('useCartCache...')
  const [cartInCache, setCartInCache] = useState<Product[]>([])

  useEffect(() => {
    async function getCart() {
      console.log('getCart from cache')
      const cartInLocalStorage = await AsyncStorage.getItem('cart')
      if (cartInLocalStorage !== null) {
        const cart = JSON.parse(cartInLocalStorage)
        console.log('cart retrived from local storage: 🛒', cart)
        setCartInCache(prevState => [...prevState, ...cart])
      }
    }
    getCart()
  }, [])

  useEffect(() => {
    console.log('useCart')
    AsyncStorage.setItem('cart', JSON.stringify(cartInCache))
  }, [cartInCache])

  return { cartInCache, setCartInCache }
}