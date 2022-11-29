export default {

	data: function() {
		return {
			coordinates: {
				longitude: null,
				latitude: null,
			},

			isAlertShow: true
		}
	},

	watch: {
		coordinates: {
			handler: function() {
				if(localStorage.user && this.isOnline) {
					axios.post(this.routes['api.team.medrep.location.store'], this.coordinates)
						.then((response) => {
							// console.log('coordinates saved');
						})
						.catch((error) => {
							console.log(error);
						});			
				}
			},
			deep: true,
		},
	},

	methods: {
		enableGPRS: function() {
			var $this = this; 

		  	cordova.plugins.diagnostic.isLocationAuthorized(function(authorized){
		  		if(authorized) {
				    cordova.plugins.backgroundMode.enable();		
				    cordova.plugins.backgroundMode.on('activate', () => {
				    	cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
					    	setInterval(() =>  {
					    		$this.setupGeolocationWatcher();
					    	}, 2000);		
				    });
			    } else {
	    			setInterval(() =>  {
	    	    		$this.setupGeolocationWatcher();
	    	    	}, 10000);
			    }
			});
		},


		openGeolocation: function() {
		    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
		        if(canRequest){
		            cordova.plugins.locationAccuracy.request(function (success){
		                console.log("Successfully requested accuracy: "+success.message);
		            }, function (error){
		               console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
		               if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
		                   if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
		                       cordova.plugins.diagnostic.switchToLocationSettings();
		                   }
		               }
		            }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
		        }
		    });
		},


		setupGeolocationWatcher: function() {

			var $this = this;

			// onSuccess Callback
		    //   This method accepts a `Position` object, which contains
		    //   the current GPS coordinates
		    //

			function onSuccess(position) {
				$this.coordinates.latitude = position.coords.latitude;
				$this.coordinates.longitude = position.coords.longitude
			}

			// onError Callback receives a PositionError object
			function onError(error) {
				cordova.plugins.diagnostic.isLocationAuthorized(function(authorized){
			  		if(authorized) {
						alert('code: '    + error.code    + '\n' +
				              'message: ' + error.message + '\n');
					}
				});
			}

			var watchID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });
		},
	},
}