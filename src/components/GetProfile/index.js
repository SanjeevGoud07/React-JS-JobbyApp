import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'

const Status = {
  Loading: 'LOADING',
  Success: 'SUCCESS',
  Initial: 'INITIAL',
  Failed: 'FAILED',
}

class GetProfile extends Component {
  state = {
    data: [],
    apiStatus: Status.Initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: Status.Loading})
    const Token = Cookies.get('jwt_token')
    const Url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      method: 'GET',
    }
    const response = await fetch(Url, options)
    const data = await response.json()
    // console.log(response)
    // console.log(response.status)
    // console.log(data)
    if (response.ok) {
      const details = data.profile_details
      const formattedData = {
        name: details.name,
        profileImageUrl: details.profile_image_url,
        shortBio: details.short_bio,
      }
      console.log(formattedData)
      this.setState({
        data: formattedData,
        apiStatus: Status.Success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: Status.Failed})
    }
    if (response.status === 400) {
      this.setState({apiStatus: Status.Failed})
    }
    if (response.status === 404) {
      this.setState({apiStatus: Status.Failed})
    }
  }

  renderLoading = () => (
    <div className="Profile2">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {data} = this.state
    return (
      <div className="Profile">
        <img src={data.profileImageUrl} alt={data.name} />
        <h1 className="profile-head">{data.name}</h1>
        <p className="profile-para">{data.shortBio}</p>
      </div>
    )
  }

  renderFailedView = () => (
    <div className="Profile2">
      <button type="button" className="Nav-btn" onClick={this.getProfile()}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case Status.Success:
        return this.renderProfile()
      case Status.Failed:
        return this.renderFailedView()
      case Status.Loading:
        return this.renderLoading()
      default:
        return null
    }
  }
}

export default GetProfile
