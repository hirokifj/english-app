<template>
  <ul class="list">
    <li class="list__item" v-for="list in lists" :key="list.id">
      <router-link class="list__link" :to="{ name: 'listsDetail', params: { id: list.id } }">
        <div class="list__content">
          <div v-if="isShowLikeCount" class="like-count">
            <span class="num">{{ list.likeCount }}</span><font-awesome-icon class="icon" :icon="['fas', 'heart']" />
          </div>
          <span class="list-title">{{ list.title }}</span>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    lists: Array,
    isShowLikeCount: Boolean
  },
}
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  &__item {
    border: 2px solid $color-line-grey;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }

  &__link {
    min-height: 10rem;
    display: flex;
    align-items: center;
    padding: 2rem;

    &:hover {
      background-color: $color-grey-light-1;
    }

    &:link,
    &:visited {
      color: $color-dark;
      text-decoration: none;
    }
  }
}

.like-count {
  display: block;
  color: $color-pink;
  margin-bottom: 1.6rem;
  line-height: 1;

  & .num {
    font-size: 2rem;
    font-weight: bold;
    display: inline-block;
    margin-right: .8rem;
  }
}

.list-title {
  font-weight: bold;
}
</style>
