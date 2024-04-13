<template>
  <div class="yishi-player">
    <header id="header">
      <div class="h-r-nsl">
        <ul class="nav">
          <router-link to="/" tag="li" active-class="current" exact>
            <a>首页</a>
          </router-link>
          <router-link to="/course" tag="li" active-class="current">
            <a>课程</a>
          </router-link>
          <router-link to="/teacher" tag="li" active-class="current">
            <a>名师</a>
          </router-link>
        </ul>
      </div>
    </header>
    <div class="body">
      <div class="content">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
<style scoped>
.yishi-player {
  display: flex;
  flex-direction: column;
  height: 100%;
}

header footer{
  height: 50px;
  background-color: #f8f9fa;
}

.h-r-nsl {
  display: flex;
  margin-left: 10%;
  height: 100%;
}

.nav {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav li {
  margin: 0 10px;
}

.nav a {
  text-decoration: none;
  color: #333;
}

.body {
  flex: 1;
  overflow: auto;
}

.content {
  margin-left: 10%;
  margin-right: 10%;
}
</style>
