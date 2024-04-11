<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="讲师名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="form.level" placeholder="请选择讲师头衔">
          <el-option label="首席讲师" :value="2"></el-option>
          <el-option label="高级讲师" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师排序" >
        <el-input-number v-model="form.sort" controls-position="right" :min="0" :max="2"/>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="form.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="form.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">

        <!-- 头衔缩略图 -->
        <pan-thumb :image="form.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>

        <!--
    v-show：是否显示上传组件
    :key：类似于id，如果一个页面多个图片上传控件，可以做区分
    :url：后台上传的url地址
    @close：关闭上传组件
    @crop-upload-success：上传成功后的回调
      <input type="file" name="file"/>
    -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/api/oss/uploadAvatar'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacher from  '@/api/teacher/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
name: "add",
  components:{
    ImageCropper, PanThumb
  },
  data(){
    return{
      form:{},
      imagecropperShow:false,
      imagecropperKey:0,
      saveBtnDisabled:false,
      BASE_API:process.env.VUE_APP_BASE_API,
    }
  },
  created() {
      this.init();
  },
  //监听路由变化进行判断
  watch:{
    $route(to,from){
      this.init();
    }
  },
  methods:{
    //关闭上传弹框
    close(){
      this.imagecropperShow=false
    },
    //上传成功
    cropSuccess(data){
      this.imagecropperShow=false;
      this.form.avatar= data.avatar
    },

    //初始化方法
    init(){
      if(this.$route.params.id){
          this.queryById(this.$route.params.id);
      }else{
          this.form={}
      }
    },
    //更新或者删除
    saveOrUpdate(){
      if (this.$route.params.id){
        this.edit();
      }
      else {
        this.save();
    }
},
    //添加讲师
    save(){
      teacher.addTeacher(this.form)
        .then(response =>{
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          //  路由跳转
          this.$router.push({ path:'/teacher/listTeacher'})
        });
      },
  //  修改讲师
    edit(){
      teacher.updateTeacher(this.form).then(response =>{
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.$router.push({path:'/teacher/listTeacher'})
      });
    },
  //  根据讲师id查询讲师
    queryById(id){
      teacher.getTeacherById(id)
        .then(response =>{
          this.form=response.data.teacher;
        });
    }

  }
}
</script>

<style scoped>

</style>
