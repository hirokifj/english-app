<template>
  <nav class="footer-menu">
    <ul class="footer-menu__list">
      <li class="footer-menu__item">
        <router-link :to="{ name: 'ranking' }" class="footer-menu__link">
          <div class="footer-menu__icon">
            <font-awesome-icon icon="crown" />
          </div>
          <span class="footer-menu__text">ランキング</span>
        </router-link>
      </li>
      <li class="footer-menu__item">
        <router-link :to="{ name: 'listsList' }" class="footer-menu__link">
          <div class="footer-menu__icon">
            <font-awesome-icon icon="list" />
          </div>
          <span class="footer-menu__text">リスト</span>
        </router-link>
      </li>
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
            <span class="footer-menu__text">登録</span>
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
  @include respond(tab-port) {
    display: block;
  }
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: $color-blue-dark;
  padding: 1.2rem 1rem;

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
    margin-bottom: .6rem;
  }

  &__text {
    font-size: 12px;
    line-height: 1;
  }
}
</style>
