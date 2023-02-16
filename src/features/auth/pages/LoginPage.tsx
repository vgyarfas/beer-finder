import { useNavigate } from 'react-router-dom'

import { LoginForm } from '../components/LoginForm'

export const LoginPage = () => {
  const navigate = useNavigate()

  const handleNavigate = () => navigate('/beers')

  return (
    <>
      <h1>Log in</h1>
      <LoginForm onSuccess={handleNavigate}/>
    </>
  )
}
