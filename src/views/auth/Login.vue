<template>
	<v-container>
		<v-layout row wrap>
			<v-flex xs12 class="pa-2">
    			<form @submit.prevent="login">
					<v-container>
						<v-layout row wrap>
							<v-flex xs12 class="mb-12">
								<div class="frm-text bold">
									<h1 class="clr--black">Welcome,</h1>
									<p class="clr--gray">Please login to your account.</p>
								</div>
							</v-flex>

							<v-flex xs12 mt-5>
								<v-text-field
            						v-model="email"
									name="email"
									label="Email"
									data-vv-name="email"
									data-vv-as="Email"
									type="email"
									color="#3B823E"
									class="form-input"
									data-vv-value-path="internalValue"
									:error-messages="errors.collect('email')"
								></v-text-field>
							</v-flex>

							<v-flex xs12>
								<v-text-field
            						v-model="password"
									name="password"
									label="Password"
									data-vv-name="password"
									data-vv-as="Password"
									type="password"
									color="#3B823E"
									class="form-input"
									data-vv-value-path="internalValue"
									:error-messages="errors.collect('password')"
								></v-text-field>
							</v-flex>

							<v-flex xs12>
								<v-btn block min-height="50" elevation="0" class="frm-btn type--1 mt-12"
								@click="login">Login</v-btn>
							</v-flex>
						</v-layout>
					</v-container>
				</form>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { bus } from '../../assets/js/EventBus.js';
import LogoutMixin from '../../assets/js/mixins/logout.js';

export default{
    mixins: [LogoutMixin],

    data() {
      return {
        email: null,
        password: null
      }
    },

    mounted() {
        if(window.localStorage.getItem('authToken') && this.$PRXRouter().areOnRoute(['login'])) {
            this.$PRXRouter().goTo('home');
            bus.$emit('userConnected');
        }
    },

    methods: {

	    /*
	    |--------------------------------------------------------------------------
	    | @Methods
	    |--------------------------------------------------------------------------
	    */

		login() {
			
			var data = {
				email: this.email,
				password: this.password
			};

        	this.requests(this.routes['api.team.login'], data, (result)=> {
        		this.setToken(result.token);
        		this.setUser(result.user);
        		this.fetchResources();
				bus.$emit('userConnected');        		
                this.$PRXRouter().goTo('home');
        	});
		},

		setToken(token) {
			window.axios.defaults.headers.common['Authorization'] = token;
			window.localStorage.setItem('authToken', token);
			this.$store.commit('user/setToken', token);
			
		},

		setUser(user) {
			window.localStorage.setItem('user', user);
			this.$store.commit('user/userDetails', user);
		},

    },
}

</script>
