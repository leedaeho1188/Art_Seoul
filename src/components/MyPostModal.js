import React from "react";
import styled from "styled-components";

//해당 게시글에 대한 내용을 모달에 띄워야한다 + props로 이미지 내려주기(완) + 영역나눠주기!
const MyPostModal = (props) => {
  
    
  return(
    <React.Fragment>
      <Component onClick={props.close}/>
      <Modal>
        <ImageInModal {...props}/>
        <Text>nickname</Text>
        <Text>title</Text>
        <Text>content</Text>
      </Modal>
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
  background-image: url("${(props) => props.src}");
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
  export default MyPostModal;