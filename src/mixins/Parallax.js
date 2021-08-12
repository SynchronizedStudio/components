import imagesLoaded from 'imagesloaded';
import _isNumber from 'lodash/isNumber'

const Parallax = {

    data: () => ({
        height: 0,
        bounds: {},
        pageHeight: 0,
        pageWidth: 0,
        topBound: 0
    }),

    props: {
        speedFactor: {
            type: Number,
            default: 0
        },
        scaleFactor: false,
        wrapped: {
            type: Boolean,
            default: false
        },
        absolute: {
            type: Boolean,
            default: false
        },
        offset: false,
        className: {
            type: String
        },
        global: {
            type: Boolean,
            default: true
        },
        topOffset: false,
        horizontal: {
            type: Boolean,
            default: false
        },
        debug: {
            type: Boolean,
            default: false
        },
        startOffset: {
            type: Number,
            default: 0
        }
    },

    watch: {
        pageWidth(){
            this.resizeHandler()
        }
    },

    mounted()  {
        this.resizeHandler()
        imagesLoaded(this.$el, this.$nextTick(this.resizeHandler))

        if(this.$device.isMobile){
            this.$bus.$on('resize', this.mobileResizeHandler)
            this.$bus.$on('resizeParallax', this.mobileResizeHandler)
        } else{
            this.$bus.$on('resizeParallax', this.resizeHandler)
            this.$bus.$on('resize', this.resizeHandler)
        }
    },

    destroyed()  {
        this.$bus.$off('resize', this.resizeHandler)
        this.$bus.$off('resizeParallax', this.resizeHandler)

        this.$bus.$off('resize', this.mobileResizeHandler)
        this.$bus.$off('resizeParallax', this.mobileResizeHandler)
    },

    computed: {

        noScale() {
            return (this.pageHeight == this.height) && this.speedFactor > 0 && !this.$device.isMobile
        },

        noOffseting() {
            return this.topBound == 0 && !this.$device.isMobile
        },

        classObject()  {
            return {
                'wrapped': this.wrapped,
                'position-absolute': this.absolute
            }
        },

        currentProgress() {
            return this.scrollProgress(this.start, this.end, this.scrollTop)
        },

        currentMove() {
            return this.move * this.currentProgress
        },

        start() {
            let bound = this.topOffset || this.topBound

            let start = _isNumber(this.offset) || bound === 0 ? 0 
            : bound - this.pageHeight

            return start + this.startOffset
        },

        end() {
            let end = this.start + this.height
            end += !this.noOffseting ? this.pageHeight : 0
            return this.wrapped ? end : end + this.move / 2
        },

        move()  {
            return this.global ? this.pageHeight * this.speedFactor
                : this.height * this.speedFactor
        },

        elHeight()  {
            return this.getSize(this.horizontal)
        },

        elTop()  {
            return this.getOffset(this.horizontal)
        }
    },

    methods: {
        mobileResizeHandler() {
            this.pageWidth = window.innerWidth
        },  

        getSize(ignore)  {
            if (!this.wrapped || ignore) {
                return
            }

            let newh = this.noScale ? this.height
                : this.topBound === 0 && this.speedFactor > 0 ? this.height
                : Math.ceil(this.height + Math.abs(this.move))

            return newh || ''
        },

        getOffset(ignore)  {
            if(ignore){
                return
            }

            let m = -this.move

            if(_isNumber(this.offset)){
                return this.offset
            }

            let off = !this.wrapped ? m / 2
                : m > 0 ? 0
                : this.noOffseting ? 0
                : this.topBound == 0 && !this.horizontal ? 0
                : this.wrapped && this.noScale ? m / 2
                : m
           
            return off
        },

        // returning the scroll progress from 0 to 1 in between start/end pixels
        scrollProgress(start, end, scrollTop = this.scrollTop)  {
            const factor = (end - start) / 100,
                scrollStart = (scrollTop - start) / factor,
                percentage = (scrollTop >= start && scrollTop <= end) ? scrollStart / 100 
                : (scrollTop > start) ? 1 : 0

            return percentage
        },

        parallaxResizeHandler(){
            if (!this.$el) {
                return
            }

            this.pageWidth = window.innerWidth
            this.pageHeight = window.innerHeight
            this.bounds = this.$el.getBoundingClientRect()
            this.topBound = this.bounds.top + this.scrollTop
            this.height = this.$el.offsetHeight
        },

        resizeHandler()  {
            this.parallaxResizeHandler()
        }
    }

}

export default Parallax;