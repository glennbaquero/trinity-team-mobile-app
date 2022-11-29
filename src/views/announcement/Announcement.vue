<template>
<div class="width-100">

	<template v-if="announcements.length === 0">
		<v-layout justify-center row wrap my-5 mx-3 class="cp-item">
			<p class="font16 mb-0"><strong>No Announcements</strong></p>
		</v-layout>
	</template>

	<v-row class="pb-12" no-gutters>
	    <v-col cols="12">
	    	<template v-for="(announcement, key) in announcements">
			  	<v-card  @click="selectAnnouncement(announcement)" :class="{'new-announcement': key == 0}" class="frm-card mb-2 mx-auto anncmnt-frm__anncmnt frm-elevation" max-width="89.5vw">
		      		<v-list-item two-line>
		    			<v-list-item-avatar tile width="82" height="75">
				        	<v-img :src="announcement.image"></v-img>
		    			</v-list-item-avatar>
		    			<v-list-item-content class="pr-5">
		    				<v-list-item-title class="bold font16">{{ announcement.title }}</v-list-item-title>
		    				<v-list-item-subtitle class="font12">{{ renderDate(announcement.date, "MMMM D YYYY, h:mm a") }}</v-list-item-subtitle>
		    			</v-list-item-content>
		      		</v-list-item>
			  	</v-card>
		  	</template>
	    </v-col>
	</v-row>
</div>
</template>

<style>
	.v-application .pa-1 {
		padding: 0px !important;
	}

	.width-100 {
		width: 100%;
	}

</style>

<script>
export default {
	
	computed: {
		announcements() {
			return this.dataResource('announcements') ? this.dataResource('announcements') : [];
		},
	},

	methods: {
		/**
		 * Select announcement
		 * 
		 * @param  object announcement
		 */
		selectAnnouncement(announcement) {
			this.$store.commit("announcements/setAnnouncement", announcement);
			this.$PRXRouter().goTo('announcementView');
		}
	},

}
</script>