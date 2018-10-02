import axios from "axios";

export default {
  newPickupLine: function(data){
    return axios.post("/pickuplines/new",data);
  },
  randomPickupLine: function(){
    return axios.get("/pickuplines/random");
  }
}