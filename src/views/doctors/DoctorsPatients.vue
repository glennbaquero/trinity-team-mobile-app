<template>
	<v-layout row wrap>
		<v-flex xs12 pb-12>
			<v-container>
				<!-- 
				/ -	SEARCH PATIENT
				 -->
				<form>
		        	<v-layout row wrap mx-auto class="">
		          		<v-flex xs12 class="">
		            		<v-layout row wrap mx-auto align-center>
		              			<v-flex xs12 class="dc-search">
					                <v-text-field
							            v-model="searchQuery"
							            solo
							            label="Search Patient"
							            class="frm-control type--1"
							        ></v-text-field>
							        <i class="fa fa-search"></i>
		              			</v-flex>
		           	 		</v-layout>
		          		</v-flex>
		        	</v-layout>
		      	</form>
		      	<!-- 
				/ -	END OF SEARCH PATIENT
				 -->

				<!-- 
				/ -	PATIENT LIST
				 -->
				<v-row no-gutters>
					<v-col cols="12" class="my-1"
					v-for="patient in filteredPatients">
						<v-card
	            		class="py-3 px-4 frm-elevation"
	            		>
	         				<v-row no-gutters class="align-center">
	         					<v-col cols="9">
	         						<h3>Patient ID: {{ patient.id }}</h3>
	         					</v-col>
	         					<v-col cols="3" class="align-r">
	         						<p class="font22 clr--lightred ma-0">{{ patient.points }}</p>
	            					<p class="font12 clr--gray ma-0">{{ renderMostPurchased(patient.most_purchased) }}</p>
	         					</v-col>
	         				</v-row>
	          			</v-card>
					</v-col>

					<template v-if="filteredPatients.length === 0">
						<v-layout justify-center row wrap my-5 mx-3>
							<p class="font12 mb-0"><strong>No Patients found</strong></p>
						</v-layout>
					</template>

				</v-row>
				<!-- 
				/ -	END OF PATIENT LIST
				 -->
			</v-container>	
		</v-flex>
	</v-layout>
</template>

<script type="text/javascript">
export default {

	computed: {

		filteredPatients: function() {
			
			var $this = this;
			let patients = this.patients;


			if(this.searchQuery) {
				patients = patients.filter(function(patient) {
					var fullname = $this.renderPatientFullName(patient);
					return fullname.toLowerCase().includes($this.searchQuery.toLowerCase())
				})
			}

			return patients;

		},

	},

    data () {
    	return {
    		patients: null,

    		searchQuery: null,
      	}
    },


    props: {

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
	    	this.patients = this.$store.state.doctor.doctor.patients;
	    },

	    /*
	    |--------------------------------------------------------------------------
	    | @Methods
	    |--------------------------------------------------------------------------
	    */
	   	

		/*
	    |--------------------------------------------------------------------------
	    | @Renders
	    |--------------------------------------------------------------------------
	    */

	    /**
	     * Render patient full name
	     * 
	     * @param  object patient
	     */
		renderPatientFullName: function(patient) {
			return patient.first_name + ' ' + patient.last_name;
		},   


		/**
		 * Render Most purchased
		 * 
		 * @param  Object product
		 */
		renderMostPurchased: function(product) {
			if(product.length !== 0) {
				return product[0].name;
			}
		}

    }
}
</script>
