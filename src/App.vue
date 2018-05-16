<template>
  <div id="app">
    <navbar/>

    <div class="be-page md-layout md-gutter md-alignment-center">
      <div class=" be-page-container md-layout-item md-gutter md-layout md-size-90 md-large-size-80 md-xlarge-size-70">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import navbar from './components/navbar'

  export default {
      components: {navbar},
      name: 'App'
  }
</script>

<style>

  #app {
    height: 100%;
  }

  *, *:active {
    outline: none;
  }

  html,body {
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .be-page-container {
    overflow: scroll;
    padding-bottom: 20px;
  }

  .be-word-overflow-dash {
    word-break: break-all;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }

  * a.be-link, .be-link{
    /*display: inline-block;*/
  }
</style>
