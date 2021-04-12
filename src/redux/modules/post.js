import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { history } from "../configureStore"

const ADD_POST = "ADD_POST";
const SET_POST = "SET_POST";

const addPost = createAction(ADD_POST, (post) => ({post}))
const setPost = createAction(SET_POST, (post_list) => ({post_list}))

const initialState ={
  list : [],
}

const addPostAX = (post) => {
  return function (dispatch, getState){
    const image = getState().image.preview;
    const token = sessionStorage.getItem('JWT');
    const headers= {
      authorization: token
    }
    axios.post("http://13.125.250.74/api/board", {...post, }, headers)
      .then((response) => {
        console.log(response.data)
        
        dispatch(addPost())
    }).catch((err) => {
      console.log(err)
    })
  }
}

const getPostAX = (markerId) => {
  return function (dispatch) {
    axios.get("http://13.125.250.74/api/board", {markerId: markerId})
      .then((response) => {
        console.log(response.data)
        // dispatch(setPost())
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
      draft.list.push(...action.payload.post_list);
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
