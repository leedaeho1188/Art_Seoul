import React from 'react'

import styled from 'styled-components'

import CloseIcon from '@material-ui/icons/Close';

import {useDispatch} from 'react-redux'
import {actionCreators as postActions} from '../redux/modules/post'

const PostUpdateModal = (props) => {
  console.log(props)
  const dispatch = useDispatch()
  const openAndClose = () => {
    //동기처리 + 콜백함수?
    props.open()
    props.close()
  }
  return(

    <React.Fragment>
      <Component onClick={props.close} />
      <UpdateComponent>
        <ModalExitBtn onClick={props.close}>
          <CloseIcon/>
        </ModalExitBtn>
        <ModalHeader>
          {props.nickname} <ModalHeaderSpan>님의 게시글</ModalHeaderSpan>
        </ModalHeader>
        <ModalButtonContainer>
          <ModalSubmitBtn onClick={openAndClose}>
            수정하기
          </ModalSubmitBtn>
          <ModalSubmitBtn onClick={() => {
            dispatch(postActions.removePostAX(props.boardId))
            dispatch(postActions.removeMyPostAX(props.boardId))
          }} >
            삭제하기
          </ModalSubmitBtn>
        </ModalButtonContainer>
      </UpdateComponent>
    </React.Fragment>

  )

}

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.4;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 30;
`

const UpdateComponent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 300px;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 40;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const ModalHeader = styled.div`
  margin-top: 30px;
  font-weight: 600;
  font-size: 18px;
`
const ModalHeaderSpan = styled.span`
  color: #999;
  font-size: 17px;
`

const ModalButtonContainer = styled.div`
  box-sizing: border-box; 
  width: 50%;
  margin-bottom: 30px;
`
const ModalSubmitBtn = styled.button`
  width: 100%;
  background-color: #FFE812;
  border: none;
  outline: none;
  padding: 10px 0;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  border-radius: 4px;
  &:hover {
    opacity: 0.7;
  }
  margin-bottom: 20px;
`
const ModalExitBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px 12px;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  border: none;
  color: black;
`

export default PostUpdateModal