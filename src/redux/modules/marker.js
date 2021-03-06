import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { history } from "../configureStore"
import { config } from "../../shared/config"

const ADD_MARKER = "ADD_MARKER";
const SET_MARKER = "SET_MARKER";
const ADD_BOARD = "ADD_BOARD";
const REMOVE_BOARD = "REMOVE_BOARD";

const addMarker = createAction(ADD_MARKER, (marker) => ({marker}))
const setMarker = createAction(SET_MARKER, (hotMarker_list, normalMarker_list) => ({hotMarker_list, normalMarker_list}))
const addBoard = createAction(ADD_BOARD, (markerId, markerClass) => ({markerId, markerClass}))
const removeBoard = createAction(REMOVE_BOARD, (markerId, markerClass) => ({markerId, markerClass}))

const initialState = {
  normal: [],
  hot: [],
}



const addMarkerAX = (marker) => {
  return function (dispatch){
    // 로그인을 했을 때만 마커를 생성할 수 있기 때문에 token 값을 서버에 넘겨줍니다.
    const _token= sessionStorage.getItem("JWT")
    let token = {
      headers : { authorization: `Bearer ${_token}`}
    }
    // 생성된 마커 정보를 서버에 보냅니다.
    axios.post(`${config.api}/marker`, {
      markername: marker.title, location: [marker.latitude.toString(), marker.longitude.toString()], markertype: marker.markertype, address: marker.address,
    }, token).then((response) => {
      // 서버에서 마커 오브젝트 id와 boardcount를 보냅니다.
      console.log(response.data)
      let marker_info = {...marker, id: response.data.markerId, boardcount: 0}
      // 액션 함수에 마커 정보를 담아서 보냅니다.
      dispatch(addMarker(marker_info))
    })
  }
}

const getMarkerAX = () => {
  return function (dispatch){
    axios.get(`${config.api}/marker/display/detail`)
      .then((res) => {
        // console.log(res.data)
        let hotMarker_list = [];
        let normalMarker_list = [];
        res.data.hot_marker.forEach((_marker) => {
          let marker = {
            id: _marker._id,
            title: _marker.markername,
            latitude: _marker.location[0],
            longitude: _marker.location[1],
            markertype: _marker.markertype,
            boardcount: _marker.boardcount,
            address: _marker.address,
          }

          hotMarker_list.unshift(marker)
        })
        res.data.normal_marker.forEach((_marker) => {
          let marker = {
            id: _marker._id,
            title: _marker.markername,
            latitude: _marker.location[0],
            longitude: _marker.location[1],
            markertype: _marker.markertype,
            boardcount: _marker.boardcount,
            address: _marker.address,
          }

          normalMarker_list.unshift(marker)
        })
        // console.log(hotMarker_list, normalMarker_list)
        dispatch(setMarker(hotMarker_list, normalMarker_list))
      })
  }
}


export default handleActions(
  {
    //새로운 marker 정보를 redux store에 저장
    [ADD_MARKER]: (state, action) => produce(state, (draft) => {
      draft.normal.unshift(action.payload.marker)
    }),
    [SET_MARKER]: (state, action) => produce(state, (draft) => {
      draft.normal.push(...action.payload.normalMarker_list);
      draft.hot.push(...action.payload.hotMarker_list);

      draft.normal = draft.normal.reduce((acc, cur) => {
        if(acc.findIndex(a => a.id === cur.id) === -1){
          return [...acc, cur];
        }else{
          acc[acc.findIndex((a) => a.id === cur.id)] = cur;
          return acc;
        }
      }, []);

      draft.hot = draft.hot.reduce((acc, cur) => {
        if(acc.findIndex(a => a.id === cur.id) === -1){
          return [...acc, cur];
        }else{
          acc[acc.findIndex((a) => a.id === cur.id)] = cur;
          return acc;
        }
      }, []);

    }),
    // 게시물을 추가할 때 해당 마커의 게시물 카운트를 1 더합니다.
    // 그리고 게시물의 숫자가 9에서 10이되면 normal marker에서 hot marker리스트로 마커정보를 옮깁니다.
    [ADD_BOARD]: (state, action) => produce(state, (draft) => {
      
      if (action.payload.markerClass == "normal"){
        let idx = draft.normal.findIndex(m => m.id === action.payload.markerId);
        draft.normal[idx].boardcount += 1;
        if (draft.normal[idx].boardcount == 10){
          // hot 마커로 옮기고
          draft.hot.push(draft.normal[idx])
          // normal에있는 정보를 없앱니다.
          draft.normal.splice(idx, 1)
        }
      }
      else{
        // 이미 hot마커이기때문에 게시물 개수 1을 더해도 똑같이 hot 마커입니다.
        let idx = draft.hot.findIndex(m => m.id === action.payload.markerId);
        draft.hot[idx].boardcount += 1;
      }
    }),
    
    // 게시물을 삭제했을 때 마커 게시물 개수 1개를 빼고 
    // hot marker에서 -1을 했을 때 게시물 개수가 9개이면 
    // 해당 마커를 normal에 추가하고 hot에서 삭제합니다.
    [REMOVE_BOARD]: (state, action) => produce(state, (draft) => {
      if (draft.normal.findIndex(m => m.id === action.payload.markerId) !== -1){
        let idx = draft.normal.findIndex(m => m.id === action.payload.markerId);
        draft.normal[idx].boardcount -= 1;
      } else{
        let idx = draft.hot.findIndex(m => m.id === action.payload.markerId);
        draft.hot[idx].boardcount -= 1;
        if (draft.hot[idx].boardcount == 9){
          draft.normal.push(draft.hot[idx])
          draft.hot.splice(idx, 1)
        }
      }
    })
  },
  initialState
)

const actionCreators = {
  addMarkerAX,
  getMarkerAX,
  addBoard,
  removeBoard,
}

export {actionCreators}

