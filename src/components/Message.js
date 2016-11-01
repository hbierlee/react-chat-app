import React, { Component } from 'react';
import moment from 'moment'

export class Message extends Component {
	render() {
		const {message, index} = this.props

		// parse unix timestamp String in miliseconds
		const timeFromNow = moment(message.timestamp, 'x').fromNow()
		return (
			<li className="Chat-message" key={index}>
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
