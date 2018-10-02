import axios from "axios";

export default {
  // registerUser: function(userData) {
  //   return axios.post("/users/register", userData);
  // },
  // authenticateUser: function(userData) {
  //   return axios.post("/users/authenticate", userData);
  // },
  // checkLoggedIn: function(token){
  //   return axios.get("/users/profile",{headers:{'Authorization':token}})
  // },
  // getProfileInfo: function(token){
  // 	return axios.get("/users/profile",{headers:{'Authorization':token}})
  // },
  fbLogin: function(accessToken){
    return axios.post("/fblogin/login",accessToken)
  },
  fbGetStuff: function(accessToken){
    return axios.post("/fblogin/getstuff",accessToken)
  }
};
