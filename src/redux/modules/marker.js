import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { history } from "../configureStore"
import { config } from "../../shared/config"

const ADD_MARKER = "ADD_MARKER";
const SET_MARKER = "SET_MARKER";

const addMarker = createAction(ADD_MARKER, (marker) => ({marker}))
const setMarker = createAction(SET_MARKER, (hotMarker_list, normalMarker_list) => ({hotMarker_list, normalMarker_list}))

const initialState = {
  normal: [],
  hot: [],
}



const addMarkerAX = (marker) => {
  return function (dispatch){

    const _token= sessionStorage.getItem("JWT")
    let token = {
      headers : { authorization: `Bearer ${_token}`}
    }

    axios.post(`${config.api}/marker`, {
      markername: marker.title, location: [marker.latitude.toString(), marker.longitude.toString()], markertype: marker.markertype,
    }, token).then((response) => {
      console.log(response.data)
      let marker_info = {...marker, id: response.data.markerId}
      dispatch(addMarker(marker_info))
    })
  }
}

const getMarkerAX = () => {
  return function (dispatch){
    axios.get(`${config.api}/marker/display/detail`)
      .then((res) => {
        console.log(res.data)
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
          }

          normalMarker_list.unshift(marker)
        })
        console.log(hotMarker_list, normalMarker_list)
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
  },
  initialState
)

const actionCreators = {
  addMarkerAX,
  getMarkerAX,
}

export {actionCreators}

