export default {
	computed:{
		routes() {
			return this.getItem('routes');
		},

        getCalls() {
            return this.$store.state.resources.calls;
        },
        cordova() {
            if(window.hasOwnProperty('cordova')) {
                return true;
            }
        }
	},
    
	methods: {

        /*
        |--------------------------------------------------------------------------
        | @Methods
        |--------------------------------------------------------------------------
        */

        fetchResources: function(callback) {

            return new Promise((resolve, reject) => {
                this.$PRX.resourceManager.registerAll(['calls', 'doctors', 'specializations', 'regions', 'reports', 'announcements'], {
                    url: this.routes['api.team.fetch.config.storable'],
                    method: 'post'
                }).then((response) => {

                    localStorage.setItem("dataResource", JSON.stringify(this.$PRX.resourceManager.resources));
                    this.$store.commit("resources/setCalls", this.dataResource("calls"));
                    resolve('success');

                }).catch((error) => {
                    reject(error);
                })
            });

        },

        dataResource(resource) {
            return this.$PRX.resourceManager.fetch(resource);
        },

        staticImage(img) {
            return this.$PRXConfig().staticUrl(img)
        },

        dynamicImage(img) {
            return this.$PRXConfig().api.url+'/'+img;
        },

        goToID: function(route, id) {
            var path = route + '/' + id;
            console.log(path);
            
            this.$router.push(path);
        },

		getItem(key) {
			return JSON.parse(window.localStorage.getItem(key));
		},

		setItem(key, value) {
			return window.localStorage.setItem(key, JSON.stringify(value));
		},

        /**
         * Fetch call lists
         * 
         */
        fetchCalls() {

            let calls = [],
                query = "SELECT * FROM calls WHERE display=?";
            calls = this.$store.state.resources.calls;
            
            this.$nextTick(() => {

                /** Fetch calls from storage */
                this.get(query, ['true'])
                    .then((response) => {
                        calls = calls.concat(response);
                        this.calls = calls;                     
                    }).catch((error) => {
                        console.log(error);
                    });
            });

        },

        /**
         * Find doctor
         * 
         * @param  int id
         * @return Object
         */
        findDoctor(id) {
            let doctors = this.dataResource('doctors');
            doctors = doctors.filter((doctor) => {
                return doctor.id == id;
            });
            return doctors[0];
        },

        /**
         * Find array
         * 
         * @param  array array
         * @param  string key
         */
        findArray(array, key) {
            array.forEach((object) => {
                if(object.id == key) {
                    return true;
                }
            });
        },

        /*
        |--------------------------------------------------------------------------
        | @Renders
        |--------------------------------------------------------------------------
        */
       
        /**
         * Render date
         * @param  datetime date
         * 
         * @param   format
         */
        renderDate(date, format) {
            return moment(date).format(format);
        },

        /**
         * Render call status 
         * 
         * @param  object call
         */
        renderStatus(call) {

            if(call.status === 0) {
                return 'Pending for Approval';              
            }

            if(call.status === 1) {
                return 'Approved';
            }

            if(!call.status) {
                return 'Created in offline';
            }
        },

        /*
        |--------------------------------------------------------------------------
        | @Checkers
        |--------------------------------------------------------------------------
        */

        /**
         * Check if app is online
         * 
         */
        isOnline() {
            if(this.cordova && navigator.connection.type !== 'none') {
                return true;
            }
        },

	},
}