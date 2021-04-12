import React from 'react';
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import {useState} from 'react';
import {actionCreators as userActions } from '../redux/modules/user';



//표현식도 사용
const Signup=()=> {

  const dispatch = useDispatch();

  const [id,setId] = React.useState(null)
  const [pw,setPw] = React.useState(null)
  const [pwc,setPwc] = React.useState(null)
  const [user_name,setName] = React.useState(null)
  
  //위치 고려해서 넣을 것(영문 숫자 특수문자 1자리 이상이면서 4자에서 16자리 사이 통과)
  const pwCheck = (pw) => {
    let _reg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{4,16}$/;
    return _reg.test(pw);
  }

  const signup=()=>{

    if(id===""||pw===""||user_name===""){
      window.alert("모든 항목을 입력해주세요!")
      return;
    }
    
    if (pw!== pwc) {
      window.alert("비밀번호 설정을 다시 확인하세요!");
      return;
    }

    if(!pwCheck(pw)){
      window.alert('비밀번호는 숫자/영문/특수문자를 포함한 4자이상 16자이하로 구성되어야합니다!');
      return;
    }

    dispatch(userActions.signupSV(id,pw,user_name))
  }

  return(
    <React.Fragment>
      <LoginContainer>
        <Title>ART SEOUL</Title>
        <IdBox onChange={(e)=>{setName(e.target.value)}} placeholder="닉네임을 입력해주세요"/>
        <IdBox onChange={(e)=>{setId(e.target.value)}} placeholder="아이디를 입력해주세요"/>
        <PwBox onChange={(e)=>{setPw(e.target.value)}} placeholder="비밀번호를 입력해주세요"/>
        <PwBox onChange={(e)=>{setPwc(e.target.value)}} placeholder="비밀번호를 한번 더 입력해주세요"/>
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
