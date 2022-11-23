import './index.css'
import {Link} from 'react-router-dom'
// import {IoLocationSharp} from 'react-icons/io'
import {AiFillStar} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'

const JobCard = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = job
  return (
    <Link className="link" to={`/jobs/${id}`}>
      <div className="Job-Box">
        <div className="compLogoBox">
          <img src={companyLogoUrl} alt="job" className="comp-logo" />
          <div className="type-flex">
            <h1 className="compTitle">{title}</h1>
            <div className="ratingComp Comp">
              <AiFillStar className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="detailsRow">
          <div className="RowRow">
            <div className="Row">
              <AiFillStar className="smallIcons" />
              <p className="Paragraph">{location}</p>
            </div>
            <div className="Row">
              <FaSuitcase className="smallIcons" />
              <p className="Paragraph">{employmentType}</p>
            </div>
          </div>
          <div className="Row">
            <p className="Paragraph">{packagePerAnnum}</p>
            <p className="Paragraph2">LPA</p>
          </div>
        </div>
        <hr className="line" />
        <p className="Paragraph2">Description</p>
        <p className="Paragraph">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobCard
