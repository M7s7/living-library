const ToggleButton = ({ text, handleClick }) => {
  return (
    <button
      className="text-black hover:underline hover:text-secondary"
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default ToggleButton;