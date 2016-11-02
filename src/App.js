import React, { Component } from 'react'
import './stylesheets/components/App.scss'

class App extends Component {
	render() {
		return (
			<div className="App">
				<div element="header" height="60px">
					<h1>💬&nbsp;React chat app</h1>
				</div>

				<div>
					{ React.cloneElement(this.props.children, this.props) }
				</div>

				<div element="footer" height="60px">
					<p>By Henk Bierlee</p>
				</div>
			</div>
		)
	}
}

export default App
