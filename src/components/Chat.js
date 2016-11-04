import React from 'react'
import Users from './Users'
import Conversation from './Conversation'
import Input from './Input'
import base from '../base'
import moment from 'moment'
import { getCurrentConversation } from '../helpers'
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
			user: {},
			users: {},
			conversation: {},
			conversations: [],
			recipient: "",
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
			then() {
				this.setState({user: this.state.users[userId]})
				this.checkForUser(userId)
			}
		})
	}

	checkForUser(userId) {
		if (this.state.users.hasOwnProperty(userId)) {
			//load all conversations that the user is in
			this.conversationsRef = base.syncState('conversations/', {
				context: this,
				state: 'conversations',
				queries: {
					orderByKey: true,
					startAt: Math.min(...this.state.user.conversations).toString(),
					endAt: Math.max(...this.state.user.conversations).toString(),
				},
				then() {
					this.selectRecipient("Rens")
				}
			})
		}
		else {
			this.createUser({userId})
		}
	}

	componentWillUnmount() {
		base.removeBinding(this.usersRef)
		base.removeBinding(this.conversationsRef)
	}

	selectRecipient(recipientId) {
		this.setState({
			recipient: recipientId,
			conversation: getCurrentConversation(
				this.state.conversations,
				this.state.user.userId,
				this.state.recipient
			)
		})
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

	submitHandler() {
		const to = this.state.recipient
		const content = this.state.unsendMessages[to]
		const timestamp = moment().valueOf()

		const newMessage = {
			from: this.state.user.userId,
			to,
			content,
			timestamp,
		}

		const unsendMessages = {...this.state.unsendMessages}
		unsendMessages[to] = ""

		const messages = this.state.conversation.messages.concat(newMessage)
		console.log(messages)
		this.setState({messages , unsendMessages})
	}
	
	componentWillUpdate() {
		const node = this.chatMessages
		this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
	}

	componentDidUpdate() {
		if (this.shouldScrollBottom) {
			const node = this.chatMessages
			node.scrollTop = node.scrollHeight
		}
	}


	render() {
		const inputValue = this.state.unsendMessages[this.state.recipient] ? this.state.unsendMessages[this.state.recipient] : ""

		console.log('conv',this.state.conversation)
		return (
			<div className="Chat">
				<div className="Chat-users">
					 <Users
					 	user={this.props.params.userId} 
					 	users={this.state.users} 
					 	selectRecipient={this.selectRecipient}
				 	/>
				</div>
				<div className="Chat-chat">
					<div className="Chat-header">
						<h2>Welcome, {this.props.params.userId}</h2>
						<p>
							<em>Chatting with {this.state.recipient ? this.state.recipient : 'nobody'}</em>
						</p>
					</div>

					<Conversation
						className="Chat-conversation"
						ref={(node) => this.chatMessages = node}
						conversation={this.state.conversation}
						userId={this.state.user.userId}
					/>

					<Input
						className="Chat-input"
						conversation={this.state.conversation}
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