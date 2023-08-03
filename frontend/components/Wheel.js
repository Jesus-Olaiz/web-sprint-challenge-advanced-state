import React from 'react'

import { connect } from 'react-redux'

import { moveClockwise, moveCounterClockwise } from '../state/action-creators'








function Wheel(props) {

  let wheelArr = [0,1,2,3,4,5]


  return (
    <div id="wrapper">
      <div id="wheel">

        {wheelArr.map(x => {
          if(x === props.currentVal){
            return <div className="cog active" key={x} style={{ "--i": x }}>B</div>
          }
          return <div className="cog" key={x} style={{ "--i": x }}></div>
        })}
        
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={props.moveCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={props.moveClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    currentVal: state.wheel
  }
}
const mapDispatch = dispatch => {
  return {
    moveClockwise: () => dispatch(moveClockwise()),
    moveCounterClockwise: () => dispatch(moveCounterClockwise())
  }
}

export default connect(mapState, mapDispatch)(Wheel)
