<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="'https://huanqi-online-education.oss-cn-beijing.aliyuncs.com/%E6%A8%A1%E6%9D%BF.xlsx'">点击下载模版</a>
        </el-tag>
      </el-form-item>
    <el-form-item>
    <!--  手动上传-->
      <el-upload
        ref="upload"
        :auto-upload="false"
        :on-success="fileUploadSuccess"
        :on-error="fileUploadError"
        :disabled="importBtnDisabled"
        :limit="1"
        :action="BASE_API+'/api/education/edu-subject/addSubjectByExcel'"
        name="file"
        accept="application/vnd.ms-excel">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button :loading="loading" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
         <div slot="tip" class="el-upload__tip">只能上传excel文件,请遵守格式！</div>
      </el-upload>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
name: "add",
  data(){
    return{
    BASE_API:process.env.VUE_APP_BASE_API,//接口api地址
    importBtnDisabled: false,//按钮是否禁用
    loading: false
  }
  },
  methods:{
    //点击按钮上传文件到接口里面
    submitUpload(){
      this.fileUploadBtnText = '正在上传'
      this.importBtnDisabled = true
      this.loading = true,
        //js:document.getElementById("upload").submit()
        this.$refs.upload.submit()
    },
    //上传成功
    fileUploadSuccess(response){
      //提示信息
      if (response.success === true) {
        this.fileUploadBtnText = '添加课程分类成功'
        this.loading = false
        this.$message({
          type: 'success',
          message: response.message
        })
      }
      //跳转到课程分类列表页面
      this.$router.push({ path: '/subject/listSubject' })
    },
    //上传失败
    fileUploadError(response){
      this.fileUploadBtnText = '添加课程分类失败'
      this.loading = false
      this.$message({
        type: 'error',
        message: '添加课程分类失败'
      })
    },
  }
}
</script>

<style scoped>

</style>
