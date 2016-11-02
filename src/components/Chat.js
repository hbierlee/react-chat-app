import React from 'react'
import Users from './Users'
import Message from './Message'
import Input from './Input'
import base from '../base'
import moment from 'moment'
import '../stylesheets/components/Chat.scss'

class Chat extends React.Component {
	constructor(props) {
		super(props)

		this.createUser = this.createUser.bind(this)
		this.checkForUser = this.checkForUser.bind(this)
		this.selectRecipient = this.selectRecipient.bind(this)
		this.submitHandler = this.submitHandler.bind(this)
		this.inputChangeHandler = this.inputChangeHandler.bind(this)

		// init state
		this.state = {
			users: {},
			messages: [],
			recipient: "Jasper",
			unsendMessages: {},
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
			// console.log(`User ${userId} found`)
			// TODO do something else? load last recipient?
		}
		else {
			this.createUser({userId})
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.usersRef)
		base.removeBinding(this.messagesRef)
	}

	selectRecipient(userId) {
		this.setState({recipient: userId})
	}

	inputChangeHandler(event) {
		//if no recipient is selected
		if (!this.state.recipient) {
			return
		}

		const unsendMessages = {...this.state.unsendMessages}
		unsendMessages[this.state.recipient] = event.target.value
		this.setState({unsendMessages})
	}

	submitHandler(event) {
		event.preventDefault()
		const to = this.state.recipient
		const content = this.state.unsendMessages[to]
		const timestamp = moment().valueOf()

		const newMessage = {
			from: this.props.params.userId,
			to,
			content,
			timestamp,
		}

		const messages = [...this.state.messages]
		messages.push(newMessage)

		const unsendMessages = {...this.state.unsendMessages}
		unsendMessages[to] = ""

		this.setState({messages, unsendMessages})
	}
	
	componentWillUpdate() {
		var node = this.chatMessages
		this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
	}

	componentDidUpdate() {
		if (this.shouldScrollBottom) {
			var node = this.chatMessages
			node.scrollTop = node.scrollHeight
		}
	}

	render() {
		const user = this.props.params.userId

		//TODO replace this by querying firebase smartly
		const messages = this.state.messages
			.filter((message) => {
				return (message.from === this.state.recipient && message.to === user)
				|| (message.to === this.state.recipient && message.from === user)
			})
			.sort((a,b) => {return a.timestamp > b.timestamp})

		const inputValue = this.state.unsendMessages[this.state.recipient] ? this.state.unsendMessages[this.state.recipient] : ""

		return (
			<div className="Chat">
				<div className="Chat-users">
					<Users user={this.props.params.userId} users={this.state.users} selectRecipient={this.selectRecipient}/>
				</div>
				
				<div className="Chat-chat">
					<div className="Chat-header">
						<h2>Welcome, {this.props.params.userId}</h2>
						<p>
							<em>Chatting with {this.state.recipient ? this.state.recipient : 'nobody'}</em>
						</p>
					</div>

					<div
						className="Chat-messages"
						ref={(node) => this.chatMessages = node}>
						{messages.map((message, index) => <Message
							message={message}
							messageByUser={message.from === this.props.params.userId}
							key={index}
						/>)}
					</div>

					<Input
						className="Chat-input"
						inputValue={inputValue}
						inputChangeHandler={this.inputChangeHandler}
						submitHandler={this.submitHandler}
						disabled={!this.state.recipient}

						/>
				</div>
			</div>
		)

	}
}

export default Chat