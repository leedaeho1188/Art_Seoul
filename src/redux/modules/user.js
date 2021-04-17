import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import {config} from '../../shared/config'
import {useState} from 'react';




// const LOG_IN ="LOG_IN";
const SET_USER ="SET_USER";
const LOG_OUT ="LOG_OUT";
const EDIT_PROFILE ="EDIT_PROFILE";

// const logIn = createAction(LOG_IN , (user) => ({user}));
const setUser = createAction(SET_USER,(user)=>({user}));
const logOut = createAction(LOG_OUT, (user) => ({user}));
const editProfile = createAction(EDIT_PROFILE, (post, post_id) => ({post, post_id})) 

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
        window.alert("ART SEOUL 회원가입을 축하드립니다🎉")
        history.push("/login");
      }).catch(error=>{
        console.log(error);
        window.alert("이런! 해당 아이디가 이미 존재합니다😅")
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
          nickname: res.data[1].nickname,
          profile: res.data[2].profile,
        }
        dispatch(setUser(user))
      })

  }
};

// 전달하고 받아오는!! (token images nickname 전달하고 / status images 받아온다)
// const editProfileAX = (post, boardId) => {
//   return function (dispatch, getState){
//     const _image = getState().image.preview;
//     const _post_idx = getState().post.list.findIndex((p) => p.id == boardId);
//     const _post = getState().post.list[_post_idx]

//     if(_image == _post.image_url){
//       const formData = new FormData();
//       formData.append("title", post.title);
//       formData.append("contents", post.contents);
//       let token = {
//         headers: { authorization: `Bearer ${sessionStorage.getItem('JWT')}`}
//       }
//       console.log(post)
//       axios.put(`${config.api}/board/${boardId}`, formData, token )
//         .then((response) => {
//           console.log(response.data)
//           let post_info = {
//             title: post.title,
//             contents: post.contents,
//           }
//           dispatch(editPost(post_info, boardId))
//         }).catch((err) => {
//           console.log(err)
//         })
//       return;
//     } else {
//       const formData = new FormData();
//       formData.append("title", post.title);
//       formData.append("contents", post.contents);
//       formData.append("image", post.image);
//       let token = {
//         headers: { authorization: `Bearer ${sessionStorage.getItem('JWT')}`}
//       }
//       console.log(post)
//       axios.put(`${config.api}/board/${boardId}`, formData, token )
//         .then((response) => {
//           console.log(response.data.boardsData[0].img)
//           let post_info = {
//             title: post.title,
//             contents: post.contents,
//             image_url: response.data.boardsData[0].img,
//           }
//           dispatch(editPost(post_info, boardId))
//         }).catch((err) => {
//           console.log(err)
//         })
//     }

//   }
// }


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

    // [EDIT_PROFILE]: (state, action) => produce(state, (draft) => {
    //   let idx = draft.mylist.findIndex((p) => p.id === action.payload.post_id)
    //   draft.mylist[idx] = {...draft.mylist[idx], ...action.payload.post}
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
  // editProfileAX,
  editPasswordAX,
};

export {actionCreators};






