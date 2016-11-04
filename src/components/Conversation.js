import React, { Component } from 'react'
import Message from './Message'
import '../stylesheets/components/Conversation.scss'

class Conversation extends Component {
	render() {
		const conversation = this.props.conversation
		// const conversation = {}
		const messages = conversation === {} ? conversation.messages : []
		console.log(this.props)
		// console.log(messages)
		return (
			<div className="Conversation">
					{messages
						.map((message, index) =>
							<Message
								message={message}
								key={index}
								messageByUser={this.props.userId === message.from}
						/>)
					}
			</div>
		)
	}
}

export default Conversation