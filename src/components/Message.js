import React, { Component } from 'react';
import moment from 'moment'
import classNames from 'classnames'
import '../stylesheets/components/Message.scss'

class Message extends Component {
	render() {
		const {message, index} = this.props
		// parse unix timestamp String in miliseconds
		const timeFromNow = moment(message.timestamp, 'x').fromNow()
		
		console.log(this.props.messageByUser)
		const className = classNames(
			'Message',
			{messageByUser: this.props.messageByUser},
			{messageByRecipient: !this.props.messageByUser},
			)

		return (
			<li className={className}>
				<p>
					{message.content}
				</p>
			</li>
		);
	}
}

/*
<span className="Chat-message-from">
	{message.from}:&nbsp;
</span>
<span className="Chat-message-content">
	{message.content}&nbsp;
</span>
<span className="Chat-message-time">
	[{timeFromNow}]
</span>
*/

export default Message