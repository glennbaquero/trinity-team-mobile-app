<template>
	<v-layout row wrap>
		<v-flex xs12 pb-12>
			<v-container>
				
				<v-row no-gutters>
					<!-- 
					/ -	DOCTOR'S DETAILS
					 -->
					<v-col cols="12" class="mb-3">
						<v-card class="py-2 px-4 frm-elevation">
	         				<p class="font12 clr--gray mb-1">Hospital/Clinic</p>
	         				<p class="clr--black mb-1 medium">{{ doctor.clinic_address }}</p>

	         				<p class="font12 clr--gray mb-1">Specialization</p>
	         				<p class="clr--black mb-1 medium">{{ doctor.specialization.name }}</p>

	         				<p class="font12 clr--gray mb-1">Contact Number</p>
	         				<p class="clr--black mb-1 medium">{{ doctor.mobile_number }}</p>

	         				<p class="font12 clr--gray mb-1">Email Address</p>
	         				<p class="clr--black mb-1 medium">{{ doctor.email }}</p>

	         				<p class="font12 clr--gray mb-1">Clinic Schedule</p>
	         				<p class="clr--black mb-1 medium">{{ doctor.clinic_hours }}</p>

	         				<p class="font12 clr--gray mb-1">Class</p>
	         				<p class="clr--black mb-1 medium">{{ renderClassType }}</p>
	          			</v-card>	          			
					</v-col>
					<!-- 
					/ -	END OF DOCTOR'S DETAILS
					 -->

					<!-- 
					/ -	DOCTOR'S PATIENTS
					 -->
					<v-col cols="12" class="mb-3 dc__total-patients">
						<p class="font12 clr--gray mb-1">Total Patients</p>
						<v-card
	            		class="py-2 px-4 frm-elevation"
	            		@click="viewPatients()"
	         			>
	         				<v-row no-gutters class="align-center">
	         					<v-col cols="9">
	         						<div class="svg__activities d-inline-block mr-2">
	         							<patients></patients>
	         						</div>
	         						<p class="font16 clr--black bold ma-0 d-inline-block">{{ renderPatientsCount }}</p>
	         					</v-col>
	         					<v-col cols="3" class="align-r clr--lightred">
	         						<h2>{{ doctor.points }} <span class="font12 regular">point(s)</span></h2>
	         					</v-col>
	         				</v-row>
	         			</v-card>
					</v-col>
					<!-- 
					/ -	END OF DOCTOR'S PATIENTS
					 -->

					<!-- 
					/ -	DOCTOR'S CALL PLAN HISTORY
					 -->
					<v-col cols="12" class="mb-3">
						<p class="font12 clr--gray mb-1">History</p>
						<!-- <v-card class="pa-4 mb-2 frm-elevation"
	            		@click="$PRXRouter().goTo('doctorsCallPlan')">
	         				<v-row no-gutters class="align-center">
	         					<v-col cols="9">
	         						<h3 class="ma-0">June 20, 2019</h3>
	         					</v-col>
	         					<v-col cols="3" class="align-r clr--gray">
	         						<p class="font12 ma-0">10:00 AM</p>
	         					</v-col>
	         				</v-row>
	         			</v-card> -->
	         			<template v-for="call in filteredCallsHistory">
		         			<v-card class="pa-4 mb-2 frm-elevation"
		         			@click="selectCall(call)">
		         				<v-row no-gutters class="align-center">
		         					<v-col cols="9">
		         						<h3 class="ma-0">{{ call.doctor.fullname }}</h3>
		         						<p class="font12 clr--gray ma-0">{{ call.clinic }}</p>
		         					</v-col>
		         					<v-col cols="3" class="align-r clr--gray">
		         						<p class="font12 ma-0">{{ renderScheduleTime(call.scheduled_time)  }}</p>
		         					</v-col>
		         				</v-row>
		         			</v-card>
	         			</template>
	         			<template v-if="filteredCallsHistory.length === 0">
							<v-layout justify-center row wrap my-5 mx-3 class="cp-item">
								<p class="font12 mb-0"><strong>No history calls</strong></p>
							</v-layout>		         				
	         			</template>
					</v-col>
					<!-- 
					/ -	END OF DOCTOR'S CALL PLAN HISTORY
					 -->
				</v-row>
			</v-container>	
		</v-flex>
	</v-layout>
</template>

<script type="text/javascript">

import Patients from '../svg/Patients.vue'

export default {


  	components: {
    	'patients': Patients,
  	},

  	computed: {
  		/**
  		 * Render doctor class type
  		 * 
  		 */
  		renderClassType: function() {
			if(this.doctor.class) {
				if(this.doctor.class === 1) {
					return "Class A"; 
				}
				return "Class B";
			}  			
  		},

  		/**
  		 * Render patients count
  		 * 
  		 */
  		renderPatientsCount: function() {
  			var count = this.doctor.patients.length;
  			if(count != 1) {
  				return count + ' Patients';
  			}
  			return count + ' Patient';
  		},

  		/**
  		 * Filter call history
  		 * 
  		 */
  		filteredCallsHistory: function()  {
  			var $this = this;
  			let calls = this.dataResource('calls');

  			calls = calls.filter(function(call) {
  				return call.doctor_id === $this.doctor.id
  			});	

  			calls = calls.filter(function(call) {
		    	var scheduled_date = moment(call.scheduled_date + ' ' + call.scheduled_time).format("Y-M-D HH:mm:ss"),
		    		now = moment().format("Y-M-D HH:mm:ss");  				
		    	return scheduled_date < now;

  			});	

  			return calls;
  		},

  	},

  	data: function() {
    	return {
    		doctor: null,
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
  			this.doctor = this.$store.state.doctor.doctor;
  		},

  		/*
	    |--------------------------------------------------------------------------
	    | @Methods
	    |--------------------------------------------------------------------------
	    */

	    /**
	     * Select call from history
	     * 
	     * @param  object call
	     */
	    selectCall: function(call) {
	    	this.$store.commit('call/setCall', call);
			this.$PRXRouter().goTo('doctorsCallPlan')

	    },

	    /**
	     * View doctor patients
	     * 
	     * @param  object call
	     */
	    viewPatients: function(call) {	    	
	    	this.$PRXRouter().goTo('doctorsPatients');
	    },

	    /*
	    |--------------------------------------------------------------------------
	    | @Renders
	    |--------------------------------------------------------------------------
	    */

	   	/**
	   	 * Render scheduled time
	   	 * 
	   	 * @param  Stirng time
	   	 */
	    renderScheduleTime: function(time) {
	    	time = time.replace(/:/g, '');
	    	return moment(time, "hmm").format("hh:mm A");
	    },

  	},

};
</script>
