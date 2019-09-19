<template>
  <footer class="footer">
    <div class="footer__container u-max-width">
      <span class="site-title">
        <router-link :to="{ name: 'home' }">English App</router-link>
      </span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  min-height: 16rem;
  background-color: $color-dark;

  &__container {
    padding: 2rem 0;
    color: $color-white;
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
