import React, {useState} from 'react'
import styled from 'styled-components'

import LockIcon from '@material-ui/icons/Lock';
import SettingsIcon from '@material-ui/icons/Settings';

import { useSelector } from 'react-redux';
import {useDispatch} from "react-redux"
import {actionCreators as userActions } from '../redux/modules/user'
import {history} from "../redux/configureStore";

import About from './About'


const Header = () => {
    const dispatch = useDispatch();
    const is_login = useSelector((state)=>state.user.is_login)
    const user_info = useSelector((state) => state.user.user)
    const [is_about, setAbout] = useState(false)

    const closeAbout = () => {
        setAbout(false)
    }


    if(is_login){
    return(
        <React.Fragment>
            {is_about? 
            <About close={closeAbout} />
            :null}
            <HeaderContainer>
                <HeaderInnerContainer>
                    <Title onClick={()=>{history.push("/")}}>ART SEOUL</Title> 
                    <HeaderIcons>
                    <Minibutton onClick={() => {
                        setAbout(true)
                    }} >
                        <Text>About</Text>
                    </Minibutton>
                    <Minibutton onClick={() => {
                        history.push("/performance")
                    }} >
                        <Text>공연정보</Text>
                    </Minibutton>
                    <Minibutton onClick={()=>{dispatch(userActions.logOut());
                        history.push("/login")
                    }}><Text>LOG OUT</Text></Minibutton>
                    <ProCircle onClick={() => {history.push(`/userpage/${user_info.id}`)}} src={user_info.profile}  />
                    </HeaderIcons>
                </HeaderInnerContainer>
            </HeaderContainer>
        </React.Fragment>
      )
  } 

  return(
    <React.Fragment>
        <HeaderContainer>
            <HeaderInnerContainer>
                <Titlebutton onClick={()=>{history.push("/")}}><Title>ART SEOUL</Title></Titlebutton>
                <HeaderIcons>
                    <Minibutton onClick={() => {
                        history.push("/performance")
                    }} >
                        <Text>공연정보</Text>
                    </Minibutton>
                    <Minibutton onClick={()=>{history.push("/login")}}><Text>SIGN IN</Text></Minibutton>
                    <Minibutton onClick={()=>{history.push("/signup")}}><Text>SIGN UP</Text></Minibutton>
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
    margin-bottom:10px;
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
    display: flex;
    justify-content:space-between;
    align-items: center;
    color: white;
`

const Title = styled.div`
   color: white;
   font-weight: bold;
   font-size: 20px;
   &:hover{
       color: grey;
   };
   cursor: pointer;
  
`

const Text = styled.div`
    color: white;
    font-size: 13px;
    font-weight: 600;
   
`
const Titlebutton = styled.button`
    background-color: #121212;
    border: none;
    &:hover{
        color: grey;
    };
    cursor: pointer;
    outline: none;
`

const Minibutton = styled.div`
   border-color: white;
   padding: 4px 2px 4px 2px;
   border: none;
   margin: 6px;
   cursor: pointer;
   outline: white;
   align-self: center;
`

const ProCircle = styled.img`
  margin: 8px;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-size: cover;
  cursor: pointer;
`


//opacity 사용 나중에 해보기!
export default Header;
