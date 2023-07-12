import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Card } from '../types/global'

export function useCardCache() {
  console.log('useCardCache...')
  const [cardsInCache, setCardsInCache] = useState<Card[]>([])

  useEffect(() => {
    async function getCard() {
      console.log('getCard from cache')
      const cardsInLocalStorage = await AsyncStorage.getItem('cards')
      if (cardsInLocalStorage !== null) {
        const cards = JSON.parse(cardsInLocalStorage)
        console.log('card retrived from local storage: 🪪', cards)
        setCardsInCache(prevState => [...prevState, ...cards])
      }
    }
    getCard()
  }, [])

  useEffect(() => {
    console.log('useCard')
    AsyncStorage.setItem('cards', JSON.stringify(cardsInCache))
  }, [cardsInCache])

  return { cardsInCache, setCardsInCache }
}
