<template>
	<v-container>
		<v-layout align-center row wrap>
			<v-flex xs12>
				<v-card class="pa-4">
					<!-- Define form ref as 'sampleForm' -->
					<form-control ref="sampleForm" :action="'http://localhost:8000/api/buyer/register'">
						<v-container>
							<v-layout row wrap>
								<v-flex xs12>
									<h1 class="headline">Sample Form</h1>
								</v-flex>

								<v-flex xs12>
									<!-- Validation is provided via vee-validate package https://baianat.github.io/vee-validate/ -->
									<!-- 
										Validation Method 1: no v-model 
										If you're not going to use v-model you need to define:
										- data-vv-name: specifies the "name" of the input
										- data-vv-as: specifies the rendered error message of the name
										- data-vv-value-path: specifies the path to the "value" property of the component ( in this case, for Vuetify, the property is "internalValue")
										- errors.collect is defined automatically when you declare the `$_veeValidate object (see below)
									-->
									<v-text-field
									v-validate="'required|max:10'"
									name="first_name"
									label="First Name"
									data-vv-name="first_name"
									data-vv-as="First Name"
									data-vv-value-path="internalValue"
									:error-messages="errors.collect('first_name')"
									></v-text-field>
								</v-flex>

									<!-- 
										Validation Method 2: with v-model 
										Much easier, just define a v-model
									-->
								<v-flex xs12>
									<v-text-field
									name="middle_Name"
									label="Middle Name"
									:error-messages="errors.collect('middle_name')"
									></v-text-field>
								</v-flex>
								<v-flex xs12>
									<v-text-field
									v-validate="'required|max:10'"
									data-vv-as="Last Name"
									name="last_name"
									label="Last Name"
									v-model="last_name"
									:error-messages="errors.collect('last_name')"
									required
									></v-text-field>
								</v-flex>

								<v-flex xs12>
									<v-radio-group v-model="select" row>
										<v-radio label="Basic" :value="false"></v-radio>
										<v-radio label="Advanced" :value="true"></v-radio>
									</v-radio-group>
								</v-flex>

								<template v-if="select">
									<v-flex xs12>
										<v-text-field
										v-validate="'required|email'"
										data-vv-as="Email"
										name="email"
										label="Email"
										v-model="email"
										:error-messages="errors.collect('email')"
										required

										></v-text-field>
									</v-flex>

									<v-flex xs12>
										<v-text-field
										v-validate="'required'"
										name="address"
										label="Address"
										data-vv-as="Address"
										></v-text-field>
									</v-flex>

									<v-flex xs12>
										<v-select
										:items="items"
										label="Standards"
										></v-select>
									</v-flex>

									<v-flex xs12>
										<v-select
										:items="items"
										label="Variables"
										></v-select>
									</v-flex>

									<v-flex xs12>
										<v-select
										:items="items"
										label="Options"
										></v-select>
									</v-flex>

									<v-flex xs12>
										<v-text-field
										name="reason"
										label="Reason"
										></v-text-field>
									</v-flex>
								</template>

								<v-flex xs12 text-xs-right>
									<!-- Trigger submit of 'sampleForm' -->
									<v-btn @click="submit('sampleForm')" color="primary">Submit</v-btn>
								</v-flex>
							</v-layout>
						</v-container>
					</form-control>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script type="text/javascript">
import FormControl from '../components/FormControl.vue'

export default {

	$_veeValidate: {
		validator: 'new',
	},

	data () {
		return {
			select: false,
			items: ['Foo', 'Bar', 'Fizz', 'Buzz'],

			// v-model fields
			first_name: '',
			last_name: '',
			middle_name: '',
			email: '',

		}
	},

	components: {
		'form-control': FormControl
	},

	methods: {
		submit(form) {
 			
 			// Submits form. The 'true' here enables throw error so you can catch the promise error,
 			// If 'false' is passed as the second param, the catch block below will not fire
			this.$refs[form].submitForm(this.$validator, true)
				.then(data => {
					// alert response data
					this.$PRXResponse().alertResponse(data, true);
				})
				.catch(error => {
					// do something with the error, such as reset the state
					console.log(error);
				});
		}
	}
}
</script>
