<template>
	<div>
		<v-dialog v-model="status" 
		:persistent="persistent"
		max-width="80%">
     		<v-card class="pa-5">
     			<template v-if="icon_path">
	        		<v-img :src="icon_path" class="mx-auto text-center" width="44px" height="44px"></v-img>
        		</template>
        		<v-card-title class="px-7 py-5 text-center">
        			<p class="ma-auto medium clr--black">{{ message }}</p>
        		</v-card-title>
        		<v-card-actions class="pa-0 justify-center">
				    <v-btn
				    class="frm-btn type--2 mt-2"
				    max-height="40"
				    @click="close()"
				    min-width="121px">{{ ok_button }}
				    </v-btn>
				</v-card-actions>
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
			default: null
		},

		message: {
			type: String,
			default: null,
		},

		ok_button: {
			type: String,
			default: "OK"
		},

		persistent: {
			type: Boolean,
			default: false,			
		},

	},


	methods: {
		close: function() {
			this.$emit('close');
		},
	},

}
</script>