Facebook login flow

Utilize react-facebook-login in react to get access ID token from facebook
Send the login information back to the server
Server will then use facebook's graphAPI to get some sort of valid response
If the response is valid, server will sign a JSON Web Token and send that back to the front end
Front end will save the JWT in the local storage or cookies and use that for rating and posting new pickup lines