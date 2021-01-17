import React from "react";
import "./App.css";
import axios from "axios";

import Followers from "./components/Followers";

// import UserCard from "./components/UserCard";

class App extends React.Component {
	//  TODO Set up constructor to store state

	// state = { userInfo: [], newUser: "", user: "" };

	constructor() {
		super();
		this.state = { userInfo: [], user: "ngwatso", newUser: "ngwatso" };
	}

	// TODO Mount component and do axios pull
	componentDidMount() {
		axios.get("https://api.github.com/users/ngwatso")
			.then((res) => {
				console.log(
					`nw: App.js: componentDidMount: axiosGet: res:`,
					res.data
				);
				this.setState({ userInfo: [res.data] });
			})
			.catch((err) => console.error(`ERROR RETRIEVING DATA`, err));
	}

	// TODO Update component on state change
	// componentDidUpdate(prevState) {
	// 	if (prevState.user !== this.state.user) {
	// 		axios.get(`https://api.github.com/users/${this.state.user}`)
	// 			.then((res) => {
	// 				console.log(
	// 					`NW: APP.js: CDU: this.state.userInfo`,
	// 					res.data
	// 				);
	// 				this.state({ userInfo: res.data });
	// 			})
	// 			.catch((err) =>
	// 				console.error(`USERNAME DOES NOT EXIST`, err)
	// 			);
	// 	}
	// }

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
				<div className="container">
					<h1>{`Github User Id - ${this.state.user}`}</h1>
					{/* <input
					value={this.state.newUser}
					onChange={this.handleChange}
				/>
				<button onClick={this.handleClick}>Find User</button> */}
					{/* <UserCard userInfo={this.state.userInfo} /> */}
					{this.state.userInfo.map((user) => {
						return (
							<div key={user.id} className="user-img-info">
								<div className="img">
									<img
										src={user.avatar_url}
										alt={user.login}
									/>
								</div>
								<div className="user-info">
									<div className="name">
										Name: {user.name}
									</div>
									<div className="location">
										Location: {user.location}
									</div>
									<div className="bio">
										Bio: {user.bio}
									</div>
									<div className="user-home">
										{`${user.login}'s Homepage: `}
										{user.html_url}
									</div>
									<div className="user-repos">
										{`${user.login}'s Repos: `}
										{user.repos_url}
									</div>
									<div className="following">
										Following: {user.following}
									</div>
									<div className="followers">
										Followers: {user.followers}
									</div>
								</div>
								<Followers key={user.followers.id} />
							</div>
						);
					})}
				</div>
			</>
		);
	}
}

export default App;
