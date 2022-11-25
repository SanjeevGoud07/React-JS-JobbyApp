import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {FaSuitcase, FaMapMarkerAlt} from 'react-icons/fa'

const SimilarJobs = props => {
  const {Item} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = Item
  return (
    <li className="similar-card">
      <div className="compLogoBox">
        <img src={companyLogoUrl} alt="job" className="comp-logo" />
        <div className="type-flex">
          <h1 className="compTitle2">{title}</h1>
          <div className="ratingComp Comp">
            <AiFillStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>

      <p className="Paragraph3">Description</p>
      <p className="Paragraph">{jobDescription}</p>
      <div className="detailsRow">
        <div className="RowRow">
          <div className="Row">
            <FaMapMarkerAlt className="smallIcons" />
            <p className="Paragraph">{location}</p>
          </div>
          <div className="Row">
            <FaSuitcase className="smallIcons" />
            <p className="Paragraph">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
