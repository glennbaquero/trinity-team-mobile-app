<template>
	<div>
		<v-dialog
			v-model="loading"
			persistent 
			max-width="70"
		>
			<v-card>
				<v-card-text style="padding: 20px">
					<v-progress-circular
						indeterminate
						color="red"
					></v-progress-circular>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>

import Vue from 'vue'
import LoaderMixins from '../../partials/loader/mixins.js'; 

export default {

	mounted: function() {

		if(typeof(Vue.prototype.loader) !== 'object') {
			Vue.prototype.$loader = {};
		}

		Vue.prototype.$loader = this;

	},

	mixins: [
		LoaderMixins
	],

}
</script>