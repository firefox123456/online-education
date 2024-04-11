<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>
    <el-form label-width="120px">
      <!-- 课程标题-->
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>
      <!--课程讲师-->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择：">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>
      <!--所属分类-->
      <el-form-item label="课程分类">
        <!--一级分类-->
        <el-select v-model="courseInfo.subjectParentId" placeholder="一级分类" @change="subjectTwoFindByOne">
          <el-option
            v-for="subject in subjectList"
            :key="subject.value"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <!--二级分类-->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>
      <!--  课时-->
      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder=""/>
      </el-form-item>

      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" placeholder=" 示例：Java学习"/>
      </el-form-item>
      <!--课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/api/oss/uploadAvatar'"
          class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>
      </el-form-item>
      <!-- 课程价格-->
      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder=""/>
      </el-form-item>
      <!--下一步-->
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from "@/api/course/course";
import subject from "@/api/subject/subject";

export default {
  data() {
    return {
      saveBtnDisabled: false,// 保存按钮是否禁用
      courseInfo: {
        cover: 'https://huanqi-online-education.oss-cn-beijing.aliyuncs.com/avatar.jpg',
        subjectId: '',
        subjectParentId: '',
      },
      teacherList: [],
      subjectList: [],
      subjectTwoList: [],
      courseId: '',
      BASE_API: process.env.VUE_APP_BASE_API
    }
  },

  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getInfo()
    }
    this.getListTeacher()
    this.getAllSubject()
  },

  methods: {
    //根据课程id查询回显数据
    getInfo() {
      course.getCourseInfoId(this.courseId)
        .then(response => {
            this.courseInfo = response.data.courseInfo
            subject.getAllSubject()
              .then(response => {
                //获取一级分类
                this.subjectList = response.data.list
                //比较当前courseInfo里面的一级id和所有的一级分类id
                for (var i = 0; i < this.subjectList.length; i++) {
                  var oneSubject = this.subjectList[i]
                  if (this.courseInfo.subjectParentId == oneSubject.id) {
                    this.subjectTwoList = oneSubject.children
                  }
                }
              })
          }
        )
//获取讲师列表
      this.getListTeacher()
    },
//上传封面成功调用
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.avatar
    }
    ,
//上传之前调用的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
    ,
//点击某个一级分类，触发change,显示对应的二级分类
    subjectTwoFindByOne(value) {
      for (var i = 0; i < this.subjectList.length; i++) {
        //每个一级分类
        var oneSubject = this.subjectList[i];
        //判断：所有一级分类id和点击一级分类id是否一样
        if (value === oneSubject.id) {
          //  从一级分类中获取所有的二级分类
          this.subjectTwoList = oneSubject.children
          //  二级分类数据清空
          this.courseInfo.subjectId = ''
        }
      }
    }
    ,
//查询所有的课程
    getAllSubject() {
      subject.getAllSubject()
        .then(response => {
          this.subjectList = response.data.list
        })
    }
    ,
//查询所有的讲师
    getListTeacher() {
      course.getListTeacher()
        .then(response => {
          this.teacherList = response.data.list
        })
    },
    //添加课程
    addCourse() {
      course.addCourseInfo(this.courseInfo)
        .then(response => {
          //提示
          this.$message({
            type: "success",
            message: "添加课程信息成功！"
          })
          //跳转到第二步
          this.$router.push({path: '/course/chapter/' + response.data.courseId})
        })
    },
    //修改课程
    updateCourse() {
      course.updateCourseInfo(this.courseInfo)
        .then(
          response => {
            this.$message({
              type: "success",
              message: "修改课程信息成功！"
            })
            //跳转到第二步
            this.$router.push({path: '/course/chapter/' + this.courseId})
          }
        )
    },
    saveOrUpdate() {
      if (this.courseId) {
        this.updateCourse()
      } else {
        this.addCourse()
      }
    }
  }
}
</script>
