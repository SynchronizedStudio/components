<template>
<div ref="holder"
     class='parallax-wrapper'
     :class="[className, { 'wrapped': wrapped, 'not-wrapped': !wrapped, 'position-absolute': absolute }]">
    <div ref="parallax"
         class="parallax"
         v-bind:style="elStyle">
        <slot></slot>
    </div>
</div>

</template>

<script>
import Parallax from '../mixins/Parallax'

export default {
    name: 'parallax',

    mixins: [Parallax],

    props: {
        scrollTop: {
            type: Number,
            default: 0
        }
    },

    computed: {

        elStyle() {

            if (!process.browser) {
                return
            }

            return  { 
                transform: this.elTransform, 
                left: this.elLeft + 'px', 
                top: this.elTop + 'px', 
                height: this.elHeight + 'px', 
                width: this.elWidth + 'px'
            }
        },

        elTransform()  {
        
            let x = this.horizontal ? this.currentMove : 0
            let y = !this.horizontal ? this.currentMove : 0

            let t = `translate3d(${x}px, ${y}px, 0px)`

            if(this.scaleFactor){
                let start = this.scaleFactor < 0 ? 1 - this.scaleFactor : 1
                let scale = start + (this.currentProgress * this.scaleFactor)
                t +=  `scale(${scale})`
            }

            return t
        }
    }
}

</script>

<style scoped="">
.parallax-wrapper {
    height: 100%;
    width: 100%;
}

.wrapped {
    overflow: hidden;
    left: 0;
    top: 0;
}

.parallax {
    position: relative;
    will-change: transform;
    height: 100%;
    backface-visibility: hidden; 
}
</style>