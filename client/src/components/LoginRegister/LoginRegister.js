import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import userAPI from "../../utils/userAPI";
import "./LoginRegister.css";

class LoginRegister extends Component {

  state = {
    emailLogin: "",
    passwordLogin: "",
    displayNameRegister: "",
    emailRegister: "",
    passwordRegister: "",
    password2Register: "",
    loginErrors:[],
    registerErrors:[],
    registerSuccess:"",
    redirect:false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleLoginSubmit = (event) => {
    //Stops page from reloading
    event.preventDefault();
    //Make user credentials object with just the values we need
    const userCreds = {
      email:this.state.emailLogin,
      password:this.state.passwordLogin
    }
    console.log(userCreds);
    userAPI.authenticateUser(userCreds).then(res=>{
      console.log(res);
      if(res.data.token){
        //Sets credentials in local storage
        localStorage.setItem('jwt',res.data.token);
        this.props.loggedInTrue();
      }
      else if(res.data.errors){
        this.setState({loginErrors:res.data.errors})
      }
    })
  };

  handleRegisterSubmit = event => {
    event.preventDefault();
    if(this.state.passwordRegister !== this.state.password2Register){
      this.setState({registerErrors:["Passwords do not match"]},()=>{
        console.log('passwords do not match');
      })
    }
    else{

      const userInfo = {
        displayName:this.state.displayNameRegister,
        email:this.state.emailRegister,
        password:this.state.passwordRegister,
      }
      console.log(userInfo);
      userAPI.registerUser(userInfo).then(res=>{
        console.log(res);
        if(res.data.errors){
          this.setState({registerErrors:res.data.errors})
        }
        else{
          userAPI.authenticateUser(userInfo).then(res=>{
            console.log(res);
            if(res.data.token){
              //Sets credentials in local storage
              localStorage.setItem('jwt',res.data.token);
              console.log(res.data.user);
            }
            else if(res.data.errors){
              console.log(res.data.errors);
              this.setState({registerErrors:res.data.errors})
            }
          })
        }
      }).catch(err => console.log(err));
    }
  };

  handleGetProfile = event => {
    event.preventDefault();
    if(localStorage.jwt){
      userAPI.getProfileInfo(localStorage.jwt).then(res=>{
        console.log(res.data.user);
      })
    }
    else{
      console.log('no jwt');
    }
  }

  render() {
    return (
      <div className="container">

              <form>
                <div>displayName</div>
                <input 
                  type="text" 
                  id="inputdisplayName" 
                  className="form-control" 
                  placeholder="displayName"
                  required 
                  autoFocus
                  onChange={this.handleInputChange}
                  name="emailLogin"
                  value={this.state.displayNameLogin}
                />
                <div>Password</div>
                <input 
                  type="password" 
                  id="inputPassword" 
                  className="form-control" 
                  placeholder="Password" 
                  required 
                  onChange={this.handleInputChange}
                  name="passwordLogin"
                  value={this.state.passwordLogin}
                />
              </form>
                <button 
                    className="btn btn-lg btn-primary btn-block btn-signin" 
                    type="submit" 
                    onClick={this.handleLoginSubmit}
                  >
                    Log in
                  </button>
                {this.state.loginErrors.length > 0 ? <div className="smol-top-margin text-center">{this.state.loginErrors.map((error,i)=>{return(<div className="error-text" key={i}>{error}</div>)})}</div>:""}

              <form>
                <div>displayName</div>
                <input 
                  type="text" 
                  id="inputdisplayNameRegister" 
                  className="form-control" 
                  placeholder="displayName" 
                  required 
                  autoFocus 
                  onChange={this.handleInputChange}
                  name="displayNameRegister"
                  value={this.state.displayNameRegister}
                />
                <div>Email</div>
                <input 
                  type="email" 
                  id="inputEmailRegister" 
                  className="form-control" 
                  placeholder="Email" 
                  required 
                  onChange={this.handleInputChange}
                  name="emailRegister"
                  value={this.state.emailRegister}
                />
                <div className="mobile-form-text">Password</div>
                <input 
                  type="password" 
                  id="inputPasswordRegister" 
                  className="form-control" 
                  placeholder="Password" 
                  required 
                  onChange={this.handleInputChange}
                  name="passwordRegister"
                  value={this.state.passwordRegister}
                />
                <div className="mobile-form-text">Confirm Password</div>
                <input 
                  type="password" 
                  id="inputPassword2Register" 
                  className="form-control" 
                  placeholder="Confirm Password" 
                  required 
                  onChange={this.handleInputChange}
                  name="password2Register"
                  value={this.state.password2Register}
                />

              </form>
                <button 
                  className="btn btn-lg btn-primary btn-block btn-signin" 
                  type="submit"
                  onClick={this.handleRegisterSubmit}
                >
                  Register
                </button>
                {this.state.registerErrors.length > 0 ? <div className="smol-top-margin text-center">{this.state.registerErrors.map((error,i)=>{return(<div className="error-text" key={i}>{error}</div>)})}</div>:""}
                <button 
                  className="btn btn-lg btn-primary btn-block btn-signin"
                  onClick={this.handleGetProfile}
                >
                  Get Profile
                </button>
      </div>
    );
  }
}

export default LoginRegister;

// <div className="text-center">
//   {this.props.loggedIn}
//   <div className="container">
//   {this.state.errors.length > 0 ? this.state.errors.map((item,i)=>{return(<p key={i}>{item}</p>)}):""}
//   <p className="max-center">Login</p>
//   <form>
//     <div>
//       <input 
//         name="displayName"
//         onChange={this.handleInputChange}
//         value={this.state.displayName}
//         placeholder="displayName"
//       />
//     </div>
//     <div>
//       <input 
//         name="password"
//         onChange={this.handleInputChange}
//         value={this.state.password}
//         placeholder="password"
//         type="password"
//       />
//     </div>
//     <button className="button-login" onClick={this.handleFormSubmit}>Login</button>
//   </form>
//   </div>
//   <button className="register-button" onClick={this.registerButton}>Register</button>
// </div>