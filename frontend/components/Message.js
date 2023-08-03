import React from 'react'
import { connect } from 'react-redux'


function Message(props) {
  return <div id="message">{props.message}</div>
}

const mapState = state => {
  return {message : state.infoMessage}
}



export default connect(mapState, {})(Message)
