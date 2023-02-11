const Input = ({ text, handleChange }) => {
  return (
    <div className="w-full">
    {text}
    <input 
      type="text" 
      onChange={handleChange}
      className="bg-slate-100 border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
    />
    </div>
  )
}


export default Input;