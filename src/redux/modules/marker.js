import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { history } from "../configureStore"

const ADD_MARKER = "ADD_MARKER";
const SET_MARKER = "SET_MARKER";

const addMarker = createAction(ADD_MARKER, (marker) => ({marker}))
const setMarker = createAction(SET_MARKER, (marker_list) => ({marker_list}))

const initialState = {
  list: [],
}

const addMarkerAX = (marker) => {
  return function (dispatch){
    axios.post("https://6068922e0add490017340329.mockapi.io/api/mocked/marker", {
      markername: marker.title, location: [marker.latitude.toString(), marker.longitude.toString()], markertype: marker.markertype,
    }).then((response) => {
      console.log(response.data)
      let marker_info = {...marker, markerId: response.data.id}
      dispatch(addMarker(marker_info))
    })
  }
}

const getMarkerAX = () => {
  return function (dispatch){
    axios.get("https://6068922e0add490017340329.mockapi.io/api/mocked/marker")
      .then((res) => {
        console.log(res.data)
        let marker_list = [];
        res.data.forEach((_marker) => {
          let marker = {
            id: _marker.id,
            title: _marker.markername,
            latitude: _marker.location[0],
            longitude: _marker.location[1],
            markertype: _marker.markertype,
          }

          marker_list.unshift(marker)
        })
        dispatch(setMarker(marker_list))
      })
  }
}


export default handleActions(
  {
    //새로운 marker 정보를 redux store에 저장
    [ADD_MARKER]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.marker)
    }),
    [SET_MARKER]: (state, action) => produce(state, (draft) => {
      draft.list.push(...action.payload.marker_list);
      draft.list = draft.list.reduce((acc, cur) => {
        if(acc.findIndex(a => a.id === cur.id) === -1){
          return [...acc, cur];
        }else{
          acc[acc.findIndex((a) => a.id === cur.id)] = cur;
          return acc;
        }
      }, [])
    }),
  },
  initialState
)

const actionCreators = {
  addMarkerAX,
  getMarkerAX
}

export {actionCreators}


