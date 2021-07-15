import React from 'react'

const ErrorLineItem = (props) => {

  return (
    <div className='error-line-item' >
      <p className='error-mark'>x</p>
      <p>{props.primaryText} <strong><u> {props.fieldName}</u></strong></p>
    </div>
  )
}

export default ErrorLineItem