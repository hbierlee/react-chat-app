import React from 'react'

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
			<div key={index}>
				<div className="Users-user">
					<button onClick={() => {this.props.selectRecipient(user.userId)}}>{user.userId}</button>
			 	</div>
			</div>
		)
	}

	render() {
		const users = this.props.users
		
		return (
			<div className="Users">
				<h2>Users</h2>
				<div>
					{Object.keys(users).map(this.renderUser)}
				</div>
			</div>
		)
	}
}

export default Users