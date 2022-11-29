<template>
	<v-container>
		<v-layout row wrap pb-12>
		
			<v-layout row wrap pl-1 py-3 class="hm__bg--white">
				<!-- 
				/ -	START OF ANNOUNCEMENT - SLIDER
			     -->
			    <template v-if="filteredAnnouncements.length">
					<v-flex xs12 px-2>
						<div class="text-left anncmnt-frm__slider mb-3">
				    		<v-carousel light :show-arrows="false" hide-delimiter-background height="230px">
							    <template v-for="announcement in filteredAnnouncements">
								    <v-carousel-item @click="selectAnnouncement(announcement)">
								    	<v-card class="frm-card elevation-0">
								    		<v-img width="100%" height="180px" :src="announcement.image"></v-img>
							    			<div class="anncmnt-frm__overlay"></div>
								    		<div class="anncmnt-frm__cntnt">
								    			<p class="mb-0 bold font16">{{ announcement.title }}</p>
								    			<template v-if="announcement.event_date">
								    				<p class="mb-0 font12">{{ renderDate(announcement.event_date, "MMMM D YYYY, h:mm a") }}</p>
								    			</template>
								    		</div>
									  	</v-card>
								    </v-carousel-item>
							    </template>
							</v-carousel>
				    	</div>
					</v-flex>
				</template>
				<!-- 
				/ -	END OF ANNOUNCEMENT - SLIDER
			     -->


				<!-- 
				/ -	START OF DASHBOARD
			     -->
				<v-flex xs12 px-2>
					<p class="semibold mb-2">Dashboard</p>
				</v-flex>
				

				<!-- TARGET SALES -->
				<v-flex xs6 lg2>
					<v-card class="ma-2 py-4 px-3 frm-card frm-elevation hm-item">
						<v-row no-gutters class="align-center">
							<v-col cols="4">
								<div class="svg__target-sales">
	         						<call-performance></call-performance>
	         					</div>
	         				</v-col>
	         				<v-col cols="8">
	         					<h3 class="clr--black">{{ reports.target }}</h3>
	            				<h6 class="clr--gray">Target Sales</h6>
	         				</v-col>
	         			</v-row>
	          		</v-card>
				</v-flex>

				<!-- ACTUAL SALES -->
				<v-flex xs6 lg2>
					<v-card class="ma-2 py-4 px-3 frm-card frm-elevation hm-item">
						<v-row no-gutters class="align-center">
							<v-col cols="4">
								<div class="svg__actual-sales">
	         						<call-performance></call-performance>
	         					</div>
	         				</v-col>
	         				<v-col cols="8">
	         					<h3 class="clr--black">{{ reports.sales }}</h3>
	            				<h6 class="clr--gray">Actual Sales</h6>
	         				</v-col>
	         			</v-row>
	          		</v-card>
				</v-flex>

				<!-- @REMOVE! ACTIVITIES -->
				<!-- Remove as client request -->
				<!-- <v-flex xs6 lg2>
					<v-card class="ma-2 py-4 px-3 frm-card frm-elevation hm-item">
						<v-row no-gutters class="align-center">
							<v-col cols="4">
								<div class="svg__activities">
	         						<activities></activities>
	         					</div>
	         				</v-col>
	         				<v-col cols="8">
	         					<h3 class="clr--black">{{ reports.actualCalls }}</h3>
	            				<h6 class="clr--gray">Call Reach</h6>
	         				</v-col>
	         			</v-row>
	          		</v-card>
				</v-flex> -->

				<!-- Remove as client request -->
				<!-- <v-flex xs6 lg2>
					<v-card class="ma-2 py-4 px-3 frm-card frm-elevation hm-item">
						<v-row no-gutters class="align-center">
							<v-col cols="4">
								<div class="svg__activities">
	         						<activities></activities>
	         					</div>
	         				</v-col>
	         				<v-col cols="8">
	         					<h3 class="clr--black">{{ reports.targetCallReach }}</h3>
	            				<h6 class="clr--gray">Target Call Reach</h6>
	         				</v-col>
	         			</v-row>
	          		</v-card>
				</v-flex> -->

				<!-- TARGET DOCTORS -->
				<v-flex xs6 lg2>
					<v-card class="ma-2 py-4 px-3 frm-card frm-elevation hm-item">
						<v-row no-gutters class="align-center">
							<v-col cols="4">
								<div class="svg__target-patient">
	         						<rx></rx>
	         					</div>
	         				</v-col>
	         				<v-col cols="8">
	         					<h3 class="clr--black">{{ reports.doctorsTarget }}</h3>
	            				<h6 class="clr--gray">Target Doctors</h6>
	         				</v-col>
	         			</v-row>
	          		</v-card>
				</v-flex>

				<!-- ACTUAL DOCTORS -->
				<v-flex xs6 lg2>
					<v-card class="ma-2 py-4 px-3 frm-card frm-elevation hm-item">
						<v-row no-gutters class="align-center">
							<v-col cols="4">
								<div class="svg__actual-patient">
	         						<rx></rx>
	         					</div>
	         				</v-col>
	         				<v-col cols="8">
	         					<h3 class="clr--black">{{ reports.actualDoctors }}</h3>
	            				<h6 class="clr--gray">Active Doctors</h6>
	         				</v-col>
	         			</v-row>
	          		</v-card>
				</v-flex>

				<!-- TARGET PATIENTS -->
				<v-flex xs6 lg2>
					<v-card class="ma-2 py-4 px-3 frm-card frm-elevation hm-item">
						<v-row no-gutters class="align-center">
							<v-col cols="4">
								<div class="svg__target-patient">
	         						<rx></rx>
	         					</div>
	         				</v-col>
	         				<v-col cols="8">
	         					<h3 class="clr--black">{{ reports.patientsTarget }}</h3>
	            				<h6 class="clr--gray">Target Patients</h6>
	         				</v-col>
	         			</v-row>
	          		</v-card>
				</v-flex>

				<!-- ACTUAL PATIENT -->
				<v-flex xs6 lg2>
					<v-card class="ma-2 py-4 px-3 frm-card frm-elevation hm-item">
						<v-row no-gutters class="align-center">
							<v-col cols="4">
								<div class="svg__actual-patient">
	         						<rx></rx>
	         					</div>
	         				</v-col>
	         				<v-col cols="8">
	         					<h3 class="clr--black">{{ reports.actualPatients }}</h3>
	            				<h6 class="clr--gray">Active Patients</h6>
	         				</v-col>
	         			</v-row>
	          		</v-card>
				</v-flex>


				<v-flex xs6 lg2>
					<v-card class="ma-2 py-4 px-3 frm-card frm-elevation hm-item">
						<v-row no-gutters class="align-center">
							<v-col cols="4">
								<div class="svg__activities">
	         						<activities></activities>
	         					</div>
	         				</v-col>
	         				<v-col cols="8">
	         					<h3 class="clr--black">{{ visitedCalls }}</h3>
	            				<h6 class="clr--gray">Visited Calls</h6>
	         				</v-col>
	         			</v-row>
	          		</v-card>
				</v-flex>

				<v-flex xs6 lg2>
					<v-card class="ma-2 py-4 px-3 frm-card frm-elevation hm-item">
						<v-row no-gutters class="align-center">
							<v-col cols="4">
								<div class="svg__activities">
	         						<activities></activities>
	         					</div>
	         				</v-col>
	         				<v-col cols="8">
	         					<h3 class="clr--black">{{ reports.prescribedCount }}</h3>
	            				<h6 class="clr--gray">Prescribed MD</h6>
	         				</v-col>
	         			</v-row>
	          		</v-card>
				</v-flex>

				<!-- @REMOVE! ACHIEVEMENT -->
				<!-- <v-flex xs6 lg2>
					<v-card class="ma-2 py-4 px-3 frm-card frm-elevation hm-item">
						<v-row no-gutters class="align-center">
							<v-col cols="4">
								<div class="svg__achievement">
	         						<call-performance></call-performance>
	         					</div>
	         				</v-col>
	         				<v-col cols="8">
	         					<h3 class="clr--black">{{ reports.sales }}</h3>
	            				<h6 class="clr--gray">Achievement</h6>
	         				</v-col>
	         			</v-row>
	          		</v-card>
				</v-flex> -->
				<!-- 
				/ -	END OF DASHBOARD
			     -->
			</v-layout>

			<!-- 
			/ -	START OF CALL PLAN - LIST
		     -->
			<v-flex xs12 px-3>
				<v-layout row wrap>
					<v-flex xs6>
						<p class="clr--gray medium">{{ date_now }}</p>
					</v-flex>
					<v-flex xs6 class="align-r">
						<p class="clr--gray medium">Today</p>
					</v-flex>
				</v-layout>
			</v-flex>

			<template v-for="(call,key) in filteredCalls">
				<v-layout row wrap my-3 px-3 class="cp-item"
				:class="{'cp-done': callDone(call) }" :key="key">
					<v-flex xs10 @click="selectCall(call)">
						<v-layout wrap>
							<!-- <v-flex xs2>
								<p>{{ renderScheduleTime(call.scheduled_time) }}</p>
							</v-flex> -->
							<v-flex xs2>
								<div class="hm-cllpln" :class="call.status ? 'approved': 'pending'"></div>
							</v-flex>
							<v-flex xs8 class="">
								<h4 class="hm-name">{{ renderDoctorName(call) }}</h4>
								<p class="font12 mb-0 hm-name">Agenda: {{ call.agenda }}</p>
								<p class="font12 mb-0 hm-name">Status: {{ renderStatus(call) }}</p>
								<p class="font12 clr--gray mb-0 hm-name">{{ call.clinic }}</p>
							</v-flex>
						</v-layout>
					</v-flex>
					<v-flex xs2 class="align-r">
						<v-btn min-height="24" class="frm-btn align-c type--3"
						:disabled="callDone(call)"
						@click="removeCall(call)"><i class="fa fa-times"></i></v-btn>
					</v-flex>
				</v-layout>
				<v-flex xs12>
				  	<v-divider></v-divider>
				</v-flex>
			</template>

			<template v-if="filteredCalls.length === 0">
				<v-layout justify-center row wrap my-5 mx-3 class="cp-item">
					<p class="font12 mb-0"><strong>No Calls</strong></p>
				</v-layout>
			</template>


		    <!-- 
			/ -	START OF DIALOG - CANCEL
			 -->
		    <v-dialog v-model="cancelCallPlan" persistent max-width="90%">
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
					        min-width="121px">
					        	<v-icon left>fa-check</v-icon>YES
					        </v-btn>
				        </v-col>
				        <v-col cols="12" class="pa-0 text-center">
				        	<v-btn 
					        @click="closeModal"
					        max-height="40" min-width="121px" class="frm-btn type--2 gray2">
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
	    	
		</v-layout>
	</v-container>
