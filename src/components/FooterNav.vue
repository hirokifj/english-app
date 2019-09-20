<template>
  <nav class="footer-menu">
    <ul class="footer-menu__list">
      <template v-if="loginUser">
        <li class="footer-menu__item">
          <router-link :to="{ name: 'dashboard' }" class="footer-menu__link">
            <div class="footer-menu__icon">
              <font-awesome-icon icon="user" />
            </div>
            <span class="footer-menu__text">マイページ</span>
          </router-link>
        </li>
      </template>
      <template v-else>
        <li class="footer-menu__item">
          <router-link :to="{ name: 'signup' }" class="footer-menu__link">
            <div class="footer-menu__icon">
              <font-awesome-icon icon="user-plus" />
            </div>
            <span class="footer-menu__text">ユーザー登録</span>
          </router-link>
        </li>
        <li class="footer-menu__item">
          <router-link :to="{ name: 'signin' }" class="footer-menu__link">
            <div class="footer-menu__icon">
              <font-awesome-icon icon="sign-in-alt" />
            </div>
            <span class="footer-menu__text">ログイン</span>
          </router-link>
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
.footer-menu {
  display: none;
  @include respond(phone) {
    display: block;
  }
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: rgba($color-blue-dark, .8);
  padding: 1.6rem 1rem;

  &__list {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  &__link {
    display: flex;
    flex-direction: column;
    align-items: center;

    &:link,
    &:visited {
      color: $color-white;
      text-decoration: none;
    }
  }

  &__icon {
    margin-bottom: 1rem;
  }

  &__text {
    font-size: 12px;
    line-height: 1;
  }
}
</style>
