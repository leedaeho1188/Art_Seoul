import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { history } from "../configureStore"
import { config } from "../../shared/config"
import "moment";
import moment from "moment";
import user from "./user";



const ADD_POST = "ADD_POST";
const SET_POST = "SET_POST";
const GET_MY_POST = "GET_MY_POST";
const GET_USER_POST = "GET_USER_POST";
const REMOVE_POST = "REMOVE_POST";
const REMOVE_MY_POST = "REMOVE_MY_POST";
const EDIT_POST = "EDIT_POST";
const EDIT_MY_POST = "EDIT_MY_POST";
const LOADING = "LOADING";



const addPost = createAction(ADD_POST, (post) => ({post}))
const setPost = createAction(SET_POST, (post_list, next) => ({post_list, next}))
const getmyPost = createAction(GET_MY_POST,(my_list)=>({my_list}))
const getuserPost = createAction(GET_USER_POST,(user_list)=>({user_list}))
const removePost = createAction(REMOVE_POST, (post_id)=> ({post_id}))
const removeMyPost = createAction(REMOVE_MY_POST, (post_id)=> ({post_id}))
const editPost = createAction(EDIT_POST, (post, post_id) => ({post, post_id}))
const editMyPost = createAction(EDIT_MY_POST, (post, post_id) => ({post, post_id}))
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState ={
  list : [],
  mylist:[],
  userlist:[
    {nickname:"hi",profile:"hello"}
  ],
  is_loading: false,
  next: false,
}

const addPostAX = (post) => {
  return function (dispatch, getState){
    const profile = getState().user.user.profile
    // console.log(profile)

    const formData = new FormData();
    formData.append("images", post.image);
    formData.append("title", post.title);
    formData.append("contents", post.contents);
    formData.append("markername", post.markername);

    const _token= sessionStorage.getItem("JWT")
    let token = {
      headers : { authorization: `Bearer ${_token}`}
    }

    axios.post(`${config.api}/board/${post.markerId}`, formData, token)
      .then((res) => {
        if(res.status == 200){
          window.alert("게시물이 잘 저장되었습니다.😀")
        }
        // console.log(res)
        // console.log(res)
        // let _post = res.data.result
        // let post_info = {
        //   id: _post.boardId,
        //   title: _post.title,
        //   markerId: _post.markerId,
        //   markername: _post.markername,
        //   contents: _post.contents,
        //   nickname: _post.nickname,
        //   image_url: _post.img,
        //   user_id: _post.userId,
        //   date: _post.date,
        // }
        dispatch(getPostAX(post.markerId))
    }).catch((err) => {
      console.log(err)
    })
  }
}

const getPostAX = (markerId, lastId = null) => {
  return function (dispatch, getState) {
    dispatch(loading(true));
    const _post = getState().post.list

    if (!lastId){
      axios.get(`${config.api}/board/${markerId}`)
      .then((response) => {
        // console.log(response)
        let post_list = [];
        let next
        if (response.data.status !== "end"){
          next = true
        } else {
          next = false
        }
        response.data.boardsData.forEach((_post) => {
          let post = {
            id: _post.boardId,
            title: _post.title,
            markerId: _post.markerId,
            markername: _post.markername,
            contents: _post.contents,
            nickname: _post.nickname,
            image_url: _post.img ? _post.img : "https://www.namdokorea.com/site/jeonnam/tour/images/noimage.gif",
            date: _post.date,
            userId: _post.userId,
            profile: _post.profile,
          }
          post_list.push(post)
        })
        // console.log(post_list)
        dispatch(setPost(post_list, next))
      }).catch((err) => {
        console.log(err)
      })
      return;
    }

    axios.get(`${config.api}/board/${markerId}?lastId=${lastId}`)
      .then((response) => {
     
        let post_list = [];
        let next
        if (response.data.status !== "end"){
          next = true
        } else {
          next = false
        }
        response.data.boardsData.forEach((_post) => {
          let post = {
            id: _post.boardId,
            title: _post.title,
            markerId: _post.markerId,
            markername: _post.markername,
            contents: _post.contents,
            nickname: _post.nickname,
            image_url: _post.img ? _post.img : "https://www.namdokorea.com/site/jeonnam/tour/images/noimage.gif" ,
            date: _post.date,
            userId: _post.userId,
            profile: _post.profile,
          }
          post_list.push(post)
        })
        post_list.unshift(..._post)
        // console.log(post_list)
        dispatch(setPost(post_list, next))
      }).catch((err) => {
        console.log(err)
      })
  }
}


const getuserPostAX = (_id) => {
  return function (dispatch){

      axios.get(`${config.api}/board/other/${_id}`)
      .then((response) => {
       
        console.log(response);
        let user_list = [];
        response.data.contents.forEach((_item) => {
          let item = {
            id: _item.boardId,
            title: _item.title,
            contents: _item.contents,
            userId: _item.userId,
            nickname: response.data.nickname,
            date: _item.date,
            markerId: _item.markerId,
            markername: _item.markername,
            image_url: _item.img ? _item.img : "https://www.namdokorea.com/site/jeonnam/tour/images/noimage.gif",
            profile: response.data.profile, 
          }
          user_list.unshift(item)
         
        })
      
        // console.log(user_list)
        
        //redux에도 값 변경
        dispatch(getuserPost(user_list))
      }).catch((err) => {
        console.log(err)
      })
  }
}


