import React, {Component} from "react";
import Main from "../../components/Main";

import FBLogin from "../../components/FBLogin";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

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
				<Navbar />
				<div className="container">

				</div>
				<Main />

				<Footer />
			</div>
		)
	}
}

export default Home;