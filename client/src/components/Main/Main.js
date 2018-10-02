import React, {Component} from "react";
import "./Main.css";
import pickupLineAPI from "../../utils/pickupLineAPI.js";
import Preloader from "../Preloader";

class Main extends Component{

	state={
		pickupLineInput:"",
		pickupLineDisplay:"Random Pickup Line Goes Here",
		pickupLineRating:"",
		loading:false
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	}

	randomPickupLine = event => {
		if(!this.state.loading){
			console.log('clicked');
			this.setState({
				loading:true
			})
			pickupLineAPI.randomPickupLine().then(res=>{
				console.log(res.data);
				this.setState({pickupLineDisplay:res.data.pickupLine.text})
				const loadTimer = setTimeout(()=>{
					this.setState({loading:false})
				},250)
			});
		}
	}

	submitPickupLine = event => {
		event.preventDefault();
		if(this.state.pickupLineInput.length){
			const data = {
				accessToken:localStorage.accessToken,
				pickupLine:this.state.pickupLineInput
			}
			pickupLineAPI.newPickupLine(data).then(dbRes => {
				console.log(dbRes);
			});
		}
	}

	render(){
		return(
			<section className="section red center">
				<div className="container">
					<div className="row no-margin">
						{!this.state.loading?this.state.pickupLineDisplay:<Preloader/>}
					</div>
				</div>
				<button
					className="btn btn-primary"
					onClick={this.randomPickupLine}
				>
					Random
				</button>
				<div className="row">
					<div className="col s6 offset-s3">
						<form>
							
								<textarea
									value={this.state.pickupLineInput}
									onChange={this.handleInputChange}
									name="pickupLineInput"
									className="materialize-textarea"
									placeholder="Poop"
								>
								</textarea>
								<button
									onClick={this.submitPickupLine}
									type="submit"
								>
									Submit
								</button>
							
						</form>
					</div>
				</div>
			</section>
		)
	}
}

export default Main;