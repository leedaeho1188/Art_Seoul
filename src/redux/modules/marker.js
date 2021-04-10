import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { history } from "../configureStore"

const ADD_MARKER = "ADD_MARKER";
const SET_MARKER = "SET_MARKER";

const addMarker = createAction(ADD_MARKER, (marker) => ({marker}))
const setMarker = createAction(SET_MARKER, (marker) => ({marker}))

const initialState = {
  list: [],
}

export default handleActions(
  {
    //새로운 marker 정보를 redux store에 저장
    [ADD_MARKER]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.marker)
    }),
    // [SET_MARKER]: (state, action) => produce(state, (draft) => {
      
    // })



  },
  initialState
)

const actionCreators = {
  addMarker
}

export {actionCreators}


