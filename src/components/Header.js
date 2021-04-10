import React from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'



const Header = (props) => {
  return(
    <React.Fragment>
        <HeaderContainer>
            <HeaderInnerContainer>
                <Title>ART SEOUL</Title>
                <HeaderIcons>
                <button onClick={()=>{props.history.push("/login")}}>LOGIN</button>
                <button>LOGOUT</button>
                </HeaderIcons>
            </HeaderInnerContainer>
        </HeaderContainer>
    </React.Fragment>
  )

}


const HeaderContainer = styled.div`
    position: fixed;
    width: 100vw;
    height: 55px;
    background-color: black;
    border: none;
    border-bottom: 1px solid #e9ecef
    left:0;
    top:0;
    z-index:10;
    margine-bottom:0px;
`

const HeaderInnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:auto;
    width: 940px;
    height: 100%;
    padding: 0 20px 0 20px;
    box-sizing: border-box;
    @media (max-width: 975px){
        width: 100%;
      }
`

const HeaderIcons = styled.div`
    width: 140px;
    display: flex;
    justify-content:space-between;
`

const Title = styled.div`
   color: white;
   font-weight: bold;
   font-size: 20px;
   &:hover{
       color: grey;
   };
`
//opacity 사용 나중에 해보기!
export default withRouter(Header);
