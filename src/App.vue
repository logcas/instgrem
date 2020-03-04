<template>
  <div id="app">
    <PageHeader/>
    <div class="body-wrapper center-container"><router-view /></div>
    <PageFooter/>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';
  export default {
    components: {
      PageHeader,
      PageFooter,
    },
    data() {
      return {
        current: ['mail'],
      };
    }
  };
</script>

<style>
html, body {
  background: #ededed;
  height: 100%;
}
</style>

<style lang="scss" scoped>
#app {
  position: relative;
  min-height: 100%;
  padding-bottom: 120px;
}

.body-wrapper {
  padding-top: 84px;
  padding-bottom: 20px;
}
</style>
