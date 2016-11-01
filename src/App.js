import React, { Component } from 'react'
import './stylesheets/components/App.scss'
import Flexbox from 'flexbox-react'

class App extends Component {
	render() {
		return (
			<Flexbox flexDirection="column" className="App" justifyContent="space-around">
				<Flexbox element="header" height="60px">
					<h1>💬&nbsp;React chat app</h1>
				</Flexbox>

				<Flexbox>
					{ React.cloneElement(this.props.children, this.props) }
				</Flexbox>

				<Flexbox element="footer" height="60px">
					<p>By Henk Bierlee</p>
				</Flexbox>
			</Flexbox>
		)
	}
}

export default App
