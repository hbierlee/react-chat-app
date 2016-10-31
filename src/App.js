import React, { Component } from 'react'
import './App.css'

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h2>Welcome to this React chat app</h2>
				</div>

				{ React.cloneElement(this.props.children, this.props) }
			</div>
		)
	}
}

export default App
