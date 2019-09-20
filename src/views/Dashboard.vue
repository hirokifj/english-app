<template>
  <main class="main">
    <div class="u-max-width">
      <router-link :to="{ name: 'senetncesCreate' }" class="btn btn--green btn--small">例文登録</router-link>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main {
  padding: 8rem 0 12rem 0;
  background-color: $color-bg-grey;
}
</style>
