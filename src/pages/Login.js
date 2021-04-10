import React from 'react'
import styled from 'styled-components'



const Login =()=> {

  return(
    <React.Fragment>
      <Title>로그인페이지입니다</Title>
    </React.Fragment>
  )

}

const Title = styled.div`
   font-weight: bold;
   font-size: 20px;
   text-align: center;
   margin-top:200px;
   &:hover{
       color: grey;
   };
`

export default Login;
