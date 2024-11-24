import { useState, useEffect } from 'react'
import { userType } from '../types'

export const useFetchUsers = () => {
  const [data, setData] = useState<userType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://63bedcf7f5cfc0949b634fc8.mockapi.io/users')
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      })
  }, [])

  return { data, setData, isLoading }
}
