<template>
	<v-row class="pa-1 pb-12" no-gutters>
	    <v-col cols="12">
	    	<v-card class="elevation-0 mb-2">
	      		<v-img height="226"
				:src="announcement.image"
				></v-img>
		  	</v-card>
		  	<div class="pa-4">
	      		<p class="font16 bold clr--black mb-1">{{ announcement.title }}</p>
	      		<p class="font12 clr--gray">{{ renderDate(announcement.date, "MMMM D YYYY, h:mm a") }}</p>
	      		<p class="font12 clr--gray mb-6" v-html="announcement.description"></p>
		  	</div>
	    </v-col>
	</v-row>
</template>
<script>

export default {
	computed: {
		announcement() {
			return this.$store.state.announcements.selected;
		},
	},
}

</script>