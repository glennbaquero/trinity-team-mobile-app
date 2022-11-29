<template>
	<v-container>
		<v-layout align-center row wrap>
			<v-flex xs12>
				<v-card class="pa-4">
					<div class="frm-cntnr stylesheet">
						<div class="inlineBlock-parent">
							<div class="ss__col align-t">
								<div class="frm-text">
									<h1>Color Palette</h1>
								</div>
								<div class="inlineBlock-parent">
									<div class="ss__paletteHolder frm-text">
										<div class="ss__palette bg--darkred"></div>
										<p>#781915</p>
									</div
									><div class="ss__paletteHolder frm-text">
										<div class="ss__palette bg--red"></div>
										<p>#D52E29</p>
									</div
									><div class="ss__paletteHolder frm-text">
										<div class="ss__palette bg--lightred"></div>
										<p>#FF5D58</p>
									</div
									><div class="ss__paletteHolder frm-text">
										<div class="ss__palette bg--black"></div>
										<p>#444444</p>
									</div
									><div class="ss__paletteHolder frm-text">
										<div class="ss__palette bg--gray"></div>
										<p>#A8A8A8</p>
									</div
									><div class="ss__paletteHolder frm-text">
										<div class="ss__palette bg--white"></div>
										<p>#F6F6F6</p>
									</div>
								</div>	
							</div
							><div class="ss__col align-t">
								<div class="frm-text">
									<h1>Typography</h1>
								</div>
								<div>
									<h5 class="s-margin-b">Title: Sansation</h5>
									<div class="frm-text">
										<p>Frame Title</p>
									</div>
									<h5 class="s-margin-b">Description: Sansation</h5>
									<div class="frm-text">
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
									</div>
								</div>	
							</div
							><div class="ss__col align-t">
								<div class="frm-text">
									<h1>Forms</h1>
								</div>
								<form-control ref="sampleForm">
									<v-container>
										<v-layout row wrap>
											<v-flex xs12>
												<v-text-field
												name="email"
												label="Email"
												data-vv-name="email"
												data-vv-as="Email"
												type="email"
												color="#FF5D58"
												class="form-input"
												data-vv-value-path="internalValue"
												:error-messages="errors.collect('email')"
												></v-text-field>
											</v-flex>

											<v-flex xs12>
												<v-text-field
												name="password"
												label="Password"
												data-vv-name="password"
												data-vv-as="Password"
												type="password"
												color="#FF5D58"
												class="form-input"
												data-vv-value-path="internalValue"
												:error-messages="errors.collect('password')"
												></v-text-field>
											</v-flex>
										</v-layout>
									</v-container>
								</form-control>
							</div
							><div class="ss__col align-t">
								<div class="frm-text">
									<h1>Button</h1>
								</div>
								<div class="inlineBlock-parent">
									<v-btn min-height="50" block class="frm-btn type--1 mb-2">Login</v-btn>
									<v-btn min-height="28" block class="frm-btn type--2 mb-2 bold">BUTTON</v-btn>
									<v-btn min-height="50" block class="frm-btn type--1 gray mb-2 bold">CANCEL</v-btn>
									<v-btn min-height="28" block class="frm-btn type--2 gray mb-2 bold">BUTTON</v-btn>

									<v-btn min-height="25" class="frm-btn type--3"><i class="fa fa-times"></i></v-btn>
									<v-btn min-height="25" class="frm-btn type--3"><i class="fa fa-sort"></i>filter by specialization</v-btn>
								</div>
							</div>
						</div>
					</div>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script type="text/javascript">
export default {
  methods: {
    toggle () {
      this.visible = !this.visible
    }
  },

  data () {
    return {
      visible: true
    }
  }
}
</script>
