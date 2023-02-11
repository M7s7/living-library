const Button = ({ handleClick, text }) => {
  return (
    <button
      className="w-24 px-2 py-1 rounded-full font-bold text-white bg-secondary hover:bg-red-600 font-medium text-sm text-center"
      onClick={handleClick}
    >
      {text}
    </button>
  )
}


export default Button;
