import React from "react";
import axios from "axios";

// const Followers = (props) => {
class Followers extends React.Component {
	constructor() {
		super();
		this.state = { followers: [] };
	}

	// // TODO Mount component
	componentDidMount() {
		axios.get("https://api.github.com/users/ngwatso/followers")
			.then((res) => {
				console.log(`NW: Followers.js: CDM: res:`, res.data);
				this.setState({ followers: [res.data] });
			})
			.catch((err) => console.error(`FOLLOWERS NOT FOUND`, err));
	}

	render() {
		return (
			<>
				{/* <h2>"Followers"</h2> */}
				{/* {props.user.map((follower) => { */}
				{this.state.followers.map((follower) => {
					return (
						<div key={follower.id}>
							<img
								src={follower.avatar_url}
								alt={follower.login}
							/>
							<div className="name">
								Name: {follower.name}
							</div>
							<div className="location">
								Location: {follower.location}
							</div>
							<div className="bio">
								Bio: {follower.bio}
							</div>
							<div className="following">
								Following: {follower.following}
							</div>
							<div className="followers">
								Followers: {follower.followers}
							</div>
						</div>
					);
				})}
			</>
		);
	}
}

export default Followers;
