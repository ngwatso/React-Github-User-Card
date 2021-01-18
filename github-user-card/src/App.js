import React from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

import Followers from "./components/Followers";

class App extends React.Component {
	//  TODO Set up constructor to store state

	constructor() {
		super();
		this.state = { userInfo: [], user: "", newUser: "" };
	}

	// TODO Mount component and do axios pull
	componentDidMount() {
		axios.get(`https://api.github.com/users/${this.state.user}`)
			.then((res) => {
				console.log(
					`nw: App.js: componentDidMount: axiosGet: res:`,
					res.data
				);
				this.setState({ userInfo: [res.data] });
			})
			.catch((err) => console.error(`ERROR RETRIEVING DATA`, err));
	}

	// TODO Change handler
	handleChange = (e) => {
		this.setState({
			newUser: e.target.value,
		});
	};

	// TODO Click handler
	handleClick = (e) => {
		this.setState({ user: this.state.newUser });
	};

	// TODO Update component on state change
	componentDidUpdate(prevProps, prevState) {
		if (prevState.user !== this.state.user) {
			axios.get(`https://api.github.com/users/${this.state.user}`)
				.then((res) => {
					console.log(
						`NW: APP.js: CDU: this.state.userInfo`,
						res.data
					);
					this.setState({ userInfo: [res.data] });
				})
				.catch((err) =>
					console.error(`USERNAME DOES NOT EXIST`, err)
				);
		}
	}

	render() {
		return (
			<>
				<div className="input-btn">
					<input
						placeholder={`Enter Github User Id`}
						value={this.state.newUser}
						onChange={this.handleChange}
					/>
					<button onClick={this.handleClick}>Find User</button>
				</div>
				<h1>{`Github User Id - ${this.state.newUser}`}</h1>
				<div className="container-user">
					{this.state.userInfo.map((user) => {
						return (
							<div key={user.id} className="user-img-info">
								<div className="user-section">
									<div className="user-img">
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
											<Router>
												<a
													href={
														user.html_url
													}
												>
													{user.html_url}
												</a>
											</Router>
										</div>
										<div className="user-repos">
											{`${user.login}'s Repositories: `}
											<Router>
												<a
													href={`https://github.com/${user.login}?tab=repositories`}
												>
													{`https://github.com/${user.login}/repos`}
												</a>
											</Router>
										</div>
										<div className="following">
											Following:{" "}
											{user.following}
										</div>

										<div className="followers">
											Followers:{" "}
											{user.followers}
										</div>
									</div>
								</div>
								<h2>
									Github Contributions in the Last
									Year
								</h2>
								<div className="github-graph">
									<img
										className="graph"
										src={`https://grass-graph.moshimo.works/images/${user.login}.png`}
									/>
								</div>

								<Followers
									userInfo={this.state.userInfo}
									user={this.state.user}
									newUser={this.state.newUser}
								/>
							</div>
						);
					})}
				</div>
			</>
		);
	}
}

export default App;
