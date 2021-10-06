<template>
  <component 
  :is='tag'
  class="text-fill position-relative w-100">

    <span 
    ref='placeholder'
    class='w-100 d-block' />

    <span
    :style='headlineStyle'
    ref='headline'
    class='position-relative d-inline-block l-0 headline no-wrap'
    :class="innerClasses">    
      <span v-html="text" />
      <slot />
    </span>

  </component>
</template>

<script>
import ResizeHandler from "../mixins/ResizeHandler"

export default {
  name: "text-fill",

  data: () => ({
    fontSize: null
  }),

  props: {
    tag: {
      type: String,
      default: 'h1'
    },

    innerClasses: String,

    text: String,

    top: Boolean
  },

  mixins: [
    ResizeHandler
  ],

  methods: {
    resizeHandler() {
      this.getScale()
    },

    getScale() {
      let phWidth = this.$refs.placeholder.offsetWidth
      let elWidth = this.$refs.headline.offsetWidth 
      let ratio = phWidth / elWidth

      const fontSize = window.getComputedStyle(this.$refs.headline).fontSize
      this.fontSize = fontSize.parseNum() * ratio
    }
  },

  computed: {
    headlineStyle() {
      return {
        'font-size': `${this.fontSize}px`
      }
    }
  }
};
</script>