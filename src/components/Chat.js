import React from 'react'
import Contacts from './Contacts'

class Chat extends React.Component {
	render() {
		return (
			<div className="chat">
				<p>Chat</p>

				<Contacts />
			</div>
		)
	}
}

export default Chat