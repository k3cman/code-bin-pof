import React from 'react'

function Comment({comment}) {
  return (
    <>
     {comment === null ? (<textarea /> ) : (<span>{comment}</span>)}
    </>
  )
}

export default Comment