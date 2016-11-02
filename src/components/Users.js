import React from 'react'
import '../stylesheets/components/Users.scss'

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
		console.log({userId})
		return (
			<div className="Users-user"
				key={index}
				onClick={() => {this.props.selectRecipient(user.userId)}}>
				{user.userId}
			</div>
		)
	}

	render() {
		const users = this.props.users
		
		return (
			<div className="Users">
				<h2>Users</h2>
				<div className="Users-users">
					{Object.keys(users).map(this.renderUser)}
				</div>
			</div>
		)
	}
}

export default Users