'use strict';

/* Magic Mirror
 * Module: MMM-Tesla
 *
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
var request = require('request');
var moment = require('moment');
var accessToken = null;
module.exports = NodeHelper.create({


	start: function() {
		this.started = false;
		this.config = null;
		this.drivestate_data = null;
		this.charge_data = null;
		accessToken = null;
	},


	getData: function() {
		var self = this;	

	// Set the configuration settings
	const credentials = {
	  client: {
	    id: this.config.client_id,
	    secret: this.config.client_secret
	  },
	  auth: {
	    tokenHost: 'https://owner-api.teslamotors.com/oauth/token'
	  },
	  http: {
	  	headers: { 'User-Agent': 'MMM-Tesla' }
	  }
	};

	// Initialize the OAuth2 Library
	const oauth2 = require('simple-oauth2').create(credentials);
	// Get the access token object.
	const tokenConfig = {
	  email: this.config.email,
	  password: this.config.password,
	  grant_type: 'password'
	};

	const vehicle_id = this.config.vehicle_id;
	const base_data_url = 'https://owner-api.teslamotors.com/api/1/vehicles/' + vehicle_id;

	oauth2.ownerPassword.getToken(tokenConfig, (error, result) => {
		  if (error) {
		    return console.log('Access Token Error: ', error.message);
  		  }
  		  if (!accessToken) {
  		  	accessToken = oauth2.accessToken.create(result);
  		  } else if (accessToken.expired()) {
  		  	// Callbacks
  				accessToken.refresh((error, result) => {
    				accessToken = result;
  				})
  		  }
		  console.log (accessToken);
			request({
				url: base_data_url + '/data_request/charge_state',
				method: 'GET',
				headers: { 'Authorization': "Bearer " + accessToken.token.access_token, 'Content-type': "application/json; charset=utf-8", 'User-Agent': 'MMM-Tesla' }
			}, function (error, response, body) {
	  			console.log('body:', body); // Print the HTML 
				if (!error && response.statusCode == 200) {
					self.charge_data = body;
					self.sendSocketNotification("CHARGE_DATA", body);
				        console.log(accessToken);	
					request({
						url: base_data_url + '/data_request/drive_state',
						method: 'GET',
						headers: { 'Authorization': "Bearer " + accessToken.token.access_token, 'Content-type': "application/json; charset=utf-8" }
					}, function (error, response, body) {
						console.log('body2:', body);
						self.drivestate_data = body;
						if (!error && response.statusCode == 200) {
							self.sendSocketNotification("DRIVESTATE_DATA", body);
						}
					})
				} else {
					console.log('Error: ' + error)
				}
			})
		})
		setTimeout(function() { self.getData(); }, this.config.refreshInterval); 
	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === 'CONFIG' && self.started == false) {
			self.config = payload;
			self.sendSocketNotification("STARTED", true);
			self.getData();
			self.started = true;
		} else if (notification == 'CONFIG') {
			self.sendSocketNotification("CHARGE_DATA", self.charge_data);
			self.sendSocketNotification("DRIVESTATE_DATA", self.drivestate_data);
		}
	}
});
