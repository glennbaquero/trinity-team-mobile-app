import Vue from 'vue'
import VueRouter from 'vue-router'

/* Home */
import Home from './views/Home.vue'

/* Stylesheet */
import Stylesheet from './views/Stylesheet.vue'

/* Auth */
import Login from './views/auth/Login.vue'
import Profile from './views/auth/Profile.vue'

/* Call Plan */
import AddCallPlan from './views/callPlan/AddCallPlan.vue'
import CallPlan from './views/callPlan/CallPlan.vue'
import CallPlanView from './views/callPlan/CallPlanView.vue'

/* Reports */
import Reports from './views/reports/Reports.vue'

/* Doctors */
import AddDoctor from './views/doctors/AddDoctor.vue'
import Doctors from './views/doctors/Doctors.vue'
import DoctorsCallPlan from './views/doctors/DoctorsCallPlan.vue'
import DoctorsPatients from './views/doctors/DoctorsPatients.vue'
import DoctorsView from './views/doctors/DoctorsView.vue'

/* Announcement */
import Announcement from './views/announcement/Announcement.vue'
import AnnouncementView from './views/announcement/AnnouncementView.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [

    /* Home */
  	{ name: 'home', path: '/home', component: Home },

  	/* Stylesheet */
    { name: 'stylesheet', path: '/stylesheet', component: Stylesheet },

    /* Auth */
  	{ name: 'login', path: '/', component: Login },
    { name: 'profile', path: '/profile', component: Profile },

  	/* Call Plan */
  	{ name: 'callplan', path: '/callplan', component: CallPlan },
    { name: 'callplanAdd', path: '/callplan/add', component: AddCallPlan },
    { name: 'callplanView', path: '/callplan/view', component: CallPlanView },

  	/* Reports */
  	{ name: 'reports', path: '/reports', component: Reports },

  	/* Doctors */
    { name: 'addDoctor', path: '/add/doctor', component: AddDoctor },
  	{ name: 'doctors', path: '/doctors', component: Doctors },
    { name: 'doctorsCallPlan', path: '/doctors/callplan', component: DoctorsCallPlan },
    { name: 'doctorsPatients', path: '/doctors/patients', component: DoctorsPatients },
    { name: 'doctorsView', path: '/doctors/view', component: DoctorsView },
    
    /* Announcement */
    { name: 'announcement', path: '/announcement/', component: Announcement },
    { name: 'announcementView', path: '/announcement/view', component: AnnouncementView },

  ]
})
