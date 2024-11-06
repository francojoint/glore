import { type PropsWithChildren } from 'react'

const Template = ({ children }: PropsWithChildren) => {
  const title = 'Hello, Template Page!'

  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}

export default Template
