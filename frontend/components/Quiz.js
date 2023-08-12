import React, {useEffect} from 'react'

import {connect} from 'react-redux'

import { fetchQuiz, setQuiz, postAnswer, selectAnswer, setMessage } from '../state/action-creators'




function Quiz(props) {

  const handleClick = (x) => {
    props.selectAnswer(x)
  }
 

  const handleSubmit = async (x) => {
    
    await props.postAnswer({
      quiz_id: props.quizId,
      answer_id: x
    })


  }


  useEffect(() => {
    if (props.quizId.length < 1) {
      props.fetchQuiz()
    }
  }, [])



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
                  <button id = {x.answer_id} onClick={() => handleClick(x.answer_id)}>
                    {x.answer_id === props.selected ? 'SELECTED' : 'Select'}
                  </button>
                </div>
                )
                        
              })}
              
            </div>

            <button onClick={() => handleSubmit(props.selected)} id="submitAnswerBtn" disabled={props.selected ? false : true}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapToProps = (state) => {
  console.log(state.quiz)
  return {
    quizState: state.quiz,
    isFetching: state.quiz.isFetching,
    error : state.error, 
    quizId: state.quiz.quiz_id,
    selected: state.quiz.answer_id
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchQuiz: () => dispatch(fetchQuiz()),
    setQuiz: () => dispatch(setQuiz()),


    postAnswer: (data) => dispatch(postAnswer(data)),

    selectAnswer: (e) => dispatch(selectAnswer(e)),


    // clearMessage: () => dispatch(setMessage(null))
  }
}

export default connect(mapToProps, mapDispatch)(Quiz)

