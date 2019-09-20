<template>
  <header class="header">
    <div class="header__container u-max-width">
      <h1 class="site-title">
        <router-link :to="{ name: 'home' }">English App</router-link>
      </h1>

      <MainNav />

    </div>
  </header>
</template>

<script>
import MainNav from './MainNav'

export default {
  components: {
    MainNav
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: $color-blue;
  color: $color-white;
  padding: 1rem 0;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.site-title {
  font-size: 2.4rem;
  font-weight: bold;
  letter-spacing: 2px;

  & a {
    transition: color .4s;

    &:link,
    &:visited {
      color: $color-white;
      text-decoration: none;
    }

    &:hover {
      color: $color-pink-light;
    }
  }
}
</style>
