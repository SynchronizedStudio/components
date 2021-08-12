<template>
    <figure class="synchronized-picture-div overflow-hidden" 
    :class="{
        'position-absolute w-100 h-100 t-0 l-0' : fill
    }"
    :style="{paddingBottom}">
        <picture 
        :style='cssVars'>
          
          <source 
          v-for='(img, index) in sources'
          :key='index'
          :media="`(min-width:${img.width}px)`" 
          :srcset="`${img.src} 1x, ${img.srcx2 || img.src} 2x`">

          <img 
          :class="[innerClasses, classes]"
          class='w-100 h-100 position-absolute t-0 l-0 picture'
          :src="src" 
          :alt="alt" 
          style="width:auto;">
        </picture>

        <slot></slot>
    </figure>
</template>
<script>
import _get from 'lodash/get'
import _isNumber from 'lodash/isNumber'

export default {
    name: "img-div",
    props: {
        innerClasses: {
            type: String,
            default: ''
        },

        src: {
            type: String
        },

        sources: {
            type: Array,
            default: () => {}
        },

        contain: {
            type: Boolean,
            default: false
        },

        proportion: {
            type: Number
        },

        alt: {
            type: String,
            default: null
        },

        fill: {
            type: Boolean,
            default: false
        },

        image: {
            type: Object,
            default: null
        },

        align: {
            type: String,
            default: 'center'
        },

        alignMobile: {
            type: String,
            default: 'center'
        },

        breakpoint: {
            type: Number,
            default: 768
        }
    },

    mounted() {
        console.log("SSS", this.sources)
    },

    computed: {

        cssVars() {
            return {
                "--align" : this.align,
                "--align-mobile" : this.alignMobile,
                "--breakpoint" : this.breakpoint + 'px'
            }
        },

        computedAlt() {
            return this.alt ? this.alt 
                : this.image ? _get(this.image, 'fields.title')
                : this.$store ? this.$store.getters['app/getState']('siteName')
                : 'Unclassified image'
        },

        classes() {
            return {
                'cover' : !this.contain,
                'contain' : this.contain,
                'bg-center': true
             }
        },
        paddingBottom() {
            return this.ratio ? this.ratio * 100 + "%" : null
        },

        ratio() {
            let imageSize = _get(this.image, 'fields.file.details.image')
            return _isNumber(this.proportion) ? this.proportion 
            : imageSize ? imageSize.height / imageSize.width 
            : 0
        }
    }
};
</script>

<style lang='scss'>
.synchronized-picture-div{
    position: relative;
}

.picture{
    object-position: var(--align-mobile);

    @media only screen and (min-width: 768px) {
        object-position: var(--align)
    }
}
</style>