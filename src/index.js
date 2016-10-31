import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App'
import Login from './components/Login'
import Chat from './components/Chat'
import './index.css'

const Root = () => {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Login} />
				<Route path="/user/:userId" component={Chat} />
			</Route>
		</Router>
	)
}

ReactDOM.render(
	<Root />,
	document.getElementById('root')
)
