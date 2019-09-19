<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import 'normalize.css'

export default {
  name: 'App'
}
</script>

<style lang="scss">
*,
*::after,
*::before {
	margin: 0;
	padding: 0;
	box-sizing: inherit;
}

html {
	box-sizing: border-box;
	font-size: 62.5%;	//1 rem = 10px; 10px/16px = 62.5%

	@include respond(tab-land) {
		font-size: 56.25%;
	}

	@include respond(tab-port) {
		font-size: 50%;
	}
}

body {
  font-size: $default-font-size;
  font-family: -apple-system, Segoe UI, Helvetica Neue,Hiragino Kaku Gothic ProN, "メイリオ", meiryo, sans-serif;
  font-weight: 400;
  line-height: 1.8;
  color: $color-grey-dark-3;
  -webkit-font-smoothing: antialiased;
}

.container {
	max-width: 100%;
	margin: 0 0;
}

.link-text {
  transition: color .4s;

  &:link,
  &:visited {
    color: $color-blue;
  }

  &:hover {
    color: $color-green;
  }
}
</style>
