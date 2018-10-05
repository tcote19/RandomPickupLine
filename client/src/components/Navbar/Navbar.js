import React, {Component} from "react";
import "./Navbar.css";

class Navbar extends Component {
	state = {

	}

	componentDidMount(){

	}

	render(){
		return (
		<div>
			<div className="navbar-fixed" id="navbar-main">
				<nav className="black darken-4">
					<div className="container">
						<div className="nav-wrapper">
							<a href="#home" className="brand-logo">line ^</a>
							<a href="#" data-target="mobile-nav" className="sidenav-trigger">
								<i className="material-icons">menu</i>
							</a>
							<ul className="right hide-on-med-and-down">
								<li>
									<a href="#science">Science</a>
								</li>
								<li>
									<a href="#technologies">Technologies</a>
								</li>
								<li>
									<a href="#referrals">Referrals</a>
								</li>
								<li>
									<a href="#portfolio">Portfolio</a>
								</li>
								<li>
									<a href="#contact">Contact</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
			<ul className="sidenav" id="mobile-nav">
				<li>
					<a href="#home">Home</a>
				</li>
				<li>
					<a href="#technologies">Technologies</a>
				</li>
				<li>
					<a href="#referrals">Referrals</a>
				</li>
				<li>
					<a href="#portfolio">Portfolio</a>
				</li>
				<li>
					<a href="#contact">Contact</a>
				</li>
			</ul>
		</div>
		)
	}
}

export default Navbar;