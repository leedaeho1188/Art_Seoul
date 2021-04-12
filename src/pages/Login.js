import React from 'react';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';
import {StylesProvider} from '@material-ui/styles';
import {useState} from 'react';
import {useDispatch} from "react-redux";
import {actionCreators as userActions } from '../redux/modules/user';
import {history} from "../redux/configureStore";




const Login =(props)=> {

  const dispatch = useDispatch();
  
  //Input값 받아오는 과정
  const [id,setId] = React.useState(null)
  const [password,setPw] = React.useState(null)

  //Local Storage 저장하는 역할에서! actioncreator를 dispatch해서 reducer에 전달하는 함수로 변화!
  const login = ()=> {
    if(id===""||password===""){
      window.alert("아이디 혹은 비밀번호를 입력해주세요!")
      return;
    }
    dispatch(userActions.loginSV(id,password));
  }

  return(
    <React.Fragment>
      <LoginContainer>
        <Title>ART SEOUL</Title>
        <IdBox onChange={(e)=>{setId(e.target.value)}} placeholder="아이디를 입력해주세요"/>
        <PwBox onChange={(e)=>{setPw(e.target.value)}} placeholder="비밀번호를 입력해주세요"/>
        <SignupText onClick={()=>{history.push("/signup")}}>아직 회원가입을 하지 않으셨나요?</SignupText>
        <LoginButton onClick={()=>{login()}}>로그인</LoginButton>
      </LoginContainer>
    </React.Fragment>
  )

}
const LoginContainer = styled.div`
    margin:auto;
    width: 400px;
    height: 300px;
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
    margin-top: 50px;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid grey;
    border-radius: 1px;
    outline: none;
    font-size: 5px;
    font-weight: bold;
    &:hover{
      border-bottom: 1.5px solid black;
    };
`

const PwBox = styled.input`
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
    &:hover{
      border-bottom: 1.5px solid black;
    };
`
const SignupText = styled.button`
   font-size: 2px;
   text-align: center;
   margin-top: 40px;
   color: grey;
   border: none;
   outline: none;
   background-color: white;
   &:hover{
    color: black;
    };
`
const LoginButton = styled.button`
    width: 360px;
    height: 30px;
    background-color: yellow;
    margin-top: 10px;
    border: #FEE500;
    font-weight: bold;
    border-radius: 5px;
    outline: none;
    
    
`



export default Login;
