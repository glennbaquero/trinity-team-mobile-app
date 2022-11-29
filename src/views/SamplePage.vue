<template>
	<v-container>
		<v-layout align-center row wrap>
			<v-flex xs12>
				<v-card class="pa-4">
					<v-card-title primary-title>
						<div>
							<v-btn @click="toggle" outlined color="warning" dark>{{ visible ? 'Hide' : 'Show' }}</v-btn>
							<template v-if="visible">
								<h3 class="headline my-4">Lorem ipsum dolor</h3>
								<p class="text-xs-justify body-1">
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis modi dolorem ipsam maiores dolore voluptatem saepe, aut. Assumenda dolore rerum vitae quidem illum, nulla officiis odit culpa reiciendis ut. Accusamus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga reprehenderit, necessitatibus ratione eveniet provident ipsa. Laboriosam, amet iusto temporibus sequi enim est vero quaerat praesentium, iste similique. Neque, recusandae, et. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus perferendis sit provident dicta est debitis rem a totam, itaque modi accusantium illo autem! Ullam atque magnam, beatae quis voluptatum natus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum dolor a quia voluptate eos nam ducimus ipsum unde ratione nihil eaque delectus, sint quisquam veritatis quis tempora aut sit illum. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo voluptas esse accusantium quod vel, expedita, quos consequuntur suscipit deleniti, ipsum assumenda a, harum facere incidunt. Debitis error repellat fugit in. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quod aliquam voluptatibus harum possimus illo numquam minima, culpa autem, officiis sequi, quaerat consequuntur iure, dolorem ducimus distinctio dolore inventore maiores. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit autem quas similique assumenda delectus repudiandae accusamus excepturi, quidem esse deleniti, eligendi non enim! Incidunt officia odio numquam iste, veritatis tenetur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum pariatur quo deleniti, natus rerum molestias ea. Dolor vel, mollitia accusamus magnam, sequi, assumenda placeat, aliquid hic dicta id commodi provident! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est rerum excepturi, eos consequuntur doloribus perferendis quas? Laboriosam, in mollitia quam itaque fugit veniam neque cumque sunt iusto dignissimos dicta! Nihil! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos possimus consequuntur sequi consequatur, inventore suscipit, ad, nihil labore laboriosam sed explicabo. Quos libero, fugit quia expedita aperiam odit quaerat animi.
								</p>

							</template>
						</div>
					</v-card-title>
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
