import './index.css'

const CheckFilters = props => {
  const {Item, onEmployeeClick} = props
  const {employmentTypeId, label} = Item
  //   let le = ''
  const clickEmployee = e => {
    if (e.target.checked === true) {
      console.log('Hi')
      onEmployeeClick(employmentTypeId, true)
    } else {
      console.log('bye')
      onEmployeeClick(employmentTypeId, false)
    }
  }

  return (
    <div className="CBox">
      <input
        type="checkbox"
        className="checkBox"
        id={employmentTypeId}
        onChange={clickEmployee}
      />
      <label className="Label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </div>
  )
}

export default CheckFilters
