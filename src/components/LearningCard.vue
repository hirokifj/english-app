<template>
  <div class="learning-card">
    <span class="english">{{ currentSentence.english }}</span>
    <span class="japanese">{{ currentSentence.japanese }}</span>
  </div>
</template>

<script>
export default {
  props: {
    learningSentences: Array
  },
  data() {
    return {
      currentNum: 0
    }
  },
  computed: {
    currentSentence() {
      return this.learningSentences[this.currentNum]
    }
  }
}
</script>

<style lang="scss" scoped>
.learning-card {
  border: 2px solid $color-line-grey;
  border-radius: 5px;
  padding: 4rem 2rem;
}

.english {
  display: block;
  font-weight: bold;
  margin-bottom: 2rem;
}
.japanese {
  font-size: 14px;
}
</style>
