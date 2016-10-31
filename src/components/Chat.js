import React from 'react'
import Users from './Users'
import base from '../base'
import moment from 'moment'

class Chat extends React.Component {
	constructor(props) {
		super(props)

		this.renderMessage = this.renderMessage.bind(this)
		this.createUser = this.createUser.bind(this)
		this.checkForUser = this.checkForUser.bind(this)

		// init state
		this.state = {
			users: {},
			messages: [],
		}
	}

	createUser(user) {
		const users = {...this.state.users}
		users[user.userId] = user
		this.setState({users})
	}

	componentWillMount() {
		const userId = this.props.params.userId

		this.usersRef = base.syncState(`users/`, {
			context: this,
			state: 'users',
			then() {this.checkForUser(userId)},
    	})

    	this.messagesRef = base.syncState(`messages/`, {
			context: this,
			state: 'messages',
    	})
	}

	checkForUser(userId) {
		if (this.state.users.hasOwnProperty(userId)) {
			console.log(`User ${userId} found`)
		}
		else {
			console.log(`Add new user ${userId}`)
			this.createUser({userId})
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.usersRef)
		base.removeBinding(this.messagesRef)
	}

	renderMessage(message, index) {
		return (
			<li key={index}>{`${message.from}: ${message.content} [${moment(message.timestamp * 1000).fromNow()}]`}</li>
		)
	}

	render() {
		return (
			<div className="Chat">
				<h1>Welcome, {this.props.params.userId}</h1>
				
				<ul className="Chat-messages">
					{this.state.messages.map(this.renderMessage)}
				</ul>				
				<Users users={this.state.users}/>
			</div>
		)
	}
}

export default Chat