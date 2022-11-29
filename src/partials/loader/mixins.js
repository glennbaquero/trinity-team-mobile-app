export default {
	data: function() {
		return {
			loading: false,			
		}
	},

	methods: {
		load: function() {
			this.loading = true;
		},

		unload: function() {
			this.loading = false;
		},	
	},
}