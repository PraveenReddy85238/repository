// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {eachData, setUpdate} = props
  const {id, language} = eachData
  const onClickUpdate = () => setUpdate(id)
  return (
    <li className="list-items">
      <button className="btn" type="button" onClick={onClickUpdate}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
