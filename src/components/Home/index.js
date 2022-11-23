import './index.css'
import {Link} from 'react-router-dom'

const Home = () => (
  <div className="Home-Con">
    <div className="Box">
      <h1 className="Home-heading">Find The Job That Fits Your Life</h1>
      <p className="Home-para">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="Home-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
