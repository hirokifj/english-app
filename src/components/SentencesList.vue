<template>
  <ul class="list">
    <li class="list__item" v-for="sentence in sentences" :key="sentence.id">
      <router-link class="list__link" :to="{ name: 'senetncesDetail', params: { id: sentence.id } }">
        <div class="sentence">
          <span class="sentence__en">{{ sentence.english }}</span>
          <span class="sentence__ja">{{ sentence.japanese }}</span>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    sentences: Array
  }
}
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  &__item {
    min-height: 10rem;
    border: 2px solid $color-line-grey;
    transition: background-color .4s;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }

    &:hover {
      background-color: $color-grey-light-1;
    }
  }

  &__link {
    display: block;
    width: 100%;
    height: 100%;
    padding: 2rem;

    &:link,
    &:visited {
      color: $color-dark;
      text-decoration: none;
    }
  }
}

.sentence {
  &__en {
    display: block;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  &__ja {
    font-size: 14px;
    color: $color-grey-dark-1;
  }
}
</style>
