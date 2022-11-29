<template>
	<v-layout row wrap>
		<v-flex xs12 pb-12>
			<v-container>
				<v-row no-gutters>
					<!-- 
					/ -	START OF CALL PLAN - view
					 -->
					<v-col cols="12" class="mb-3">
						<v-card
	            		class="py-3 px-4 text-center cp-card"
	         			>
	         				<h3>{{ doctor.fullname }}</h3>
	         				<p class="medium my-1 clr--gray">{{ call.clinic }}</p>
	         				<p class="medium my-1 clr--gray">{{ doctor.specialization.name }}</p>
	         				<p class="medium my-1 clr--gray">{{ doctor.mobile_number }}</p>
	         				<p class="medium my-1 clr--gray">{{ doctor.email }}</p>
	         				<p class="medium my-1 clr--gray">{{ doctor.clinic_hours }}</p>
	          			</v-card>
					</v-col>
					
					<v-col cols="12">
						<v-expansion-panels accordion class="cp-accordion">
						    <v-expansion-panel>
						      	<v-expansion-panel-header>
						      		<p class="bold ma-0 clr--black">Agenda</p>
						      	</v-expansion-panel-header>
						      	<v-expansion-panel-content>
						        	<v-text-field
						        	v-model="post.agenda"
									name="agenda"
									label="Agenda"
									type="text"
									color="#A8A8A8"
									class="form-input"
									disabled
									></v-text-field>
						      	</v-expansion-panel-content>
						    </v-expansion-panel>
						    <v-expansion-panel
						    :class="{'has-error': hasError(['arrived_at', 'left_at'])}">
						      	<v-expansion-panel-header>
						      		<p class="bold ma-0 clr--black">Timelog</p>
						      	</v-expansion-panel-header>
						      	<v-expansion-panel-content>
						        	<v-text-field
									v-model="post.arrived_at"
									name="arrived"
									label="Arrived"
									type="time"
									color="#A8A8A8"
									class="form-input"
									></v-text-field>

									<template v-if="errors.arrived_at">
										<p class="has-error-text">{{ errors.arrived_at }}</p>
									</template>

									<v-text-field
									v-model="post.left_at"
									name="leave"
									label="Leave"
									type="time"
									color="#A8A8A8"
									class="form-input"
									></v-text-field>

									<template v-if="errors.left_at">
										<p class="has-error-text">{{ errors.left_at }}</p>
									</template>

						      	</v-expansion-panel-content>
						    </v-expansion-panel>
						    <v-expansion-panel
						    :class="{'has-error': hasError('signature')}">
						      	<v-expansion-panel-header>
						      		<p class="bold ma-0 clr--black">Signature</p>
						      	</v-expansion-panel-header>
						      	<v-expansion-panel-content>
						      		<div class="signature-wrapper">

						      			<template v-if="signaturePath">
							      			<img
							      				width="60%"
							      				:src="signaturePath"
										        @click="openSignaturePad"				      				
							      			>
						      			</template>

						      			<template v-else>
							        		<v-btn
									        class="frm-btn type--2"
									        max-height="40"
									        min-width="110px"
									        @click="openSignaturePad"
									        >SIGNATURE
									        </v-btn>
								        </template>
									</div>
									<template v-if="errors.signature">
										<p class="has-error-text">{{ errors.signature }}</p>
									</template>
						      	</v-expansion-panel-content>
						    </v-expansion-panel>
						    <v-expansion-panel
						    :class="{'has-error': hasError('attachments')}" >
						      	<v-expansion-panel-header>
						      		<p class="bold ma-0 clr--black">Upload Photo</p>
						      	</v-expansion-panel-header>
						      	<v-expansion-panel-content>

						        	<div class="upload-wrapper">
						        		<v-img class="mx-auto mb-4" height="60px" width="60px" :src="$PRXConfig().staticUrl('images/camera.svg')"></v-img>
						        		<v-btn
								        class="frm-btn type--2"
								        max-height="40"
								        min-width="110px">UPLOAD PHOTO
								        </v-btn>
								        <input type="text" style="display: none" v-model="post.photo">
									    <input @change="insertUploadPhoto" multiple ref="upload" type="file" name="upload" id="upload" accept="image/*" class="upload-box" placeholder="Upload File">
									</div>
									
									<!-- <template v-if="errors.attachments">
										<p class="has-error-text">{{ errors.attachments }}</p>
									</template> -->			

									<v-layout row wrap>
										
										<v-flex lg2 md4 xs4 v-for="(photo, index) in attachments" class="px-2 py-2">
											<v-img
												:src="photo.preview"
												:lazy-src="photo.preview"
												class="grey lighten-2"
							                >
							                </v-img>
										</v-flex>

										<template v-if="attachmentResult">
											
											<v-flex lg2 md4 xs4 v-for="photos in attachmentResult" class="px-2 py-2">
												<v-img
													:src="photos.file"
													:lazy-src="photos.file"
													class="grey lighten-2"
								                >
								                </v-img>
											</v-flex>											

										</template>

										<v-flex lg2 md4 xs4 v-for="photos in filteredUploadAttachments" class="px-2 py-2">
											<v-img
												:src="$PRXConfig().api.url + '/' + photos.file_path.replace('public', 'storage')"
												:lazy-src="$PRXConfig().api.url + '/' + photos.file_path.replace('public', 'storage')"
												class="grey lighten-2"
							                >
							                </v-img>
										</v-flex>

									</v-layout>
						      	</v-expansion-panel-content>
						    </v-expansion-panel>
							<v-expansion-panel>
						      	<v-expansion-panel-header>
						      		<p class="bold ma-0 clr--black">Post call comments</p>
						      	</v-expansion-panel-header>
						      	<v-expansion-panel-content>
						        	<v-textarea
						        	v-model="post.notes"
									label="Notes"
									type="text"
									color="#A8A8A8"
									autoGrow
									rows="1"
									height="auto"
									class="form-input"
									></v-textarea>
						      	</v-expansion-panel-content>
						    </v-expansion-panel>						    
						</v-expansion-panels>
						
						<v-btn 
						block 
						min-height="50"
						rounded 
						elevation="0" 
						@click="submittingCallPlan()"
						class="frm-btn type--1 bold mt-8">SUBMIT</v-btn>
					</v-col>
					<!-- 
					/ -	END OF CALL PLAN - view
					 -->
				</v-row>
			</v-container>	
		</v-flex>

		<dialog-confirm
		:status="submitCallPlan"
		:icon_path="staticImage('images/prompt.svg')"
		:message="renderMessage"
		confirm_button="Yes"
		cancel_button="Cancel"
		@cancel="submitCallPlan = false"
		@confirm="submit()"
		></dialog-confirm>

		<dialog-success
		:status="successCallPlan"
		:icon_path="staticImage('images/Check.svg')"
		message="Form successfully submitted"
		ok_button="OK"
		:persistent="true"
		@close="closeSuccessModal"
		>
		</dialog-success>

		<!-- Signature dialog
			Adding this dialog since vue expansion-panel
			has conflict with the package
		-->		 
		<v-dialog v-model="signatureDialog" width="90%">
			<v-card>
				<VueSignaturePad
					width="100%"
					height="300px"
					ref="signaturePad"
				/>
				<v-row class="pa-0 justify-center mt-3">
					<div class="flex-grow-1"></div>
			        <v-col cols="12" class="pa-0 text-center pb-2">
				        <v-btn
				        class="frm-btn type--2"
				        max-height="40"
				        @click="save"
				        min-width="121px">
				        	<v-icon left>fa-check</v-icon>Save
				        </v-btn>
			        </v-col>
			        <v-col cols="12" class="pa-0 text-center">
			        	<v-btn 
				        @click="undo"
				        max-height="40"
				        min-width="121px"
				        class="frm-btn type--2 gray2">
				    		<v-icon left>fa-undo</v-icon>Undo
				    	</v-btn>
			        </v-col>
			    </v-row>				
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script type="text/javascript">

