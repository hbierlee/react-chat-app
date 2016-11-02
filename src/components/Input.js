import React, { Component } from 'react'
import '../stylesheets/components/Input.scss'

class Input extends Component {
	render() {
		return (
			<form className="Input">
				<textarea
					className="Input-textarea"
					type="text"
					onChange={this.props.inputChangeHandler}
					value={this.props.inputValue}
					disabled={this.props.disabled}
					placeholder="Type your message here.."
					rows="3"
					onKeyUp={(e) => {e.key === 'Enter' ? this.props.submitHandler() : null}}
				/>

				<button
					className="Input-button"
					type="submit"
					onClick={this.props.submitHandler}
					disabled={this.props.disabled}>
					Send
				</button>
			</form>
		)
	}
}

export default Input