// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'


import { INPUT_CHANGE, MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE,RESET_FORM,SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from './action-types'


const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      if(state === 5){
        return (state = initialWheelState)
      }
    return (state+1)
    case MOVE_COUNTERCLOCKWISE:
      if(state === 0){
        return (state = 5)
      }
    return (state-1)
    default: 
    return state
  }
}

const initialQuizState = {
  isFetching: true,
  error: "",
  quiz: {},
  quiz_id: ""
}


function quiz(state = initialQuizState, action) {
  switch(action.type){
    case SET_QUIZ_INTO_STATE: 
         
      if(action.payload){
        state = {...state, quiz: {...action.payload} , isFetching: false, quiz_id: action.payload.quiz_id}
        return state
      }
      state = {...initialQuizState}
      return state

    case SET_SELECTED_ANSWER: 
      state = {...state, answer_id : action.payload}
      return state
     
    default: return state
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  
  switch(action.type){
    case SET_SELECTED_ANSWER:
      if(action.payload){
        state = action.payload
      
        return state
      }
      state = initialSelectedAnswerState
      return state
      
  }
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    case SET_INFO_MESSAGE: 
    
    state = action.payload

    console.log(state)
    return state  
  }
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type){
    case INPUT_CHANGE: 
    state = {...state, ...action.payload.e}
    return state
    case RESET_FORM: 
    state = {...initialFormState}
    return state
  }
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
