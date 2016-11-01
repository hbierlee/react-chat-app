import React from 'react'
import Users from './Users'
import Message from './Message'
import base from '../base'
import moment from 'moment'
import Flexbox from 'flexbox-react'

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
			<Flexbox flexDirection="row" flexBasis="100%" className="Chat">
				<Flexbox flexGrow={1} minWidth="240px" flexBasis="30%">
					<Users user={this.props.params.userId} users={this.state.users} selectRecipient={this.selectRecipient}/>
				</Flexbox>
				
				<Flexbox flexGrow={2} flexDirection="column" flexBasis="70%">
					<h2>Welcome, {this.props.params.userId}</h2>
					<p>
						<em>Chatting with {this.state.recipient ? this.state.recipient : 'nobody'}</em>
					</p>

					<ul className="Chat-messages">
						{messages.map((message, index) => <Message message={message} key={index}/>)}
					</ul>

					<form className="Chat-form" onSubmit={this.submitHandler}>
						<input
							type="text"
							className="Chat-input"
							onChange={this.inputChangeHandler}
							value={inputValue}
							disabled={!this.state.recipient}
						/>
						
						<button
							className="Chat-send"
							type="submit"
							disabled={!this.state.recipient}
						>
							Send
						</button>
					</form>
				</Flexbox>
			</Flexbox>
		)

	}
}

export default Chat