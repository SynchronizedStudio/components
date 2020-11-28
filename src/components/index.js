//index.js 
import Vue from 'vue';

import ProportionDiv from './ProportionDiv.vue';
import ImageDiv from './ImageDiv.vue';
import Parallax from './Parallax.vue';
import Waypoint from './Waypoint.vue';
import SmoothScroll from './SmoothScroll.vue';

const Components = {
  ProportionDiv,
  ImageDiv,
  Parallax,
  Waypoint,
  SmoothScroll
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
})

export default Components;