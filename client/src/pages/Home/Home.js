import React, {Component} from "react";
import Main from "../../components/Main";
// import LoginRegister from "../../components/LoginRegister";
import FBLogin from "../../components/FBLogin";

class Home extends Component {
	state = {
		loggedIn: false
	}

	loggedInTrue = ()=>{
		this.setState({loggedIn:true});
		console.log('logged in true');
		console.log(this.state);
	}

	render(){
		return (
			<div>
				<div className="container">
					<FBLogin />
				</div>
				<Main />
			</div>
		)
	}
}

export default Home;