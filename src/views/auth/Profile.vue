<template>
	<v-layout row wrap>
		<v-flex xs12>
			<!-- 
			/ -	START OF PROFILE
			 -->
			<v-container class="pa-5 frm-elevation auth-card">
				<v-flex xs12 text-center mb-4>
        			<div class="auth__avatar-holder">
        				<div class="auth-avatar frm-elevation">
	          				<v-img :src="image_path ? image_path : $PRXConfig().staticUrl('images/profile.jpg')" class="mx-auto" width="80px" height="80px"></v-img>
	        			</div>
	        			<v-btn icon class="auth__avatar-edit" @click='pickFile' v-model='upload.image_name'>
	        				<i class="fa fa-pen"></i>
	        			</v-btn>
	        			<input type="file" style="display: none" ref="files" accept="image/*" id="files" placeholder="Files" @change="onFilePicked">
        			</div>
      			</v-flex>
      			<v-flex xs12 text-center mb-1>
					<h2 class="clr--white">{{ fullname }}</h2>
				</v-flex>
				<v-flex xs12 text-center>
					<h3 class="clr--white">Medical Representative</h3>
				</v-flex>
			</v-container>
			<!-- 
			/ -	END OF PROFILE
			 -->

			<!-- 
			/ -	START OF TABS FOR BASIC INFO AND SECURITY
			 -->
			<v-layout row wrap class="auth__tab-container">
		      	<v-flex xs12 text-center px-6>
		        	<v-tabs grow v-model="tab" centered slider-size="4" slider-color="#d52e29">
		          		<v-tab href="#basic-info">
		            		<h3>Basic Info</h3>
		          		</v-tab>
		          		<v-tab href="#security">
		            		<h3>Security</h3>
		          		</v-tab>
		        	</v-tabs>
		      	</v-flex>
		    </v-layout>

		    <v-layout row wrap>
		      	<v-flex xs12 pa-6>
		        	<v-tabs-items v-model="tab">
		        		
		        		<!-- TAB - BASIC INFO -->
		          		<v-tab-item value="basic-info">
		          			<!-- <form-control> -->
								<v-row no-gutters>
									<v-col cols="12">
										<v-select
										name="region"
										label="Region"
										item-text="name"
										item-value="id"
										color="#A8A8A8"
										class="form-input"
										required
										:readonly="readonly"
										v-model="region_id"
										:items="regions"></v-select>
									</v-col>
									<v-col cols="12">
										<v-text-field
										v-model="email"
										name="email"
										label="Email"
										type="email"
										color="#A8A8A8"
										class="form-input"
										required
										readonly="true"
										:value="email"
										></v-text-field>
									</v-col>
									<v-col cols="12">
										<v-btn 
										block 
										min-height="50"
										rounded 
										elevation="0"
										:class="editClass"
										@click="edit('info')">{{ editText }}</v-btn>
									</v-col>
								</v-row>
							<!-- </form-control> -->
		          		</v-tab-item>

		          		<!-- TAB - SECURITY -->
		          		<v-tab-item value="security">
		          			<!-- <form-control> -->
								<v-row no-gutters>
									<v-col cols="12">
										<v-flex xs12 mb-2>
											<v-text-field
						                  	v-model="old_password"
						                  	label="Old Password"
						                  	color="#A8A8A8"
						                  	class="form__input"
											:disabled="readonly"
						                  	type="password"
						                	></v-text-field>
						              	</v-flex>
						              	<v-flex xs12 mb-2>
						                	<v-text-field
						                  	v-model="password"
						                  	label="New Password"
						                  	color="#A8A8A8"
						                  	class="form__input"
											:disabled="readonly"
						                  	type="password"
						                	></v-text-field>
						              	</v-flex>
						              	<v-flex xs12 mb-2>
						                	<v-text-field
						                  	v-model="password_confirmation"
						                  	label="Retype Password"
						                  	color="#A8A8A8"
						                  	class="form__input"
											:disabled="readonly"
						                  	type="password"
						                	></v-text-field>
						                </v-flex>
									</v-col>
									<v-col cols="12">
										<v-btn 
										block 
										min-height="50"
										rounded 
										elevation="0" 
										:class="editClass"
										@click="edit('password')">{{ editText }}</v-btn>
									</v-col>									
								</v-row>
							<!-- </form-control> -->
		          		</v-tab-item>
		          		<v-row no-gutters>
							
							<v-col cols="12">
								<v-btn 
								block 
								min-height="50"
								rounded 
								elevation="0" 
								class="frm-btn type--1 bold mt-2 gray"
								@click="confirmSyncing()"
								>Sync Data</v-btn>
							</v-col>

							<v-col cols="12">
								<v-btn 
								block 
								min-height="50"
								rounded 
								elevation="0" 
								class="frm-btn type--1 bold mt-2 gray"
								@click="logout()">Logout</v-btn>
							</v-col>		          			
		          		</v-row>
		          	</v-tabs-items>
		        </v-flex>
		    </v-layout>
		</v-flex>

		<dialog-confirm
		:status="confirm"
		:icon_path="staticImage('images/prompt.svg')"
		message="Are you sure to sync data now?"
		confirm_button="Yes"
		cancel_button="Cancel"
		@cancel="confirm = false"
		@confirm="syncData()"
		></dialog-confirm>

		<dialog-success
		:status="successDialog"
		:icon_path="staticImage('images/Check.svg')"
		:message="message"
		ok_button="OK"
		@close="successDialog = false"
		>
		</dialog-success>

	</v-layout>
