import { useCallback, useEffect, useState } from 'react'
import { useFormValidation } from '../hooks'
import { Button, Input, TextArea } from '.'
import { userType } from '../types'
import { FaCircleXmark, FaRegTrashCan } from 'react-icons/fa6'
import { v4 as uuidv4 } from 'uuid'

type UserModalProps = {
  userSelected: userType
  updateUser: (updatedUser: userType) => void
  deleteUser: (userId: string) => void
  addUser: (newUser: userType) => void
  isNewUser: boolean
  closeModal: () => void
}

export const UserModal = ({
  userSelected,
  updateUser,
  deleteUser,
  addUser,
  isNewUser,
  closeModal,
}: UserModalProps) => {
  const [hasChanged, setHasChanged] = useState(false)
  const [userDetails, setUserDetails] = useState({
    id: userSelected.id,
    name: userSelected.name,
    website: userSelected.website,
    avatar: userSelected.avatar,
    description: userSelected.description,
    createdAt: userSelected.createdAt,
  })
  const { errors, validateForm } = useFormValidation(userDetails)

  useEffect(() => {
    setUserDetails({
      id: userSelected.id,
      name: userSelected.name,
      website: userSelected.website,
      avatar: userSelected.avatar,
      description: userSelected.description,
      createdAt: userSelected.createdAt,
    })
  }, [userSelected])

  const handleChange = useCallback(
    (propName: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [propName]: e.target.value,
      }))
      setHasChanged(true)
    },
    [],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (validateForm()) {
        if (isNewUser) {
          addUser({ ...userDetails, id: uuidv4(), createdAt: new Date().toISOString() })
        } else {
          updateUser({ ...userSelected, ...userDetails })
        }
      }
    },
    [userDetails, userSelected, isNewUser, validateForm, addUser, updateUser],
  )

  return (
    <>
      <div className="headerModal">
        <h2>User Information</h2>
        <div className="headerModalActions">
          <button onClick={() => deleteUser(userDetails.id)}>
            <FaRegTrashCan size={25} />
          </button>
          <button onClick={closeModal}>
            <FaCircleXmark size={30} />
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <img
          className="modalAvatar"
          src={userDetails.avatar}
          alt={userDetails.name}
          onError={(e) => {
            e.currentTarget.src = '/user-placeholder.svg'
          }}
        />
        <Input
          name="name"
          label="User name"
          value={userDetails.name}
          onChange={(e) => handleChange('name', e)}
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <Input
          name="website"
          label="User website"
          value={userDetails.website}
          onChange={(e) => handleChange('website', e)}
        />
        {errors.website && <p className="error">{errors.website}</p>}
        <Input
          name="avatar"
          label="User avatar"
          value={userDetails.avatar}
          onChange={(e) => handleChange('avatar', e)}
        />
        {errors.avatar && <p className="error">{errors.avatar}</p>}
        <TextArea
          name="description"
          label="User description"
          value={userDetails.description}
          onChange={(e) => handleChange('description', e)}
        />
        {errors.description && <p className="error">{errors.description}</p>}
        <Button text="Save" type="submit" size="large" disabled={!hasChanged} />
      </form>
    </>
  )
}
