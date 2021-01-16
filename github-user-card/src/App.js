import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
	//  TODO Set up constructor to store state

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

	render() {
		return (
			<>
				<h1>Github</h1>
				<input
					value={this.state.newUser}
					onChange={this.handleChange}
				/>
			</>
		);
	}
	// return <div className="App"></div>;
}

export default App;
