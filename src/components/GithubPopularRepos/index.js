import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const optionsActiveId = {
  failure: 'FAILURE',
  progress: 'PROGRESS',
  success: 'SUCCESS',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    repositoryItems: [],
    isActive: languageFiltersData[0].id,
    activeOption: optionsActiveId.failure,
  }

  componentDidMount() {
    this.getRepositoryItem()
  }

  setUpdate = active => {
    this.setState(
      {
        isActive: active,
      },
      this.getRepositoryItem,
    )
  }

  getRepositoryItem = async () => {
    this.setState({
      activeOption: optionsActiveId.progress,
    })
    const {isActive} = this.state
    const options = {
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/popular-repos?languages=ALL${isActive}`

    const response = await fetch(url, options)
    if (response.ok) {
      const Data = await response.json()
      const updatedData = Data.popular_repos.map(eachResponse => ({
        name: eachResponse.name,
        id: eachResponse.id,
        issuesCount: eachResponse.issues_count,
        forksCount: eachResponse.forks_count,

        starsCount: eachResponse.stars_count,
        avatarUrl: eachResponse.avatar_url,
      }))
      this.setState({
        repositoryItems: updatedData,
        activeOption: optionsActiveId.success,
      })
    } else {
      this.setState({
        activeOption: optionsActiveId.failure,
      })
    }
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderLoadingView = () => (
    <div className="loading">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {repositoryItems} = this.state

    return (
      <div className="bg-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="list-items-container">
          {languageFiltersData.map(eachData => (
            <LanguageFilterItem
              eachData={eachData}
              key={eachData.id}
              setUpdate={this.setUpdate}
            />
          ))}
        </ul>
        <ul className="repository-item-container">
          {repositoryItems.map(eachRepositoryItem => (
            <RepositoryItem
              eachRepositoryItem={eachRepositoryItem}
              key={eachRepositoryItem.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {activeOption} = this.state
    switch (activeOption) {
      case optionsActiveId.progress:
        return this.renderLoadingView
      case optionsActiveId.success:
        return this.renderSuccessView()
      case optionsActiveId.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }
}

export default GithubPopularRepos
