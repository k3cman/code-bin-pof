import React, { useState } from 'react'

function Comment({comment, changed}) {

  const [areaComment, setAreaComment] = useState('');
  console.log(comment)
  return (
    <>
     {comment === 'INSERT' ? (<textarea value={areaComment} onChange={(e) => {
      setAreaComment(e.target.value)
     }} /> ) : (<span>{comment}</span>)}
     <button onClick={() => changed(areaComment)}>Submit</button>
    </>
  )
}

export default Comment