import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { history } from "../configureStore"
import { config } from "../../shared/config"
import "moment";
import moment from "moment";


const ADD_POST = "ADD_POST";
const SET_POST = "SET_POST";
const GET_MY_POST = "GET_MY_POST";

const addPost = createAction(ADD_POST, (post) => ({post}))
const setPost = createAction(SET_POST, (post_list) => ({post_list}))
const getmyPost = createAction(GET_MY_POST,(my_list)=>({my_list}))


const initialState ={
  list : [],
  mylist:[],
}

const addPostAX = (post) => {
  return function (dispatch, getState){

    const formData = new FormData();
    formData.append("image", post.image);
    formData.append("title", post.title);
    formData.append("contents", post.contents);
    formData.append("markername", post.markername);
    
    axios.post(`${config.api}/board/${post.markerId}`, formData, config.token)
      .then((res) => {
        window.alert("성공")
        console.log(res)
        let _post = res.data.result
        let post_info = {
          id: _post.boardId,
          title: _post.title,
          markerId: _post.markerId,
          markername: _post.markername,
          contents: _post.contents,
          nickname: _post.nickname,
          image_url: _post.img,
          user_id: _post.userId,
          date: _post.date,
        }
        dispatch(addPost(post_info))
    }).catch((err) => {
      console.log(err)
    })
  }
}

const getPostAX = (markerId) => {
  return function (dispatch) {
    axios.get(`${config.api}/board/${markerId}`)
      .then((response) => {
        console.log(response.data.board_list)
        let post_list = [];
        response.data.board_list.forEach((_post) => {
          let post = {
            id: _post.boardId,
            title: _post.title,
            markerId: _post.markerId,
            markername: _post.markername,
            contents: _post.contents,
            nickname: _post.nickname,
            image_url: _post.img,
            date: _post.date
          }
          post_list.unshift(post)
        })
        console.log(post_list)
        dispatch(setPost(post_list))
      }).catch((err) => {
        console.log(err)
      })
  }
}

const getmyPostAX = () => {
  return function (dispatch){
      axios.get(`${config.api}/board/myboard`,config.token)
      .then((response) => {
        console.log(response)
        //my_list로 데이터 정제
        let my_list = [];
        response.data.forEach((_item) => {
          let item = {
            id: _item.boardId,
            title: _item.title,
            contents: _item.contents,
            nickname: _item.nickname,
            image_url: _item.img[0],
          }
          my_list.unshift(item)
        })
        console.log(my_list)
        
        //redux에도 값 변경
        dispatch(getmyPost(my_list))
      }).catch((err) => {
        console.log(err)
      })
  }
}


// axios(
//   {
//     method: 'GET',
//     headers: {authorization: `Bearer ${sessionStorage.getItem('JWT')}`
//     },
//     url: "http://13.125.250.74/board/myboard",  
//     data:{
//     },
//   })
//   .then((response) => {
//     console.log(response)
//     //my_list로 데이터 정제
//     let my_list = [];
//     response.data.forEach((_item) => {
//       let item = {
//         id: _item.boardId,
//         title: _item.title,
//         contents: _item.contents,
//         nickname: _item.nickname,
//         image_url: _item.img[0],
//       }
//       my_list.unshift(item)
//     })
//     console.log(my_list)
    
//     //redux에도 값 변경
//     dispatch(getmyPost(my_list))
//   }).catch((err) => {
//     console.log(err)
//   })


export default handleActions(
  {
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post)
    }),
    [SET_POST]: (state, action) => produce(state, (draft) => {
      draft.list = [action.payload.post_list];
      draft.list = draft.list.reduce((acc, cur) => {
        if(acc.findIndex(a => a.id === cur.id) === -1 ){
          return [...acc, cur];
        }else{
          acc[acc.findIndex((a) => a.id === cur.id)] = cur;
          return acc;
        }
      })
    }),
    [GET_MY_POST]: (state,action) => produce(state, (draft)=>{
      draft.mylist.unshift(...action.payload.my_list);
      // 위에 줄 잠시보류
    })
  },
  initialState
)

const actionCreators = {
  addPostAX,
  getPostAX,
  getmyPostAX,
}

export {actionCreators}
