import React from 'react';
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import {actionCreators as userActions } from '../redux/modules/user';
import {history} from "../redux/configureStore";



//로그인 
const Login =(props)=> {

  const dispatch = useDispatch();
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
      <LoginBackground>
      <LoginContainer style={{padding: "10px 0px 0px 0px"}}>
        <Title>ART SEOUL</Title>
        <IdBox onChange={(e)=>{setId(e.target.value)}} placeholder="아이디를 입력해주세요"/>
        <p><PwBox onChange={(e)=>{setPw(e.target.value)}} placeholder="비밀번호를 입력해주세요" type="password"/></p>
        <p><SignupText onClick={()=>{history.push("/signup")}}><p>아직 회원가입을 하지 않으셨나요?</p> 회원가입 하러가기</SignupText></p>
        <LoginButton onClick={()=>{login()}}>로그인</LoginButton>
      </LoginContainer>
      </LoginBackground>
    </React.Fragment>
  )

}

const LoginBackground = styled.div`
top:0;
left:0;
background-image: url("https://images.unsplash.com/photo-1591723027220-66847f768065?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80");
width:100vw;
height:600px;;
background-size: cover;
padding-top: 150px;
`
//border로 조정한거라 나중에 수정..!
const LoginContainer = styled.div`
    margin: auto;
    width: 60%;
    height: 70%;
    background-color: #121212;
    border: 15px solid #121212;
    border-radius: 20px;  
    text-align: center;
    padding-bottom: 20px;
   
    
`
const Title = styled.div`
   font-weight: bold;
   font-size: 32px;
   text-align: left;
   margin: 20px 0px 20px 20px;
   color: white;
  
  
`
const IdBox = styled.input`
    margin:auto;
    width: 350px;
    height: 20px;
    background-color: #121212;
    margin-top: 50px;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid grey;
    border-radius: 1px;
    outline: none;
    font-size: 15px;
    font-weight: bold;
    &:hover{
      border-bottom: 1.5px solid white;
    };
    color: white;
    @media (max-width: 975px){
      width: 90%;
    }
`

const PwBox = styled.input`
    margin:auto;
    width: 350px;
    height: 20px;
    background-color: #121212;
    margin-top: 30px;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid grey;
    border-radius: 1px;
    outline: none;
    font-size: 15px;
    font-weight: bold;
    &:hover{
      border-bottom: 1.5px solid white;
    };
    color: white;
    @media (max-width: 975px){
      width: 90%;
    }
`
const SignupText = styled.button`
  font-size: 12px;
  text-align: center;
  margin-top: 40px;
  color: grey;
  border: none;
  outline: none;
  background-color: #121212;
  &:hover{
   color: white;
  };
  cursor: pointer;
  @media (max-width: 975px){
      width: 90%;
  }
`
const LoginButton = styled.button`
    width: 360px;
    height: 30px;
    background-color: #FFD700;
    margin-top: 10px;
    border: #FEE500;
    font-weight: bold;
    border-radius: 5px;
    outline: none;
    @media (max-width: 975px){
      width: 100%;
    }
    cursor: pointer;
    
    
`



export default Login;
