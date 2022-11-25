/* eslint-disable react/no-unknown-property */
import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {v4 as uuidv4} from 'uuid'
import Loader from 'react-loader-spinner'

import GetProfile from '../GetProfile'
import JobCard from '../JobCard'
import CheckFilters from '../CheckFilters'
import RadioFilters from '../RadioFilters'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noJobs: 'NOJOBS',
}

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

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeTypeId: '',
    searchInput: '',
    activeSalaryId: '',
    EList: [],
    pack: '',
    eType: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, EList, pack} = this.state
    const Listdata = [EList.map(E => [E.data.employmentTypeId])]
    const text = Listdata.join(',')
    const spell = searchInput.toLowerCase()
    console.log(text)
    const Token = Cookies.get('jwt_token')
    const search = `search=${spell}`
    const minimumPackage = `minimum_package=${pack}`
    const employmentType = `employment_type=${text}`
    const Url = `https://apis.ccbp.in/jobs?${employmentType}&${minimumPackage}&${search}`
    // const Url = `https://apis.ccbp.in/jobs?employment_type=${text}&minimum_package=${pack}&search=${searchInput}`
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
    if (data.jobs.length === 0) {
      console.log('noJobs')
      this.setState({apiStatus: apiStatusConstants.noJobs})
    }
  }

  onchangeSearch = e => {
    const spell = e.target.value
    this.setState({searchInput: spell})
  }

  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.getJobs()
      console.log('Hi')
      //   this.setState({searchInput: ''})
    }
  }

  onClickSearch = () => {
    // this.setState({searchInput: ''})
    this.getJobs()
  }

  onEmployeeClick = (id, value) => {
    const {EList} = this.state
    console.log(id)
    console.log(value)
    if (value) {
      const data = employmentTypesList.find(E => E.employmentTypeId === id)
      const Updata = {id: uuidv4(), data}
      this.setState(
        prevState => ({
          EList: [...prevState.EList, Updata],
        }),
        this.getJobs,
      )
    } else {
      const data = EList.filter(E => E.data.employmentTypeId !== id)
      this.setState({EList: data}, this.getJobs)
    }
  }

  onSalaryClick = packs => {
    this.setState({pack: packs}, this.getJobs)
  }

  renderSuccessView = () => {
    const {jobsList, searchInput} = this.state
    return (
      <ul className="JobCardList">
        {jobsList.map(E => (
          <JobCard job={E} key={E.id} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div className="Profile2" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="Failed">
      <div className="Failure">
        <img
          className="failImg"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="ParagraphFail">Oops! Something Went Wrong</h1>
        <p className="ParagraphFail2">
          We cannot seem to find the page you are looking for
        </p>
        <button type="button" className="Nav-btn" onClick={this.getJobs}>
          Retry
        </button>
      </div>
    </div>
  )

  renderNoJobsView = () => (
    <div className="Failed">
      <div className="Failure">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="failImg"
          alt="no jobs"
        />
        <h1 className="ParagraphFail">No Jobs Found</h1>
        <p className="ParagraphFail2">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.noJobs:
        return this.renderNoJobsView()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {jobsList, searchInput, apiStatus} = this.state
    return (
      <div className="Jobs-Con">
        <div className="LeftSide">
          <div className="SearchBar1">
            <input
              type="search"
              placeholder="Search"
              className="SearchIn"
              value={searchInput}
              onChange={this.onchangeSearch}
              onKeyDown={this.onKeyDown}
            />
            <button
              type="button"
              testid="searchButton"
              className="SearchBtn"
              onClick={this.onClickSearch}
            >
              <BsSearch className="SearchIcon" />
            </button>
          </div>
          <GetProfile />
          <div className="FilterContain">
            <hr className="line2" />
            <h1 className="Paragraph5">Type of Employment</h1>
            <div className="Checks">
              {employmentTypesList.map(E => (
                <CheckFilters
                  key={E.employmentTypeId}
                  Item={E}
                  onEmployeeClick={this.onEmployeeClick}
                />
              ))}
            </div>
            <hr className="line2" />
            <h1 className="Paragraph5">Salary Range</h1>
            <div className="Checks">
              {salaryRangesList.map(E => (
                <RadioFilters
                  key={E.salaryRangeId}
                  Item={E}
                  onSalaryClick={this.onSalaryClick}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="RightSide">
          <div className="SearchBar">
            <input
              type="search"
              placeholder="Search"
              className="SearchIn"
              value={searchInput}
              onChange={this.onchangeSearch}
              onKeyDown={this.onKeyDown}
            />
            <button
              type="button"
              testid="searchButton"
              className="SearchBtn"
              onClick={this.onClickSearch}
            >
              <BsSearch className="SearchIcon" />
            </button>
          </div>
          {this.renderSwitch()}
        </div>
      </div>
    )
  }
}

export default Jobs
