<template>
	<v-layout row wrap>
		<v-flex xs12 pb-12>



			<v-container>

				<!-- 
				/ -	SEARCH DOCTOR
				 -->
				<form>
		        	<v-layout row wrap mx-auto class="">
		          		<v-flex xs12 class="">
		            		<v-layout row wrap mx-auto align-center>
		              			<v-flex xs12 class="dc-search">
					                <v-text-field
							        v-model="searchQuery"
							        solo
							        label="Search Doctor"
							        class="frm-control type--1"
							        ></v-text-field>
							        <i class="fa fa-search"></i>
		              			</v-flex>
		           	 		</v-layout>
		          		</v-flex>
		        	</v-layout>
		      	</form>
		      	<!-- 
				/ -	END OF SEARCH DOCTOR
				 -->

				<!-- 
				/ -	FILTER
				 -->
		      	<v-flex xs12 class="mb-2">

		      		<div class="dctrs-frm">
		      			<v-menu offset-y>
							<template v-slot:activator="{ on }">
								<v-btn v-on="on" min-height="30" class="frm-btn type--3 mr-2 pr-3 pl-8 filter-btn">
					      			<div class="filter-icon"></div>
						      		sort by {{ renderDateBy }}
						      	</v-btn>
					      	</template>
					      	<v-list>
					      		<v-list-item
					      		v-for="sort in dateSorts"
					      		:key="index"
					      		@click="selectedDateSort(sort)">
					      			<v-list-item-title>{{ sort.name }}</v-list-item-title>
					      		</v-list-item>
					      	</v-list>
					    </v-menu>

			      		<v-menu offset-y>
							<template v-slot:activator="{ on }">
								<v-btn v-on="on" min-height="30" class="frm-btn type--3 mr-2 pr-3 pl-8 filter-btn">
					      			<div class="filter-icon"></div>
						      		filter by {{ renderFilterType }}
						      	</v-btn>
					      	</template>
					      	<v-list>
					      		<v-list-item
					      		v-for="(item, index) in filterby"
					      		:key="index"
					      		@click="selectFilterType(item)">
					      			<v-list-item-title>{{ item.name }}</v-list-item-title>
					      		</v-list-item>
					      	</v-list>
					    </v-menu>

				      	<template v-if="selectedFilter">
						    <v-menu offset-y>
								<template v-slot:activator="{ on }">
									<v-btn v-on="on" min-height="30" class="frm-btn type--3 mr-2 pr-3 pl-8 filter-btn">
						      			<div class="filter-icon"></div>
							      		sort by {{ renderSortBy }}
							      	</v-btn>
						      	</template>
						      	

						      	<template v-if="selectedFilter.value === 0">
							      	<v-list>
							      		<v-list-item
							      		v-for="(specialization, index) in specializations"
							      		:key="index"
							      		@click="selectSort(specialization)">
							      			<v-list-item-title>{{ specialization.name }}</v-list-item-title>
							      		</v-list-item>
							      	</v-list>
						      	</template>

						      	<template v-else>
									<v-list>
							      		<v-list-item
							      		v-for="(classType, index) in classes"
							      		:key="index"
							      		@click="selectSort(classType)">
							      			<v-list-item-title>{{ classType.name }}</v-list-item-title>
							      		</v-list-item>
							      	</v-list>				      		
						      	</template>

						    </v-menu>
				      	</template>
		      		</div>

		      	</v-flex>
		      	<!-- 
				/ -	END OF FILTER
				 -->

				<!-- 
				/ -	LIST OF DOCTORS
				 -->
				<v-row no-gutters>
					<v-col 
					cols="12" 
					class="my-1"
					v-for="doctor in filteredDoctors">
						<v-card
	            		class="py-3 px-4 frm-elevation"
	            		@click="selectDoctor(doctor)"
	         			>
	         				<v-row no-gutters class="align-center">
	         					<v-col cols="9">
	         						<h4>{{ doctor.fullname }}</h4>
	         						<h5 class="clr--gray">{{ renderClass(doctor.class) }}</h5>
	         						<h5 class="clr--gray">{{ doctor.specialization.name }}</h5>
	         					</v-col>
	         					<!-- <v-col cols="3" class="align-r">
	         						<p class="font22 clr--lightred ma-0">{{ doctor.points }}</p>
	            					<p class="font12 clr--gray ma-0">total points</p>
	         					</v-col> -->
	         				</v-row>
	          			</v-card>
					</v-col>

					<template v-if="filteredDoctors.length === 0">
						<v-layout justify-center row wrap my-5 mx-3>
							<p class="font12 mb-0"><strong>No Doctors found</strong></p>
						</v-layout>
					</template>
				</v-row>
				<!-- 
				/ -	END OF LIST OF DOCTORS
				 -->
			</v-container>	
		</v-flex>
	</v-layout>
