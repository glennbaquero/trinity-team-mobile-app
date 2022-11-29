import './bootstrap.js'

import Vue from 'vue'
import vuetify from '@/plugins/vuetify'

import App from './App.vue'
import router from './router'
import store from './store'

import PRXVuetifyComponents from '@praxxys/vuetify-components'
import PRXVueUtils from '@praxxys/vue-utils'

import VeeValidate from 'vee-validate';

import PRXResourceManager from '@praxxys/cordova-resource-manager'

import Loader from './partials/loader/Loader.vue';
Vue.component("Loader", Loader);

Vue.config.productionTip = false

Vue.use(PRXVuetifyComponents);
Vue.use(PRXVueUtils);
Vue.use(PRXResourceManager)

Vue.use(VeeValidate);

import { bus } from './assets/js/EventBus.js';

var app = {

	init () {
		if (window.hasOwnProperty('cordova')) {
			document.addEventListener('deviceready', this.on_deviceready.bind(this), false)
			Vue.prototype.$cordova = this
		} else {
			this.setup()
		}
	},

	on_deviceready () {
		this.setup();
		document.addEventListener('backbutton', this.on_backbutton.bind(this), false);		
	},
	
	on_backbutton:function() {
		bus.$emit('back');
	},
	


	setup () {
        require('./assets/js/mixins/global')
		// require('./mixins/global')

		new Vue({
			vuetify,
			el: '#app',
			render: h => h(App),

			router,
			store,

			data: function() {
				return {
					teamAppDB: null,
				}
			},	

			mounted () {
				this.init()
			},

			methods: {
				init () {
					this.setupInAppDB();
					this.navigate();
				},

				setupInAppDB: function() {
					var database = this.openDatabase();
				},

				navigate () {
					if(this.alreadyLoggedIn()) {
						bus.$emit('userConnected');
						this.$PRX.resourceManager.resources = JSON.parse(localStorage.dataResource);						
						this.$PRXRouter().goTo('home');					
					} else {
						this.$PRXRouter().goTo('login');
					}
				},

				/**
				 * Check if user is already logged in 
				 * 
				 * @return {Boolean}
				 */
				alreadyLoggedIn: function() {
					if(localStorage.authToken) {
						return true;
					}
					return false;
				},

			}
		})
	}
}

app.init()
