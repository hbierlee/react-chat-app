import React from 'react'
import Flexbox from 'flexbox-react'

class Users extends React.Component {
	constructor(props) {
		super(props)
		this.renderUser = this.renderUser.bind(this)
	}

	renderUser(userId, index) {
		// Don't render current user
		if (this.props.user === userId) {
			return ''
		}

		const user = this.props.users[userId]
		return (
			<li key={index}>
				<Flexbox className="Users-user" minHeight="60px">
					<button onClick={() => {this.props.selectRecipient(user.userId)}}>{user.userId}</button>
			 	</Flexbox>
			</li>
		)
	}

	render() {
		const users = this.props.users
		
		return (
			<div className="Users">
				<h2>Users</h2>
				<ul>
					<Flexbox flexDirection="column">
						{Object.keys(users).map(this.renderUser)}
					</Flexbox>
				</ul>
			</div>
		)
	}
}

export default Users