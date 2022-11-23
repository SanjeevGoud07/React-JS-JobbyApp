import './index.css'

import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'

class Login extends Component {
  state = {username: '', password: '', isFailed: false, errMsg: ''}

  onUser = e => {
    this.setState({username: e.target.value})
  }

  onPass = e => {
    this.setState({password: e.target.value})
  }

  onSuccess = Token => {
    console.log(Token)
    const {history} = this.props
    Cookies.set('jwt_token', Token, {expires: 30, path: '/'})
    history.replace('/')
  }

  onFailed = msg => {
    this.setState({isFailed: true, errMsg: msg})
  }

  onSubmitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const Url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(Url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      console.log('Success')
      console.log(data)
      this.onSuccess(data.jwt_token)
    }
    if (response.status === 400) {
      console.log('Failed')
      this.onFailed(data.error_msg)
    }
  }

  render() {
    const {isFailed, errMsg} = this.state
    const Token = Cookies.get('jwt_token')
    if (Token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="Con">
        <div className="Login-Con">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="Logo"
          />
          <form onSubmit={this.onSubmitForm} className="Form">
            <label className="Label" htmlFor="User">
              USERNAME
            </label>
            <input
              className="login-Input"
              type="text"
              id="User"
              placeholder="Username"
              onChange={this.onUser}
            />
            <label className="Label" htmlFor="Pass">
              PASSWORD
            </label>
            <input
              id="Pass"
              placeholder="Password"
              className="login-Input"
              type="password"
              onChange={this.onPass}
            />
            <button type="submit" className="btn">
              Login
            </button>
            {isFailed && (
              <p className="error-msg">
                {/* *Username and Password didn&apos;t match */}
                {errMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
