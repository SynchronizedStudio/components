import { gsap } from 'gsap'

const Collapse = {
    data: () => ({
        expanded: false,
        open: false
    }),

    props: [
        'index'
    ],

    watch: {
        isVisible(visible) {
            if (visible) {
                this.expanded = true

                let bounds = this.$el.getBoundingClientRect()
                this.$emit('scrollTo', bounds.top, this.index)

                this.$nextTick(() => {
                    // this.timeline.timeScale(1)
                    this.timeline.play()
                })
            } else {
                // this.timeline.timeScale(2)
                this.timeline.reverse()
            }
        }
    },

    mounted() {
        this.initTimeline()
    },

    computed: {
        isVisible() {
            return this.open ? this.open 
                : this.activeItem ? (this.activeItem.sys.id == this.model.sys.id)
                : false
        }
    },

    methods: {
        initTimeline(){
            let self = this

            this.timeline = gsap.timeline({
                onReverseComplete: () => {
                    self.expanded = false
                    self.$emit('setActiveHeight', 0)
                },
                onComplete: () => {
                    self.$emit('setActiveHeight', self.$refs.contentWrapper.getBoundingClientRect().height)
                },
                paused: true
            })

            let dur = 1

            this.timeline.from(this.$refs.contentWrapper, dur, {
                height: 0,
                clearProps: 'all',
                ease: 'Power4.easeOut'
            })

            this.timeline.from(this.$refs.content, .6, {
                opacity: 0,
                delay: dur * 0.3,
                clearProps: 'all'
            }, 0)

            if(this.expanded){
                this.timeline.progress(1)
            }
        },

        toggleActive(model = this.model) {
            let active = this.isVisible ? null : model
            this.$emit('update:activeItem', active)
        },

        openActive(model) {
            if (this.isVisible != model) {
                this.$emit('update:activeItem', model)
            }
        }
    },

}

export default Collapse;