import Vue from 'vue'

import ConfigMixin from './config.js';
import Post from './post.js';
import Database from './database.js';


Vue.mixin({
	mixins: [ ConfigMixin, Post, Database ],
});