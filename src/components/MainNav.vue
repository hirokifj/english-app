<template>
  <nav class="main-nav">
    <ul class="main-nav__list">
      <template v-if="loginUser">
        <li class="main-nav__item main-nav__item--pc">
          <router-link :to="{ name: 'dashboard' }" class="main-nav__link">マイページ</router-link>
        </li>
        <li class="main-nav__item main-nav__item--icon">
          <router-link :to="{ name: 'useredit' }" class="main-nav__link">
            <font-awesome-icon icon="user-cog" />
          </router-link>
        </li>
      </template>
      <template v-else>
        <li class="main-nav__item main-nav__item--pc">
          <router-link :to="{ name: 'signin' }" class="main-nav__link">ログイン</router-link>
        </li>
        <li class="main-nav__item main-nav__item--pc">
          <router-link :to="{ name: 'signup' }" class="main-nav__link">ユーザー登録</router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    loginUser() {
      return this.$store.state.user.loginUser
    }
  }
}
</script>

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
      font-size: 2.4rem;
      vertical-align: bottom;
      @include respond(tab-port) {
        font-size: 2.8rem;
        vertical-align: baseline;
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
