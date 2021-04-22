import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import {config} from '../../shared/config'
import {useState} from 'react';




// const LOG_IN ="LOG_IN";
const SET_USER ="SET_USER";
const LOG_OUT ="LOG_OUT";
const EDIT_MY_IMAGE ="EDIT_MY_IMAGE";


// const logIn = createAction(LOG_IN , (user) => ({user}));
const setUser = createAction(SET_USER,(user)=>({user}));
const logOut = createAction(LOG_OUT, (user) => ({user}));
const editMyImage  = createAction(EDIT_MY_IMAGE, (post, post_id) => ({post, post_id})) 




const initialState = {
  user: {
  },
  is_login: false,
};


//로그인 정보를 보내주면 토큰을 받는다
const loginSV = (id,password)=>{                        
  
  return function (dispatch, getState, {history}){
    console.log(id, password)
    axios(
      {
        method: 'POST',
        headers: {
        },
        url:"http://13.125.250.74/user/login",  
        data:{
          id : id,
          password : password,
        },
      })
      .then((response)=>{
        sessionStorage.setItem("JWT", response.data.result.user.token)
        let token = {
          headers : { authorization: `Bearer ${response.data.result.user.token}`}
        }
        axios.get(`${config.api}/user/`, token)
            .then((res) => {
              console.log(res.data)
              let user = {
                id: res.data[0].id,
                nickname: res.data[1].nickname,
                profile: res.data[2].profile,
              }
              dispatch(setUser(user))
              history.push('/')
            })
      }).catch(error=>{
        console.log(error);
        window.alert("이런! 아이디 혹은 패스워드를 체크해주세요😅")
      })
  }
}


const signupSV = (id,password,nickname,email)=>{
  return function (dispatch, getState, {history}){
    axios(
      {
        method: 'POST',
        headers: {
        },
        url:"http://13.125.250.74/user/register",
        data:{
          id : id,
          password : password,
          nickname: nickname,
          email: email,
        },
      })
      .then((response)=>{
        console.log(response);
        window.alert("ART SEOUL 회원가입을 축하드립니다🎉")
        history.push("/login");
      }).catch((error)=>{
        console.log(error);
        window.alert("이런! 해당 아이디가 이미 존재합니다😅")
      })

      
  }
}


//토큰을 보내주면 로그인 정보를 받아온다
const loginCheck= (id,password) => {
  return function (dispatch, getState, {history}){
    axios.get(`${config.api}/user/`, config.token)
      .then((res) => {
        console.log(res.data)
        let user = {
          id: res.data[0].id,
          nickname: res.data[1].nickname,
          profile: res.data[2].profile,
        }
        dispatch(setUser(user))
      })

  }
};


const editPasswordAX= (user,data) => {
  console.log(data)
  
  let token = {
    headers : { authorization: `Bearer ${sessionStorage.getItem("JWT")}`}
  }
  return function (dispatch, getState, {history}){
    axios.post(`${config.api}/user/newpassword`,{newpassword : data.password}, token)
      .then((res) => {
        console.log(res.status)
        if(res.request.status==200){
          window.alert("비밀번호 변경이 완료되었습니다🎉");
          //받아온 user정보로!!
          dispatch(logOut(user));
          history.push("/login")
          
      
        }
      }).catch((err)=>{
        console.log(err)
      })
  }
}



const editMyImageAX = (user_info,data) => {
  return function (dispatch, getState, {history}){
 
      console.log(data)
      const formData = new FormData();
      formData.append("images", data.images);
      let token = {
        headers: { authorization: `Bearer ${sessionStorage.getItem('JWT')}`}
      }
      
      // .data.boardsData[0].img
      axios.post(`${config.api}/setting/user`, formData, token )
        .then((response) => {
           
          if(response.request.status==200){
            window.alert("프로필 이미지 변경이 완료되었습니다🎉");
            console.log(response.data.result)
            let user = {
              id: user_info.id,
              nickname : user_info.nickname,
              profile: response.data.result,
            }    
            dispatch(setUser(user))   
               
          }
         
        }).catch((err) => {
          console.log(err)
        })
        
    }
  }


export default handleActions(
  {
    [SET_USER]: (state, action) => produce(state, (draft) => {
      draft.user = action.payload.user;
      draft.is_login = true;
    }),
    
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
      sessionStorage.removeItem("JWT"); 
      draft.user ={};
      draft.is_login = false;
    }),

    // [EDIT_MY_IMAGE]: (state,action)=>produce(state,(draft)=>{

    // }),
  },
  initialState
)

const actionCreators = {
  setUser,
  logOut,
  signupSV,
  loginSV,
  loginCheck,
  editPasswordAX,
  // editMyImage,
  editMyImageAX,
};

export {actionCreators};






