import { useEffect, useState } from 'react'
import { Product } from '../contexts/ProductContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Address } from '../contexts/cart/CartContext'

export function useAddressCache() {
  console.log('useAddressCache...')
  const [addressInCache, setAddressInCache] = useState<Address[]>([])

  useEffect(() => {
    async function getAddress() {
      console.log('getAddress from cache')
      const addressInLocalStorage = await AsyncStorage.getItem('address')
      if (addressInLocalStorage !== null) {
        const address = JSON.parse(addressInLocalStorage)
        console.log('address retrived from local storage: 🛒', address)
        if (address.length !== 0) {
          // loop and find address by is_primary
          const primaryAddress = address.filter((address: Address) => {
            return address.is_primary
          })
          setAddressInCache(prevState => [...prevState, ...primaryAddress])
        } else {
          setAddressInCache(prevState => [...prevState, ...address])
        }

      }
    }
    getAddress()
  }, [])

  useEffect(() => {
    console.log('useAddress')
    AsyncStorage.setItem('address', JSON.stringify(addressInCache))
  }, [addressInCache])

  return { addressInCache, setAddressInCache }
}