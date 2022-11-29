<template>
	<v-layout row wrap>
		<v-flex xs12 pb-12>
			<v-container>
				<v-row no-gutters>
					<v-col cols="12" class="mb-3">
						<!-- 
						/ -	START OF CALL PLAN HISTORY
						 -->
						<v-card class="pt-4 pb-2 px-4 frm-elevation dc-card" >
	         				<v-layout class="mb-3">
	         					<v-flex xs6>
	         						<h3 class="ma-0">{{ renderScheduledDate }}</h3>
	         					</v-flex>
	         				  	<!-- <v-flex xs6 class="align-r">
	         						<p class="font12 ma-0">{{ renderScheduledTime }}</p>
	         					</v-flex> -->
	         				</v-layout>
	         				<p class="font12 clr--gray mb-1">Agenda</p>
	         				<p class="clr--black mb-1 medium">{{ call.agenda }}</p>

	         				<p class="font12 clr--gray mb-1">Time Log</p>
	         				<p class="clr--black mb-1 medium">{{ renderTimeLog }}</p>

	         				<p class="font12 clr--gray mb-1">Comments</p>
	         				<p class="clr--black mb-1 medium" v-html="call.notes ? call.notes : 'No comments available'"></p>

	         				<p class="font12 clr--gray mb-1">Signature</p>
	         				
	         				<v-flex xs12 class="mb-1">
	         					<center>
		         				 	<v-img :src="renderSignaturePath" width="200px"></v-img>
	         				 	</center>
								
								<template v-if="!renderSignaturePath">
									<v-layout justify-center row wrap my-5 mx-3 class="cp-item">
										<p class="font12 mb-0"><strong>No signature available</strong></p>
									</v-layout>
								</template>

	         				</v-flex>
	         				
	         				<p class="font12 clr--gray mb-1">Photos</p>
	         				<v-layout class="mb-1 dc-photoHolder">
	         					<v-flex xs12>
	         						<template v-for="image in filteredImages">
		         						<v-img class="dc-photo" :src="renderImagePath(image)"></v-img>
	         						</template>
	         					</v-flex>
	         				</v-layout>
							<template v-if="filteredImages.length === 0">
								<v-layout justify-center row wrap my-5 mx-3 class="cp-item">
									<p class="font12 mb-0"><strong>No photos available</strong></p>
								</v-layout>
							</template>	
	          			</v-card>
	          			<!-- 
						/ -	END OF CALL PLAN HISTORY
						 -->
					</v-col>
				</v-row>
			</v-container>	
		</v-flex>
	</v-layout>
</template>

<script type="text/javascript">

export default {

	computed: {

		renderScheduledDate: function() {
			return moment(this.call.scheduled_date).format("MMMM D, YYYY")
		},

		/**
		 * @REMOVE!
		 * 
		 */
		// renderScheduledTime: function() {
		// 	var scheduledTime = this.call.scheduled_time.replace(/:/g, '');
		// 	return moment(scheduledTime, "hmm").format("hh:mm A");
		// },


		renderTimeLog: function() {

			var arrived_at = 'N/A',
				left_at = 'N/A';

			if(this.call.arrived_at && this.call.left_at) {

				arrived_at = this.call.arrived_at.replace(/:/g, '');
				left_at = this.call.left_at.replace(/:/g, '');

				arrived_at = moment(arrived_at, "hmm").format("hh:mm A");
				left_at = moment(left_at, "hmm").format("hh:mm A");

			}
			return arrived_at + ' - ' + left_at;			

		},

		renderSignaturePath: function() {
			var path = this.call.call_attachments;

			if(path.length != 0) {
				console.log(path.length);
				path = path.filter(function(e) {
					return e.type === 2
				});
				return this.$PRXConfig().api.url + '/' + path[0].file_path.replace("public", "storage");
			}
		},

		filteredImages: function() {
			var path = this.call.call_attachments;

			if(path.length != 0) {
				path = path.filter(function(e) {
					return e.type === 3
				});
			}

			return path;
		},

	},

	data: function () {
		return {
			call: null,
		}
	},

	beforeMount: function() {
		this.init();
	},

	methods: {

  		/*
	    |--------------------------------------------------------------------------
	    | @Initialize
	    |--------------------------------------------------------------------------
	    */

		init: function() {
		    this.call = this.$store.state.call.call;
		},

  		/*
	    |--------------------------------------------------------------------------
	    | @Methods
	    |--------------------------------------------------------------------------
	    */

	    /**
	     * Render image path 
	     * 
	     * @param  object image
	     */
		renderImagePath: function(image) {
			if(image) {
				return this.$PRXConfig().api.url + '/' + image.file_path.replace("public", "storage");				
			}
		},
	},
}

</script>
