// COMPONENTS
import ProportionDiv from './components/ProportionDiv.vue';
import ImageDiv from './components/ImageDiv.vue';
import Parallax from './components/Parallax.vue';
import Waypoint from './components/Waypoint.vue';
import SmoothScroll from './components/SmoothScroll.vue';

import AnimationsMixin from './mixins/Animations.js';
import ParallaxMixin from './mixins/Parallax.js';
import SliderMixin from './mixins/Slider.js';
import CollapseMixin from './mixins/Collapse.js';

export {
	AnimationsMixin,
	ParallaxMixin,
	SliderMixin,
	CollapseMixin
}

const Components = {
  ProportionDiv,
  ImageDiv,
  Parallax,
  Waypoint,
  SmoothScroll
}

export default Components;