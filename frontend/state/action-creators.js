// ❗ You don't need to add extra action creators to achieve MVP
import axios from 'axios'

import initialQuizState from "../state/reducer"

import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_SELECTED_ANSWER, SET_QUIZ_INTO_STATE, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from "./action-types"

export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE
  }
 }

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTERCLOCKWISE
  }
 }

export function selectAnswer(answer) { 
  
  return {
    type: SET_SELECTED_ANSWER,
    payload: answer
  }
}

export function setMessage(message) { 
  return{
    type:SET_INFO_MESSAGE,
    payload: message
  }
}

export function setQuiz(quiz) {
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: quiz
  }
 }

export function inputChange(e) {
  return {
    type: INPUT_CHANGE,
    payload: {e}
  }
}

export function resetForm() {
  return {
    type: RESET_FORM
  }
 }


// ❗ Async action creators
export function fetchQuiz() {
  
  return function (dispatch) {
    
    dispatch(setQuiz(null))
    
    

    axios.get("http://localhost:9000/api/quiz/next")
    .then(res => {
      dispatch(setQuiz(res.data))
    })
    .catch(err => console.log(err))

    
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}




export function postAnswer(answerAndQuestion) {
  console.log(answerAndQuestion)
  
  return async function (dispatch) {
    

    const res = await axios.post('http://localhost:9000/api/quiz/answer', {...answerAndQuestion})
    console.log(res)
    if (res.status === 200) {
      console.log(res.status)
      dispatch(selectAnswer(null))
      dispatch(setMessage(res.data.message))
      
  
      dispatch(fetchQuiz())
    }
    
    
    
  }
    
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }

export function postQuiz(data) {
  return function (dispatch) {
    

    axios.post("http://localhost:9000/api/quiz/new", data)
    .then(res => {
      console.log(res)
      if (res.status === 201){
        dispatch(setMessage(`Congrats: "${data.question_text}" is a great question!`))
      }
      else{
        return res
      }
    })
    .then(() => {
      dispatch(resetForm())
    })
    .catch(err => {console.log(err)})
    
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
