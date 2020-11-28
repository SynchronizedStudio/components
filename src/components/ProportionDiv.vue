<template>
    <div class="proportion-div position-relative" :style="{paddingBottom: paddingBottom}">
        <div class='position-absolute w-100 h-100 t-0 l-0' :class='innerClasses'>
            <slot></slot>
        </div>
    </div>
</template>
<script>
  
export default {
    data: () => ({
        ratio: null
    }),

    name: "proportion-div",

    props: [
        "proportion",
        "innerClasses",
        "src"
    ],

    mounted(){
        if(!this.src){
            return
        }

        let self = this

        let image = new Image();

        image.addEventListener(
            "load",
            () => {
                self.naturalHeight = image.naturalHeight;
                self.naturalWidth = image.naturalWidth;
                self.ratio = self.naturalHeight / self.naturalWidth;

                setTimeout(() => {
                    self.$bus.$emit('resize')
                }, 100)
            },
            false
        );

        image.src = this.src;
    },

    computed: {
        paddingBottom() {
            let r = this.ratio || this.proportion || 1
            return r * 100 + "%";
        }
    }
}
</script>