/* eslint-disable react/no-unused-state */
import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'

class JobDetails extends Component {
  state = {List: [], Aid: ''}

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
    console.log(response)
    const data = await response.json()
    console.log(data)
  }

  render() {
    const {Aid} = this.state
    return <div className="JobDetails-Con">Heelo {Aid}</div>
  }
}

export default JobDetails
