import { useState } from 'react'
import Modal from 'react-modal'
import { Header, Main, Card } from './components'
import './App.css'
import { userType } from './types'
import { UserModal } from './components/UserModal'
import toast, { Toaster } from 'react-hot-toast'
import { FaCirclePlus } from 'react-icons/fa6'
import { Loader } from './components/Loader'
import { useFetchUsers } from './hooks/useFetchUsers'

Modal.setAppElement('#root')

function App() {
  const { data, setData, isLoading } = useFetchUsers()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [userSelected, setUserSelected] = useState<userType | undefined>(undefined)
  const [isNewUser, setIsNewUser] = useState(false)
  function openModal(userId?: string) {
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
      setIsOpen(true)
    } else {
      const newUserSelected = data.find((user) => user.id === userId)
      setUserSelected(newUserSelected)
      setIsNewUser(false)
      setIsOpen(true)
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  function updateUser(updatedUser: userType) {
    setData((prevData) => prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    closeModal()
    toast.success('User updated successfully!')
  }

  function deleteUser(userId: string) {
    setData((prevData) => prevData.filter((user) => user.id !== userId))
    closeModal()
    toast.success('User deleted successfully!')
  }

  function addUser(newUser: userType) {
    setData((prevData) => [...prevData, newUser])
    closeModal()
    toast.success('User added successfully!')
  }

  return (
    <>
      <Header />
      <Main>
        <div className="pageHeader">
          <h2>Users</h2>
          <button onClick={() => openModal()}>
            <FaCirclePlus size={30} />
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="usersContainer">
            {data.map((user) => {
              return <Card key={user.id} user={user} openModal={() => openModal(user.id)} />
            })}
          </div>
        )}
      </Main>

      <Toaster position="top-right" />

      {userSelected && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="User Information"
          style={{ content: { padding: '50px' } }}
        >
          <UserModal
            userSelected={userSelected}
            updateUser={updateUser}
            deleteUser={deleteUser}
            closeModal={closeModal}
            addUser={addUser}
            isNewUser={isNewUser}
          />
        </Modal>
      )}
    </>
  )
}

export default App
