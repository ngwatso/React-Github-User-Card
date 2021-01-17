import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";

// const Followers = (props) => {
class Followers extends React.Component {
	constructor() {
		super();
		this.state = { followers: [] };
	}

	// TODO Mount component
	componentDidMount() {
		axios.get("https://api.github.com/users/ngwatso/followers")
			.then((res) => {
				console.log(`NW: Followers.js: CDM: res:`, res.data);
				this.setState({ followers: res.data });
			})
			.catch((err) => console.error(`FOLLOWERS NOT FOUND`, err));
	}

	render() {
		return (
			<>
				<h2>Followers</h2>
				<div className="container-follower">
					{/* {props.user.map((follower) => { */}
					{this.state.followers.map((follower) => {
						return (
							<div
								key={follower.id}
								className="follower-img-info"
							>
								<div className="follower-img-container">
									<img
										className="img-follower"
										src={follower.avatar_url}
										alt={follower.login}
									/>
								</div>
								<div className="follower-info">
									<div className="user-id">
										User Id: {follower.login}
									</div>
									<div className="home-page">
										{`${follower.login}'s Homepage: `}
										<Router>
											<Link
												to={
													follower.html_url
												}
											>
												{follower.html_url}
											</Link>
										</Router>
									</div>
									<div className="repos">
										{`${follower.login}'s Repos: `}
										<Router>
											<Link
												to={
													follower.repos_url
												}
											>
												{follower.repos_url}
											</Link>
										</Router>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</>
		);
	}
}

export default Followers;
