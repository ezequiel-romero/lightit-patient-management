import { useCallback, useMemo } from 'react'
import Modal from 'react-modal'
import toast, { Toaster } from 'react-hot-toast'
import { FaCirclePlus } from 'react-icons/fa6'
import { userType } from './types'
import { Header, Main, Card, UserModal, Loader } from './components'
import { useFetchUsers, useModal } from './hooks'
import './App.css'

Modal.setAppElement('#root')

function App() {
  const { data, setData, isLoading, error } = useFetchUsers()
  const { modalIsOpen, userSelected, isNewUser, openModal, closeModal } = useModal()

  const updateUser = useCallback(
    (updatedUser: userType) => {
      setData((prevData) =>
        prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      )
      closeModal()
      toast.success('User updated successfully!')
    },
    [setData, closeModal],
  )

  const deleteUser = useCallback(
    (userId: string) => {
      setData((prevData) => prevData.filter((user) => user.id !== userId))
      closeModal()
      toast.success('User deleted successfully!')
    },
    [setData, closeModal],
  )

  const addUser = useCallback(
    (newUser: userType) => {
      setData((prevData) => [...prevData, newUser])
      closeModal()
      toast.success('User added successfully!')
    },
    [setData, closeModal],
  )

  const handleOpenModal = useCallback(
    (userId?: string) => {
      openModal(userId, data)
    },
    [openModal, data],
  )

  const userCards = useMemo(
    () =>
      data.map((user) => (
        <Card key={user.id} user={user} openModal={() => handleOpenModal(user.id)} />
      )),
    [data, handleOpenModal],
  )

  return (
    <>
      <Header />

      <Main>
        <div className="pageHeader">
          <h2>Users</h2>
          <button onClick={() => handleOpenModal()}>
            <FaCirclePlus size={30} />
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="error">Error fetching data.</div>
        ) : (
          <div className="usersContainer">{userCards}</div>
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
