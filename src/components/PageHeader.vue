<template>
  <header class="page-header">
    <div class="center-container">
      <div class="page-name">Instgrem</div>
      <ul class="page-nav">
        <li class="page-nav_item">
          <router-link to="/about"><a-icon type="home" style="font-size: 26px;"/></router-link>
        </li>
        <li class="page-nav_item">
          <router-link to="/about"><a-icon type="global" style="font-size: 26px;"/></router-link>
        </li>
        <li class="page-nav_item">
          <router-link to="/about"><a-icon type="heart" style="font-size: 26px;"/></router-link>
        </li>
        <li class="page-nav_item">
          <router-link to="/about"><a-icon type="user" style="font-size: 26px;"/></router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  watch: {
    $route(to, from) {
      this.current = to.name;
    }
  },
  data() {
    return {
      current: this.$router.currentRoute.name,
    };
  }
};
</script>

<style lang="scss" scoped>
.page-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 63px;
  background: #fff;
  box-shadow: 0 4px 10px 0 $shadowColor;
  border-bottom: 1px solid $borderColor;
  z-index: 10;

  .page-name {
    float: left;
    padding-left: 20px;
    color: $titleColor;
    font-size: 30px;
    height: 63px;
    line-height: 63px;
    font-weight: bold;
  }

    .page-nav {
      float: right;
      list-style: none;
      height: 63px;
      line-height: 63px;

      &_item {
        float: left;
        padding: 0 10px;
        transition: all 0.5s;

        a {
          color: $contentColor;
        }

        &:hover,
        &.active {
          a {
            color: $titleColor;
          }
        }
      }

      &_close {
        display: none;
      }
    }
}
</style>
