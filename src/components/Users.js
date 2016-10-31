import React from 'react'

class Users extends React.Component {
	constructor(props) {
		super(props)
		this.renderUser = this.renderUser.bind(this)
	}

	renderUser(userId, index) {
		const user = this.props.users[userId]
		return (
			<li key={index}>
				{user.userId}
			</li>
		)
	}

	render() {
		const users = this.props.users
		
		return (
			<div className="Users">
				<h2>Users</h2>
				<ul>
					{Object.keys(users).map(this.renderUser)}
				</ul>
			</div>
		)
	}
}

export default Users