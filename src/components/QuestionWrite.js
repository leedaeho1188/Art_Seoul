import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as questionActions } from "../redux/modules/question"

import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';

const QuestionWrite = (props) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState()
  const [contents, setContents] = useState()

  const addQuestion = () => {
    let question = {
      title: title,
      contents: contents,
    }
    console.log(question)
    dispatch(questionActions.addQuestionAX(question))
    props.close()

  }

  const changeTitle = (e) => {
    setTitle(e.target.value)
  }

  const changeContents = (e) => {
    setContents(e.target.value)
  }

  return(
    <React.Fragment>
      <WriteBackground onClick={props.close} />
      <WriteBox>
        <WriteContent>
          <WriteTitle>
            <TextField id="standard-basic"  label="📝질문 제목" style={{width: "100%"}} value={title} onChange={changeTitle} />
          </WriteTitle>
          <TextField
                id="outlined-multiline-static"
                label="📝질문 작성"
                multiline
                rows={6}
                variant="outlined"
                value={contents}
                onChange = {changeContents}
              />
          <WriteSubmit onClick={addQuestion}>
            질문 작성
          </WriteSubmit>
        </WriteContent>
      </WriteBox>
    </React.Fragment>
  )


}

const WriteBackground = styled.div`
  position: fixed;
  top: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 30;
`

const WriteBox = styled.div`
  position: absolute;
  z-index: 40;
  top: 55px;
  left: 50%;
  transform: translate(-50%);
  width: 614px;
  border: 1px solid #DBDBDB;
  border-radius: 3px;
  box-sizing: border-box;
  margin: auto;
  background: white;
  padding-bottom: 20px;
  @media (max-width: 614px){
    width: 100vw;
  }
`

const WriteHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 30px;
`

const WriteHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`

const PostAuthor = styled.div`
  font-size: 18px;
  font-weight: 600;
`

const WriteContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const WriteTitle = styled.div`
  width: 50%;
  margin-bottom: 30px;
  margin-left: 15px;
`
const WriteSubmit = styled.button`
  margin: auto;
  margin-top: 20px;
  text-align: center;
  font-weight: 600;
  background-color: #FFE812;
  color: black;
  padding: 8px 14px;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
  border: none;
`

export default QuestionWrite