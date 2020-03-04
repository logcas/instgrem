<template>
  <div class="index-page">
    <div class="main">
      <FlowItem />
      <FlowItem />
      <FlowItem />
    </div>
  </div>
</template>

<script>
import FlowItem from "@/views/Flow/flow-item.vue";
export default {
  components: {
    FlowItem
  }
};
</script>

<style lang="scss" scoped>
.index-page {
  position: relative;
}

.main {
  width: 650px;
}
</style>