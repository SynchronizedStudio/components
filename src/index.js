// COMPONENTS
import ProportionDiv from './components/ProportionDiv.vue'
import ImageDiv from './components/ImageDiv.vue'
import PictureDiv from './components/PictureDiv.vue'
import Parallax from './components/Parallax.vue'
import Waypoint from './components/Waypoint.vue'
import SmoothScroll from './components/SmoothScroll.vue'
import MouseParallax from './components/MouseParallax.vue'

import AnimationsMixin from './mixins/Animations.js'
import ParallaxMixin from './mixins/Parallax.js'
import SliderMixin from './mixins/Slider.js'
import CollapseMixin from './mixins/Collapse.js'
import MouseParallaxMixin from './mixins/MouseParallaxMixin.js'

export {
	AnimationsMixin,
	ParallaxMixin,
	SliderMixin,
	CollapseMixin,
  MouseParallaxMixin
}

const Components = {
  ProportionDiv,
  ImageDiv,
  PictureDiv,
  Parallax,
  Waypoint,
  MouseParallax,
  SmoothScroll
}

export default Components