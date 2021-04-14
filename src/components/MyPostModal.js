import React, {useState} from 'react';
import styled from "styled-components";
import {time} from '../shared/Time';
import PostUpdateModal from './PostUpdateModal';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

//해당 게시글에 대한 내용을 모달에 띄워야한다 + props로 이미지 내려주기(완) + 영역나눠주기!
const MyPostModal = (props) => {
  const [ is_modal, setModal ] = useState(false)
  const closeModal = () => {
    setModal(false)
  }
    console.log(props)
  return(
    <React.Fragment>
      <Component onClick={props.close}/>
      <Modal>
        <ImageInModal {...props}/>
        
        <TextContainer>
        <MoreHorizIcon height="14px" width="14px" cursor="pointer" 
        onClick={() => {setModal(true)
        }}/>
        <Text>{props.nickname}</Text>
        <Text><p>{props.title}</p></Text>
        <Text><p>{props.contents}</p></Text>
        <Text><p>{props.markername}</p></Text>
        <Text>{time(props.date)}</Text>
        </TextContainer>

      </Modal>
      {is_modal? <PostUpdateModal boardId={props.id} nickname = {props.nickname} close={closeModal} />
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
  width: 420px;
  height: 425px;
  border: none;
  background-image: url("${(props) => props.image_url}");
  background-size: cover;
  //짤리는거 보완

`;

const Modal = styled.div`
  position: fixed;
  width: 700px;
  height: 50%;
  top:50%;
  left: 50%;
  //메모..
  transform: translate(-50%, -50%);
  background-color: white;
  //다시..
  z-index: 20;
  display: flex;
`

const Text = styled.div`
    color: black;
    font-weight: bold;
    font-size: 20px;
`


const TextContainer = styled.div`
   
`
  export default MyPostModal;