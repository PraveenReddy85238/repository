// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {eachRepositoryItem} = props
  const {
    name,
    id,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = eachRepositoryItem

  return (
    <li className="card-container">
      <div className="image-name-container">
        <img src={avatarUrl} className="avatar" alt={name} />
        <p className="name">{name}</p>
      </div>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="count">{starsCount}</p>
        <p className="description">Stars</p>
      </div>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="count">{forksCount}</p>
        <p className="description">Forks</p>
      </div>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="count">{issuesCount}</p>
        <p className="description">Forks</p>
      </div>
    </li>
  )
}

export default RepositoryItem
