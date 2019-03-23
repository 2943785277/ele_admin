<template>
	<div class="app-container">
		<el-form ref="form" :model="data" label-width="80px">
			<el-form-item label="标题">
				<el-input v-model="data.title"></el-input>
			</el-form-item>
			<el-form-item label="排序">
				<el-input v-model="data.sort"></el-input>
			</el-form-item>	
			<el-form-item label="图片">
				<el-upload
					class="avatar-uploader"
					:http-request='Upload'
					:show-file-list="false"
					:on-success="success"
					:before-upload="beforeAvatarUpload">
					<img v-if="data.image" :src="data.image" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
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
				subtext:'',
				upimgurl:api.upimgurl
      }
    },
		created() {
		  this.formdata()
			console.log(this.upimgurl)
		},
    methods: {
			Upload: function (fileInfo) {
			  let file = fileInfo.file;
			  let that = this;
				console.log('---------')
				js.getBase64(file,1).then(function (value) {
					that.data.image = value.data.image;
					console.log(value)
				}).catch(function (error) {
			    
			  })
				return false
			},
			//图片成功
			success:function(response, file, fileList){
				let that = this;
				that.data.image = response.data.image;
				console.log(that.data)
			},
			//请求数据
			formdata(){
				let that = this;
				if(that.$route.query.id == '-1'){
					that.subtext = '添加';
					that.data = {title:'',image:'',sort:''}
				}else{
					that.subtext = '修改';
					api.banner_details({id:that.$route.query.id}).then((res)=>{
						that.data = res.data
					})
				}
			},
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
			//提交
      onSubmit() {
				this.$refs['form'].validate((valid) => {
					api.banner_save(this.data).then((res)=>{
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
