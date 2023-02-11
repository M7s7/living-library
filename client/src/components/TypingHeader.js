import { TypeAnimation } from 'react-type-animation';

const TypingHeader = () => {
  return (
    <TypeAnimation
      sequence={[
        "Living library.",
        2000,
        "Begin your reading journey.",
        2000,
        "Explore the archive.",
        2000
      ]}
      wrapper="h1"
      cursor={true}
      repeat={Infinity}
      className="text-4xl font-bold leading-tight tracking-tight"
    />
  )
}

export default TypingHeader;