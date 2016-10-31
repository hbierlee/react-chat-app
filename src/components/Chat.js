import React from 'react'
import Contacts from './Contacts'

class Chat extends React.Component {
	render() {
		return (
			<div className="chat">
				<h1>Welcome, {this.props.params.userId}</h1>
			
				<Contacts />
			</div>
		)
	}
}

export default Chat