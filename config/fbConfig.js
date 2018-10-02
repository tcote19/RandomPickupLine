module.exports = {
	clientSecret:"dd6c3e5f87ece76d074b99d33e46e290",
	getProfileURL:function(accessToken){
		return 'https://graph.facebook.com/me?fields=id,name,picture,gender&access_token='+accessToken+'&client_secret=dd6c3e5f87ece76d074b99d33e46e290&client_id=576501639372036'
	}
}