import VueSignaturePad from 'vue-signature-pad';
import DialogConfirm from '../../partials/dialog-confirm/Dialog.vue';
import DialogSuccess from '../../partials/dialog-success/Dialog.vue';

import { bus } from '../../assets/js/EventBus.js';

export default {

	components: {
		'dialog-confirm': DialogConfirm,
		'dialog-success': DialogSuccess,
		VueSignaturePad,
	},

	computed: {

		filteredUploadAttachments: function() {

			var attachments = this.call.call_attachments;

			if(attachments) {
				attachments = attachments.filter(function(attachment) {
					return attachment.type == 3;
				});
			}

			return attachments;

		},

		signaturePath: function() {
			if(!this.signature) {
				var path = this.call.call_attachments;
				if(path && path.length != 0) {
					path = path.filter((e)=> {
						return e.type == 2;
					});
					return this.dynamicImage(path[0].file_path.replace('public', 'storage'));					
				}
				return;
			}
			return this.signature;
		},
		
		callUpdated: function() {
			let result = true;

			if(!this.result.length) {
				result = false;
			} 

			if(this.call.left_at && this.call.arrived_at && result) {
				result =  true;
			}

			return result;
		},

		renderMessage: function() {
			if(!this.isOnline()) {
				return "Your about to update a call using offline mode, please do not delete any attachments in this call until you sync all data from server";
			} else {
				return "Are you sure you want to submit form?";
			}
		},

		user: function() {
			return JSON.parse(window.localStorage.getItem('user'));
		},

		/**
		 * Render doctor
		 * 
		 */
		doctor() {
			if(this.call.doctor) {
				return this.call.doctor;
			} else {
				let doctor = this.findDoctor(this.call.doctor_id);
				return doctor;
			}
		},

	},

	watch: {

		result: {
			handler: function() {
				var result = JSON.parse(JSON.stringify(this.result[0]));
				let hr = moment().format("HH:mm");			    
			    this.post.id = result.call_id;
			    this.post.agenda = result.agenda;
			    this.post.arrived_at = result.arrived_at;
			    this.post.left_at = result.left_at ? result.left_at: hr;
			    this.post.notes = this.renderNotes(result.notes);
			    this.signature = result.signature;
			}, 
			deep: true
		},

	},

  	data () {
    	return {
    		errors: {},

			submitCallPlan: false,
	      	successCallPlan: false,
	      	call: null,
	      	post: {
	      		id: null,
	      		agenda: null,
	      		arrived_at: null,
	      		left_at: null,
	      		notes: null,

	      	},
	  		attachments: [],
	      	signatureDialog: false,
	      	signature: '',

	      	result: null,
	      	attachmentResult: null,
    	}
  	},

	beforeMount: function() {
		this.init();

	    let callQuery = "SELECT * FROM calls WHERE id=?",
	    	attachmentQuery = "SELECT * FROM call_attachments WHERE call_id=?";
		
		this.get(callQuery, [this.call.id])
			.then((response) => {
				this.result = response;
			});

		this.get(attachmentQuery, [this.call.id])
			.then((response) => {
				this.attachmentResult = response;				
			})
	},

	methods: {

	    /*
	    |--------------------------------------------------------------------------
	    | @Initialize
	    |--------------------------------------------------------------------------
	    */

	    init: function() {
			let hr = moment().format("HH:mm");
	    	this.call = this.$store.state.call.call;
	    	this.post.doctor_id = this.call.doctor_id;
		    this.post.id = this.call.id;
		    this.post.agenda = this.call.agenda;
		    this.post.arrived_at = this.call.arrived_at;
		    this.post.notes = this.renderNotes(this.call.notes);
		    this.post.left_at = this.call.left_at ? this.call.left_at: hr; 

	    },


	    /*
	    |--------------------------------------------------------------------------
	    | @Methods
	    |--------------------------------------------------------------------------
	    */

	    openSignaturePad: function() {
    		this.signatureDialog = true;
	    },

		/**
		 * Save signature
		 * 
		 */
		save: function() {
			const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
			this.signature = data;
			this.signatureDialog = false;
		},

		/**
		 * Undo signature
		 * 
		 */
		undo: function() {
			this.$refs.signaturePad.undoSignature();
		},

		/**
	     * Confirmation for call plan submission
	     * 
	     */
	    submittingCallPlan: function() {

			this.checkDatabase((result) => {
				if(result && this.isOnline()) {
					this.$PRX.toast.activateToast('info', "You have pending data to sync. Please sync the data first.", {timeout: 5000});
				} else {
			    	this.submitCallPlan = true;
				}
			});

	    },

		closeSuccessModal: function() {
			this.successCallPlan = false;
			this.$PRXRouter().goTo('callplan');	
		},


		/**
		 * Create an array of uploaded files
		 * 
		 * @param  object e
		 */
		insertUploadPhoto: function(e) {
            var files = e.target.files || e.dataTransfer.files;
			if(!files.length) {
            	return;
            }
        	$.each(files, (key, value) => {

				this.$loader.load();
				
				this.convertProcess(value)
					.then((response) => {
						this.$loader.unload();
						this.attachments.push(
							{'filename' : value.name, 'file': value, 'base64': response, 'type': 3, 'preview': URL.createObjectURL(value) }
						)
					}).catch((e) => {
						console.log(e);
						this.$loader.unload();							
					});
        	});
            document.getElementById('upload').value = "";	    	
		},

		/**
		 * Convert file to base64
		 * 
		 * @param  object file
		 */
		convertProcess: function(file) {

			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);

				reader.onload = (e) => {
					resolve(e.target.result);
				};

				reader.onerror = (e) => {
					reject(e);
				};

			});

		},

		/**
		 * Get post data
		 *
		 */
	    getData() {
	    	let data = new FormData();
	    	data.append('_method', 'PUT');
	    	data.append('id', this.post.id);
	    	data.append('agenda', this.post.agenda);
	    	data.append('arrived_at', this.post.arrived_at);
	    	data.append('left_at', this.post.left_at);
	    	data.append('notes', this.post.notes);
	    	data.append('signature', this.signature);

			for (var i = 0; i < this.attachments.length; i++) {
                data.append('attachments[]', this.attachments[i].file, this.attachments[i].type +','+ this.attachments[i].filename);
            }

	    	return data;
		},

		/**
		 * Create an insertable object for syncing
		 * purposes when no connection
		 *
		 * @return array
		 */
		setToInsertableObject: function() {
			let data = this.post,
				scheduled_date = data.scheduled_date ? data.scheduled_date: this.call.scheduled_date,
				type = (this.call.type && this.call.type == 'create') ? 'create': 'update';

            return [data.id, this.user.id, data.doctor_id, data.agenda, this.doctor.clinic, scheduled_date, data.arrived_at, data.left_at, data.notes, this.signature, type, 'false'];
		},

		/**
		 * Submit call plan update
		 * 
		 * @Type
		 * - Has connection (will save direct to api\server)
		 * - No connection (will save to sqlite database )
		 */
	    submit() {
	    	this.submitCallPlan = false;	    	
	    	
    		this.resetErrors();
    		if(this.check()) {
    			return;
    		}
	    	if(navigator.connection.type !== 'none') {	    	
		    	this.requests(this.routes['api.team.call-plan.edit'], this.getData(), (result) => {
		      		this.post.attachments = [];
					this.successCallPlan = true;		      		
					this.fetchResources((result) => {});
		      	});
	    	} else {
	    		this.insertCall();
				this.successCallPlan = true;
	    	}

	    },

	    /**
	     * Insert call to sqlite database
	     * 
	     */
	    insertCall: function() {

    		if(!this.callUpdated) {
	    		var query,
	    			data; 
	    		query = "INSERT INTO calls VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	    		data = this.setToInsertableObject();

	    		this.insert(query, data);
    		

    		} else {
				var query,
	    			data; 
	    		query = "UPDATE calls SET notes=?, arrived_at=?, left_at=?, signature=?, type=? WHERE id=" + this.call.id;
	    		data = [this.post.notes, this.post.arrived_at, this.post.left_at, this.signature, 'update'];

    			this.update(query, data);
    		}

    		this.insertAttachments();
	    },

	    /**
	     * Insert call attachments to sqlite database
	     * 
	     */
	    insertAttachments: function() {
    		let query = "INSERT INTO call_attachments VALUES (?, ?, ?, ?)";

			for (var i = 0; i < this.attachments.length; i++) {
	    		this.insert(query, [this.user.id, this.call.id, this.attachments[i].filename, this.attachments[i].base64]);
            }
	    },

	    /**
	     * Closing modal
	     * 
	     */
	    closeModal() {
	    	this.submitCallPlan = false;
	    	this.successCallPlan = false;
	    },

	    /**
	     * Reset all errors
	     * 
	     */
		resetErrors: function() {
			this.errors = {};
		},

	    /*
	    |--------------------------------------------------------------------------
	    | @Renders
	    |--------------------------------------------------------------------------
	    */

	   	/**
	   	 * Render schedule time
	   	 *
	   	 * @return date
	   	 */
		renderScheduleTime: function(time) {
	    	time = time.replace(/:/g, '');
	    	return moment(time, "hmm").format("HH:mm A");
	    },

	    /**
	     * Render call notes or comments
	     * 
	     * @param  String notes
	     */
	    renderNotes: function(notes) {
	    	var tmp = document.createElement("DIV");
   			tmp.innerHTML = notes;
   			return tmp.textContent || tmp.innerText || "";
	    },

	    /*
	    |--------------------------------------------------------------------------
	    | @Checkers
	    |--------------------------------------------------------------------------
	    */		

	    /**
	     * Check if filed has error
	     * 
	     * @param  array  fields
	     * @return {Boolean}
	     */
	    hasError: function(fields) {
	    	var status = false;

	    	if(fields.constructor == Array) {
	    		fields.forEach((field) => {
	    			if(this.errors[field]) {
	    				status = status + true;
	    			}
	    		});
	    	} else {
				if(this.errors[fields]) {
    				status = status + true;
    			}	    		
	    	}

	    	return status;
	    },

	    /**
	     * Checking of fields
	     * 
	     */
	    check: function() {
	    	var hasError = false;

	    	// if(!this.post.arrived_at) {
	    	// 	hasError = hasError + true;
	    	// 	this.errors.arrived_at = "Arrived at is required";
	    	// }
	    	// if(!this.post.left_at) {
	    	// 	hasError = hasError + true;
	    	// 	this.errors.left_at = "Left at is required";
	    	// }

	    	if(!this.signature && !this.call.signature) {
	    		hasError = hasError + true;
	    		this.errors.signature = "Signature is required";	    		
	    	}

	    	// if(this.attachments.length === 0) {
	    	// 	hasError = hasError + true;
	    	// 	this.errors.attachments = "Please upload some photo(s) of call/appointment";	    		
	    	// }
	    	return hasError;
	    },
	},
}
</script>
