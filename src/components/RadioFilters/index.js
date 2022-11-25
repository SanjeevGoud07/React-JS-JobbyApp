import './index.css'

const RadioFilters = props => {
  const {Item, onSalaryClick} = props
  const {salaryRangeId, label} = Item

  const onSalaryChange = e => {
    console.log(e.target.value)
    onSalaryClick(e.target.value)
  }

  return (
    <div className="CBox">
      <input
        type="radio"
        className="checkBox"
        id={salaryRangeId}
        name="salary"
        value={salaryRangeId}
        onChange={onSalaryChange}
      />
      <label className="Label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </div>
  )
}

export default RadioFilters
