<template>
	<v-layout row wrap>
		<v-flex xs12 pb-12>
			<v-container>
				<!-- 
				/ -	START OF SORTING
			     -->
				<v-flex xs12 class="mb-2 rp-filter">
					<v-menu offset-y>
						<template v-slot:activator="{ on }">
							<v-btn v-on="on" min-height="30" class="frm-btn type--3 mr-3 pr-3 pl-8"><div class="filter-icon"></div>sort by {{ sortType }}</v-btn>
				      	</template>
				      	<v-list>
				      		<v-list-item
				      		v-for="(item, index) in sortTypes"
				      		:key="index"
				      		@click="setSortType(item)">
				      			<v-list-item-title>{{ item.label }}</v-list-item-title>
				      		</v-list-item>
				      	</v-list>
				    </v-menu>
				    <v-menu offset-y>

						<template v-slot:activator="{ on }">
							<v-btn v-on="on" min-height="30" class="frm-btn type--3 mr-3 px-3">{{ selectedFilter.name }}</v-btn>
				      	</template>
				      	<v-list>
				      		<v-list-item
				      		v-for="(item, index) in filters"
				      		:key="index"
				      		@click="setFilter(item)">
				      			<v-list-item-title>{{ item.name }}</v-list-item-title>
				      		</v-list-item>
				      	</v-list>

				    </v-menu>
		      	</v-flex>
		      	<!-- 
				/ -	END OF SORTING
			     -->


			    <!-- 
				/ -	START OF CALL PERFORMANCE
			     -->
				<v-row no-gutters>
					
					<p class="semibold mt-2">Call Performance</p>

					<v-expansion-panels accordion class="rp-dctrs__prfrmnc-acc" flat>

						<!-- Sales -->
				      	<v-expansion-panel class="rp-dctrs__prfrmnc frm-card">
				        	<v-expansion-panel-header expand-icon="fa-caret-right">
				        		<v-list-item>
					    			<v-list-item-avatar size="32" class="mr-2">
					    				<div class="svg__actual-sales mr-2">
		         							<call-performance></call-performance>
		         						</div>
					    			</v-list-item-avatar>
					    			<v-list-item-content>
					    				<v-list-item-title><p class="clr--gray bold ma-0 font16">Sales</p></v-list-item-title>
					    			</v-list-item-content>
					    			<v-list-item-action>
						            	<h1>{{ reports.sales }}</h1>
							        </v-list-item-action>
					      		</v-list-item>
				        	</v-expansion-panel-header>
				        	<v-expansion-panel-content>
				          		<v-card class="rp-dctrs__cntnr elevation-0">
				          			<div class="rp-dctrs__content">
				          				<div class="rp-dctrs__col">
				          					<p>Sales Target:</p>
				          				</div>
				          				<div class="rp-dctrs__col">
				          					<p class="clr--black">{{ reports.target }}</p>
				          				</div>
				          			</div>
				          			<div class="rp-dctrs__content">
				          				<div class="rp-dctrs__col">
				          					<p>Actual Sales:</p>
				          				</div>
				          				<div class="rp-dctrs__col">
				          					<p class="clr--black">{{ reports.sales }}</p>
				          				</div>
				          			</div>
				          			<div class="rp-dctrs__content">
				          				<div class="rp-dctrs__col">
				          					<p>Percentage:</p>
				          				</div>
				          				<div class="rp-dctrs__col">
				          					<p class="clr--black">{{ reports.salesPercentage }}</p>
				          				</div>
				          			</div>
				          		</v-card>
				        	</v-expansion-panel-content>
				      	</v-expansion-panel>
				      	<!--  -->

				      	<!-- Patients -->
				      	<v-expansion-panel class="rp-dctrs__prfrmnc frm-card">
				        	<v-expansion-panel-header expand-icon="fa-caret-right">
				        		<v-list-item>
					    			<v-list-item-avatar size="32" class="mr-2">
					    				<div class="svg__call-rate mr-2">
		         							<call-rate></call-rate>
		         						</div>
					    			</v-list-item-avatar>
					    			<v-list-item-content>
					    				<v-list-item-title><p class="clr--gray bold ma-0 font16">Patients</p></v-list-item-title>
					    			</v-list-item-content>
					    			<v-list-item-action>
						            	<h1>{{ reports.actualPatients }}</h1>
							        </v-list-item-action>
					      		</v-list-item>
				        	</v-expansion-panel-header>
				        	<v-expansion-panel-content>
				          		<v-card class="rp-dctrs__cntnr elevation-0">
				          			<div class="rp-dctrs__content">
				          				<div class="rp-dctrs__col">
				          					<p>Target Patients:</p>
				          				</div>
				          				<div class="rp-dctrs__col">
				          					<p class="clr--black">{{ reports.patientsTarget }}</p>
				          				</div>
				          			</div>
				          			<div class="rp-dctrs__content">
				          				<div class="rp-dctrs__col">
				          					<p>Actual Patients:</p>
				          				</div>
				          				<div class="rp-dctrs__col">
				          					<p class="clr--black">{{ reports.actualPatients }}</p>
				          				</div>
				          			</div>
				          			<div class="rp-dctrs__content">
				          				<div class="rp-dctrs__col">
				          					<p>Percentage:</p>
				          				</div>
				          				<div class="rp-dctrs__col">
				          					<p class="clr--black">{{ reports.patientsPercentage }}</p>
				          				</div>
				          			</div>
				          		</v-card>
				        	</v-expansion-panel-content>
				      	</v-expansion-panel>
				      	<!--  -->

				      	<!-- Doctors -->
				      	<v-expansion-panel class="rp-dctrs__prfrmnc frm-card">
				        	<v-expansion-panel-header expand-icon="fa-caret-right">
				        		<v-list-item>
					    			<v-list-item-avatar size="32" class="mr-2">
					    				<div class="mr-2">
		         							<img src="static/images/doctors.svg">
		         						</div>
					    			</v-list-item-avatar>
					    			<v-list-item-content>
					    				<v-list-item-title><p class="clr--gray bold ma-0 font16">Doctors</p></v-list-item-title>
					    			</v-list-item-content>
					    			<v-list-item-action>
						            	<h1>{{ reports.actualDoctors }}</h1>
							        </v-list-item-action>
					      		</v-list-item>
				        	</v-expansion-panel-header>
				        	<v-expansion-panel-content>
				          		<v-card class="rp-dctrs__cntnr elevation-0">
				          			<div class="rp-dctrs__content">
				          				<div class="rp-dctrs__col">
				          					<p>Target Doctors:</p>
				          				</div>
				          				<div class="rp-dctrs__col">
				          					<p class="clr--black">{{ reports.doctorsTarget }}</p>
				          				</div>
				          			</div>
				          			<div class="rp-dctrs__content">
				          				<div class="rp-dctrs__col">
				          					<p>Actual Doctors</p>
				          				</div>
				          				<div class="rp-dctrs__col">
				          					<p class="clr--black">{{ reports.actualDoctors }}</p>
				          				</div>
				          			</div>
				          			<div class="rp-dctrs__content">
				          				<div class="rp-dctrs__col">
				          					<p>Percentage:</p>
				          				</div>
				          				<div class="rp-dctrs__col">
				          					<p class="clr--black">{{ reports.doctorsPercentage }}</p>
				          				</div>
				          			</div>				          			
				          		</v-card>
				        	</v-expansion-panel-content>
				      	</v-expansion-panel>


				      	<!-- Call Performance -->
				      	<v-expansion-panel class="rp-dctrs__prfrmnc frm-card">
				        	<v-expansion-panel-header expand-icon="fa-caret-right">
				        		<v-list-item>
					    			<v-list-item-avatar size="32" class="mr-2">
		         						<div class="mr-2">
		         							<img src="static/images/call-performance.svg">
		         						</div>
					    			</v-list-item-avatar>
					    			<v-list-item-content>
					    				<v-list-item-title><p class="clr--gray bold ma-0 font16">Call Performance</p></v-list-item-title>
					    			</v-list-item-content>
					    			<v-list-item-action>
						            	<h1>{{ reports.actualCalls }}</h1>
							        </v-list-item-action>
					      		</v-list-item>
				        	</v-expansion-panel-header>

				        	<!-- content -->
				        	<v-expansion-panel-content class="">
				          		<v-card class="rp-dctrs__cntnr elevation-0 rp-dctrs__cll-content">
				          			<v-expansion-panels accordion focusable flat class="elevation-0">
				          				<!-- Target Call Reach -->
								      	<v-expansion-panel class="rp-dctrs__cll">
								        	<v-expansion-panel-header expand-icon="fa-caret-right">
								        		Target Call Reach
								        	</v-expansion-panel-header>
								        	<v-expansion-panel-content>
								          		<v-card class="rp-dctrs__cntnr elevation-0">
								          			<div class="rp-dctrs__content">
								          				<div class="rp-dctrs__col pl-10 pr-2">
								          					<p>Target Call Reach:</p>
								          				</div>
								          				<div class="rp-dctrs__col pl-2 pr-10">
								          					<p class="clr--black">{{ reports.targetCallReach }}</p>
								          				</div>
								          			</div>
								          			<div class="rp-dctrs__content">
								          				<div class="rp-dctrs__col pl-10 pr-2">
								          					<p>Actual Call Reach:</p>
								          				</div>
								          				<div class="rp-dctrs__col pl-2 pr-10">
								          					<p class="clr--black">{{ reports.actualCalls }}</p>
								          				</div>
								          			</div>
								          			<div class="rp-dctrs__content">
								          				<div class="rp-dctrs__col pl-10 pr-2">
								          					<p>Percentage:</p>
								          				</div>
								          				<div class="rp-dctrs__col pl-2 pr-10">
								          					<p class="clr--black">{{ reports.actualCallsPercentage }}</p>
								          				</div>
								          			</div>
								          		</v-card>
								        	</v-expansion-panel-content>
								      	</v-expansion-panel>
								      	<!--  -->
								      	
								      	<!-- Target Call Rate -->
								      	<v-expansion-panel class="rp-dctrs__cll">
								        	<v-expansion-panel-header expand-icon="fa-caret-right">
								        		Target Call Rate
								        	</v-expansion-panel-header>
								        	<v-expansion-panel-content>
								          		<v-card class="rp-dctrs__cntnr elevation-0">
								          			<div class="rp-dctrs__content">
								          				<div class="rp-dctrs__col pl-10 pr-2">
								          					<p>Target Call Rate:</p>
								          				</div>
								          				<div class="rp-dctrs__col pl-2 pr-10">
								          					<p class="clr--black">{{ reports.targetCallRate }}</p>
								          				</div>
								          			</div>
								          			<div class="rp-dctrs__content">
								          				<div class="rp-dctrs__col pl-10 pr-2">
								          					<p>Actual Call Rate:</p>
								          				</div>
								          				<div class="rp-dctrs__col pl-2 pr-10">
								          					<p class="clr--black">{{ reports.actualCallRate }}</p>
								          				</div>
								          			</div>
								          			<div class="rp-dctrs__content">
								          				<div class="rp-dctrs__col pl-10 pr-2">
								          					<p>Percentage:</p>
								          				</div>
								          				<div class="rp-dctrs__col pl-2 pr-10">
								          					<p class="clr--black">{{ reports.actualCallRatePercentage }}</p>
								          				</div>
								          			</div>
								          		</v-card>
								        	</v-expansion-panel-content>
								      	</v-expansion-panel>
								      	<!--  -->

								      	<!-- Call Efficiency -->
								      	<v-expansion-panel class="rp-dctrs__cll">
								        	<v-expansion-panel-header expand-icon="fa-caret-right">
								        		Call Efficiency
								        	</v-expansion-panel-header>
								        	<v-expansion-panel-content>
								          		<v-card class="rp-dctrs__cntnr elevation-0">
								          			<div class="rp-dctrs__content">
								          				<div class="rp-dctrs__col pl-10 pr-2">
								          					<p>Call Efficiency:</p>
								          				</div>
								          				<div class="rp-dctrs__col pl-2 pr-10">
								          					<p class="clr--black">{{ reports.callEfficiency }}</p>
								          				</div>
								          			</div>	
								          		</v-card>
								        	</v-expansion-panel-content>
								      	</v-expansion-panel>
								      	<!--  -->
								    </v-expansion-panels>
				          		</v-card>
				        	</v-expansion-panel-content>
				      	</v-expansion-panel>
				    </v-expansion-panels>
				</v-row>
				<!-- 
				/ -	END OF CALL PERFORMANCE
			     -->

			    <!-- 
				/ -	START OF FILTERING
			     -->
				<v-flex xs12 class="mt-7">
					<v-menu offset-y>
						<template v-slot:activator="{ on }">
							<v-btn v-on="on" min-height="30" class="frm-btn type--3 pr-3 pl-8"><div class="filter-icon"></div> Class <span class="bold">{{ classType }}</span></v-btn>
				      	</template>
				      	<v-list>
				      		<v-list-item
				      		v-for="(item, index) in classes"
				      		:key="index"
				      		@click="setClass(item)">
				      			<v-list-item-title>{{ item.label }}</v-list-item-title>
				      		</v-list-item>
				      	</v-list>
				    </v-menu>
		      		
		      	</v-flex>
		      	<!-- 
				/ -	END OF FILTERING
			     -->

			    <!-- 
				/ -	START OF TABLE (DOCTORS)
			     -->
			    <div class="rp-dctrs">
			    	<v-card class="frm-elevation rp-dctrs__hdr">
			    		<p>Doctors</p>
			    	</v-card>
			    	<template v-for="doctor in filteredDoctors">
				    <v-expansion-panels accordion focusable style="padding-bottom: 3px">
				      	<v-expansion-panel class="rp-dctrs__panel">
				        	<v-expansion-panel-header>
				        		{{ doctor.name }}
				        		<template v-if="targetAccomplished(doctor.calls, doctor.class)">
						        	<span class="badge"><i class="fa fa-check-circle"></i></span>
					        	</template>
				        	</v-expansion-panel-header>
				        	<v-expansion-panel-content>
				          		<v-card class="rp-dctrs__cntnr elevation-0">
				          			<div class="rp-dctrs__content">
				          				<div class="rp-dctrs__col">
				          					<p>Attended:</p>
				          				</div>
				          				<div class="rp-dctrs__col">
				          					<p class="clr--black">{{ doctor.calls }}</p>
				          				</div>
				          			</div>
				          			<div class="rp-dctrs__content">
				          				<div class="rp-dctrs__col">
				          					<p>Target:</p>
				          				</div>
				          				<div class="rp-dctrs__col">
				          					<p class="clr--black">{{ target() }}</p>
				          				</div>
				          			</div>
			          				<template v-for="(date, key) in doctor.dates">
					          			<div class="rp-dctrs__content">
					          				<div class="rp-dctrs__col">
					          					<p v-text="key == 0 ? 'Date Attended:': ''"></p>
					          				</div>

											<div class="rp-dctrs__col">
					          					<p class="clr--black">{{ renderDate(date.schedule_date, "MMMM DD, YYYY") }}</p>
					          				</div>
					          			</div>
			          				</template>   				

				          		</v-card>
				        	</v-expansion-panel-content>
				      	</v-expansion-panel>				      	
				    </v-expansion-panels>
				    </template>
				    <template v-if="filteredDoctors.length === 0">
			      		<p class="mb-0 mt-3">No doctors found</p>
			      	</template>
			    </div>
				<!-- 
				/ -	END OF TABLE
			     -->
			</v-container>	
		</v-flex>
	</v-layout>
