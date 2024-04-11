<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="3" finish-status="success" align-center style="margin-bottom:40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="发布课程"/>
    </el-steps>
    <div class="ccInfo" style="margin-left:100px;margin-right:120px;">
      <img :src="coursePublish.cover">
      <div class="main">
        <p>
          <span>课程名称:</span>
          <span>{{ coursePublish.title }}</span>
        </p>
        <p class="gray">
          <span>课时:</span>
          <span>{{ coursePublish.lessonNum }}</span>
        </p>
        <p>
          <span>所属分类：{{ coursePublish.subjectLevelOne }} — {{coursePublish.subjectLevelTwo }}</span>
        </p>
        <p>课程讲师：{{ coursePublish.teacherName }}</p>
        <p>
          <span class="red">价格:</span>
          <span class="red">￥{{ coursePublish.price }}</span>
        </p>
      </div>
    </div>
    <div style="margin-left:100px;margin-right:120px;">
      <el-button @click="previous">返回修改</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布课程</el-button>
    </div>
  </div>
</template>

<script>
import course from "@/api/course/course";

export default {
  data() {
    return {
      saveBtnDisabled: false ,// 保存按钮是否禁用
      courseId:'',
      coursePublish:{}
    }
  },

  created() {
    //获取课程id
    if (this.$route.params&&this.$route.params.id){
      this.courseId=this.$route.params.id
    }
    this.getCoursePublishById()
  },

  methods: {
    getCoursePublishById(){
      course.getCoursePublishInfo(this.courseId)
      .then(response =>{
          this.coursePublish=response.data.coursePublish
      })
    },
    previous() {
      console.log('previous')
      this.$router.push({ path: '/course/chapter/'+this.courseId })
    },

    publish() {
      course.publihCourse(this.courseId)
      .then(response =>{
        //提示成功
        this.$message({
          type: "success",
          message: "课程信息发布成功！"
        })
        //
      })
      this.$router.push({ path: '/course/list' })
    }
  }
}
</script>
<style scoped>
.ccInfo {
  background: #f5f5f5;
  padding: 20px;
  overflow: hidden;
  border: 1px dashed #DDD;
  margin-bottom: 40px;
  position: relative;
}
.ccInfo img {
  background: #d6d6d6;
  width: 500px;
  height: 278px;
  display: block;
  float: left;
  border: none;
}
.ccInfo .main {
  margin-left: 520px;
}

.ccInfo .main h2 {
  font-size: 28px;
  margin-bottom: 30px;
  line-height: 1;
  font-weight: normal;
}
.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}

.ccInfo .main p {
  margin-bottom: 10px;
  word-wrap: break-word;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
}
.ccInfo .main h3 {
  left: 540px;
  bottom: 20px;
  line-height: 1;
  font-size: 28px;
  color: #d32f24;
  font-weight: normal;
  position: absolute;
}
</style>
