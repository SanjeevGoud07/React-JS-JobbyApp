import './index.css'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {FaSuitcase} from 'react-icons/fa'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="Nav">
      <ul className="Mobile-Nav">
        <li>
          <Link className="link" to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="Nav-Logo"
            />
          </Link>
        </li>
        <li className="Middle-Nav">
          <Link className="link" to="/">
            {/* <p className="Nav-Para">Home</p> */}
            <AiFillHome className="Icon" />
          </Link>
          <Link className="link" to="/jobs">
            {/* <p className="Nav-Para">Jobs</p> */}
            <FaSuitcase className="Icon" />
          </Link>

          <FiLogOut className="Icon" onClick={onLogout} />
        </li>
      </ul>
      <ul className="Main-Nav">
        <li>
          <Link className="link" to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="Nav-Logo"
            />
          </Link>
        </li>
        <li className="Middle-Nav">
          <Link className="link" to="/">
            {' '}
            <p className="Nav-Para">Home</p>
          </Link>
          <Link className="link" to="/jobs">
            <p className="Nav-Para">Jobs</p>
          </Link>
        </li>
        <li>
          <button type="button" className="Nav-btn" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
