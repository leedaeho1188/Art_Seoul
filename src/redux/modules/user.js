import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';




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
    id: null,
    pw: null,
    user_name: null,
  },
  is_login: false,
};


const loginSV = (id,pw)=>{
  return function (dispatch, getState, {history}){
    axios(
      {
        method: 'POST',
        headers: {
          "content-type": "application/json", 
        },
        url:"벡엔드 url",
        data:{
          id : id,
          pw : pw,
        }
      })
      .then((response)=>{
        console.log(response);

        dispatch(setUser({id:id, pw:pw})); // dispatch의 위치설정(login/signup 동일하게) //...?
      }).then((token)=>{
        console.log(token.accessToken);
        sessionStorage.setItem("JWT",token.accessToken);
        history.push("/")                 // 화면이동시점은 token을 받고 이루어져야하지 않나
                                          // 그러면 이동했을 때 token의 유무에 따라서 볼수있는 정보가 달라진다
      }).catch(error=>{
        console.log(error);
        window.alert("로그인 오류")
      })
  }
}


const signupSV = (id,pw,user_name)=>{
  return function (dispatch, getState, {history}){
    axios(
      {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        url:"벡엔드 url",
        data:{
          id : id,
          pw : pw,
          user_name: user_name,
        }
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



// const loginCheckSV = () => {
//   return function (dispatch, getState, {history}){
//     axios(
//       {
//         method: 'POST',
//         headers: {
//           "content-type": "application/json",
//         },
//         url:"벡엔드 url",
//         data:{
//           id : id,
//           pw : pw,
//         }
//       })
//       .then((response)=>{
//       }).then((token)=>{
//       }).catch(error=>{
//         console.log(error);
//       })
//   }
// };

// const logoutSV = (id,pw)=>{
//   return function (dispatch, getState, {history}){
//     axios(
//       {
//         method: 'POST',
//         headers: {
//           "content-type": "application/json",
//         },
//         url:"벡엔드 url",
//         data:{
//           id : id,
//           pw : pw,
//         }
//       })
//       .then((response)=>{
//       }).then((token)=>{
//       }).catch(error=>{
//         console.log(error)
//       })
//   }
// }

export default handleActions(
  {
    [SET_USER]: (state, action) => produce(state, (draft) => {
      //미들웨어를 쓰지 않으면  actionCreator에서는 다른 함수를 부르는 작업 등을 할 수 없으니 리듀서에 쿠키부르는 함수 임시로!
      sessionStorage.setItem("is_login","success")
      draft.user = action.payload.user;
      draft.is_login = true;
    }),
    
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
      sessionStorage.removeItem("is_login") //고민해보기
      draft.user = action.payload.user;
      draft.user =null;
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
  // loginCheckSV,
  // logoutSV,
};

export {actionCreators};






