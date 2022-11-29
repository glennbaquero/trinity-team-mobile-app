<template>
	<div class="main-header" 
    v-show="!$PRXRouter().isOnRoute('login')">
		<!-- Top Navigation -->
		<v-app-bar app
        :class="[
        { 'auth__acc-header':this.$PRXRouter().isOnRoute('profile') },
        { 'cp__header':this.$PRXRouter().isOnRoute('callplanView') },
        { 'hdr-frm__no-shdw':this.$PRXRouter().isOnRoute('profile') }]"
        class="frm-elevation"
        height="70px">

            <!-- Avatar -->
        	<div class="hdr-avatar" v-show="!$PRXRouter().isOnRoute('doctorsView') && !$PRXRouter().isOnRoute('callplanView') &&
            !$PRXRouter().isOnRoute('doctorsPatients') &&
            !$PRXRouter().isOnRoute('doctorsCallPlan') &&
            !$PRXRouter().isOnRoute('profile') &&
            !$PRXRouter().isOnRoute('callplanAdd') &&
            !$PRXRouter().isOnRoute('addDoctor') &&
            !$PRXRouter().isOnRoute('announcementView')"
            @click="$PRXRouter().goTo('profile')">
        		<v-img :src="renderImagePath ? renderImagePath : $PRXConfig().staticUrl('images/profile.jpg')" width="32px" height="32px"></v-img>
      		</div>

            <!-- Back btn -->
            <div class="hdr-btn-back" 
            :class="{ 'clr--white':this.$PRXRouter().isOnRoute('profile') }"
            @click="$PRXRouter().goBack()"
            v-show="$PRXRouter().isOnRoute('doctorsView') || $PRXRouter().isOnRoute('callplanView') ||
            $PRXRouter().isOnRoute('doctorsPatients') ||
            $PRXRouter().isOnRoute('doctorsCallPlan') ||
            $PRXRouter().isOnRoute('profile') ||
            $PRXRouter().isOnRoute('callplanAdd') ||
            $PRXRouter().isOnRoute('addDoctor') ||
            $PRXRouter().isOnRoute('announcementView')">
                <v-icon>fa-chevron-left</v-icon>
            </div>

            <!-- Header text -->
		    <template v-if="$PRXRouter().isOnRoute('home')">
		        <h1 class="hdr-text">Home</h1>
		    </template>

            <template v-if="$PRXRouter().isOnRoute('profile')">
                <h1 class="hdr-text">Account</h1>
            </template>

		    <template v-if="$PRXRouter().isOnRoute('callplan') || $PRXRouter().isOnRoute('callplanAdd')">
		        <h1 class="hdr-text">Call Plan</h1>
		    </template>

            <template v-if="$PRXRouter().isOnRoute('callplanView')">
                <h1 class="hdr-text">{{ renderSelectedCallAgenda }}</h1>
            </template>

		    <template v-if="$PRXRouter().isOnRoute('reports')">
		        <h1 class="hdr-text">Reports</h1>
		    </template>

		    <template v-if="$PRXRouter().isOnRoute('doctors')">
		        <h1 class="hdr-text">Doctors</h1>
		    </template>

            <template v-if="$PRXRouter().isOnRoute('doctorsView')">
                <h1 class="hdr-text">{{ renderDoctorName }}</h1>
            </template>

            <template v-if="$PRXRouter().isOnRoute('doctorsPatients')">
                <h1 class="hdr-text">Patients</h1>
            </template>

            <template v-if="$PRXRouter().isOnRoute('doctorsCallPlan')">
                <h1 class="hdr-text">{{ renderDoctorName }}</h1>
            </template>

            <template v-if="$PRXRouter().isOnRoute('addDoctor')">
                <h1 class="hdr-text">Add Doctor</h1>
            </template>

            <template v-if="$PRXRouter().isOnRoute('announcement') || $PRXRouter().isOnRoute('announcementView')">
                <h1 class="hdr-text">Announcements</h1>
            </template>            

        </v-app-bar>
	</div>
</template>
<script type="text/javascript">
import { bus } from '../assets/js/EventBus.js';
export default {

    data() {
        return {
            user: null,
        }
    },

    mounted() {
        
        this.eventFetcher();
        this.user = JSON.parse(window.localStorage.getItem('user'));
    
    },

    methods: {

        eventFetcher: function() {

            bus.$on('changeProfileImage', () => {
                this.user = JSON.parse(window.localStorage.getItem('user'));
            });

            bus.$on('userConnected', () => {
                this.user = JSON.parse(window.localStorage.getItem('user'));
            });
        },
    },


    computed: {
        renderDoctorName: function() {
            var doctor = this.$store.state.doctor.doctor;
            if(doctor) {
                return 'Dr. ' + doctor.fullname;
            }
        },
        renderSelectedCallAgenda: function() {
            var call = this.$store.state.call.call;
            if(call) {
                return call.agenda
            }
        },   

        renderImagePath() {
            const { image_path } = this.user;
            if(image_path) {
                return this.$PRXConfig().api.url + '/' + image_path.replace('public', 'storage');                
            }
        },

    },     
}
</script>