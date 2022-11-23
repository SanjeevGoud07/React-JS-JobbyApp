import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'

import GetProfile from '../GetProfile'
import JobCard from '../JobCard'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeTypeId: '',
    searchInput: '',
    activeSalaryId: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const Token = Cookies.get('jwt_token')
    const Url = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    const data = await response.json()
    console.log(response)
    // console.log(data)
    if (response.ok) {
      const formattedData = data.jobs.map(E => ({
        companyLogoUrl: E.company_logo_url,
        employmentType: E.employment_type,
        id: E.id,
        jobDescription: E.job_description,
        location: E.location,
        packagePerAnnum: E.package_per_annum,
        rating: E.rating,
        title: E.title,
      }))
      console.log(formattedData)
      this.setState({
        jobsList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {jobsList} = this.state
    return (
      <div className="Jobs-Con">
        <div className="LeftSide">
          <GetProfile />
        </div>
        <div className="RightSide">
          {jobsList.map(E => (
            <JobCard job={E} key={E.id} />
          ))}
        </div>
      </div>
    )
  }
}

export default Jobs
