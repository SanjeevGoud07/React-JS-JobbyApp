/* eslint-disable react/no-unknown-property */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {FaSuitcase, FaMapMarkerAlt} from 'react-icons/fa'
import {RiShareBoxFill} from 'react-icons/ri'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {Component} from 'react'

import SimilarJobs from '../SimilarJobs'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noJobs: 'NOJOBS',
}

class JobDetails extends Component {
  state = {
    List: [],
    Aid: '',
    skills: [],
    Life: [],
    SimList: [],
    apiStatus: '',
  }

  componentDidMount() {
    this.getJob()
  }

  getJob = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const Token = Cookies.get('jwt_token')
    const {match} = this.props
    // console.log(match)
    const {params} = match
    // console.log(params)
    const {id} = params
    // console.log(id)
    this.setState({Aid: id})
    const Url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      header: {
        Authorization: `Bearer ${Token}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const {job_details, similar_jobs} = data
      console.log(job_details)
      const jobDetails = {
        logo: job_details.company_logo_url,
        website: job_details.company_website_url,
        type: job_details.employment_type,
        id: job_details.id,
        desc: job_details.job_description,
        life: {
          lifeDesc: job_details.life_at_company.description,
          image: job_details.life_at_company.image_url,
        },
        location: job_details.location,
        package: job_details.package_per_annum,
        rating: job_details.rating,
        skills: job_details.skills.map(E => ({
          name: E.name,
          imageUrl: E.image_url,
        })),
        title: job_details.title,
      }
      const similarJobs = similar_jobs.map(E => ({
        companyLogoUrl: E.company_logo_url,
        employmentType: E.employment_type,
        id: E.id,
        jobDescription: E.job_description,
        location: E.location,
        rating: E.rating,
        title: E.title,
      }))
      console.log(jobDetails)
      console.log(jobDetails.skills)
      this.setState({
        List: jobDetails,
        Life: jobDetails.life,
        skills: jobDetails.skills,
        SimList: similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="Failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="ParagraphFail">Oops! Something Went Wrong</h1>
      <p className="ParagraphFail2">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="Nav-btn" onClick={this.getJob}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {Aid, List, skills, Life, SimList} = this.state
    return (
      <div className="details-Con" testid="loader">
        <div className="Job-Box2">
          <div className="compLogoBox">
            <img
              src={List.logo}
              alt="job details company logo"
              className="comp-logo"
            />
            <div className="type-flex">
              <h1 className="compTitle">{List.title}</h1>
              <div className="ratingComp Comp">
                <AiFillStar className="star" />
                <p className="rating">{List.rating}</p>
              </div>
            </div>
          </div>
          <div className="detailsRow">
            <div className="RowRow">
              <div className="Row">
                <FaMapMarkerAlt className="smallIcons" />
                <p className="Paragraph">{List.location}</p>
              </div>
              <div className="Row">
                <FaSuitcase className="smallIcons" />
                <p className="Paragraph">{List.type}</p>
              </div>
            </div>
            <div className="Row">
              <p className="Paragraph">{List.package}</p>
              <p className="Paragraph2">LPA</p>
            </div>
          </div>
          <hr className="line" />
          <div className="descRow">
            <h1 className="Paragraph3">Description</h1>

            <a href={List.website} className="site">
              Visit <RiShareBoxFill className="smallIcon" />
            </a>
          </div>
          <p className="Paragraph">{List.desc}</p>
          <h1 className="Paragraph3">Skills</h1>

          <ul className="ListBox">
            {skills.map(Each => (
              <li className="list-item" key={Each.name}>
                <img className="skillImg" src={Each.imageUrl} alt={Each.name} />
                <p className="Paragraph4">{Each.name}</p>
              </li>
            ))}
          </ul>
          <div className="LifeBox">
            <div className="LeftLife">
              <h1 className="Paragraph3">Life at Company</h1>
              <p className="Paragraph">{Life.lifeDesc}</p>
            </div>
            <img src={Life.image} alt="life at company" className="LifeImg" />
          </div>
        </div>
        <div className="SimBox">
          <h1 className="SimHead">Similar Jobs</h1>
          <ul className="Similar-List">
            {SimList.map(E => (
              <SimilarJobs key={E.id} Item={E} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div className="Profile2" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return this.renderSwitch()
  }
}

export default JobDetails
