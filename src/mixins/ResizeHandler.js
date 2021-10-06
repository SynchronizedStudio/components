import { mapState } from 'vuex'

var ResizeHandler = {
    mounted() {
        if(this.resizeHandler){
            this.$bus.$on('resize', this.resizeHandler)
            this.$nextTick(this.resizeHandler)
        }
    },

    beforeDestroy(){
        if(this.resizeHandler){
            this.$bus.$off('resize', this.resizeHandler)
        }
    },

    watch: {
        fontsLoaded(){
            if(this.resizeHandler){
                this.$nextTick(this.resizeHandler)
            }
        }
    },

    computed: {        
        ...mapState('app', [
          'fontsLoaded'
        ])
    }

}

export default ResizeHandler;