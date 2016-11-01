import React, { Component } from 'react'
import './stylesheets/components/App.scss'

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
