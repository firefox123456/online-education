<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>
    <!--    添加和修改章节表单-->
    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>
    <!--添加章节弹框-->
    <el-dialog title="章节" :visible.sync="dialogFormVisible">
      <el-form :model="chapterData">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="chapterData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="chapterData.sort" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <ul>
      <li v-for="chapter in chapterVideoList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span>
            <el-button type="text" @click="openVideo(chapter.id)">添加小节</el-button>
            <el-button style="" type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
            <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
          </span>
        </p>

        <!-- 视频 -->
        <ul class="chapterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button type="text" @click="openEditVideo(video.id)">编辑</el-button>
                <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <!--添加小节弹框-->
    <!-- 添加和修改小节表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="小节">
      <el-form :model="video" label-width="formLabelWidth">
        <el-form-item label="小节标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="小节排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <div>
              <el-radio label="0" border>免费</el-radio>
              <el-radio label="1" border>按自定义价格</el-radio>
            </div>
          </el-radio-group>
          <!--云端视频存储-->
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API+'/api/videoModule/uploadAliyVideo'"
            :limit="1"
            class="upload-demo">
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question"/>
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdateVideo()">确 定</el-button>
      </div>
    </el-dialog>

    <el-form label-width="120px">

      <el-form-item>
        <el-button @click="previous()">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next()">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import chapter from "@/api/course/chapter";
import video from "@/api/course/video";

export default {
  data() {
    return {
      saveBtnDisabled: false,// 保存按钮是否禁用
      chapterVideoList: [],
      courseId: '',
      chapterData: {
        title: '',
        sort: '',
        id: ''
      },
      video: {
        id: '',
        title: '',
        sort: 0,
        free: 0,
        videoSourceId: ''
      },
      fileList:[],
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogVideoFormVisible: false,
      BASE_API: process.env.VUE_APP_BASE_API,
    }
  },

  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getChapterVideo();
    }
  },

  methods: {
    //点击确认调用的方法
    handleVodRemove() {
      //调用接口的删除视频方法
      video.deleteAlyVideo(this.video.videoSourceId).then(response => {
        //提示信息
        this.$message({
          type: 'success',
          message: '删除视频成功!'
        });
        //把文件列表清空
        this.fileList = []
        //把video视频id和视频名称值清空
        //上传视频id赋值
        this.video.videoSourceId = ''
        //上传视频名称赋值
        this.video.videoOriginalName = ''
      })
  },
  //点击x调用的方法
  beforeVodRemove(file, fileList) {
    return this.$confirm(`确定移除${file.name}吗？`)
  },
  //上传视频成功调用的方法
  handleVodUploadSuccess(response, file, fileList) {
    //上传视频id赋值
    this.video.videoSourceId = response.data.videoId
    //上传视频名称赋值
    this.video.videoOriginalName = file.name
  },
  handleUploadExceed() {
    this.$message.warning('想要重新上传视频，请先删除已上传的视频')
  },
//===============================小节========================================================================
  //删除小节
  removeVideo(videoId) {
    this.$confirm('此操作将永久删除该小节, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      video.deleteVideo(videoId)
        .then(
          response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getChapterVideo();
          }
        )
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });
    });
  },
  //修改小节弹框
  openEditVideo(videoId) {
    //弹框
    this.dialogVideoFormVisible = true
    //查询video信息
    video.getVideoById(videoId)
      .then(response => {
        this.video = response.data.video
      })
  },
  //修改小节
  updateVideo() {
    video.updatevideo(this.video)
      .then(response => {
        //关闭弹框
        this.dialogVideoFormVisible = false
        //提示
        this.$message({
          type: "success",
          message: "修改小节成功！"
        })
        //刷新页面重新加载
        this.getChapterVideo()
      })
  },
  //添加小节
  addVideo() {
    //需要课程id
    this.video.courseId = this.courseId
    video.addVideo(this.video)
      .then(response => {
        //关闭弹框
        this.dialogVideoFormVisible = false
        //提示
        this.$message({
          type: "success",
          message: "添加小节成功！"
        })
        //刷新页面重新加载
        this.getChapterVideo()
      })
  },
  //添加或者修改小节
  saveOrUpdateVideo() {
    if (!this.video.id) {
      this.addVideo()
    } else {
      this.updateVideo()
    }
  },
  //添加小节弹框
  openVideo(chapterId) {
    //清空表单
    this.video.id = ''
    this.video.title = ''
    this.video.sort = 0
    this.video.free = 0
    this.video.videoSourceId = ''
    this.video.videoOriginalName = ''
    this.fileList = []
    //弹框
    this.dialogVideoFormVisible = true
    //设置章节id
    this.video.chapterId = chapterId
  },

//===============================章节========================================================================
  //删除章节
  removeChapter(chapterId) {
    this.$confirm('此操作将永久删除该章节, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      chapter.deleteChapter(chapterId)
        .then(
          response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getChapterVideo();
          }
        )
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });
    });
  },
//弹出修改章节页面
  openEditChapter(chapterId) {
    //弹框
    this.dialogFormVisible = true
    //查询章节数据
    chapter.getChapterInfo(chapterId)
      .then(response => {
        this.chapterData = response.data.chapter
      })

  }
  ,
//弹出添加章节页面
  openChapterDialog() {
    //  弹框
    this.dialogFormVisible = true
    //表单数据清空
    this.chapterData.title = ''
    this.chapterData.sort = 0
    this.chapterData.id = ''
  }
  ,
//修改章节
  updateChapter() {
    //修改章节
    chapter.updateChapter(this.chapterData)
      .then(response => {
        //关闭弹框
        this.dialogFormVisible = false
        //提示
        this.$message({
          type: "success",
          message: "修改章节成功！"
        })
        //刷新页面重新加载
        this.getChapterVideo()
      })
  }
  ,
//添加章节
  addChapter() {
    //课程id
    this.chapterData.courseId = this.courseId
    chapter.addChapter(this.chapterData)
      .then(response => {
        //关闭弹框
        this.dialogFormVisible = false
        //提示
        this.$message({
          type: "success",
          message: "添加章节成功！"
        })
        //刷新页面重新加载
        this.getChapterVideo()
      })
  }
  ,
  saveOrUpdate() {
    if (this.chapterData.id) {
      this.updateChapter()
    } else {
      this.addChapter()
    }
  }
  ,
//根据课程id查询章节和小节
  getChapterVideo() {
    chapter.getAllChapterVideo(this.courseId)
      .then(response => {
        this.chapterVideoList = response.data.chapterList
      })
  }
  ,
  previous() {
    this.$router.push({path: '/course/info/' + this.courseId})
  }
  ,

  next() {
    console.log('next')
    this.$router.push({path: '/course/publish/' + this.courseId})
  }
}
}
</script>
<style scoped>
.el-collapse b {
  font-size: 18px;
  font-weight: normal
}

.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}

.chanpterList li {
  position: relative;
}

.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}

.chanpterList .acts {
  float: right;
  font-size: 14px;
}

.videoList {
  padding-left: 50px;
}

.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}
</style>
