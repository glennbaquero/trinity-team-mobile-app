<template>
	<div>
		<v-dialog v-model="status" persistent max-width="80%">
	    	<v-card class="pa-8">
	    		<template v-if="icon_path">
		    		<v-img :src="icon_path" class="mx-auto text-center" width="44px" height="44px"></v-img>
	    		</template>
	    		<v-card-title class="px-0 py-5 text-center">
	    			<p class="ma-auto medium clr--black">{{ message }}</p>
	    		</v-card-title>
	    		<v-row class="pa-0 justify-center mt-3">
			        <v-col cols="12" class="pa-0 text-center pb-2">
				        <v-btn
				        @click="confirm()"
				        max-height="40"
				        min-width="121px"
				        class="frm-btn type--2"><v-icon left>fa-check</v-icon>{{ confirm_button }}</v-btn>
			        </v-col>
			        <v-col cols="12" class="pa-0 text-center">
			        	<v-btn 
				        @click="cancel()"
				        max-height="40" 
				        min-width="121px" 
				        class="frm-btn type--2 gray2"><v-icon left>fa-times</v-icon>{{ cancel_button }}</v-btn>
			        </v-col>
			    </v-row>
			</v-card>
	    </v-dialog>		
	</div>
</template>
<script>
export default {

	props: {
		status: {
			type: Boolean,
			default: false,
		},

		icon_path: {
			type: String,
			default: null,
		},

		message: {
			type: String,
			default: null,
		},

		confirm_button: {
			type: String,
			default: "Confirm",
		},

		cancel_button: {
			type: String,
			default: "Cancel",
		},

	},

	data: function() {
		return {

		}
	},

	methods: {

	    /*
	    |--------------------------------------------------------------------------
	    | @Methods
	    |--------------------------------------------------------------------------
	    */
	   
	    cancel: function() {
	    	this.$emit('cancel');
	    },

	    confirm: function() {
	    	this.$emit('confirm');
	    },



	},

}
</script>