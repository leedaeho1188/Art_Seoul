import React from 'react';
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import {useState} from 'react';
import {actionCreators as userActions } from '../redux/modules/user';



//표현식도 사용
const Signup=()=> {

  const dispatch = useDispatch();

  const [id,setId] = React.useState(null)
  const [password,setPw] = React.useState(null)
  const [passwordc,setPwc] = React.useState(null)
  const [nickname,setName] = React.useState(null)
  
  const idCheck = (id) =>{
    let idReg = /^(?=.*[a-zA-z])(?=.*[0-9]).{3,20}$/g;
    return idReg.test(id);
  }
  
  const pwCheck = (password) => {
    let pwReg = /^(?=.*[a-zA-z0-9_]).{4,20}$/;
    return pwReg.test(password);
  }


  const signup=()=>{

    if(id===""||password===""||nickname===""){
      window.alert("모든 항목을 입력해주세요!")
      return;
    }
    
    if (password!== passwordc) {
      window.alert("비밀번호 설정을 다시 확인하세요!");
      return;
    }

    // if(!idCheck(id)){
    //   window.alert('아이디는 3자리 이상이어야하며, 영문 대/소문자 & 숫자 & _만 가능합니다!');
    //   return;
    // }

    // if(!pwCheck(password)){
    //   window.alert('비밀번호는 4자리 이상이어야하며, ID나 공백을 포함해서는 안됩니다');
    //   return;
    // }

    // if(password.search(id)>-1){
    //   window.alert("비밀번호에 아이디가 포함되었습니다")
    //   return;
    // }

    dispatch(userActions.signupSV(id,password,nickname))
  }

  return(
    <React.Fragment>
      <LoginContainer>
        <Title>ART SEOUL</Title>
        <IdBox onChange={(e)=>{setName(e.target.value)}} placeholder="닉네임을 입력해주세요"/>
        <IdBox onChange={(e)=>{setId(e.target.value)}} placeholder="아이디를 입력해주세요"/>
        <PwBox onChange={(e)=>{setPw(e.target.value)}} placeholder="비밀번호를 입력해주세요" type="password" />
        <PwBox onChange={(e)=>{setPwc(e.target.value)}} placeholder="비밀번호를 한번 더 입력해주세요" type="password" />
        <SignupButton onClick={()=>{signup()}}>회원가입</SignupButton>
      </LoginContainer>
    </React.Fragment>
  )

}
const LoginContainer = styled.div`
    margin:auto;
    width: 400px;
    height: 340px;
    background-color: white;
    border: 1px solid #e9ecef;
    margin-top:70px;    
    text-align: center;
`
const Title = styled.div`
   font-weight: bold;
   font-size: 25px;
   text-align: left;
   margin: 40px 0px 0px 20px;
  
`
const IdBox = styled.input`
    margin:auto;
    width: 350px;
    height: 20px;
    // background-color: #E8F0FE;
    margin-top: 30px;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid grey;
    border-radius: 1px;
    outline: none;
    font-size: 5px;
    font-weight: bold;
`

const PwBox = styled.input`
    margin:auto;
    width: 350px;
    height: 20px;
    // background-color: #E8F0FE;
    margin-top: 20px;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid grey;
    border-radius: 1px;
    outline: none;
    font-size: 5px;
    font-weight: bold;
`

const SignupButton = styled.button`
    width: 360px;
    height: 30px;
    background-color: yellow;
    margin-top: 40px;
    border: #FEE500;
    font-weight: bold;
    border-radius: 5px;
    outline: none;
    
`



export default Signup;
