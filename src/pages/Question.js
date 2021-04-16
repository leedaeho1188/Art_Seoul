import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import QuestionWrite from '../components/QuestionWrite'

import {useDispatch ,useSelector} from 'react-redux'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const Setting =()=> {
  const is_login = useSelector((state) => state.user.is_login)
  const [ is_writeModal, setWriteModal ] = useState(false);

  const openWriteModal = () => {
    setWriteModal(true)
  }

  const closeWriteModal = () => {
    setWriteModal(false)
  }

  return(
    <React.Fragment>
    <Title> Q and A </Title>
    <QuestionList>
      <QuestionBox>
        <ProfileImg/>
        <QuestionRight>
          <QuestionTitle>My adsense account show error while I am enabling monetization on my channel My adsense account show error while I am enabling monetization on my channel</QuestionTitle>
          <QestionContents>I am not able to.monetize my channel step 2 sucks please help me I am not able to.monetize my channel step 2 sucks please help me</QestionContents>
        </QuestionRight>
      </QuestionBox>
    </QuestionList>
    {is_login? 
    <AddBtn>
      <Fab style={{background:'#FFE812'}} aria-label="add" variant="extended" onClick={() => {
          openWriteModal()
          window.scrollTo(0,0)
        }}>
          <AddIcon /><Word>질문추가</Word>
      </Fab>
    </AddBtn>
    : null}
    {is_writeModal? <QuestionWrite close={closeWriteModal} />
    : null}
    
    </React.Fragment>
  )

}

const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  margin-top:130px;
`
const Word = styled.span`
  font-weight: 600;
  @media (max-width:425px){
    display: none
  }
`
const AddBtn = styled.div`
  position: fixed;
  right: 30px;
  bottom: 100px;
  z-index: 10;
`

const QuestionList = styled.div`
  width: 900px;
  margin: auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
` 

const QuestionBox = styled.div`
  width: 100%;
  border: 1px solid #DBDBDB;
  border-radius: 5px;
  box-sizing: border-box;
  background: white;
  padding: 15px 25px;
  display: flex;
`

const ProfileImg = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-size: cover;
  margin-right: 10px;

`

const QuestionRight = styled.div`
  margin-left: 15px;
`

const QuestionTitle = styled.div`
  // display: inline;
  text-overflow: clip;
  overflow: hidden;
  // white-space: nowrap;

`

const QestionContents = styled.div`
  // display: inline;
  text-overflow: clip;  
  overflow: hidden;
  white-space: nowrap;

`

export default Setting;
