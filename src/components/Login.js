import React from 'react'

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)

		this.state = {userId: "Henk"}
	}

	handleChange(event) {
		const userId = event.target.value
		this.setState({userId})
	}

	handleSubmit(event) {
		event.preventDefault()
		this.context.router.push(`/user/${this.state.userId}`)
	}

	render() {
		return (
			<div className="Login">
				<p>Login</p>
				<form className="Login-form" onSubmit={this.handleSubmit}>
					<input type="text" required placeholder="Name" defaultValue="Henk" onChange={this.handleChange}/>
					<button type="submit">Login</button>
				</form>
			</div>
		)
	}
}

Login.contextTypes = {
	router: React.PropTypes.object
}

export default Login