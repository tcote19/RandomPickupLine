import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import userAPI from "../../utils/userAPI";

class FBLogin extends Component {
	responseFacebook(response){
		const tempObj = {
			accessToken:response.accessToken
		}
		userAPI.fbLogin(tempObj).then(res=>{
			console.log(res);
			localStorage.accessToken = JSON.parse(res.data.res).access_token;
		})
	}

	getStuff(){
		console.log('Getting stuff');
		const tempObj = {
			accessToken:localStorage.accessToken
		}
		userAPI.fbGetStuff(tempObj).then(res=>{
			const profile = JSON.parse(res.data.profile);
			console.log(profile);
		});
	}

	render(){
		return(
			<div>
				<FacebookLogin
					appId="576501639372036"
					autoLoad={false}
					fields="name,picture"
					scope="public_profile,user_gender"
					callback={this.responseFacebook}
				/>
				<button
					onClick={this.getStuff}
					className="btn blue white-text"
				>
				Get Stuff
				</button>
			</div>

		)
	}
}

export default FBLogin;