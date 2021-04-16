import React, {useState} from 'react';
import styled from "styled-components";
import {time} from '../shared/Time';
import PostUpdateModal from './PostUpdateModal';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PostWrite from './PostWrite'

//해당 게시글에 대한 내용을 모달에 띄워야한다 + props로 이미지 내려주기(완) + 영역나눠주기!
const MyPostModal = (props) => {

  const [ is_modal, setModal ] = useState(false)
  const [ is_writeModal, setWriteModal ] = useState(false)

  const closeModal = () => {
    setModal(false)
  }
  const openWriteModal = () => {
    setWriteModal(true)
  }
  const closeWriteModal = () => {
    setWriteModal(false)
  }
    
  return(
    <React.Fragment>
      <Component onClick={props.close}/>
      <Modal>
        <ImageInModal {...props}/>
        
        <TextContainer>
        <MoreHorizIcon style={{padding: "10px 0px 0px 180px"}} height="14px" width="14px" cursor="pointer" 
        onClick={() => {setModal(true)
        }}/>
        <NicknameText>{props.nickname}</NicknameText>
        <TitleText>{props.title}</TitleText>
        <ContentsText>{props.contents}</ContentsText>
        <StyleBox> 
        <PostPlace>{props.markername}</PostPlace>
        <InsertTime>{time(props.date)}</InsertTime>
        </StyleBox> 
        </TextContainer>
        

      </Modal>
      {is_modal? <PostUpdateModal boardId={props.id} nickname = {props.nickname} close={closeModal} open={openWriteModal} />
      :null}
      {is_writeModal? <PostWrite close={closeWriteModal} {...props} />
      :null}
    </React.Fragment>
  )
}

const Component = styled.div`
  position: fixed;
  // 시작점
  top: 0;
  left: 0;
  opacity: 0.6;
  height: 100vh;
  width: 100vw;
  background-color: black;
  z-index: 10;
`
const ImageInModal = styled.div`
  width: 65%;
  height: 100%;
  border: none;
  background-image: url("${(props) => props.image_url}");
  background-size: cover;
  //짤리는거 보완

`;

const Modal = styled.div`
  position: fixed;
  width: 700px;
  height: 400px;
  top:50%;
  left: 50%;
  //메모..
  transform: translate(-50%, -50%);
  background-color: white;
  //다시..
  z-index: 20;
  display: flex;
`

const NicknameText = styled.div`
    color: black;
    font-weight: bold;
    font-size: 20px;
    padding-bottom: 20px;
`
const TitleText = styled.div`
    color: black;
    font-weight: bold;
    font-size: 20px;
`
const ContentsText = styled.div`
    color: black;
    font-size: 15px;
`

const TextContainer= styled.div`
   width: 200px;
   height: 120px;
   margin-left: 20px;
`
const InsertTime = styled.div`
  font-size: 12px;
  color: #999;
`

const PostPlace = styled.div`
  font-size: 12px;
  color: #999
`

const StyleBox = styled.div`
   display: flex;
   justify-content: space-between;
   padding-top: 60px;
`


  export default MyPostModal;