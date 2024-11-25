import { useState, useEffect } from 'react'
import { userType } from '../types'
import { API_URL } from '../constants/API_URL'

export const useFetchUsers = () => {
  const [data, setData] = useState<userType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setError(error)
        setIsLoading(false)
      })
  }, [])

  return { data, setData, isLoading, error }
}
