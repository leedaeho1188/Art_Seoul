import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { history } from "../configureStore"
import { config } from "../../shared/config"
import "moment";
import moment from "moment";


const ADD_POST = "ADD_POST";
const SET_POST = "SET_POST";

const addPost = createAction(ADD_POST, (post) => ({post}))
const setPost = createAction(SET_POST, (post_list) => ({post_list}))

const initialState ={
  list : [],
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
        console.log(res.data.result)
        let _post = res.data.result
        let post_info = {
          id: _post.boardId,
          title: _post.title,
          markerId: _post.markerId,
          markername: _post.markername,
          contents: _post.contents,
          nickname: _post.nickname,
          image_url: _post.img[0],
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
        console.log(response.data)
        let post_list = [];
        response.data.forEach((_post) => {
          let post = {
            id: _post.boardId,
            title: _post.title,
            markerId: _post.markerId,
            markername: _post.markername,
            contents: _post.contents,
            nickname: _post.nickname,
            image_url: _post.img[0],
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
    })
  },
  initialState
)

const actionCreators = {
  addPostAX,
  getPostAX,
}

export {actionCreators}
