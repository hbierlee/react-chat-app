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
		return (
			<div className="Users-entry"
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
				<div className="Users-header">
					<h2>Users</h2>
				</div>
				<div className="Users-list">
					{Object.keys(users).map(this.renderUser)}
				</div>
			</div>
		)
	}
}

export default Users