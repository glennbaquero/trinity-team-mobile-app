<template>
  <v-app>
    <top-navigation></top-navigation>
    <Loader></Loader>
    <v-content class="main__container">

      <v-container fill-height align-start
      :class="[
        { 'align-center':this.$PRXRouter().isOnRoute('login') },
        { 'no-padding':this.$PRXRouter().isOnRoute('announcementView') },
      ]">
        <router-view :key="$route.fullPath"></router-view>
      </v-container>

      <PRXAlert></PRXAlert>
      <PRXToast></PRXToast>
      <PRXResourceManager :concurrency="100"></PRXResourceManager>
    </v-content>
    <bottom-navigation></bottom-navigation>

    <!-- No connection -->
    <template v-if="!network">
      <div class="no-internet">
        <p>Offline mode</p>
      </div>
    </template>

    <no-internet-dialog
    :status="dialog"
    :icon_path="staticImage('images/prompt.svg')"
    :message="message"
    :persistent="true"
    ok_button="OK"
    @close="dialog = false"
    >
    </no-internet-dialog>

  </v-app>
</template>

<style>

  .no-padding {
    padding: 0px !important;
  }

</style>

<script type="text/javascript">

import { bus } from './assets/js/EventBus.js';

import TopNavigation from './partials/TopNavigation.vue'
import BottomNavigation from './partials/BottomNavigation.vue'
import NetworkMixin from './assets/js/mixins/network.js';
import GeolocationMixin from './assets/js/mixins/geolocation.js';

import NoInternetDialog from './partials/dialog-success/Dialog.vue';

export default {

  components: {
    'top-navigation': TopNavigation,
    'bottom-navigation': BottomNavigation,
    'no-internet-dialog': NoInternetDialog
  },

  computed: {
    fetchUrl() {
      return this.$PRXConfig().api.url + '/api/team/config/fetch';
    },

    loader() {
      return this.$PRX.dialogLoader;
    },
  },

  created:function() {
    this.backbuttonhandler();
  },

  mounted () {
    this.userEventFetcher();
    
    setTimeout(() => {
      this.fetch();
    }, 2000)
  },

  mixins: [ NetworkMixin, GeolocationMixin ],

  data: function() {
    return {
      message: '',
      dialog: false,
    }    
  },

  methods: {

    backbuttonhandler:function() {

      bus.$on('back',() => {

        if(this.$PRXRouter().isOnRoute('home') || this.$PRXRouter().isOnRoute('login')) {
          navigator.app.exitApp();
        } else {
          this.$router.go(-1);
        }

       /* turn off and re-initialize to prevent multiple triggers */
       bus.$off('back');
       this.backbuttonhandler();
      });
    },

    fetch() {
      this.$loader.load();
      axios.post(this.fetchUrl)
          .then((response) => {
            this.$loader.unload();
            if(response.status === 200) {
              this.$store.commit('api/set', response.data.routes);
              this.setItem('routes', response.data.routes);              
            }
          }).catch((error) => {
            this.$loader.unload();
          });
    },

    userEventFetcher: function() {
      bus.$on("userConnected", () => {
        this.enableGPRS();
        this.fetchResources()
            .then((response) => {
            })
            .catch((error) => {
              if(error.response.status === 401) {
                  window.localStorage.removeItem('authToken');
                  window.axios.defaults.headers.common['Authorization'] = null;
                  this.$router.replace({ name: 'login' })
              }              
            })
      });

      bus.$on("showDialog", (message) => {
        this.dialog = true;
        this.message = message;
      });      

    },

  },

};
</script>
