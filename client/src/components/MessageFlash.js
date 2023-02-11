const MessageFlash = ({ Message, isError }) => {
  if (Message === "") {
    return <></>
  }
  return (
    <div>
      {Message && 
        isError
        ? <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
            {Message}
          </div>
        : <div className="p-3 mb-4 text-sm text-green-800 rounded-lg bg-green-50">
            {Message}
          </div>
      }
    </div>
  )
}


export default MessageFlash;