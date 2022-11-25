/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {FaSuitcase, FaMapMarkerAlt} from 'react-icons/fa'
import {RiShareBoxFill} from 'react-icons/ri'

import Cookies from 'js-cookie'

import {Component} from 'react'

import SimilarJobs from '../SimilarJobs'

class JobDetails extends Component {
  state = {List: [], Aid: '', skills: [], Life: [], SimList: []}

  componentDidMount() {
    this.getJob()
  }

  getJob = async () => {
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
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    // console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
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
      })
    }
  }

  render() {
    const {Aid, List, skills, Life, SimList} = this.state
    return (
      <div className="details-Con">
        <div className="Job-Box2">
          <div className="compLogoBox">
            <img src={List.logo} alt="job" className="comp-logo" />
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
            <p className="Paragraph3">Description</p>

            <a href={List.website} className="site">
              Visit <RiShareBoxFill className="smallIcon" />
            </a>
          </div>
          <p className="Paragraph">{List.desc}</p>
          <p className="Paragraph3">Skills</p>

          <ul className="ListBox">
            {skills.map(Each => (
              <li className="list-item">
                <img className="skillImg" src={Each.imageUrl} alt={Each.name} />
                <p className="Paragraph4">{Each.name}</p>
              </li>
            ))}
          </ul>
          <div className="LifeBox">
            <div className="LeftLife">
              <p className="Paragraph3">Life at Company</p>
              <p className="Paragraph">{Life.lifeDesc}</p>
            </div>
            <img src={Life.image} alt={List.title} className="LifeImg" />
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
}

export default JobDetails
