import { bus } from '../EventBus.js';

export default {

	data() {
		return {
			network: true,
		}
	},

	mounted() {
		document.addEventListener('offline', this.onOffline.bind(this.$cordova), false);
		document.addEventListener('online', this.onOnline.bind(this.$cordova), false);
	},

	methods: {
		onOnline() {
			setTimeout(() => {
				bus.$emit('network_online');
				bus.$emit('network_changed', navigator.connection.type);
				this.setStatus(true);
			}, 500);
		},

		onOffline() {
			setTimeout(() => {
				bus.$emit('network_offline');
				bus.$emit('network_changed', navigator.connection.type);
				this.setStatus(false);
			}, 500);
		},

		/**
		 * Set network status
		 * 
		 */
		setStatus(status) {
			this.network = status;
		}
	},

	computed: {
		isOnline() {
	        return navigator.connection.type !== 'none'; 
		},
	},
}