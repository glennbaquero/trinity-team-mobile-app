import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    screen: {
      namespaced: true,
      state: {
        scrollable: true
      },

      mutations: {
        scrollable (state, value) {
          state.scrollable = value
        }
      }
    },


    api: {
      namespaced: true,
      state: {
        api: null,
      },

      mutations: {
        set: function(state, value) {
          state.api = value;
        }
      },
    },

    user: {
      namespaced: true,
      state: {
        token: null,
        user: {},
      },
      
      mutations: {
        setToken: function(state, value) {
          state.token = value;
        },
        userDetails: function(state, value) {
          state.user = value;
        },

      }

    },

    resources: {
      namespaced: true,
      state: {
        resources: null,
        calls: [],
      },

      mutations: {
        setResources: function(state, value) {
          state.resources = value;
        },

        setCalls: function(state, value) {
          state.calls = value;
        },
      },
  
    },
    
    doctor: {
      namespaced: true,
      state: {
        doctor: null,
        createdDoctor: null,
      },

      mutations: {
        setDoctor: function(state, value) {
          state.doctor = value;
        },

        setCreatedDoctor: function(state, value) {
          state.createdDoctor = value;
        },
        
      },
    },

    selectDate: {
      namespaced: true,
      state: {
        date: null,
      },

      mutations: {
        setDate: function(state, value) {
          state.date = value;
        },
      },
    },

    call: {
      namespaced: true,
      state:{ 
        call: {},
      },

      mutations: {
        setCall: function(state, value) {
          state.call = value;
        }
      }
    },

    date: {
      namespaced: true,
      state: {
        date: null,
      },

      mutations: {
        setDate: function(state, value) {
          state.date = value;
        },
      },
    },

    announcements: {
      namespaced: true,
      state: {
        selected: null,
      },

      mutations: {
        setAnnouncement: function(state, value) {
          state.selected = value;
        },
      },      
    },

  },

  getters: {
    //
  }
})
