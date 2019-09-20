<template>
  <div id="app">
    <div class="container">
      <Header />
      <router-view/>
      <Footer />
      <FooterNav />
    </div>
  </div>
</template>

<script>
import './style/reset.css'
import Header from './components/Header'
import Footer from './components/Footer'
import FooterNav from './components/FooterNav'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    FooterNav
  }
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
