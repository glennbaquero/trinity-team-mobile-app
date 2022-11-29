<template>
	<v-layout row wrap>
		<v-flex xs12 pb-12>
			<v-container>
				<v-row no-gutters>
					<p class="semibold mt-2">Add Doctor</p>
					<v-col cols="12">
						<form>
							<v-row no-gutters>
								<v-col cols="12">
									<v-autocomplete
									label="Select Specialization"
									v-model="post.specialization_id"
									name="specialization"
								    color="#A8A8A8"
									class="form-input"
									:items="specializations"
									item-text="name"
									item-value="id"
									append-icon="fa-chevron-down"
								    ></v-autocomplete>
								</v-col>
								<v-col cols="12">
									<v-autocomplete
									label="Select Class"
									v-model="post.class"
									name="class"
								    color="#A8A8A8"
									class="form-input"
									:items="classes"
									item-text="label"
									item-value="value"
									append-icon="fa-chevron-down"
								    ></v-autocomplete>
								</v-col>								
								<v-col cols="12"> 
									<v-text-field
									v-model="post.first_name"
									name="first_name"
									label="First Name"
									type="text"
									color="#A8A8A8"
									class="form-input"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
									v-model="post.last_name"
									name="last_name"
									label="Last Name"
									type="text"
									color="#A8A8A8"
									class="form-input"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
									v-model="post.email"
									name="email"
									label="Email Address"
									type="email"
									color="#A8A8A8"
									class="form-input"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
									v-model="post.mobile_number"
									name="mobile_number"
									label="Mobile Number"
									type="number"
									color="#A8A8A8"
									class="form-input"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
									v-model="post.clinic_address"
									name="clinic_address"
									label="Clinic address"
									type="text"
									color="#A8A8A8"
									class="form-input"
									></v-text-field>
								</v-col>
								<v-col cols="12">
									<v-text-field
									v-model="post.clinic_hours"
									name="clinic_hours"
									label="Clinic hours"
									type="text"
									color="#A8A8A8"
									class="form-input"
									></v-text-field>
								</v-col>
								<v-col>
									<v-btn 
									block 
									min-height="50"
									rounded 
									elevation="0" 
									@click="submittingDoctor()"
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
						</form>
					</v-col>					
				</v-row>
			</v-container>	
		</v-flex>
		
		<dialog-confirm
		:status="submitDoctor"
		:icon_path="staticImage('images/prompt.svg')"
		message="Are you sure you want to create this doctor?"
		confirm_button="Yes"
		cancel_button="Cancel"
		@cancel="submitDoctor = false"
		@confirm="submit()"
		></dialog-confirm>

		<dialog-success
		:status="successDoctor"
		:icon_path="staticImage('images/Check.svg')"
		message="Doctor created"
		ok_button="OK"
		@close="closeSuccessDialog()"
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
	      	submitDoctor: false,
	      	successDoctor: false,

	      	post: {
	      		specialization_id: null,
	      		first_name: null,
	      		last_name: null,
	      		class: null,
	      		clinic_address: null,
	      		clinic_hours: null,
	      		email: null,
	      		mobile_number: null,
	      	},

	      	specializations: [],
	      	classes: [
	      		{label: 'Class A', value: 1 },
	      		{label: 'Class B', value: 2 },	      		
	      	],
    	}
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
    		this.specializations = this.dataResource('specializations');
  		},

	    /*
	    |--------------------------------------------------------------------------
	    | @Methods
	    |--------------------------------------------------------------------------
	    */

	    /**
	     * Get post
	     * 
	     * @return Object
	     */
	    getPost: function() {
	    	let post = this.post;

	    	var user = JSON.parse(window.localStorage.getItem('user'));
	    	post['medical_representative_id'] = user.id;

	    	return post;
	    },

	    submittingDoctor: function() {
	    	this.submitDoctor = true;
	    },

	    submit: function() {
			this.submitDoctor = false;	    	
			this.requests(this.routes['api.team.doctors.store'], this.getPost(), (result) => {
				this.successDoctor = true;
				this.$store.commit('doctor/setCreatedDoctor', result.doctor);
			});	    	
	    },

	    closeSuccessDialog: function() {
			this.successDoctor = false;
			this.$PRXRouter().goBack();
	    },

	    /*
	    |--------------------------------------------------------------------------
	    | @Renders
	    |--------------------------------------------------------------------------
	    */

  	},
}

</script>
