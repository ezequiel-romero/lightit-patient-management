import { useState } from 'react'
import { userType } from '../types'

export const useModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [userSelected, setUserSelected] = useState<userType | undefined>(undefined)
  const [isNewUser, setIsNewUser] = useState(false)

  const openModal = (userId?: string, data?: userType[]) => {
    if (!userId) {
      setUserSelected({
        id: '',
        name: '',
        website: '',
        avatar: '',
        description: '',
        createdAt: '',
      })
      setIsNewUser(true)
    } else {
      const newUserSelected = data?.find((user) => user.id === userId)
      setUserSelected(newUserSelected)
      setIsNewUser(false)
    }
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return {
    modalIsOpen,
    userSelected,
    isNewUser,
    openModal,
    closeModal,
  }
}
