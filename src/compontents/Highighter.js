import React, { useEffect, useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import Comment from './Comment';

const codeChallenge = 
`import { useState, useEffect } from 'react'
import axios from 'axios'

interface Message {
    fromId: string
    toId: string
    message: string
    date: Date
}

export const useChatData = (roomId: string) => {
    const [messages, setMessages] = useState<Message[]>([])
    useEffect(async () => {
    const res = await axios.get('/api/getMessages', { roomId })
    setMessages(res) // res.data
    }, [roomId])
    return {messages}
}`

const Highighter = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        
    }, [comments])


  return (
    <>
        <SyntaxHighlighter language='typescript' style={atomOneDark}
            showInlineLineNumbers={true}
            wrapLines={true}
            showLineNumbers={true}
            lineProps={(lineNumber) => ({
                style: {cursor: 'pointer'},
                onClick(){
                    setComments([...comments, {
                        lineNo: lineNumber,
                        comment: null
                    }])
                }
            })}
        >
            {codeChallenge}
        </SyntaxHighlighter>
        <Comment comment={'Example comment'}/>
    </>
  )
}

export default Highighter