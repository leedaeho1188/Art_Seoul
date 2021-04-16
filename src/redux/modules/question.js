import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from 'axios';
import { config } from "../../shared/config"

const ADD_QUESTION = "ADD_QUESTION";
const SET_QUESTION = "SET_QUESTION";
const REMOVE_QUESTION = "REMOVE_QUESTION";
const EDIT_QUESTION = "EDIT_QUESTION";
const LOADING = "LOADING"

const addQuestion = createAction(ADD_QUESTION, (question) => ({question}))
const setQuestion = createAction(SET_QUESTION, (question) => ({question}))
const removeQuestion = createAction(REMOVE_QUESTION, (question) => ({question}))
const editQuestion = createAction(EDIT_QUESTION, (question) => ({question}))
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list : [],
  is_loading: false,
}

const addQuestionAX = (question) => {
  return function (dispatch){
    const _token= sessionStorage.getItem("JWT")
    let token = {
      headers : { authorization: `Bearer ${_token}`}
    }
    axios.post(`${config.api}/setting/quest`, question, token)
      .then((response) => {
        console.log(response.data)
        if(response.data.state ==="success"){
          window.alert("질문이 잘 저장되었습니다.😀")
        }
        let _question = response.data.result
        let question_info = {
          id : _question.id,
          date : _question.date,
          nickname : _question.nickname,
          title: _question.title,
          contents: _question.contents,
          userId: _question.userId,
        }
        dispatch(addQuestion(question_info))
      })
  }
}

export default handleActions(
  {
    [ADD_QUESTION]: (state, action) => produce(state, (draft) => {
      draft.list.unshift(action.payload.question)
    }),
  },
  initialState
)

const actionCreators = {
  addQuestionAX,
}

export {actionCreators}