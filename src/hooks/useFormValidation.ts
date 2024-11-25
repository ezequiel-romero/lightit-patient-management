import { useState, useCallback } from 'react'
import { userType } from '../types'

export const useFormValidation = (userDetails: userType) => {
  const [errors, setErrors] = useState({
    name: '',
    website: '',
    avatar: '',
    description: '',
  })

  const validateForm = useCallback(() => {
    const newErrors = {
      name: '',
      website: '',
      avatar: '',
      description: '',
    }
    let isValid = true

    if (!userDetails.name) {
      newErrors.name = 'Name is required'
      isValid = false
    }
    if (!userDetails.website) {
      newErrors.website = 'Website is required'
      isValid = false
    }
    if (!userDetails.avatar) {
      newErrors.avatar = 'Avatar URL is required'
      isValid = false
    }
    if (!userDetails.description) {
      newErrors.description = 'Description is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }, [userDetails])

  return { errors, validateForm }
}
