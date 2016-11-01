import React, { Component } from 'react';
import moment from 'moment'
import '../stylesheets/components/Message.scss'

class Message extends Component {
	render() {
		const {message, index} = this.props
		// parse unix timestamp String in miliseconds
		const timeFromNow = moment(message.timestamp, 'x').fromNow()
		
		return (
			<li className="Message">
				<span className="Chat-message-from">
					{message.from}:&nbsp;
				</span>
				<span className="Chat-message-content">
					{message.content}&nbsp;
				</span>
				<span className="Chat-message-time">
					[{timeFromNow}]
				</span>
			</li>
		);
	}
}

export default Message