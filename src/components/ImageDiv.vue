<template>
    <figure class="synchronized-image-div overflow-hidden" 
    :class="{
        'position-absolute w-100 h-100 t-0 l-0' : fill
    }"
    :style="{paddingBottom}">
        <img
        draggable='false'
        :alt='computedAlt' 
        :src='src' 
        :style='cssVars'
        :class="[innerClasses, classes]"
        loading="lazy"
        class='w-100 h-100 position-absolute t-0 l-0 img' />
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
            type: String,
            default: ''
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

    computed: {

        cssVars() {
            return {
                "--align" : this.align,
                "--align-mobile" : this.alignMobile,
                "--breakpoint" : this.breakpoint + 'px'
            }
        },

        computedAlt() {
            return this.alt || (this.$store ? this.$store.getters['app/getState']('siteName') : '')
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

<style lang='scss' scoped>
.synchronized-image-div{
    position: relative;
}

.img{
    object-position: var(--align-mobile);

    @media only screen and (min-width: 768px) {
        object-position: var(--align)
    }
}
</style>