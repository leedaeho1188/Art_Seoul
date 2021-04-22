import React, {useState} from 'react';
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components";
import {time} from '../shared/Time';
import PostUpdateModal from './PostUpdateModal';
import {actionCreators as userActions} from "../redux/modules/user"
import {actionCreators as postActions} from "../redux/modules/post"
import Upload from '../shared/Upload'
import ProfileUpload from '../shared/ProfileUpload'

//해당 게시글에 대한 내용을 모달에 띄워야한다 + props로 이미지 내려주기(완) + 영역나눠주기!
const ProfileUpdateModal = (props) => {
    const dispatch = useDispatch()
    const [new_password, setChange] = useState()
    const [new_password_check, setChange2] = useState()
    
    const [image, setImage] = useState()
    const user_info = useSelector((state)=>state.user.user);
    const preview = useSelector((state) => state.image.profile_preview)
    console.log(props)
      
    const changePassword = (e)=>{
        setChange(e.target.value)
    };

    const changePasswordCheck = (e)=>{
        setChange2(e.target.value)
    };
    
    //표현식 추가!
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


    console.log(image) //하위컴포넌트에서 설정되어 올라온 이미지
    const editProfile = () =>{
        let data ={images :  image}
        console.log(data)
        dispatch(userActions.editMyImageAX(user_info,data))
        props.close()
    }
  return( 
    <React.Fragment>
      <Component onClick={props.close}/>
      <Modal>
       
        <TextContainer>
           {/* setImage={setImage} 하고 리덕스에 저장하면 그 데이터를 다시 useSelector로 불러온다 */}
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

// 설정을 처음에 제대로 잡는게 중요 Container설정과 분할 제대로(재사용성 UP)
const Component = styled.div`
  position: fixed;
  // 시작점
  top:0;
  opacity: 0.6;
  height: 1000vh;
  width: 1000vw;
  background-color: black;
  z-index: 10;
  @media (max-width: 376px){
   width: 100%;};
  
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
  @media (max-width: 376px){
    width:70%;
    height:70%;
    flex-wrap: wrap;
  };
  @media (max-width: 600px){
    align-items: center;
    text-align: center;
    width:37%;
    height:60%;
    flex-wrap: wrap;
  };
`


const TextContainer= styled.div`
   width: 300px;
   height: 402px;
   margin: 0px 20px 0px 10px;
  
   padding: 0px 0px 0px 0px;
   border-radius:20px;
   @media (max-width: 376px){
    width:100%;
   
  };
`

const NewText = styled.div`
  color: black;
  font-weight: bold;
  font-size: 12px;
  padding: 10px 0px 0px 10px;
  @media (max-width: 376px){
    width:100%;
   
  };

`
const NicknameText = styled.div`
    color: black;
    font-weight: bold;
    font-size: 22px;
    padding: 50px 0px 40px 10px;
    letter-spacing: -1px;
    @media (max-width: 376px){
      width:100%;
      padding:0px;
    };

`

const ButtonContainer = styled.div`
  margin-top:40px;
  @media (max-width: 376px){
    width:100%;
   
  };
`

const EditInput = styled.input`
    width: 300px;
    height: 20px;
    margin: 5px 0px 0px 10px;
    border: 1px solid black;
    @media (max-width: 376px){
      margin:0px;
     
    };
`

const EditButton = styled.button`
  width: 300px;
  height: 30px;
  font-weight: bold;
  border: 1px solid black;
  background-color: white;
  font-size: 13px;
  margin: 10px 0px 0px 15px; 
  border-radius: 10px;
  cursor: pointer;
  @media (max-width: 376px){
    width:100%;
    margin: 2px auto;
   
  };
`

  export default ProfileUpdateModal;