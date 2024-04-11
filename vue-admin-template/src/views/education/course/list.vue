<template>
  <div class="login-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="courseQuery.subjectParentId" clearable placeholder="课程状态">
          <el-option :value=1 label="已发布"/>
          <el-option :value=0 label="未发布"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
          <el-option :value=1 label="已发布"/>
          <el-option :value=0 label="未发布"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-input v-model="courseQuery.minPrice" placeholder="最低价格"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="courseQuery.maxPrice" placeholder="最高价格"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!--表格-->
    <el-table
      :data="list"
      style="width: 100%"
      border
      fit
      highlight-current-row
      element-loading-text="数据加载中"
      v-loading="listLoading">
      <el-table-column prop="date" label="序号" width="100" align="center">
        <template slot-scope="scope">
          {{ (currentPage - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="名称" width="230"> </el-table-column>
      <el-table-column label="状态" width="90">
        <template slot-scope="scope">
          {{ scope.row.status === 'Normal' ? "已发布" : "未发布" }}
        </template>
      </el-table-column>
      <el-table-column prop="lessonNum" label="课程数" width="120" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="buyCount" label="购买量" width="120" />
      <el-table-column prop="viewCount" label="浏览量" width="120" />
      <el-table-column label="操作" width="530" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editCourseInfo(scope.row.id)">编辑课程基本信息</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editChapterVideo(scope.row.id)">编辑课程大纲</el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteCourseById(scope.row.id)">
            删除课程
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="currentPage"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>

import course from "@/api/course/course";

export default{
  data() {
    return {
      list:null,
      currentPage:1,
      limit:11,
      total:0,
      courseQuery:{},
      listLoading:''
    }
  },
  created(){
    this.getList()
  },
  methods:{
    //编辑课程基本信息
    editCourseInfo(courseId){
      //路由跳转
      this.$router.push({path:'/course/info/'+courseId})
    },
    //编辑课程大纲（编辑章节小节）
    editChapterVideo(courseId){
      this.$router.push({path:'/course/chapter/'+courseId})
    },
    //课程列表
    getList(currentPage=1){
      this.currentPage=currentPage
      course.getCourseListPage(this.currentPage,this.limit,this.courseQuery)
        .then(response=>{ //getList()方法调用成功时执行
          this.list=response.data.list
        })
        .catch(error=>{//getList()方法调用失败时执行
          console.log(error);
        })
    },
    //清空查询条件
    resetData(){
      this.courseQuery={}
      this.getList()
    },
    //删除课程
    deleteCourseById(id){
      this.$confirm('此操作将永久删除课程记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {  //点击confirmButton后执行
        course.deleteCourseById(id)
          .then(response=>{  //提示信息
            this.$message({
              type:'success',
              message:'删除成功！'
            })
            this.getList(this.currentPage)
          })
      })
    }
  }
}

</script>
