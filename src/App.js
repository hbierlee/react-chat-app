import React, { Component } from 'react'
import Header from './components/Header'
import './stylesheets/components/App.scss'

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
			
				{ React.cloneElement(this.props.children, this.props) }
			</div>
		)
	}
}

export default App
