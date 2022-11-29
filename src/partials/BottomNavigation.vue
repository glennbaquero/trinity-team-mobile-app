<template>
	<div class="main-footer" v-show="!$PRXRouter().isOnRoute('login') && !$PRXRouter().isOnRoute('profile')">
        <v-bottom-navigation fixed grow
            >
            <!-- <v-btn 
                transition="scroll-x-transition"
                v-for="item in items"
                :key="item.title"
                :value="item.action"
                :input-value="$PRXRouter().isOnRoute(item.action)"
                @click="$PRXRouter().goTo(item.action)"
                >
                <span class="font12">{{ item.title }}</span>
                <v-icon>{{ item.icon }}</v-icon>
            </v-btn> -->

            <v-btn
                value="home"
                :class="{'v-btn--active': $PRXRouter().isOnRoute('home') }"
                :ripple="false"
                @click="navigate('home')">
                <span class="pt-1">Home</span>
                <home></home>
            </v-btn>
            <v-btn
                value="callplan"
                :class="{'v-btn--active': $PRXRouter().isOnRoute('callplan') || $PRXRouter().isOnRoute('callplanView') ||
                $PRXRouter().isOnRoute('callplanAdd') }" 
                :ripple="false"
                @click="navigate('callplan')">
                <span class="pt-1">Call Plan</span>
                <call-plan></call-plan>
            </v-btn>
            <v-btn
                value="reports"
                :class="{'v-btn--active': $PRXRouter().isOnRoute('reports')}"
                :ripple="false"
                @click="navigate('reports')">
                <span class="pt-1">Reports</span>
                <reports></reports>
            </v-btn>
            <v-btn
                value="doctors"
                :class="{'v-btn--active': $PRXRouter().isOnRoute('doctors') ||
                $PRXRouter().isOnRoute('doctorsCallPlan') ||
                $PRXRouter().isOnRoute('doctorsPatients') ||
                $PRXRouter().isOnRoute('doctorsView') }" 
                :ripple="false"
                @click="navigate('doctors')">
                <span class="pt-1">Doctors</span>
                <doctors></doctors>
            </v-btn>
            <v-btn
                value="announcement"
                class="btn-anncmnt"
                :class="{'v-btn--active': $PRXRouter().isOnRoute('announcement') || 
                $PRXRouter().isOnRoute('announcementView')}" 
                :ripple="false"
                @click="navigate('announcement')">
                <span class="pt-1">Announcement</span>
                <announcement></announcement>
            </v-btn>
        </v-bottom-navigation>   
    </div>
</template>

<script type="text/javascript">
import Home from '../views/svg/Home.vue'
import CallPlan from '../views/svg/CallPlan.vue'
import Reports from '../views/svg/Reports.vue'
import Doctors from '../views/svg/Doctors.vue'
import Announcement from '../views/svg/Announcement_svg.vue'

export default {

    components: {
        'home': Home,
        'call-plan': CallPlan,
        'reports': Reports,
        'doctors': Doctors,
        'announcement': Announcement,
    },

    methods: {
        navigate: function(route) {
            if(!this.$PRXRouter().isOnRoute(route)) {
                this.$PRXRouter().goTo(route);
            }
        },
    },
};
</script>
