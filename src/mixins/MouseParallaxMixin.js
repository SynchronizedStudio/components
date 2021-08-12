import { gsap } from 'gsap'
import _clamp from 'lodash/clamp'
import _extend from 'lodash/extend'
import { mapState } from 'vuex'

var MouseParallax = {
    // inject: ['scrollTop'],

    data: () => ({
        totalWidth: null,
        totalHeight: null,
        newPageX: 0,
        newPageY: 0,
        bounds: [],
        topBound: 0
    }),

    watch: {
      position: {
          handler: function() {
              this.animate()
          },
          deep: true
      },

      fontsLoaded(){
        this.$nextTick(this.resizeHandler)
      }
    },

    mounted()  {
        setTimeout(() => {
            this.$nextTick(this.resizeHandler)
        }, 100)

        this.$watch(
            () => [
                this.width,
                this.height
            ].join(),
            () => {
                this.resizeHandler()
            }
        )
    },

    methods: {
        animate() {

            if((this.hoverOnly && !this.isHovered) || this.$device.isMobileOrTablet){
                return
            }

            this.mouseParallaxTween = gsap.to(this, this.dur || 1.25, {
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

            setTimeout(() => {
                this.bounds = _extend({}, this.$el.getBoundingClientRect())

                this.topBound = this.bounds.top + this.top

                this.totalWidth = !this.hoverOnly ? this.width : this.$el.clientWidth
                this.totalHeight = !this.hoverOnly ? this.height : this.$el.clientHeight
            }, 200)
        }
    },

    computed: {
        ...mapState('app', [
          'width',
          'height',
          'mouse',
          'fontsLoaded'
        ]),

        top(){
            return this.fixed ? 0 : this.scrollTop
        },

        position() {
            return {
                x: this.hoverOnly ? this.hoverX : this.mouse.x,
                y: this.hoverOnly ? this.hoverY : this.mouse.y
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

        // 0 - 1
        x(){
          return this.newPageX / this.totalWidth
        },
        currentX()  {
            return (this.x - .5) * 2
        },

        // 0 -1
        y(){
          return this.newPageY / this.totalHeight
        },
        currentY()  {
            return (this.y - .5) * 2
        },
    }
}

export default MouseParallax;
