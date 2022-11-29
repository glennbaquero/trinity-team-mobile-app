<template>
	<v-container>
		<template xs12>
		  	<v-container class="cp-container">
				<div class="cp-line"></div>
				<v-layout row wrap mt-5 mx-3>
					<v-flex xs12>
					  	<p class="clr--gray bold">{{ renderSelectedDate() }}</p>
					</v-flex>	
					<v-flex xs12>
					  	<v-divider></v-divider>
					</v-flex>				
				</v-layout>
				
				<template v-for="call in items">
					<v-layout row wrap my-5 mx-3 class="cp-item"
					:class="{'cp-done': callDone(call) }">
				    	<v-flex xs10 @click="selectCall(call)">
							<v-layout wrap>
<!-- 								<v-flex xs2>
									<p>{{ renderScheduleTime(call.scheduled_time) }}</p>
								</v-flex> -->
								<v-flex xs2>
									<div class="hm-cllpln" :class="call.status ? 'approved': 'pending'"></div>
								</v-flex>
								<v-flex xs8 class="">
									<h4 class="hm-name">Dr. {{ renderDoctorName(call) }}</h4>
									<p class="font12 mb-0 hm-name">Agenda: {{ call.agenda }}</p>
									<p class="font12 mb-0 hm-name">Status: {{ renderStatus(call) }}</p>
									<p class="font12 clr--gray mb-0 hm-name">{{ call.clinic }}</p>
								</v-flex>
							</v-layout>
						</v-flex>
						<v-flex xs2 class="align-r">
							<v-btn min-height="25" class="frm-btn align-c type--3"
							:disabled="callDone(call)"
							@click="removeCall(call)"><i class="fa fa-times"></i></v-btn>
						</v-flex>
					</v-layout>
					<v-divider></v-divider>
				</template>

				<template v-if="items.length === 0">
					<v-layout justify-center row wrap my-5 mx-3 class="cp-item">
						<p class="font12 mb-0"><strong>No Calls</strong></p>
					</v-layout>
				</template>
			</v-container>

			<!-- 
			/ -	START OF DIALOG - CANCEL
			 -->
		    <v-dialog v-model="cancelCallPlan" persistent max-width="80%">
		    	<v-card class="pa-4">
		    		<v-card-title class="py-2">
		    			<v-row>
		    				<v-col cols="2 pa-0">
		    					<v-img :src="$PRXConfig().staticUrl('images/promptRed.svg')" width="35px" height="35px"></v-img>
		    				</v-col>
		    				<v-col cols="9 pa-0">
		    					<p class="ma-0 clr--black">To confirm cancellation please indicate a reason</p>
		    				</v-col>
		    			</v-row>		    			
		    		</v-card-title>

		    		<v-text-field
		    			v-model="reason"
						name="reason"
						label="Please input reason"
						type="text"
						color="#A8A8A8"
						class="form-input"
					></v-text-field>
					<v-row class="pa-0 justify-center mt-3">
				        <v-col cols="12" class="pa-0 text-center pb-2">
				        	<v-btn
					        class="frm-btn type--2"
					        max-height="40"
					        @click="removeCallSuccess"
					        min-width="110px">
					        	<v-icon left>fa-check</v-icon>YES
					        </v-btn>
				        </v-col>
				        <v-col cols="12" class="pa-0 text-center">
					        <v-btn 
				        	@click="closeModal"
				        	max-height="40" min-width="110px" class="frm-btn type--2 gray2">
					    		<v-icon left>fa-times</v-icon>CANCEL
					    	</v-btn>
				        </v-col>
				    </v-row>
				</v-card>
		    </v-dialog>
		    <!-- 
			/ -	END OF DIALOG - CANCEL
			 -->

		<dialog-success
		:status="successCallPlan"
		:icon_path="staticImage('images/Check.svg')"
		message="Appointment has been successfully cancelled"
		ok_button="OK"
		@close="closeModal"
		>
		</dialog-success>

		</template>
	</v-container>
</template>
<script>

import DialogSuccess from '../../../partials/dialog-success/Dialog.vue';