</template>

<script>
import { bus } from '../../assets/js/EventBus.js';
import DialogSuccess from '../../partials/dialog-success/Dialog.vue';
import DialogConfirm from '../../partials/dialog-confirm/Dialog.vue';

export default {

	components: {
		'dialog-success': DialogSuccess,
		'dialog-confirm': DialogConfirm	
	},

	computed: {
		user() {
			return JSON.parse(window.localStorage.getItem('user'));
		},
		regions() {
			return this.$PRX.resourceManager.fetch('regions');
		},
		picture() {
			return this.image_path;
		},
	},

	data () {
		return {
			fullname: null,
			email: null,
			region_id: null,
			readonly: true,
			image_path: null,

			old_password: null,
			password: null,
			password_confirmation: null,

			editClass: 'frm-btn type--1 bold mt-2',
			editText: 'EDIT',

			upload: {
				image: null,
				image_name: null,
			},

			tab: null,
			successDialog: false,
			confirm: false,
			message: null,

			dataArray: [],
		}
	},

	mounted() {
		const { fullname, email, region_id, image_path } = this.user;

		this.fullname = fullname;
		this.email = email;
		this.region_id = region_id;
		if(image_path) {
			this.image_path = this.$PRXConfig().api.url + '/' + image_path.replace('public', 'storage');			
		}
	},

	methods: {

	    /*
	    |--------------------------------------------------------------------------
	    | @Initialize
	    |--------------------------------------------------------------------------
	    */		



	    /*
	    |--------------------------------------------------------------------------
	    | @Methods
	    |--------------------------------------------------------------------------
	    */

		updateInfo() {
			const { email, region_id } = this;
			const newData = { email, region_id };

			this.requests(this.routes['api.team.update.profile'], newData, (result) => {
				this.successDialog = true;
				this.message = result.message;
				window.localStorage.setItem('user', JSON.stringify({ ...result.med_rep }));
			});

		},

		updatePassword() {
			const { old_password, password, password_confirmation } = this;
			const newData = { old_password, password, password_confirmation };

			this.requests(this.routes['api.team.update.password'], newData, (result) => {
				this.successDialog = true;
				this.message = result.message;

				this.old_password = null;
				this.password = null;
				this.password_confirmation = null;
			});
		},

		updateImage () {
			this.requests(this.routes['api.team.update.image'], this.getImageData(), (result) => {
				
				this.successDialog = true;
				this.message = result.message;
				window.localStorage.setItem('user', JSON.stringify({ ...result.med_rep }));
				this.image_path = result.image_path;
				bus.$emit('changeProfileImage');
				
			});
		},

		edit(type) {
			this.readonly = !this.readonly;
			if(this.readonly == true) {
				
				this.editClass = 'frm-btn type--1 bold mt-2';
				this.editText = 'EDIT';
				if(type == 'info') {
					this.updateInfo();
				} else if(type == 'password') {
					this.updatePassword();
				}

			} else {
				this.editClass = 'frm-btn type--1 bold mt-2'
				this.editText = 'SAVE';
			}
		},

		getImageData() {
			let data = new FormData();

			$.each(this.upload, (key,value) => {
				if(key == 'image') {
					data.append(key,value[0]);
				} else {
					data.append(key,value);
				}
			});

			return data;
		},

		/*
		* Opens image picker in files
		*/
		pickFile() {
			this.$refs.files.click()
		},

		/*
		* When image is picked
		*/
		onFilePicked () {
			if(this.$refs.files.files.length > 0) {
				this.upload.image = this.$refs.files.files;
				this.upload.image_name = this.upload.image[0].name;
				this.updateImage();
			} else {
				this.upload.image = '';
				this.upload.image_name = '';
			}
		},

		/**
		 * Open confirmation
		 * 
		 */
		confirmSyncing: function() {
			if(navigator.connection.type !== 'none') {
				this.checkDatabase((result) => {
					if(result) {
						this.confirm = true;
						return;						
					}
					this.$PRX.toast.activateToast('info', "Nothing to sync", {timeout: 5000});
				});
			} else {
				this.$PRX.toast.activateToast('info', "Syncing failed. Don't have access to internet connection", {timeout: 5000});
			}
		},

		/**
		 * Sync data to server
		 * 
		 */
		syncData: function() {
			var calls,
				attachments,
				postData = [];

			this.get("SELECT * FROM calls WHERE medical_representative_id=?", [this.user.id])
				.then((callsResponse) => {

					if(callsResponse.length) {
						this.$PRX.toast.activateToast('info', "Please don't close the app while syncing data.", {timeout: 5000});

						this.submit(callsResponse, 'call')
							.then((callSubmitResponse) => {

								/** Truncate calls */
								this.truncate('calls');

								this.get("SELECT * FROM call_attachments WHERE medical_representative_id=?", [this.user.id])
									.then((attachmentsResponse) => {

										if(attachmentsResponse.length) {
											this.submit(attachmentsResponse, 'attachments')
												.then((attachmentsSubmitResponse) => {
													this.truncate('call_attachments');
												});											
										} else {
											this.refreshResources(callSubmitResponse.message);
										}
									});
							
							});
					}					
				})
		},

		submit: function(data, type) {
			this.confirm = false;

			var request = {
				type: type, 
				data: data,
			};

			return new Promise((resolve, reject) => {
				
				this.requests(this.routes['api.team.sync.data'], request, (res) => {
					resolve(res);
				});

			})

		},

		refreshResources: function(message) {
			this.$loader.load();
			this.fetchResources()
				.then((response) => {
		            this.$loader.unload();
					this.message = message;
					this.successDialog = true;			    	
				})
				.catch((error) => {

	              	this.$loader.unload();

	                if(error.response.status === 401) {
	                    window.localStorage.removeItem('authToken');
	                    window.axios.defaults.headers.common['Authorization'] = null;
	                    this.$router.replace({ name: 'login' })
	                }	
				});
			},

		/**
		 * Logout user account
		 * 
		 */
		logout: function() {
			this.$loader.load();
			setTimeout(()=> {
				window.localStorage.removeItem('authToken');
				window.localStorage.removeItem('dataResource');
				window.axios.defaults.headers.common['Authorization'] = null;
				localStorage.removeItem('user');
				this.$PRX.resourceManager.resources = {};
				this.$router.replace({ name: 'login' })			
				this.$loader.unload();
			}, 3000);

		},
	}
}
</script>
