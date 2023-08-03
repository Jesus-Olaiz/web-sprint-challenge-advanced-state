import React from 'react'

import {connect} from 'react-redux'

import { fetchQuiz, setQuiz, postAnswer, selectAnswer } from '../state/action-creators'




function Quiz(props) {




  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quizState.isFetching === false ? (
          <>
            
            <h2>{props.quizState.quiz.question}</h2>

            <div id="quizAnswers">
              {props.quizState.quiz.answers.map(x => {

                return(

                <div key={x.answer_id} id={x.answer_id} className={`answer ${props.selected === x.answer_id ? 'selected' : null}`}>
                  {x.text}
                  <button onClick={props.selectAnswer}>
                    {x.answer_id === props.selected ? 'SELECTED' : 'Select'}
                  </button>
                </div>
                )
                        
              })}
              
            </div>

            <button onClick={() => props.postAnswer({quiz_id: props.quizId, answer_id: props.selected})} id="submitAnswerBtn" disabled={props.selected ? false : true}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapToProps = (state) => {
  return {
    quizState: state.quiz,
    isFetching: state.isFetching,
    error : state.error, 
    quizId: state.quiz.quiz_id,
    selected: state.selectedAnswer
  }
}

const mapDispatch = dispatch => {
  return {
    fetchQuiz: dispatch(fetchQuiz()),
    setQuiz: dispatch(setQuiz()),


    /* 
    WORKING ON THIS DISPATCH FUNCTION.
    Proper props are being passed in, but it seems to be before they have been populated. 
    vvvvvvv 
    */
    postAnswer: (data) => {
      dispatch(postAnswer(data))
    },



    selectAnswer: (e) => dispatch(selectAnswer(e.target.parentElement.id))
  }
}

export default connect(mapToProps, mapDispatch)(Quiz)