import { bus } from '../../../assets/js/EventBus.js';

export default {

	props: {

		items: {
			type: Array,
			default: [],
		},

		selectedDate: String,

	},

	components: {
		'dialog-success': DialogSuccess
	},

	computed:  {


	},

	data: function() {
		return {
	      	cancelCallPlan: false,
	      	successCallPlan: false,
	      	call: null,
	      	reason: null,
		}
	},

	methods: {

	    /*
	    |--------------------------------------------------------------------------
	    | @Renders
	    |--------------------------------------------------------------------------
	    */
	   		
	   	/**
	   	 * @REMOVE!
	   	 * 
	   	 * Render scheduled time
	   	 * 
	   	 * @param  Stirng time
	   	 */
	    // renderScheduleTime: function(time) {
	    // 	time = time.replace(/:/g, '');
	    // 	return moment(time, "hmm").format("hh:mm A");
	    // },


	    /*
	    |--------------------------------------------------------------------------
	    | @Checkers
	    |--------------------------------------------------------------------------
	    */	    


	    /**
	     * Check if call is done
	     * 
	     * @param  Object call
	     * @return Boolean
	     */
	    callDone: function(call) {
	    	var scheduled_date = moment(call.scheduled_date + ' ' + call.scheduled_time).format("Y-M-D HH:mm:ss"),
	    		now = moment().format("Y-M-D HH:mm:ss");

	    	if(now > scheduled_date) {
	    		return true;
	    	}
	    	return false;
	    },

	    /*
	    |--------------------------------------------------------------------------
	    | @Methods
	    |--------------------------------------------------------------------------
	     */
	    
	    /**
	     * Select speicified call
	     * 
	     * @param  object call
	     */
	    selectCall: function(call) {
	    	this.$store.commit('call/setCall', call);
	    	this.$PRXRouter().goTo('callplanView');
	    },
	    	
	    /**
	     * Remove call
	     * 
	     * @param object call
	     */
	    removeCall(call) {

			if(call.type && (call.type == 'create' || call.type == 'update')) {

				let query = "DELETE FROM calls WHERE id=?"
				this.delete(query, [call.id])
					.then((response) => {
						this.$emit('refreshCalls');
						return;						
					}).catch((err) => {

						this.$PRX.alert.error('Please try again', 'Something went wrong');
					});

				return;
	    	}

	    	if(!call.type && !this.isOnline()) {
	    		bus.$emit('showDialog', "This call can't be remove while you're offline mode");
	    		return;
	    	}

  			this.cancelCallPlan = true;
  			this.call = call;
  		},

  		removeCallSuccess(){
  			if(this.reason) {
  				this.requests(this.routes['api.team.call-plan.remove'], this.getData(), (result) => {
	  				this.successCallPlan = true;
	  				
	      			this.$store.commit('resources/setCalls', result.calls);	  				
	  				this.$emit('refreshCalls');

	  				this.reason = null;
	  			});
  			} else {
				this.$PRX.alert.error('Please input a reason', 'Something went wrong');
  			}
  		},

  		getData() {
  			let data = new FormData();

  			data.append('id', this.call.id);
  			data.append('reason', this.reason);

  			return data;
  		},

  		closeModal() {
  			this.successCallPlan = false;
  			this.cancelCallPlan = false;
  		},

	    /*
	    |--------------------------------------------------------------------------
	    | @Renders
	    |--------------------------------------------------------------------------
		*/

	    /**
	     * Render doctor name
	     * 
	     * @param  object call
	     */
		renderDoctorName(call) {
			if(call.doctor) {
				return call.doctor.fullname;
			} else {
				let doctor = this.findDoctor(call.doctor_id);
				return doctor.fullname;
			}
		},

		/**
		 * Render selected date
		 * 
		 */
		renderSelectedDate: function() {
			if(this.selectedDate == moment().format("Y-MM-DD")) {
				return 'Today';
			}
  			return moment(this.selectedDate).format("dddd, MMMM Do YYYY");
		},		

	},

}
</script>