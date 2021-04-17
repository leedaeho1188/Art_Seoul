import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components";
import {time} from '../shared/Time';
import PostUpdateModal from './PostUpdateModal';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PostWrite from './PostWrite'
import Upload from '../shared/Upload'

//해당 게시글에 대한 내용을 모달에 띄워야한다 + props로 이미지 내려주기(완) + 영역나눠주기!
const ProfileUpdateModal = (props) => {

    const [new_name, setChange] = useState()
    const [image, setImage] = useState()
    const user_info = useSelector((state)=>state.user.user);
    const preview = useSelector((state) => state.image.profile_preview)

    // const closeModal = () => {
    //     setDetailModal(false);
    //   };
      
    const changeProfile = (e)=>{
        setChange(e.target.value)
    };

    const editProfile = () =>{
        let edit={
            nickname : new_name,
            images :  image,
        }
        // dispatch (edit) 서버랑도 통신하면서 리듀서를 통해서 값 변경해주는!!
    }
    // console.log(user_info)
    // console.log(image)
    // console.log(new_name)


    console.log(user_info.profile)
  return( 
    <React.Fragment>
      <Component onClick={props.close}/>
      <Modal>

        <TextContainer>
        <UploadBox><Upload setImage={setImage}/></UploadBox>
        <ImageInModal src={preview ? preview : user_info.profile} size={200}/>

        </TextContainer>

        <TextContainer>
        <NicknameText > Current Nickname: {user_info.nickname}</NicknameText>
        <NewText >New Nickname :</NewText>
        <EditInput onChange={changeProfile} ></EditInput>
        <EditButton onClick={editProfile} >수정하기</EditButton>
        </TextContainer>
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
const ImageInModal = styled.img`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: var(--size);
    background-size: cover;
    margin: 4px;
    margin: 20px 0px 0px 30px;

`;

const UploadBox = styled.div`
  margin: 50px 0px 10px 30px;
`

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
  border-radius: 20px;
`


const TextContainer= styled.div`
   width: 300px;
   height: 402px;
   margin: 0px 20px 0px 10px;
  
   padding: 0px 0px 0px 0px;
   border-radius:20px;
`

const NewText = styled.div`
  color: black;
  font-weight: bold;
  font-size: 22px;
  padding: 40px 0px 0px 10px;

`
const NicknameText = styled.div`
    color: black;
    font-weight: bold;
    font-size: 22px;
    padding: 70px 0px 0px 10px;
    letter-spacing: -1px;

`

const EditInput = styled.input`
    width: 300px;
    height: 30px;
    margin: 10px 0px 0px 10px;
    border: 1px solid black;
`

const EditButton = styled.button`
  width: 300px;
  height: 50px;
  font-weight: bold;
  border: 2px solid black;
  background-color: white;
  font-size: 20px;
  margin: 80px 0px 0px 15px; 
  border-radius: 10px;
`

  export default ProfileUpdateModal;