</template>

<script type="text/javascript">
export default {
	computed: {

		filteredDoctors: function() {

			let doctors = this.doctors;
			var $this = this;

			if(this.selectedSort) {
				
				doctors = this.doctors.filter(function(doctor) {
					if($this.selectedFilter.value === 0) {
  						return doctor.specialization_id == $this.selectedSort.id;	  						
					} else {
						if($this.selectedSort.value != 0) {
							return doctor.class == $this.selectedSort.value;							
						}
						return true;
					}

				});
			}	 

			if(this.searchQuery) {
				doctors = doctors.filter(function(doctor) {
					return doctor.fullname.toLowerCase().includes($this.searchQuery.toLowerCase())
				});
			}

			if(this.selectedDate) {
				if(this.selectedDate.value === 0) {
					doctors = doctors.sort((dateA, dateB) => {
						return new Date(dateA.recent_visit) - new Date(dateB.recent_visit);					
					});					
				} else {
					doctors = doctors.sort((dateA, dateB) => {
						return new Date(dateB.recent_visit) - new Date(dateA.recent_visit);					
					});					
				}

			}

			return doctors;
		},

    	renderFilterType: function() {
    		if(this.selectedFilter) {
    			return this.selectedFilter.name;
    		}
    	},		

    	renderSortBy: function() {
    		if(this.selectedSort) {
    			return this.selectedSort.name;
    		}
    	},

    	renderDateBy: function() {
    		if(this.selectedDate) {
    			return this.selectedDate.name;
    		}
    	},

	},

    data () {
    	return {
    		doctors: [],
        	specializations: [], 
        	classes: [
        		{name: 'All', value: 0},
        		{name: 'Class A', value: 1},
        		{name: 'Class B', value: 2},
        	],

        	dateSorts: [
        		{name: 'Recent Visit', value: 0},
        		{name: 'Oldest Visit', value: 1},        		
        	],

        	searchQuery: null,

        	filterby: [
		        { name: 'specializations', value: 0 },
		        { name: 'class', value: 1},
		    ],

		    selectedFilter: null,
		    selectedSort: null, 
		    selectedDate: null,
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
    		this.doctors = this.dataResource('doctors');
    		this.specializations = this.dataResource('specializations');
    	},

	    /*
	    |--------------------------------------------------------------------------
	    | @Methods
	    |--------------------------------------------------------------------------
	    */

	    selectDoctor: function(doctor) {
	    	this.$store.commit('doctor/setDoctor', doctor);
			this.$PRXRouter().goTo('doctorsView')
	    },

	    selectFilterType: function(item) {
	    	this.selectedFilter = item;
	    },


	    selectSort: function(item) {
	    	this.selectedSort = item;
	    },

	    selectedDateSort(item) {
	    	this.selectedDate = item;
	    },

	    /*
	    |--------------------------------------------------------------------------
	    | @Renders
	    |--------------------------------------------------------------------------
	    */

    	renderClass: function(classType) {
    		var name = null;
    		if(classType === 1) {
    			name = 'A';
    		} else {
    			name = 'B';
    		}

    		return 'Class ' + name;
    	},



    },
}
</script>
