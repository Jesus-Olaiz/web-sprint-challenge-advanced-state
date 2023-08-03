import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

import { inputChange } from '../state/action-creators'

export function Form(props) {


  const {newQuestion, newFalseAnswer, newTrueAnswer} = props

  function inputCheck() {

    if ((newQuestion.split(' ').join('').length > 0) && (newFalseAnswer.split(' ').join('').length > 0) && (newTrueAnswer.split(' ').join('').length > 0)){
      return false
    }
    return true

  }


  const onChange = evt => {
    props.setState({ [evt.target.id] : evt.target.value})
  }

  const onSubmit = evt => {
    evt.preventDefault()
    
    


    props.postNewForm({
      question_text : props.newQuestion,
      true_answer_text : props.newTrueAnswer,
      false_answer_text : props.newFalseAnswer
    })

    
  }

  return (
    <form id="form" onSubmit={props.resetForm}>
      <h2>Create New Quiz</h2>
      <input value={props.newQuestion} maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input value={props.newTrueAnswer} maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={props.newFalseAnswer} maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" onClick={onSubmit} disabled={inputCheck()}>Submit new quiz</button>
    </form>
  )
}

const mapToProps = (state) => {
  return {
    newQuestion: state.form.newQuestion,
    newTrueAnswer: state.form.newTrueAnswer,
    newFalseAnswer: state.form.newFalseAnswer
  }
}

const mapDispatch = (dispatch) => {
  return {
    setState: (e) => dispatch(inputChange(e)),
    postNewForm : (e) => {dispatch(actionCreators.postQuiz(e))},
    resetForm : () => dispatch(actionCreators.resetForm)
  }
}

export default connect(mapToProps, mapDispatch)(Form)
