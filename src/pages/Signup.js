import React from 'react'
import styled from 'styled-components'




const Signup=()=> {

  return(
    <React.Fragment>
      <LoginContainer>
        <Title>ART KOREA</Title>
        <IdBox placeholder="닉네임을 입력해주세요"/>
        <IdBox placeholder="아이디를 입력해주세요"/>
        <PwBox placeholder="비밀번호를 입력해주세요"/>
        <SignupButton>회원가입</SignupButton>
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
    margin-top: 50px;
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

const SignupButton = styled.button`
    width: 360px;
    height: 30px;
    background-color: yellow;
    margin-top: 20px;
    border: #FEE500;
    font-weight: bold;
    border-radius: 5px;
    outline: none;
    
`



export default Signup;
