const Button = ({ value, handleClick }) => (
  <button
    type="button"
    onClick={handleClick}
  >
    {value}
  </button>
)

export default Button;