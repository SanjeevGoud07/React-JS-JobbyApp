import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

const ProtectedRoute = props => {
  const Token = Cookies.get('jwt_token')
  if (Token === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <Route {...props} />
    </>
  )
}

export default ProtectedRoute
