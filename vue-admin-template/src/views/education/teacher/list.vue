<template>
  <div class="app-container">
    讲师列表
    <br>
    <br>
<!--    条件选择器-->
    <el-form :inline="true" :model="teacherQuery" class="demo-form-inline">
      <el-form-item label="讲师名">
        <el-input v-model="teacherQuery.name" placeholder="讲师名"></el-input>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacherQuery.level"  placeholder="讲师头衔">
          <el-option label="高级讲师" value="1"></el-option>
          <el-option label="首席讲师" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="teacherList"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * size + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeTeacherById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    分页条-->
    <div class="block">
<!--      <span class="demonstration">页数较少时的效果</span>-->
      <el-pagination
        :current-page="page"
        :page-size="size"
        style="padding: 30px 0;text-align: center"
        layout="total,prev, pager, next,jumper"
        :total="total"
        @current-change="getList">
      </el-pagination>
    </div>
<!--    <div class="block">-->
<!--      <span class="demonstration">大于 7 页时的效果</span>-->
<!--      <el-pagination-->
<!--        layout="prev, pager, next"-->
<!--        :total="1000">-->
<!--      </el-pagination>-->
<!--    </div>-->
  </div>
</template>

<script>
import teacher from '@/api/teacher/teacher';
export default {
  name: 'ListVue',
  data(){
      return{
        teacherList:[],//查询之后接口返回集合
        page:1,//当前页
        size:10,//每页记录数
        total:0,//总记录数
        teacherQuery:{} //条件封装对象
      }
  },
  created() {
    this.getList()
  },
  methods:{
    getList(page=1) {
      this.page = page
      teacher.getTeacherListPage(this.page,this.size,this.teacherQuery)
        .then(response =>{//请求成功
          //response接口返回的数据
          //console.log(response)
          this.teacherList = response.data.rows
          this.total = response.data.total
          // console.log(this.list)
          // console.log(this.total)
        })
    },
    resetData(){
      this.teacherQuery={};
      this.getList();
    },
    removeTeacherById: function (id) {
      this.$confirm('此操作将永久删除该讲师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        teacher.deleteTeacherId(id)
          .then(
            response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList();
            }
          )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped>

</style>
