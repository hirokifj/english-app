<template>
  <main class="main u-max-width">
    <div class="u-center-text u-mb-big">
      <h1 class="page-title">
        <span class="page-title__first">404</span>
        <span class="page-title__second">Not Found</span>
      </h1>
    </div>
    <div class="description u-center-text">
      <p>お探しのページは見つかりませんでした。</p>
    </div>
  </main>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.main {
  padding: 8rem 0;
}

.page-title {
  color: $color-pink;

  &__first {
    display: block;
    font-size: 5.8rem;
    line-height: 1;
    letter-spacing: 6px;
  }

  &__second {
    font-size: 3.2rem;
    letter-spacing: 2px;
    font-weight: normal;
  }
}
</style>
