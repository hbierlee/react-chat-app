import React, { Component } from 'react';
import classNames from 'classnames'
import '../stylesheets/components/Message.scss'
// import moment from 'moment'

class Message extends Component {
	render() {
		const message = this.props.message

		// parse unix timestamp String in miliseconds
		// const timeFromNow = moment(message.timestamp, 'x').fromNow()
		
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

export default Message