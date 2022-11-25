import './index.css'
import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="Not">
      <img
        className="NotImg"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="head">Page Not Found</h1>
      <p className="para">
        we're sorry, the page you requested could not be found.
      </p>
    </div>
  </>
)
export default NotFound
