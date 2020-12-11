<template>
    <div class="image-div position-relative" 
    :style="{paddingBottom: paddingBottom}">

        <div 
        v-if='isIE'
        class="img h-100 w-100 no-repeat position-absolute t-0 l-0"
        :class="classes"
        :style="{ backgroundImage: `url('${src}')` }">
        </div>

        <img 
        v-else
        :alt='alt' 
        :src='src' 
        loading="lazy"
        class='w-100 h-100 cover position-absolute t-0 l-0' />

        <slot></slot>

    </div>
</template>
<script>

export default {
    name: "image-div",

    data: () => ({
        naturalWidth: null,
        naturalHeight: null,
        ratio: 0
    }),

    props: {
        src: null,
        contain: null,
        keepProportion: null,
        proportion: null,
        bgTop: null,
        bgBottom: null,
        alt: null
    },

    watch: {
        proportion(p) {
            this.ratio = p
        }
    },

    created(){
        if(this.proportion){
            this.ratio = this.proportion
            return
        }
    },

    mounted() {
        let self = this;

        if (!this.keepProportion || this.proportion) {
            return;
        }

        var image = new Image();

        image.addEventListener(
            "load",
            () => {
                self.naturalHeight = image.naturalHeight;
                self.naturalWidth = image.naturalWidth;
                self.ratio = self.naturalHeight / self.naturalWidth;
            },
            false
        );

        image.src = this.image;
    },

    computed: {
        isIE() {
            return false

            if (!process.browser) {
                return
            }

            // const ua = window.navigator.userAgent;

            // let crappyIE = false;
            // let msie = ua.indexOf('MSIE ');
            // if (msie > 0) { // IE 10 or older => return version number        
            //     crappyIE = true;
            // }
            // let trident = ua.indexOf('Trident/');
            // if (trident > 0) { // IE 11 => return version number        
            //     crappyIE = true;
            // }

            // return crappyIE
        },

        classes() {
            return {
                'cover' : !this.contain,
                'contain' : this.contain,
                 'bg-top' : this.bgTop,
                 'bg-center' : !this.bgTop,
                 'bg-bottom' : this.bgBottom
             }
        },

        paddingBottom() {
            return this.ratio ? this.ratio * 100 + "%" : null
        }
    }
};

</script>
