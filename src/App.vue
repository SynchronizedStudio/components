<template>
  <div id="app" class='page'>

    <smooth-scroll :scrollTop.sync='scrollTop'>

       <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      <img alt="Vue logo" src="./assets/logo.png">



      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>


      <h1>Scrolltop: {{scrollTop}}</h1>

      <ProportionDiv>
        <parallax :scrollTop='scrollTop' :global='true' :speedFactor='.4'>
          <img alt="Vue logo" src="./assets/logo.png">
        </parallax>
      </ProportionDiv>


      <image-div src="/favicon.ico" :proportion='.3' />
    </smooth-scroll>

  </div>
</template>

<script>
// import Vue from 'Vue'

//index.js
// import Vue from 'vue'

import ImageDiv from './components/ImageDiv.vue'
import ProportionDiv from './components/ProportionDiv.vue'
import Parallax from './components/Parallax.vue'
import SmoothScroll from './components/SmoothScroll.vue'



export default {
  name: 'App',

  data: () => ({
    scrollTop: 0
  }),

  components: {
    ProportionDiv,
    ImageDiv,
    Parallax,
    SmoothScroll
  }
}
</script>

<style>



</style>
