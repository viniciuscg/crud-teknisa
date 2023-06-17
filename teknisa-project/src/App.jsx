import { useState } from 'react'

function App() {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')

  const [users, setUsers] = useState([])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (id) {
      const user = users.find(user => user.id == id)

      if (!user) return

      user.name = name
      user.cpf = cpf

      const updatedUsers = users.filter(user => user.id != id)
      updatedUsers.push(user)

      setUsers(updatedUsers)
      clearForm()
      return
    }

    const user = {
      id: users.length + 1,
      name,
      cpf
    }

    setUsers([...users, user])
    clearForm()
  }

  const deleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id != id)
    setUsers(updatedUsers)
  }

  const loadUser = (user) => {
    setId(user.id)
    setName(user.name)
    setCpf(user.cpf)
  }

  const clearForm = () => {
    setId('')
    setName('')
    setCpf('')
  }

  console.log('users', users)

  return (
    <div className='container'>
      <h1>Crud</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input type="text" placeholder='Id para alterar user' value={id} onChange={(e) => setId(e.target.value)} />
        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder='Cpf' value={cpf} onChange={(e) => setCpf(e.target.value)} />
        <button type="submit">Enviar</button>
      </form>
      {users.map((user) => (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Id: {user.id}</span>
          <span>Name: {user.name}</span>
          <span>CPF: {user.cpf}</span>
          <span>
            <button onClick={() => deleteUser(user.id)}>Excluir</button>
            <button onClick={() => loadUser(user)}>Alterar</button>
          </span>
          <span>--------------</span>
        </div>
      ))}
    </div>
  )
}

export default App
