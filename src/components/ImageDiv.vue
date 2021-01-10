<template>
    <div class="image-div overflow-hidden" 
    :class="{
        'position-absolute w-100 h-100 t-0 l-0' : absolute, 
        'position-relative': !absolute
    }"
    :style="{paddingBottom}">
        <img
        draggable='false'
        :alt='computedAlt' 
        :src='src' 
        :class="[innerClasses, classes]"
        loading="lazy"
        class='w-100 h-100 position-absolute t-0 l-0' />
        <slot></slot>
    </div>
</template>
<script>
import _get from 'lodash/get'
import { mapState, mapActions } from 'vuex'

export default {
    name: "image-div",
    props: {
        innerClasses: false,
        src: false,
        contain: false,
        proportion: false,
        alt: false,
        absolute: false,
        image: false
    },
    computed: {
        ...mapState('app', [
          'siteName'
        ]),

        computedAlt() {
            return this.alt || this.siteName
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
            return this.proportion || (imageSize ? imageSize.height / imageSize.width : 0)
        }
    }
};
</script>