const removePostAX = (boardId) => {
  return function (dispatch, getState){
    let token = {
      headers: { authorization: `Bearer ${sessionStorage.getItem('JWT')}`}
    }
    // console.log(boardId)
    axios.delete(`${config.api}/board/${boardId}`, token)
      .then((reponse) => { 
        // console.log(reponse.data)
        dispatch(removePost(boardId))
      })
  }
}

const removeMyPostAX = (boardId) => {
  return function (dispatch){
        dispatch(removeMyPost(boardId))
      }
}



const editPostAX = (post, boardId) => {
  return function (dispatch, getState){
    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex((p) => p.id == boardId);
    const _post = getState().post.list[_post_idx]

    if(_image == _post.image_url){
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("contents", post.contents);
      let token = {
        headers: { authorization: `Bearer ${sessionStorage.getItem('JWT')}`}
      }
      // console.log(post)
      axios.put(`${config.api}/board/${boardId}`, formData, token )
        .then((response) => {
          // console.log(response.data)
          let post_info = {
            title: post.title,
            contents: post.contents,
          }
          dispatch(editPost(post_info, boardId))
        }).catch((err) => {
          console.log(err)
        })
      return;
    } else {
      
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("contents", post.contents);
      formData.append("image", post.image);
      let token = {
        headers: { authorization: `Bearer ${sessionStorage.getItem('JWT')}`}
      }
      // console.log(post)
      axios.put(`${config.api}/board/${boardId}`, formData, token )
        .then((response) => {
          // console.log(response.data.boardsData[0].img)
          let post_info = {
            title: post.title,
            contents: post.contents,
            image_url: response.data.boardsData[0].img,
          }
          dispatch(editPost(post_info, boardId))
        }).catch((err) => {
          console.log(err)
        })
    }

  }
}

const editMyPostAX = (post, boardId) => {
  return function (dispatch, getState){
    const _image = getState().image.preview;
    const _post_idx = getState().post.userlist.findIndex((p) => p.id == boardId);
    const _post = getState().post.userlist[_post_idx]

    if(_image == _post.image_url){
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("contents", post.contents);
      let token = {
        headers: { authorization: `Bearer ${sessionStorage.getItem('JWT')}`}
      }
      // console.log(post)
      axios.put(`${config.api}/board/${boardId}`, formData, token )
        .then((response) => {
          // console.log(response.data)
          let post_info = {
            title: post.title,
            contents: post.contents,
          }
          dispatch(editMyPost(post_info, boardId))
        }).catch((err) => {
          console.log(err)
        })
      return;
    } else {
      
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("contents", post.contents);
      formData.append("image", post.image);
      let token = {
        headers: { authorization: `Bearer ${sessionStorage.getItem('JWT')}`}
      }
      // console.log(post)
      axios.put(`${config.api}/board/${boardId}`, formData, token )
        .then((response) => {
          // console.log(response.data.boardsData[0].img)
          let post_info = {
            title: post.title,
            contents: post.contents,
            image_url: response.data.boardsData[0].img,
          }
          dispatch(editMyPost(post_info, boardId))
        }).catch((err) => {
          console.log(err)
        })
    }

  }
}





export default handleActions(
  {
    [ADD_POST]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.post)
    }),
    [SET_POST]: (state, action) => produce(state, (draft) => {
      draft.list = action.payload.post_list;
      draft.list = draft.list.reduce((acc, cur) => {
        if(acc.findIndex(a => a.id === cur.id) === -1 ){
          return [...acc, cur];
        }else{
          acc[acc.findIndex((a) => a.id === cur.id)] = cur;
          return acc;
        }
      }, []);
      draft.next = action.payload.next;
      draft.is_loading = false;
    }),
    [GET_MY_POST]: (state,action) => produce(state, (draft)=>{
      draft.mylist = [action.payload.my_list];
      draft.mylist = draft.mylist.reduce((acc, cur) => {
        if(acc.findIndex(a => a.id === cur.id) === -1 ){
          return [...acc, cur];
        }else{
          acc[acc.findIndex((a) => a.id === cur.id)] = cur;
          return acc;
        }
      })
    }),
    [GET_USER_POST]: (state,action) => produce(state, (draft)=>{
      draft.userlist = action.payload.user_list;
    }),
    [EDIT_POST]: (state, action) => produce(state, (draft) => {
      let idx = draft.list.findIndex((p) => p.id === action.payload.post_id)
      draft.list[idx] = {...draft.list[idx], ...action.payload.post}
    }),
    [EDIT_MY_POST]: (state, action) => produce(state, (draft) => {
      let idx = draft.userlist.findIndex((p) => p.id === action.payload.post_id)
      draft.userlist[idx] = {...draft.userlist[idx], ...action.payload.post}
    }),
    [REMOVE_POST]: (state,action) => produce(state, (draft)=>{
      draft.list = draft.list.filter((r, idx) => {
        if(r.id !== action.payload.post_id){
          return [...draft.list, r]
        }
      })
    }),
    [REMOVE_MY_POST]: (state,action) => produce(state, (draft)=>{
      draft.userlist = draft.userlist.filter((r, idx) => {
        if(r.id !== action.payload.post_id){
          return [...draft.userlist, r]
        }
      })
    }),
    [LOADING]: (state, action) => produce(state, (draft) => {
      draft.is_loading = action.payload.is_loading
    })
  },
  initialState
)

const actionCreators = {
  addPostAX,
  getPostAX,
  getuserPost,
  removePostAX,
  removeMyPostAX,
  editPostAX,
  editMyPostAX,
  getuserPostAX,
}

export {actionCreators}
