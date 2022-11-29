<template>
	<v-container class="cp__cstm-container">
		<v-layout row wrap>
			<!-- 
			/ -	START OF CALL PLAN CALENDAR
			 -->
			<v-flex xs12 class="cp__calendar-holder">
				<v-date-picker 
				v-model="picker"
				full-width
				class="cp-calendar"
				color="#D52E29"
				header-color="#444"
				:min="minimumDate"
				>
					<v-card-actions>
		                <v-btn min-height="25" class="frm-btn border-8 type--3 black cp__add-btn"
					    @click="addAppointment()"
					    :disabled="blockedAdding">
					    	<i class="fa fa-plus mr-1"></i>Add Appointment
					    </v-btn>
		            </v-card-actions>
				</v-date-picker>
			</v-flex>
			<!-- 
			/ -	END OF CALL PLAN CALENDAR
			 -->
			
			<call-plan-list
			:selected-date="picker" 
			:items="filteredCalls"
			@refreshCalls="refreshCalls"
			></call-plan-list>

		</v-layout>
	</v-container>
</template>

<script type="text/javascript">

import CallPlanList from './components/CallPlanList.vue';

export default {

	components: {
		'call-plan-list': CallPlanList
	},


  	computed: {
  		filteredCalls: function() {
  			if(this.picker) {
  				let calls = this.calls;
  				return calls.filter(call => call.scheduled_date.toLowerCase().indexOf(this.picker) > -1);
  			}
  		},

  		minimumDate: function() {
  			return moment().format('Y-MM-DD');
  		},

  		blockedAdding: function () {
  			if(this.picker >= this.minimumDate) {
  				return false;
  			}
  			return true;
  		},
  	},

	watch: {
		picker: function() {
			this.$store.commit('selectDate/setDate', this.picker);
		},
	},

  	data () {
    	return {
	      	picker: moment().format('Y-MM-DD'),
	      	calls: [],
	      	call: null,
	      	reason: null,
    	}
  	},


  	mounted: function() {
  		this.refreshCalls();
  	},


  	methods: {

	    /*
	    |--------------------------------------------------------------------------
	    | @Initialize
	    |--------------------------------------------------------------------------
	    */

	    init: function() {
	    	this.fetchCalls();
	    },

	    /*
	    |--------------------------------------------------------------------------
	    | @Methods
	    |--------------------------------------------------------------------------
	    */
	   
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
	     * Select speicified call
	     * 
	     * @param  object call
	     */
	    selectCall: function(call) {
	    	this.$store.commit('call/setCall', call);
	    	this.$PRXRouter().goTo('callplanView');
	    },

	    /**
	     * Add appointment
	     * 
	     */
  		addAppointment: function() {
			this.$store.commit('date/setDate', this.picker);  			
			this.$PRXRouter().goTo('callplanAdd');
  		},

  		refreshCalls: function() {

	        if(!this.isOnline()) {
	        	this.init();
	        	return;
	        }

	        this.$loader.load();
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
  	},
};
</script>