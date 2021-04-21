import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { config } from "../../shared/config"
import { CommentOutlined } from "@material-ui/icons";
import user from "./user";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const setComment = createAction(SET_COMMENT, (comment_list, post_id) => ({comment_list, post_id}))
const addComment = createAction(ADD_COMMENT, (comment, post_id) => ({ comment, post_id }));
const deleteComment = createAction(DELETE_COMMENT, (id, post_id) => ({id, post_id}));



const initialState = {
  list : {},
  is_loading: false,
}

// addCommentAX는 댓글과 댓글 단 사람의 정보 해당 게시글 정보를 담아서 서버에 보내는 작업을 합니다.
// 그리고 리덕스 store에 그 정보들을 저장해서 바로 화면으로 새로적은 댓글이 보이게 합니다. 

const addCommentAX = (comment, post_id) => {
  return function (dispatch, getState){
    const user_info = getState().user.user
    const _token= sessionStorage.getItem("JWT")
    let token = {
      headers : { authorization: `Bearer ${_token}`}
    }
    axios.post(`${config.api}/comment/${post_id}`, {commentContents : comment} ,token)
      .then((res) => {
        console.log(res.data)
        let _comment = res.data.result
        let comment_info = {
          comment : _comment.commentContents,
          nickname : user_info.nickname,
          userId : user_info.id,
          profile: res.data.currentprofile,
        }
        dispatch(addComment(comment_info, post_id))
      }).catch((err) => {
        console.log(err.response)
        window.alert("댓글 작성에 문제가 있어요!")
      })
  }
}

const getCommentAX = (post_id = null) => {
  return function (dispatch) {
    axios.get(`${config.api}/comment/${post_id}`)
      .then((response) => {
        console.log(response, post_id)
        let comment_list = []
        response.data.comments.forEach((_comment) => {
          let comment = {
            comment: _comment.commentContents,
            nickname: _comment.nickname,
            userId: _comment.userId,
            profile: _comment.profile,
          }
          comment_list.unshift(comment)
        })
        dispatch(setComment(comment_list, post_id))
      }).catch((error) => {
        console.log(error)
        window.alert("댓글을 불러올 수 없습니다.")
      })
  }
}

// 해당 댓글 id값을 서버에 보내서 삭제를 시킵니다.
// 리덕스 store에서도 같은 id값을 가진것을 찾아서 삭제 시킵니다.

const deleteCommentAX = (id, post_id) => {
  return function (dispatch, getState){
    const _token= sessionStorage.getItem("JWT")
    let token = {
      headers : { authorization: `Bearer ${_token}`}
    }
    axios.delete(`${config.api}/comment/${id}`,  token)
      .then((response) => {
        console.log(response)
        dispatch(deleteComment(id, post_id));
      }).catch((err) => {
        window.alert("게시물 삭제에 문제가 있어요!")
      })
  }
}

export default handleActions(
  {
    [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
      //  draft.list[action.payload.post_id] 안에 아무것도 없는 상태이면 배열도 없는 상태여서
      // unshift도 되지 않습니다. 그래서 아무것도 없는 경우일 때를 따로 설정했습니다.
      if(!draft.list[action.payload.post_id]){
        draft.list[action.payload.post_id] = [action.payload.comment]
        return
      }
      draft.list[action.payload.post_id].unshift(action.payload.comment)
    }),
    [SET_COMMENT]: (state, action) => produce(state, (draft) => {
      draft.list[action.payload.post_id] = action.payload.comment_list
    }),
    [DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
      let idx = draft.list[action.payload.post_id].findIndex((p) => p.id === action.payload.id)
      if(idx !== -1){
        draft.list[action.payload.post_id].splice(idx, 1);
      }
    })
  },
  initialState
)

const actionCreators = {
  addCommentAX,
  getCommentAX,
  deleteCommentAX,

}

export {actionCreators}