</template>

<script type="text/javascript">
// SVG
import CallPerformance from '../svg/CallPerformance.vue'
import CallRate from '../svg/CallRate.vue'
import RX from '../svg/RX.vue'

import { bus } from '../../assets/js/EventBus.js';

export default {

    components: {
	    'call-performance': CallPerformance,
	    'call-rate': CallRate,
	    'rx': RX,
	},

	computed: {
		

		sortType: function() {
			if(this.selectedSort) {
				return this.selectedSort.label;
			}
		},

		filters: function() {
			if(this.selectedSort.value === 1) {
				return this.months;
			}
			return this.quarters;
		},

		filteredDoctors: function() {

			if(this.reports.length != 0) {

				var doctors =  this.reports.doctors;

				doctors = doctors.filter((doctor) => {
					if(this.selectedClass.value != 0) {
						return doctor.class === this.selectedClass.value;
					}
					return true;
				});

				return doctors;

			}
			return [];
		},

		classType: function() {
			if(this.selectedClass) {
				return this.selectedClass.label;
			}
		},
	},

	watch: {
		selectedFilter: {
			handler: function() {
				this.filterReports();
			},
			deep: true,
		},
	},

    data () {
    	return {

        	doctors: [],
        	calls: [],

        	classes:[
        		{label: 'All', value: 0},        	
        		{label: 'A', value: 1},
        		{label: 'B', value: 2},        		
        	],

        	selectedClass: {
        		label: 'All',
        		value: 0,
        	},

        	sortTypes: [
        		{label: 'month', value: 1},
        		{label: 'quarter', value: 2},        		
        	],

        	selectedSort: {
        		label: 'month',
        		value: 1
        	},

        	months: [
				{name: 'January', value: 1},
				{name: 'February', value: 2},
				{name: 'March', value: 3},
				{name: 'April', value: 4},
				{name: 'May', value: 5},
				{name: 'June', value: 6},	
				{name: 'July', value: 7},	
				{name: 'August', value: 8},
				{name: 'September', value: 9},
				{name: 'October', value: 10},
				{name: 'November', value: 11},
				{name: 'December', value: 12},
			],

			quarters: [
				{name: '1st', value: 1},
				{name: '2nd', value: 2},
				{name: '3rd', value: 3},
				{name: '4th', value: 4},
			],

			selectedFilter: {
				name: 'January', value: 1
			},

			reports: [],
      	}
    },

	mounted () {
		this.init();
  	},

  	methods: {

	    /*
	    |--------------------------------------------------------------------------
	    | @Initialize
	    |--------------------------------------------------------------------------
	    */
		init: function() {
			this.initialFilter(); 
		},



	    /*
	    |--------------------------------------------------------------------------
	    | @Methods
	    |--------------------------------------------------------------------------
	    */

	    initialFilter: function() {
			this.selectedFilter.name = moment().format("MMMM");
			/** Add 1 to get the exact month since months displayed as array */
			this.selectedFilter.value = moment().month() + 1;
			this.filterReports();				    	
	    },

	    /**
	     * Filter reports by sending post request
	     * 
	     */
	    filterReports: function() {

	    	if(navigator.connection.type == 'none') {
	    		bus.$emit('showDialog', "Managing report can't be done when in offline mode");
	    		return;
	    	}

			var data = {
				sortType: this.selectedSort.value,
				filter: this.selectedFilter.value,
				year: moment().year()
			};

			this.requests(this.routes['api.team.medrep.reports'], data, (result) => {
				this.reports = result.reports;
			});

	    },

	    /**
	     * Set sort type
	     * 
	     * @param object sort
	     */
		setSortType: function(sort) {
			this.selectedSort = sort;
		},

		/**
		 * Set filter type
		 * 
		 * @param object filter
		 */
	   	setFilter: function(filter) {
	   		this.selectedFilter = filter;
	   	},

	   	/**
	   	 * Set class type
	   	 * 
	   	 * @param object classType
	   	 */
	   	setClass: function(classType) {
	   		this.selectedClass = classType;
	   	},


	    /*
	    |--------------------------------------------------------------------------
	    | @Renders
	    |--------------------------------------------------------------------------
	    */


	    /*
	    |--------------------------------------------------------------------------
	    | @Checkers
	    |--------------------------------------------------------------------------
	    */  

		target: function(classType) {
			if(classType === 1) {
				return 4;
			}
			return 2;
		},
	    
	    /**
	     * Check if target accomplished
	     * 
	     * @param  int renderCalls
	     * @return Boolean
	     */
		targetAccomplished: function(renderCalls, classType) {
			if(renderCalls >= this.target(classType)) {
				return true;
			}
			return false;
		},

  	},
}
</script>
