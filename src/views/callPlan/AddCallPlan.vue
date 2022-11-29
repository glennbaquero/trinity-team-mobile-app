<template>
	<v-layout row wrap>
		<v-flex xs12 pb-12>
			<v-container>
				<!-- 
				/ -	START OF ADD CALL PLAN
				 -->
				<v-row no-gutters>
					<p class="semibold mt-2">Add Appointment</p>
					<v-col cols="12">
						<v-form v-model="valid">
							<v-row no-gutters>
								<v-col cols="12">
									<template v-if="!createdDoctor">
										<v-autocomplete
										label="Select Doctor"
										v-model="post.doctor_id"
										name="name"
									    color="#A8A8A8"
										class="form-input"
										:items="doctors"
										item-text="fullname"
										item-value="id"
										append-icon="fa-chevron-down"
									    ></v-autocomplete>

									    <label class="add-doctor clr--darkred" @click="addDoctor()">Add doctor</label>

								    </template>
								    <template v-else>
										<v-text-field
										:value="createdDoctor.first_name + ' ' + createdDoctor.last_name"
										:rules="[rules.required]"										
										name="doctor"
										label="Doctor"
										type="text"
										color="#A8A8A8"
										class="form-input"
										readonly
										></v-text-field>							
								    </template>
								</v-col>
								<v-col cols="12">
									<v-text-field
									v-model="post.agenda"
									:rules="[rules.required]"
									name="agenda"
									label="Agenda"
									type="text"
									color="#A8A8A8"
									class="form-input"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
									v-model="post.clinic"
									:rules="[rules.required]"
									name="clinic"
									label="Clinic"
									type="text"
									color="#A8A8A8"
									class="form-input"
									readonly
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
									v-model="post.scheduled_date"
									:rules="[rules.required]"
									name="scheduled_date"
									label="Date"
									type="text"
									color="#A8A8A8"
									class="form-input"
									readonly
									></v-text-field>
								</v-col>
							<!-- 	<v-col cols="12">
									<v-text-field
									v-model="post.scheduled_time"
									name="schedule_time"
									label="Time"
									type="time"
									color="#A8A8A8"
									class="form-input"
									></v-text-field>
								</v-col> -->
								
								<v-col>
									<v-btn 
									block 
									min-height="50"
									rounded 
									elevation="0" 
									:disabled="!valid"
									@click="submittingCallPlan()"
									class="frm-btn type--1 bold mt-12">SUBMIT</v-btn>
									<v-btn 
									block 
									min-height="50"
									rounded 
									elevation="0" 
									@click="$PRXRouter().goBack()"									
									class="frm-btn type--1 bold mt-2 gray">CANCEL</v-btn>
								</v-col>
							</v-row>
						</v-form>
					</v-col>					
				</v-row>
				<!-- 
				/ -	END OF ADD CALL PLAN
				 -->
			</v-container>	
		</v-flex>
		
		<dialog-confirm
		:status="submitCallPlan"
		:icon_path="staticImage('images/prompt.svg')"
		message="Are you sure you want to add this to your Call Plan?"
		confirm_button="Yes"
		cancel_button="Cancel"
		@cancel="submitCallPlan = false"
		@confirm="submit()"
		></dialog-confirm>

		<dialog-success
		:status="successCallPlan"
		:icon_path="staticImage('images/Check.svg')"
		message="Success! Please wait for approval"
		ok_button="OK"
		@close="close()"
		>
		</dialog-success>
	
	</v-layout>
</template>

<script type="text/javascript">

import DialogConfirm from '../../partials/dialog-confirm/Dialog.vue';
import DialogSuccess from '../../partials/dialog-success/Dialog.vue';

import { bus } from '../../assets/js/EventBus.js';

export default {
  	
	components: {
		'dialog-confirm': DialogConfirm,
		'dialog-success': DialogSuccess
	},

  	data () {
    	return {

	      	submitCallPlan: false,
	      	successCallPlan: false,

	      	post: {
	      		doctor_id: null,
	      		agenda: null,
	      		clinic: null,
	      		scheduled_date: null,
	      	},


			rules: {
				required: value => !!value || 'Required field.',
			},

			valid: false,

    	}
  	},

  	watch: {
  		'post.doctor_id': function() {
  			var doctors = this.doctors;
  			doctors = doctors.filter((doctor) => {
  				return this.post.doctor_id == doctor.id;
  			});
  			this.post.clinic = doctors[0].clinic_address;
  		},
  	},

  	computed: {
  		doctors() {
  			return this.dataResource('doctors');
  		},

  		createdDoctor: function() {
  			var doctor = this.$store.state.doctor.createdDoctor;
  			
  			if(doctor) {
  				this.post.doctor_id = doctor.id; 
				this.post.clinic = doctor.clinic_address;  				
  				return doctor;
  			}
  		},

		user: function() {
			return JSON.parse(window.localStorage.getItem('user'));
		},

  	},

  	mounted: function() {
  		this.init();
  	},

  	methods: {

	    /*
	    |--------------------------------------------------------------------------
	    | @Initialize
	    |--------------------------------------------------------------------------
	    */  		
  		init: function() {
  			this.post.scheduled_date = this.$store.state.date.date;
  		},

	    /*
	    |--------------------------------------------------------------------------
	    | @Methods
	    |--------------------------------------------------------------------------
	    */

	    /**
	     * Confirmation for call plan submission
	     * 
	     */
	    submittingCallPlan: function() {
	    	this.$nextTick(() => {

		    	if(this.cordova && navigator.connection.type == 'none') {
		    		this.insertToOfflineDatabase();
		    		return;
		    	} else {
			    	this.submitCallPlan = true;
		    	}

	    	});

	    },


	    /**
	     * Insert data to offline storage
	     * 
	     */
	    insertToOfflineDatabase() {
			this.successCallPlan = true;

    		let query,
    			data,
    			callID = Math.floor(Math.random() * 100000);; 
    		query = "INSERT INTO calls VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    		data = [ callID, this.user.id, this.post.doctor_id, this.post.agenda, this.post.clinic, this.post.scheduled_date, null, null, null, null, 'create', 'true'];

    		this.insert(query, data)
    			.then((response) => {
			    	this.submitCallPlan = false;    				
    				this.successCallPlan = true;
    			});
	    },


	    /**
	     * Submit post request
	     * 
	     */
	    submit: function() {
	    	this.submitCallPlan = false;
	    	
	    	this.requests(this.routes['api.team.call-plan.store'], this.post, (result) => {
	    		this.successCallPlan = true;
	      		this.$store.commit('resources/setCalls', result.calls);	    		

				this.$store.commit('doctor/setCreatedDoctor', null);	    		
	    	});

	    },

	    close() {
			this.successCallPlan = false;
    		this.$PRXRouter().goTo('callplan');
	    },

	    /**
	     * Adding new doctor
	     * 
	     */
	    addDoctor: function() {
			this.$store.commit('doctor/setCreatedDoctor', null);	    	
			this.$PRXRouter().goTo('addDoctor');
	    },

	    /*
	    |--------------------------------------------------------------------------
	    | @Checkers
	    |--------------------------------------------------------------------------
	    */		
	},
}

</script>
