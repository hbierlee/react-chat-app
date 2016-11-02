import React, { Component } from 'react'
import './stylesheets/components/App.scss'

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="header">
					<h1>💬&nbsp;React chat app</h1>
				</div>

				{ React.cloneElement(this.props.children, this.props) }

				<div className="footer">
					<p>By Henk Bierlee</p>
				</div>
			</div>
		)
	}
}

export default App
