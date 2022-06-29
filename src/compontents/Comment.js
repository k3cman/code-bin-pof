import React, { useState } from 'react'

import './Comment.css'

function Comment({ comment, changed }) {

  const [areaComment, setAreaComment] = useState('');
  console.log(comment)

  if (comment !== undefined) {
    return (
      <div class="single-comment text-gray-600 text-sm">
        {comment === 'INSERT' ? (
        <textarea 
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your message..."
        value={areaComment} onChange={(e) => {
          setAreaComment(e.target.value)
        }} />) : (<span>{comment}</span>)}
        {comment === 'INSERT' ? (
          <div className="flex justify-end mt-1">
            <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-1 px-4 rounded" onClick={() => changed(areaComment)}>Submit</button>
          </div>
          ) : null}
      </div>
    )
  }

  return null;
}

export default Comment