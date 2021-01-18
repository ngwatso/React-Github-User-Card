import React from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
class Followers extends React.Component {
	constructor() {
		super();
		this.state = { followers: [] };
	}

	// TODO Mount component
	componentDidMount() {
		axios.get(
			`https://api.github.com/users/${this.props.newUser}/followers`
		)
			.then((res) => {
				console.log(`NW: Followers.js: CDM: res:`, res.data.login);
				this.setState({ followers: res.data });
			})
			.catch((err) => console.error(`FOLLOWERS NOT FOUND`, err));
	}

	render() {
		console.log("props", this.props.user, this.props.newUser, this.props);
		console.log("followers", this.props.userInfo);
		return (
			<>
				<h2>Followers</h2>

				<div className="container-follower">
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
											<a
												href={
													follower.html_url
												}
											>
												{follower.html_url}
											</a>
										</Router>
									</div>
									<div className="repos">
										{`${follower.login}'s Repositories: `}
										<Router>
											<a
												href={`https://github.com/${follower.login}?tab=repositories`}
											>
												{`https://github.com/${follower.login}/repos`}
											</a>
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
