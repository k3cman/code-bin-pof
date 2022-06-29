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

    

    const [comments, setComments] = useState([{lineNo:3, comment: 'example'}, {lineNo:5, comment: 'example2'}]);

    const [codeFragments, setCodeFragments] = useState([])
  

    useEffect(() => {
        // Map items
        const codeChallengeArr = codeChallenge.split('\n');
        const lineNumbers = comments.map(one => one.lineNo);

        const result = [];
        let lastLine = 0;
        lineNumbers.forEach((line, index) => {
            result.push({
                code:codeChallengeArr.slice(lastLine, line).join('\n'),
                comment: comments[index].comment || undefined,
                commentIndex: index
            })
            lastLine = line;
        })
        result.push({
            code: codeChallengeArr.slice(lastLine, codeChallengeArr.length + 1).join('\n'),
            comment: undefined
        });

        setCodeFragments(result);
    }, [comments])


    const updateComment = (value, codeFragmentIndex) => {
        if(codeFragmentIndex){
            const commentState = comments;
            commentState[codeFragmentIndex].comment = value;

            setComments([...commentState])
        }
    }

    const getLineNumber = (fragmentIndex, lineNumber) => {
        const previousFragments = codeFragments.slice(0, fragmentIndex);
        const code = previousFragments.map(one => one.code);
        let lineNo = 0;
        code.forEach((item) => lineNo += item.split('\n').length)
        return lineNo + lineNumber;
    }

  return (
    <>
    {codeFragments.map((codeFragment, index) => {
       return ( <div key={index}>
            <SyntaxHighlighter language='typescript' style={atomOneDark}
            showInlineLineNumbers={true}
            wrapLines={true}
            showLineNumbers={true}
            lineProps={(lineNumber) => ({
                style: {cursor: 'pointer'},
                onClick(){
                    console.log(index)
                    setComments([...comments, {
                        lineNo: index === 0 ? lineNumber : getLineNumber(index, lineNumber),
                        comment: 'INSERT'
                    }])
                }
            })}
        >
            {codeFragment.code}
        </SyntaxHighlighter>
        <div className="comment">
            <Comment comment={codeFragment.comment} changed={(e) => updateComment(e, codeFragment.commentIndex)}/>
            </div>
        
        </div>) 
    })}
        
        
    </>
  )
}

export default Highighter