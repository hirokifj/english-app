<template>
  <nav class="main-nav">
    <ul class="main-nav__list">
      <li class="main-nav__item main-nav__item--pc">
        <router-link :to="{ name: 'signin' }" class="main-nav__link">ログイン</router-link>
      </li>
      <li class="main-nav__item main-nav__item--pc">
        <router-link :to="{ name: 'signup' }" class="main-nav__link">ユーザー登録</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.main-nav {
  &__list {
    display: flex;
    align-items: center;
  }

  &__item {
    font-size: 16px;
    letter-spacing: 1px;

    &--icon {
      & i {
        font-size: 3.2rem;
        vertical-align: bottom;
        @include respond(tab-port) {
            vertical-align: baseline;
        }
      }
    }

    &--pc {
      @include respond(tab-port) {
        display: none;
      }
    }

    &:not(:last-child) {
      margin-right: 4rem;
      @include respond(phone) {
        font-size: 14px;
        margin-right: 2rem;
      }
    }
  }

  &__link {
    padding: 1rem;
    transition: color .4s;
    @include respond(phone) {
      padding: 0;
    }

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
