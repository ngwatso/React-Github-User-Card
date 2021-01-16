import React from "react";
import "./App.css";
import axios from "axios";

import UserCard from "./components/UserCard";

class App extends React.Component {
	//  TODO Set up constructor to store state

	// state = { userInfo: [], newUser: "", user: "" };

	constructor() {
		super();
		this.state = { userInfo: [], user: "", newUser: "" };
	}

	// TODO Mount component and do axios pull
	componentDidMount() {
		axios.get("https://api.github.com/users/ngwatso")
			.then((res) => {
				console.log(
					`nw: App.js: componentDidMount: axiosGet: res:`,
					res.data
				);
			})
			.catch((err) => console.error(`ERROR RETRIEVING DATA`, err));
	}

	// TODO Update component on state change
	componentDidUpdate(prevState) {
		if (prevState.user !== this.state.user) {
			axios.get(`https://api.github.com/users/${this.state.user}`)
				.then((res) => {
					this.state({ userInfo: res.data });
				})
				.catch((err) =>
					console.error(`USERNAME DOES NOT EXIST`, err)
				);
		}
	}

	// TODO Click handler
	handleClick = (e) => {
		this.setState({ newUser: e.target.value });
	};

	// TODO Change handler
	handleChange = (e) => {
		this.setState({
			newUser: e.target.value,
		});
	};

	render() {
		return (
			<>
				<h1>Github</h1>
				<input
					value={this.state.newUser}
					onChange={this.handleChange}
				/>
				<button onClick={this.handleClick}>Find User</button>
				<UserCard userInfo={this.state.userInfo} />
			</>
		);
	}
}

export default App;
