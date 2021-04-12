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


// const is_login = useSelector((state)=>state.user.is_login) // 사용
const is_session = sessionStorage.getItem("JWT") ? true: false;    //..?

 // 버튼 누르면 로그아웃 상태가 되고 어디로 보낼지 생각해둘 것
  if( is_session){
    return(
        <React.Fragment>
            <HeaderContainer>
                <HeaderInnerContainer>
                    <Title>ART SEOUL</Title>
                    <HeaderIcons>
                    <button onClick={()=>{
                        // props.history.push("/login");
                        // localStorage.removeItem('hi')
                        dispatch(userActions.logoutSV());
                    }}>LOG OUT</button>
                    <button>MY PAGE</button>
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
                <Title>ART SEOUL</Title>
                <HeaderIcons>
                <button onClick={()=>{history.push("/login")}}>LOG IN</button>
                <button onClick={()=>{history.push("/signup")}}>SIGN UP</button>
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
export default Header;
