<template>
  <div
    class="progressbar"
    :style="{
      width: width + '%',
      backgroundColor: canSuccess ? defaultColor : failedColor,
      opacity
    }"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      width: 0,
      canSuccess: true,
      defaultColor: "#5079d9",
      failedColor: "#ff0000",
      timer: null,
      opacity: 0
    };
  },
  methods: {
    start() {
      const interval = 100;
      const self = this;
      this.opacity = 1;
      this.width = 0;
      progressHandler.call(self);

      function progressHandler() {
        const forward = (100 - this.width) * Math.random();
        this.increase(forward);
        if (this.width > 90) {
          return;
        }
        this.timer = setTimeout(progressHandler.bind(self), interval);
      }
      0;
    },
    increase(num) {
      this.width += Math.floor(num);
    },
    finish(canSuccess = true) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.width = 100;
      this.canSuccess = canSuccess;
      setTimeout(() => {
        this.opacity = 0;
      }, 500);
    },
    fail() {
      this.finish(false);
    }
  }
};
</script>

<style lang="scss" scoped>
.progressbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 9999999;
  transition: width 0.2s, opacity 0.4s;
  opacity: 1;
  width: 80%;
}
</style>
