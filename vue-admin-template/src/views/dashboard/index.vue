<template>
  <div class="project-description-container">
    <div class="project-description-text">
      <h1>在线教育后台管理系统详情</h1>
      <p>已经开发的功能，课程管理（CRUD），讲师管理(CRUD)，前台banner管理（CRUD），课程类别管理（CRUD）,数据统计（注册人数，登陆人数统计）</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.project-description {
  &-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    background-color: #f8f9fa;
  }

  &-text {
    text-align: center;

    h1 {
      font-size: 36px;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
      line-height: 1.5;
    }
  }
}
</style>
