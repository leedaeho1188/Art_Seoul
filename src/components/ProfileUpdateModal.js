import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components";
import {time} from '../shared/Time';
import PostUpdateModal from './PostUpdateModal';
import {actionCreators as userActions} from "../redux/modules/user"
import {actionCreators as postActions} from "../redux/modules/post"
import Upload from '../shared/Upload'
import ProfileUpload from '../shared/ProfileUpload'

//프로필 수정하는 모달(프로필 이미지와 패스워드 수정이 가능하다)
const ProfileUpdateModal = (props) => {
    const dispatch = useDispatch()

    const [new_password, setChange] = useState()
    const [new_password_check, setChange2] = useState()
    const [image, setImage] = useState()
    
    const user_info = useSelector((state)=>state.user.user);
    const preview = useSelector((state) => state.image.profile_preview);
      
    const changePassword = (e)=>{
        setChange(e.target.value)
    };
    const changePasswordCheck = (e)=>{
        setChange2(e.target.value)
    };
    
    //비밀번호 변경도 마찬가지로 표현식검증을 사용한다
    const pwCheck = (new_password) => {
      let pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W)[a-zA-Z0-9].{4,}$/;
      return pwReg.test(new_password);
    }
    
    const editPassword =() =>{
   
      if(new_password==""||new_password_check==""){
        window.alert("모든 항목을 입력해주세요!")
        return;
      }
      if (new_password!== new_password_check) {
        window.alert("비밀번호와 비밀번호 확인이 동일하지 않습니다😅")
        return;
      }
      if(!pwCheck(new_password)){
        window.alert('비밀번호는 4자리 이상이며,  영문(대/소문자)와 숫자와 특수문자로 구성해야합니다😅');
        return;
      }
      if(new_password.search(user_info.id)>-1){
        window.alert("비밀번호에 아이디가 포함되었습니다😅")
        return;
      }
      if(new_password.search(/\s/) != -1){
        window.alert("비밀번호에 공백이 포함되었습니다😅");
        return;
      }
      else if(new_password==new_password_check){
        let data ={
        password : new_password
        }
        dispatch(userActions.editPasswordAX(user_info, data))
      }
    }


       //ProfileUpload에서 설정되어 올라온 이미지를 현재 유저정보와 함께 보낸다
      const editProfile = () =>{
          let data ={images :  image}
          // console.log(data)
          dispatch(userActions.editMyImageAX(user_info,data))
          props.close()
      }

    return( 
      <React.Fragment>
        <Component onClick={props.close}/>
        <Modal>
        
          <TextContainer>
          <UploadBox><ProfileUpload setImage={setImage}/></UploadBox> 
          <ImageInModal src={preview ? preview : user_info.profile} size={200}/>
          </TextContainer>

          <TextContainer>
          <NicknameText > Current Nickname: {user_info.nickname}</NicknameText>
          <NewText>New Password: </NewText>
          <EditInput type="password" onChange={changePassword}></EditInput>
          <NewText>New Password Check: </NewText>
          <EditInput type="password" onChange={changePasswordCheck}></EditInput>

          <ButtonContainer>
          <EditButton onClick={editPassword} >Change Password</EditButton>
          <EditButton onClick={editProfile} >Change My Profile Image</EditButton>
          </ButtonContainer>
          </TextContainer>
          
        </Modal>
      </React.Fragment>
    )
  }

const Component = styled.div`
  position: fixed;
  top:0;
  left: 0;
  opacity: 0.6;
  height: 1000vh;
  width: 1000vw;
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
  position: absolute;
  width: 700px;
  top:55px;
  left: 50%;
  transform: translate(-50%);
  background-color: white;
  z-index: 20;
  display: flex;
  border-radius: 20px;
  padding-bottom: 40px;
  @media (max-width: 700px){
    align-items: center;
    text-align: center;
    width:80%;
    flex-direction: column;
  };
`


const TextContainer= styled.div`
   width: 300px;
  //  height: 402px;
   margin: 0px 20px 0px 10px;
   padding: 0px 0px 0px 0px;
   border-radius:20px;
   @media (max-width: 700px){
    width: 80%;
  };
`

const NewText = styled.div`
  color: black;
  font-weight: bold;
  font-size: 12px;
  padding: 10px 0px 0px 10px;

`
const NicknameText = styled.div`
    color: black;
    font-weight: bold;
    font-size: 22px;
    padding: 50px 0px 40px 10px;
    letter-spacing: -1px;

`

const ButtonContainer = styled.div`
  margin-top:40px;
`

const EditInput = styled.input`
    width: 300px;
    box-sizing: border-box;
    border: 1px solid black;
    padding: 8px 8px;
    font-size: 17px;
    @media (max-width: 700px){
      width: 80%;
    };
`
const EditButton = styled.button`
  width: 300px;
  font-weight: bold;
  border: 1px solid black;
  background-color: white;
  font-size: 17px;
  padding: 8px 0;
  margin: 10px 0px 0px 0px; 
  border-radius: 10px;
  cursor: pointer;
  @media (max-width: 700px){
    width: 80%;
  };
`

  export default ProfileUpdateModal;