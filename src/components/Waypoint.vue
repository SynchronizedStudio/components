<template>
<component 
:is='tag'
ref="waypoint"
class="synchronized-waypoint">
   <slot></slot>
</component>
</template>

<script>
import _isNumber from 'lodash/isNumber'
import _get from 'lodash/get'

export default {
    name: 'waypoint',
    data: () => ({
        observer: null,
        visibleOneDirection: false,
        visible: false,
        scrollingEl: false,
        scrollingDown: true,
        pageHeight: 0
    }),

    inject: ['scrollingProps'],

    computed: {
        computedTop(){
            return _isNumber(this.currentScroll) ? this.currentScroll : _get(this.scrollingProps, 'currentScroll')
        }
    },  

    props: {
        debug: Boolean,

        elementId: null,

        rootMargin: Number,

        opts: {
            default: () => null
        },

        currentScroll: {
            default: false
        },

        tag: {
            default: 'div',
            type: String
        }
    },

    beforeDestroy() {
        this.observer.disconnect()
        window.removeEventListener('resize', this.resizeHandler)
    },

    mounted(){
        window.addEventListener('resize', this.resizeHandler)

        this.scrollingEl = this.elementId ? document.getElementById(this.elementId) || this.$el : this.$el

        if (!('IntersectionObserver' in window) ||
            !('IntersectionObserverEntry' in window) ||
            !('intersectionRatio' in window.IntersectionObserverEntry.prototype)) {
            this.visibleOneDirection = this.visible = true
        } else{           
            this.observer = new IntersectionObserver(this.callback, this.opts)

            setTimeout(() => {
                this.observer.observe(this.$el)
            })
        }
    }, 

    watch: {
        visibleOneDirection(visible) {
            this.$emit('toggleOneDirectionVisible', {
                visible: visible,
                el: this.$el
            })
        },

        visible(visible) {
            this.$emit('toggleVisible', {
                visible: visible,
                el: this.$el
            })            
        },

        computedTop(val, oldVal){
            this.scrollingDown = val > oldVal
        }
    },

    methods: {
        resizeHandler(resizing){
            if(!resizing || this.visibleOneDirection){
                return
            }

            setTimeout(() => {
                this.pageHeight = window.innerHeight
                this.scrollingDown = true
                let bounds = this.$el.getBoundingClientRect()
                this.visible = this.visibleOneDirection = bounds.top < this.pageHeight
            })
        },

        callback(entries)  {
            let entry = entries[0]
            const currentY = entry.boundingClientRect.y

            let op = this.scrollingEl.style.opacity
            op = op && op.length > 0 ? op * 1 : null

            this.intersected = entry.isIntersecting

            if(!this.threshold || this.threshold[0] == 0 || currentY >= 0){
                this.visible = _isNumber(op) ? this.intersected && (op != 0) : this.intersected
            }

            if(this.intersected || (currentY <= 0)){
                this.visibleOneDirection = true
                return
            }


            // OVO ISPITAJ DA ZAMENI OVO DOLE LUDILO
            // if(!this.intersected && currentY <= 0){
            //     this.visibleOneDirection = false
            //     return
            // }

            if(!this.scrollingDown && !this.intersected && -currentY < this.pageHeight && op != 0){
                this.visibleOneDirection = false   
            }
        }
    }
}

</script>