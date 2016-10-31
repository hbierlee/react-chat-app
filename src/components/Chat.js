import React from 'react'
import Contacts from './Contacts'

class Chat extends React.Component {
	constructor(props) {
		super(props)

		this.renderMessage = this.renderMessage.bind(this);
	}


	componentWillMount() {
		const userId = this.props.params.userId

		console.log("Start chat for " + userId)
		
		// init state
		this.state = {
			messages: ['a', 'b', 'c']
		}
	}

	renderMessage(message, index) {
		return (
			<li key={index}>{message}</li>
		)
	}

	render() {
		return (
			<div className="Chat">
				<h1>Welcome, {this.props.params.userId}</h1>
			
				<ul className="Chat-messages">
					{this.state.messages.map(this.renderMessage)}
				</ul>
				<Contacts />
			</div>
		)
	}
}

export default Chat