</template>

<style>
		
	.v-responsive__content {
		width: 0px !important;
	}

</style>

<script type="text/javascript">

import CallPerformance from './svg/CallPerformance.vue'
import Activities from './svg/Activities.vue'
import RX from './svg/RX.vue'

import DialogSuccess from '../partials/dialog-success/Dialog.vue';
import { bus } from '../assets/js/EventBus.js';

export default {
  	components: {
	    'call-performance': CallPerformance,
	    'activities': Activities,
	    'rx': RX,

		'dialog-success': DialogSuccess	    
  	},

  	computed: {
  		
  		filteredAnnouncements() {

  			let announcements = [];
  			for (var i = 0; i < this.announcements.length; i++) {
  				if(i <= 4) {
  					announcements.push(this.announcements[i]);
  				}
  			}

  			return announcements;
  		},

  		filteredCalls: function() {
  			var dateNow = moment().format('Y-MM-DD');
			return this.calls.filter(call => call.scheduled_date.toLowerCase().indexOf(dateNow) > -1);
  		},

  		date_now: function() {
  			return moment().format("dddd, MMMM Do YYYY");
  		},

  		visitedCalls() {
  			let calls = this.filteredCalls;
			calls = calls.filter(call => call.left_at != null);
			return calls.length;
  		},

  	},

  	data () {
    	return {
	      	cancelCallPlan: false,
	      	successCallPlan: false,
	      	calls: [],
	      	announcements: [],
	      	call: null,
	      	reason: null,

	      	reports: null,
    	}
  	},

  	mounted () {
  		this.initResources();
  	},

  	methods: {

	    /*
	    |--------------------------------------------------------------------------
	    | @Initialize
	    |--------------------------------------------------------------------------
	    */

  		initResources: function () {
	        this.$loader.load();

  			if(this.isOnline()) {
				this.refreshResources();
  			} else {
  				
  				setTimeout(()=> {
	  				this.init();
		            this.$loader.unload();	  				
  				}, 1000)
  			
  			}
  		},

  		refreshResources: function() {

			this.fetchResources()
				.then((response) => {
			    	this.init();
		            this.$loader.unload();
				})
				.catch((error) => {

	              	this.$loader.unload();

	                if(error.response.status === 401) {
	                    window.localStorage.removeItem('authToken');
	                    window.axios.defaults.headers.common['Authorization'] = null;
	                    this.$router.replace({ name: 'login' })
	                }	
				});

  		},

  		init: function() {
            this.$store.commit("resources/setCalls", this.dataResource("calls"));
			this.fetchCalls();
			this.announcements = this.dataResource('announcements') ? this.dataResource('announcements'): [];			
	    	this.reports = this.dataResource('reports');
  		},

	    /*
	    |--------------------------------------------------------------------------
	    | @Methods
	    |--------------------------------------------------------------------------
	    */

	    /**
	     * Remove call
	     * 
	     */
		removeCall(call) {
			if(call.type && call.type == 'create') {

				let query = "DELETE FROM calls WHERE id=?"
				this.delete(query, [call.id])
					.then((response) => {
						this.fetchCalls();
						return;						
					}).catch((err) => {

						this.$PRX.alert.error('Please try again', 'Something went wrong');
					});

				return;
	    	}

	    	if(!call.type && !this.isOnline()) {
	    		bus.$emit('showDialog', "This call can't be remove while you're in offline mode");
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
	      			this.refreshResources();
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

  		/**
		 * Select announcement
		 * 
		 * @param  object announcement
		 */
		selectAnnouncement(announcement) {
			this.$store.commit("announcements/setAnnouncement", announcement);
			this.$PRXRouter().goTo('announcementView');
		},


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

  		/**
	     * Select speicified call
	     * 
	     * @param  object call
	     */
	    selectCall: function(call)
	    {
	    	this.$store.commit('call/setCall', call);
	    	this.$PRXRouter().goTo('callplanView');
	    },
  	},
};

</script>
