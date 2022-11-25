/* eslint-disable react/no-unknown-property */
import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {v4 as uuidv4} from 'uuid'

import GetProfile from '../GetProfile'
import JobCard from '../JobCard'
import CheckFilters from '../CheckFilters'
import RadioFilters from '../RadioFilters'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
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

  getJobs2 = async () => {
    const {searchInput} = this.state
    const Token = Cookies.get('jwt_token')
    const Url = `https://apis.ccbp.in/jobs`
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

  getJobs = async () => {
    const {searchInput, EList, pack} = this.state
    const Listdata = [EList.map(E => [E.data.employmentTypeId])]
    const text = Listdata.join(',')

    console.log(text)
    const Token = Cookies.get('jwt_token')
    const Url = `https://apis.ccbp.in/jobs?employment_type=${text}&minimum_package=${pack}&search=${searchInput}`
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

  onchangeSearch = e => {
    const spell = e.target.value
    this.setState({searchInput: spell.toLowerCase()})
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

  render() {
    const {jobsList, searchInput} = this.state
    return (
      <div className="Jobs-Con">
        <div className="LeftSide">
          <GetProfile />
          <div className="FilterCon">
            <hr className="line2" />
            <p className="Paragraph5">Type of Employment</p>
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
            <p className="Paragraph5">Salary Range</p>
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
              testid="search"
              className="SearchBtn"
              onClick={this.onClickSearch}
            >
              <BsSearch className="SearchIcon" />
            </button>
          </div>
          <ul className="JobCardList">
            {jobsList.map(E => (
              <JobCard job={E} key={E.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Jobs
