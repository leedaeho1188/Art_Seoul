import React from 'react'
import styled from 'styled-components'
import LockIcon from '@material-ui/icons/Lock';
import { useSelector } from 'react-redux';
import {useDispatch} from "react-redux"
import {actionCreators as userActions } from '../redux/modules/user'
import {history} from "../redux/configureStore";



const Header = () => {
    
    const dispatch = useDispatch();
    
//const [is_login, setIsLogin] = React.useState(false);
  
//해당 아이디가 있으면 로그인 상태가 변하면서 헤더가 변한다
//   React.useEffect(()=>{
//       let data = localStorage.getItem("hi")
//       console.log(data)
//       if(data){
//           setIsLogin(true)
//       }else{
//           setIsLogin(false)
//       }
//   })


const is_login = useSelector((state)=>state.user.is_login)

  if(is_login){
    return(
        <React.Fragment>
            <HeaderContainer>
                <HeaderInnerContainer>
                    <Title>ART SEOUL</Title> 
                    <HeaderIcons>
                    <Minibutton onClick={()=>{
                        // props.history.push("/login");
                        // localStorage.removeItem('hi')
                        dispatch(userActions.logOut());
                        history.push("/login") //어디로 보낼지 정해야한다
                    }}><Text>LOG OUT</Text></Minibutton>
                    <Minibutton><Text>MY PAGE</Text></Minibutton>
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

const Text = styled.div`
    color: white;
    font-size: 12px;
   
`
const Titlebutton = styled.button`
    background-color: black;
    border: none;
    &:hover{
        color: grey;
    };
`

const Minibutton = styled.button`
   background-color: black;
   border-color: white;
   width: 70px;
   padding: 4px 2px 4px 2px;
   border: none;
   margin: 12px;
`

//opacity 사용 나중에 해보기!
export default Header;
