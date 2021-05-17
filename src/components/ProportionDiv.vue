<template>
    <div class="proportion-div position-relative" :style="{paddingBottom: paddingBottom}">
        <div class='position-absolute w-100 h-100 t-0 l-0' :class='innerClasses'>
            <slot></slot>
        </div>
    </div>
</template>
<script>
import _get from 'lodash/get'
import _isNumber from 'lodash/isNumber'

export default {
    data: () => ({
        imageRatio: null
    }),

    name: "p-div",

    props: [
        "proportion",
        "innerClasses",
        "src",
        "image"
    ],

    mounted(){
        if(!this.src || this.image || _isNumber(this.proportion)){
            return
        }

        let self = this

        let image = new Image();

        image.addEventListener(
            "load",
            () => {
                self.naturalHeight = image.naturalHeight;
                self.naturalWidth = image.naturalWidth;
                self.imageRatio = self.naturalHeight / self.naturalWidth;

                setTimeout(() => {
                    self.$bus.$emit('resize')
                }, 100)
            },
            false
        );

        image.src = this.src;
    },

    computed: {
        ratio() {
            let imageSize = _get(this.image, 'fields.file.details.image')
            return _isNumber(this.proportion) ? this.proportion 
            : imageSize ? imageSize.height / imageSize.width 
            : this.imageRatio || 0
        },

        paddingBottom() {
            return this.ratio * 100 + "%";
        }
    }
}
</script>