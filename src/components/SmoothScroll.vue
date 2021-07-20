<template>
<div class="scroll-wrapper" :class='{"no-scrollbar" : noScrollbar}'>
    <slot></slot>
</div>

</template>

<script>
// import Vue from 'vue'
import _merge from 'lodash/merge'
import _isNumber from 'lodash/isNumber'
import smoothscroll from 'smoothscroll-polyfill';
import Scrollbar from 'smooth-scrollbar';

class EdgeEasingPlugin extends Scrollbar.ScrollbarPlugin {
    constructor() {
        super(...arguments);
        this._remainMomentum = {
            x: 0,
            y: 0,
        };

        this.options.disabled = false
    }
    transformDelta(delta) {

        if(this.options.disabled){
            this.scrollbar.setMomentum(0, 0)
            return { x: 0, y: 0 }
        }

        const { limit, offset, } = this.scrollbar;
        const x = this._remainMomentum.x + delta.x;
        const y = this._remainMomentum.y + delta.y;

        // clamps momentum within [-offset, limit - offset]
        this.scrollbar.setMomentum(
            Math.max(-offset.x, Math.min(x, limit.x - offset.x)), 
            Math.max(-offset.y, Math.min(y, limit.y - offset.y))
        )

        return { x: 0, y: 0 };
    }
    onRender(remainMomentum) {
        Object.assign(this._remainMomentum, remainMomentum);
    }
}
EdgeEasingPlugin.pluginName = 'edgeEasing';



export default {
    data: () => ({
        defaults: {
            damping: 0.1,
            renderByPixels: true,
            alwaysShowTracks: false,
            keyDownDisabled: false
        }
    }),

    props: [

        'customOptions',

        'preventEvents',

        'noScrollbar',

        'forceEvents',

        'disabled',

        'startTop',

        'isMobile',

        'scrollTop'
    ],

    computed: {
        smoothOptions()  {
            var options = _merge({}, this.defaults, this.customOptions)
            return options
        }
    },

    beforeDestroy()  {
        if (this.scrollbar) {
            this.scrollbar.removeListener()
        }

        window.removeEventListener('scroll', this.onScroll)

        window.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('scroll', this.onScroll)

        this.$bus.$off('scrollTo')
        this.$bus.$off('updateScrollbar')
        this.$bus.$off('enableScrollbar', this.enable)
        this.$bus.$off('disableScrollbar', this.disable)

        this.$bus.$off('enableKeydown', this.enableKeyDown)
        this.$bus.$off('disableKeydown', this.disableKeyDown)
    },

    mounted()  {
        smoothscroll.polyfill();
        window.addEventListener('keydown', this.onKeyDown)
        this.initSmooth(this.$el)
    },

    watch: {
        disabled(d) {
            this[d ? 'disable' : 'enable']()
        },

        startTop(st){
            this.scrollbar && this.scrollbar.scrollTo(0, st, 0)
        },
    },

    methods: {

        onKeyDown(e)  {
            if(this.disabled || this.keyDownDisabled){
                return
            }

            //up
            if(e.shiftKey && e.keyCode == 32){
                this.$bus.$emit('scrollTo', this.scrollTop - 300)
            } else if (e.keyCode === 38) {
                this.$bus.$emit('scrollTo', this.scrollTop - 88)
            }
            // down
            else if(e.keyCode == 32){
                this.$bus.$emit('scrollTo', this.scrollTop + 300)
            } else if(e.keyCode === 40){
                this.$bus.$emit('scrollTo', this.scrollTop + 88)
            }
        },

        onScroll()  {
            this.$emit('update:scrollTop', window.scrollY)
        },

        enableKeyDown() {
            this.keyDownDisabled = false
        },

        disableKeyDown(){
            this.keyDownDisabled = true
        },

        enable() {
            if(!this.scrollbar){
                return
            }

            this.scrollbar.updatePluginOptions('edgeEasing', { disabled: false });
        },

        disable() {
            if(!this.scrollbar){
                return
            }

            this.scrollbar.updatePluginOptions('edgeEasing', { disabled: true });
        },

        onSmoothScroll(status) {
            if (this.disabled ) {
                return
            }

            this.$emit('update:scrollTop', status.offset.y)

            // this.setStateApp({
            //     scrollTop: status.offset.y
            // })
        },


        initNonSmooth(){
            window.removeEventListener('scroll', this.onScroll)
            window.addEventListener('scroll', this.onScroll)

            this.$bus.$on('scrollTo', (scrollTop, immediate) => {

                window.scrollTo({
                    top: scrollTop,
                    behavior: immediate ? 'auto' : 'smooth'
                })

               this.$emit('update:scrollTop', scrollTop)
            })
        },

        initSmooth(el)  {
            if(this.scrollbar){
                this.scrollbar.removeListener()
                return
            }

            
            if (this.isMobile || this.noSmooth) {
                return this.initNonSmooth()
            }

            // Scrollbar.use(OverscrollPlugin)            
            Scrollbar.use(EdgeEasingPlugin);

            this.scrollbar = Scrollbar.init(el, this.smoothOptions)

            // set starting top offset
            if(this.startTop){
                this.scrollbar.setPosition(0, this.startTop)

                this.$emit('update:scrollTop', this.startTop)
            }


            // disable / enable on start
            this[this.disabled ? 'disable' : 'enable']()

            this.scrollbar.addListener(this.onSmoothScroll)
            this.$bus.$on('updateScrollbar', this.scrollbar.update)

            if (this.preventEvents) {
                return
            }

            this.$bus.$on('enableScrollbar', this.enable)
            this.$bus.$on('disableScrollbar', this.disable)

            this.$bus.$on('enableKeydown', this.enableKeyDown)
            this.$bus.$on('disableKeydown', this.disableKeyDown)


            this.$bus.$on('scrollTo', (scrollTop, dur, onComplete) => {
                let duration = _isNumber(dur) ? dur : 600
                this.scrollbar.scrollTo(0, scrollTop, duration, { 
                    callback: () => {
                        onComplete && onComplete()
                    } 
                })

                if(duration == 0){
                    this.$emit('update:scrollTop', scrollTop)
                }
            })

        }
    }
};
</script>

<style>
html,
body {
   height: 100%;
   width: 100%;
   overflow: hidden;
}

.scroll-wrapper{
    position: absolute!important;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>