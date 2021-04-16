import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import {config} from '../../shared/config'
import {useState} from 'react';




// const LOG_IN ="LOG_IN";
const SET_USER ="SET_USER";
const LOG_OUT ="LOG_OUT";
const GET_USER ="GET_USER";

// const logIn = createAction(LOG_IN , (user) => ({user}));
const setUser = createAction(SET_USER,(user)=>({user}));
const logOut = createAction(LOG_OUT, (user) => ({user}));
const getUser = createAction(GET_USER, (user) => ({user}));

// user 로그인 정보를 전해주면 reducer에 등록하는 함수 
// const loginAction =(user)=>{                        
//   return function (dispatch, getState, {history}){
//     console.log(history);
//     dispatch(setUser(user));
//     history.push("/");      
//   }
// }


const initialState = {
  user: {
  },
  is_login: false,
};



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
                nickname: res.data[1].nickname
              }
              dispatch(setUser(user))
              history.push('/')
            })
      }).catch(error=>{
        console.log(error);
        window.alert("로그인 오류")
      })
  }
}


const signupSV = (id,password,nickname)=>{
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
        },
      })
      .then((response)=>{
        console.log(response);
        history.push("/login");
      }).catch(error=>{
        console.log(error);
        window.alert("회원가입 오류")
      })

      
  }
}



const loginCheck= (id,password) => {
  return function (dispatch, getState, {history}){
    axios.get(`${config.api}/user/`, config.token)
      .then((res) => {
        console.log(res.data)
        let user = {
          id: res.data[0].id,
          nickname: res.data[1].nickname
        }
        dispatch(setUser(user))
      })

  }
};


export default handleActions(
  {
    [SET_USER]: (state, action) => produce(state, (draft) => {
      //미들웨어를 쓰지 않으면  actionCreator에서는 다른 함수를 부르는 작업 등을 할 수 없으니 리듀서에 쿠키부르는 함수 임시로!
      // sessionStorage.setItem("is_login","success")
      draft.user = action.payload.user;
      draft.is_login = true;
    }),
    
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
      sessionStorage.removeItem("JWT"); 
      draft.user ={};
      draft.is_login = false;
    }),

    [GET_USER]: (state, action) =>produce(state, (draft)=>{

    })


  },
  initialState
)

const actionCreators = {
  setUser,
  logOut,
  getUser,
  signupSV,
  loginSV,
  loginCheck,

};

export {actionCreators};






