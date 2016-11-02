import React, { Component } from 'react'
import '../stylesheets/components/Input.scss'

class Input extends Component {
	render() {
		console.log(this.props.disabled)
		return (
			<form className="Input" onSubmit={this.props.submitHandler}>
				<input
					type="text"
					className="Chat-input"
					onChange={this.props.inputChangeHandler}
					value={this.props.inputValue}
					disabled={this.props.disabled}
				/>

				<button
					className="Chat-send"
					type="submit"
					disabled={this.props.disabled}>
					Send
				</button>
			</form>
		)
	}
}

export default Input