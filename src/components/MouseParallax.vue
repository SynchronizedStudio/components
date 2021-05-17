<template>
<div class='outer-wrapper t-0'
:class='{"w-100 h-100 perspective" : !notWrapped}'>
    <div ref="mouse-parallax"
         class="mouse-parallax w-100 h-100 position-relative"
         v-bind:style="elStyle">
         <div class='inner-wrapper'>
            <slot></slot>
        </div>
    </div>
</div>

</template>

<script>
import { gsap } from 'gsap'
import _clamp from 'lodash/clamp'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'mouseParallax',

    data: () => ({
        totalWidth: null,
        totalHeight: null,
        newPageX: 0,
        newPageY: 0,
        bounds: [],
        hoveringX: 0,
        hoveringY: 0,
        topBound: 0
    }),

    mounted()  {
        this.$nextTick(this.resizeHandler)

        this.$watch(
            vm => [
                this.width,
                this.height
            ].join(),
            val => {
                this.resizeHandler()
            }
        )
    },

    props: [
        'ratioX',
        'ratioY',
        'notWrapped',
        'hoverOnly',
        'debug',
        'model',
        'dur',
        'y',
        'fixed'
    ],

    watch: {
        position: {
            handler: function(pos, old) {
                this.animate()
            },
            deep: true
        },
        pageSize: {
            handler: function(pos, old) {
                this.resizeHandler()
            },
            deep: true
        }
    },

    computed: {

        ...mapState('app', [
          'width',
          'height',
          'mouse',
          'scrollTop'
        ]),

        elStyle() {
            return {
                transform: this.elTransform,
                // left: -this.totalMoveX + 'px'
            }
        },

        isHovered(){
           let x = this.mouse.x - this.bounds.x
           let inX = x > 0 && x < this.bounds.width

           let y = this.mouse.y - this.topBound + this.top
           let inY = y > 0 && y < this.bounds.height

           return inX && inY
        },

        hoverX(){
            let x = this.mouse.x - this.bounds.x
            return _clamp(x, 0, this.bounds.width)
        },

        hoverY(){
            let y = this.mouse.y - this.topBound + this.top
            return _clamp(y, 0, this.bounds.height)
        },

        position() {
            return {
                x: this.hoverOnly ? this.hoverX : this.mouse.x,
                y: this.hoverOnly ? this.hoverY : this.mouse.y
            }
        },

        elTransform()  {
            return 'translate3d(' + this.moveX + 'px,' + this.moveY + 'px, ' + 0 + 'px) rotateX( ' + 0 + 'deg )'
        },

        top(){
            return this.fixed ? 0 : this.scrollTop
        },

        // total move-x (PX)
        totalMoveX()  {
            if(this.$device.isMobileOrTablet){
                return 0
            }

            return this.ratioX * this.width / 10
        },

        // total move-y (PX)
        totalMoveY()  {
            if(this.$device.isMobileOrTablet){
                return 0
            }
            
            return this.ratioY * this.width / 10
        },

        // 0 - 1
        currentX()  {
            return this.newPageX / this.totalWidth
        },

        // 0 -1
        currentY()  {
            return this.newPageY / this.totalHeight
        },

        // current y-move
        moveY()  {
            return this.currentY * this.totalMoveY 
            - (this.totalMoveY / 2)
        },

        // current x-move
        moveX()  {
            return this.currentX * this.totalMoveX 
            - (this.totalMoveX / 2)
        }
    },

    methods: {

        animate() {
            if((this.hoverOnly && !this.isHovered) || this.$device.isMobileOrTablet){
                return
            }

            console.log("CURR", this.currentX)

            this.mouseParallaxTween = gsap.to(this, this.dur || 1.5, {
                newPageX: this.position.x,
                newPageY: this.position.y,
                overwrite: true,
                ease: 'Power4.easeOut',
                onUpdate: () => {
                }
            })
        },

        resizeHandler()  {

            if (!this.$el) {
                return
            }

            this.bounds = this.$el.getBoundingClientRect()

            // this.topBound = this.bounds.top + this.top
            this.topBound = this.y != 0 ? this.top + this.bounds.top : this.bounds.top

            this.totalWidth = !this.hoverOnly ? this.width : this.$el.clientWidth
            this.totalHeight = !this.hoverOnly ? this.height : this.$el.clientHeight
        }

    }
}

</script>

<style lang="scss" scoped="">
.outer-wrapper{
    position: relative;

    // &.perspective {
    //     perspective: 1000px;
    // }
}

.inner-wrapper{
    width: 100%;
    height: 100%;
}

.mouse-parallax {
    will-change: transform;
    transform-style: preserve-3d;

    @include media-breakpoint-down(md) {
        transform: none!important;
    }
}
</style>