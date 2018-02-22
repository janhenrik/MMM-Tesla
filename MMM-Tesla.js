/* global Module */

/* Magic Mirror
 * Module: MMM-Tesla
 *
 * By Jan Henrik Gundelsby
 * MIT Licensed.
 */

Module.register("MMM-Tesla",{

	defaults: {
		refreshInterval: 1000 * 60 * 60, //refresh every hour
		updateInterval: 1000 * 3600, //update every hour
		timeFormat: config.timeFormat,
		lang: config.language,

		initialLoadDelay: 0, // 0 seconds delay
		retryDelay: 2500,

	},
	
	// Define required scripts.
	getScripts: function() {
		return [];
	},
	
	getStyles: function() {
		return [];
	},

	start: function() {
		Log.info('Starting module: ' + this.name);
		this.loaded = false;
		this.sendSocketNotification('CONFIG', this.config);
	},

	getDom: function() {
		console.log('getDom() - ' + this.battery_level );
		var wrapper = document.createElement("div");

		if (!this.loaded) {
			wrapper.innerHTML = this.translate('LOADING');
			return wrapper;
		}		
		
		if (!this.battery_level) {
			wrapper.innerHTML = "No data";
			return wrapper;
		}

    	var iframe = document.createElement("iframe");
    	iframe.src='https://www.google.com/maps/embed/v1/place?key=' + this.config.google_api_key + '&q=' + this.latitude + ',' + this.longitude + '&zoom=8'
    	iframe.width="200";
    	iframe.height="150";
    	iframe.style="border:0";
    	wrapper.appendChild(iframe);

		var textElement = document.createElement("div");
       	textElement.innerHTML = '<b>Tesla</b><br/>Charging state: ' + this.charging_state + ' - Battery level: ' + 
			this.battery_level + '% - ' + 'Drive state: ' + this.shift_state;
       	wrapper.appendChild(textElement);		

		return wrapper;
	},

	processChargeData: function(data) {
		console.log('processChargeData');
		console.log(data);
		if (!data.battery_level) {
			return;
		}
		
		this.battery_level = data.battery_level;
		this.charging_state = data.charging_state;
	
		return;
	},
	
	processDrivestateData: function(data) {
		console.log('processDrivestateData');
		console.log(data);
		if (!data.latitude) {
			return;
		}
		this.shift_state = data.shift_state;
		this.latitude = data.latitude;
		this.longitude = data.longitude;
	
		return;
	},

 	socketNotificationReceived: function(notification, payload) {
    		if (notification === "STARTED") {
				this.updateDom();
			}
			else if (notification === "CHARGE_DATA") {
				this.loaded = true;
				this.processChargeData(JSON.parse(payload).response);
				this.updateDom();
    		}
			else if (notification === "DRIVESTATE_DATA") {
				this.loaded = true;
				this.processDrivestateData(JSON.parse(payload).response);
				this.updateDom();
    		}
	} 	

});

