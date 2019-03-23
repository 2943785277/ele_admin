<template>
	<div class="app-container">
		<el-form ref="form" :model="data" label-width="80px">
			<el-form-item label="分类名称">
				<el-select v-model="data.name" placeholder="请选择分类" @change="change">
					<el-option v-for="item in pid" :label="item.name" :value="item.id" :key="item.id"/>
				</el-select>
			</el-form-item>
			
			<el-form-item label="文章标题">
				<el-input v-model="data.title"></el-input>
			</el-form-item>
			<el-form-item label="排序">
				<el-input v-model="data.sort"></el-input>
			</el-form-item>	
			<el-form-item label="图片">
				<el-upload
					class="avatar-uploader"
					:show-file-list="false"
					:http-request="Upload"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<img v-if="data.thumb" :src="data.thumb" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="文章内容">
				<quill-editor
				  v-model="data.content">
				</quill-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">{{subtext}}</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { quillEditor } from "vue-quill-editor"; //调用编辑器
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	import api from '@/api/api'
	import js from '@/utils/js'
  export default {
		components: {
        quillEditor
    },
    data() {
      return {
				data:{
				},
				pid:[
					{id:1,name:'环境'},{id:2,name:'菜品'},{id:3,name:'服务'}
				],
				type:[
					{id:1,name:'好评'},{id:2,name:'差评'}
				],
				lists:null,
				imageUrl: '',
				subtext:''
      }
    },
		created() {
		  this.formdata()
		},
    methods: {
			//下拉框选择
			change(i){
				this.data.class_id = i
			},
			//请求数据
			formdata(){
				let that = this;
				if(that.$route.query.id == '-1'){
					that.subtext = '添加';
					that.data = {class_id:'',content:'',sort:'',thumb:'',title:''}
				}else{
					that.subtext = '修改';
					api.news_details({id:that.$route.query.id}).then((res)=>{
						that.data = res.data
					})
				}
				api.news_class_lists().then((res)=>{
					that.lists = res.data
				})
			},
			handleAvatarSuccess(res, file) {
				console.log(res)
				console.log(file)
        this.imageUrl = URL.createObjectURL(file.raw);
				console.log(URL.createObjectURL(file.raw))
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
			//提交
      onSubmit() {
				this.$refs['form'].validate((valid) => {
					api.news_save(this.data).then((res)=>{
						this.$message({
						  type: 'success',
						  message: res.msg
						});
					}).catch(()=>{
						this.$message({
						  type: 'success',
						  message: res.msg
						});
					})
					console.log(this.data)
				})
        //console.log('submit!');
      },
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
