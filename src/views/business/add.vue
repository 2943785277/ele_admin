<template>
	<div class="app-container">
		<el-form ref="form" :model="data" label-width="90px">
			<el-form-item label="分类名称">
				<el-select v-model="data.class_name" placeholder="请选择分类" @change="change">
					<el-option v-for="item in lists" :label="item.class_name" :value="item.id" :key="item.id"/>
				</el-select>
			</el-form-item>
			<el-form-item label="商家名称">
				<el-input v-model="data.name" placeholder="请填写商家名称"></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input v-model="data.mobile" placeholder="请填写电话"></el-input>
			</el-form-item>	
			<el-form-item label="评价星级">
				<div style="height: 36px;display: flex;align-items: center;"><el-rate v-model="data.stars"></el-rate></div>
			</el-form-item>	
			<el-form-item label="是否推荐">
				<el-radio-group v-model="data.is_recommend">
					<el-radio :label="0">未推荐</el-radio>
					<el-radio :label="1">已推荐</el-radio>
				</el-radio-group>
			</el-form-item>	
			<el-form-item label="营业时间">
				<el-input v-model="data.hours" placeholder="请填写营业时间"></el-input>
			</el-form-item>	
			<el-form-item label="商家地址">
				<el-row>
					<el-col :span="20"><el-input v-model="data.details" :disabled="true" placeholder="请选择地址"></el-input></el-col>
					<el-col :span="4"><el-button type="primary" @click='windowtype=true'>添加地址</el-button></el-col>
				</el-row>
			</el-form-item>	
			<el-form-item label="商家图片">
				<el-upload
					class="avatar-uploader"
					:show-file-list="false"
					:http-request="Upload"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<img v-if="data.pic" :src="data.pic" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="资质证照">
				<el-upload
					:action="upimgurl"
					list-type="picture-card"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove"
					:on-success="success" :file-list="data.pics">
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="食品安全照">
				<el-upload
					:action="upimgurl"
					list-type="picture-card"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove1"
					:on-success="success1" :file-list="data.pics1">
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="供应来源照">
				<el-upload
					:action="upimgurl"
					list-type="picture-card"
					:on-preview="handlePictureCardPreview"
					:on-remove="handleRemove2"
					:on-success="success2" :file-list="data.pics2">
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="添加直播视频">
				<el-row>
					<el-upload
						class="avatar-uploader"
						:show-file-list="false"
						:action="upimgurl"
						:on-success="successimgs"
						:before-upload="beforeAvatarUpload">
						<img v-if="videos.img" :src="videos.img" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<el-col :span='20'><el-input v-model="videos.name" placeholder="请填写名称"></el-input></el-col>
					<el-col :span='20'><el-input v-model="videos.url" placeholder="请填写视频地址"></el-input></el-col>
					<el-col :span='4'><el-button type="primary" @click='addvideo'>添加视频</el-button></el-col>	
				</el-row>
			</el-form-item>
			<el-form-item label="直播视频">
				<el-row :gutter="20">
					<el-col :span="11" v-for='(item,i) in data.video' class='imgs'>
						<div class="avatar-uploader"><img :src="item.img" class="el-upload" style="width: 150px;height: 150px;"></div>
						<el-input v-model="item.name" placeholder="请填写名称"></el-input>
						<el-input v-model="item.url" placeholder="请填写视频地址"></el-input>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="商家介绍">
				<quill-editor
				  v-model="data.resume">
				</quill-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">{{subtext}}</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
		<el-dialog :visible.sync="windowtype" title="选择地址" width="500px">
		  <iframe class="iframe" src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp" frameborder="0" width="100%" height="600px"></iframe>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="windowtype = false">确定</el-button>
		  </span>
		</el-dialog>
		<el-dialog :visible.sync="dialogVisible">
		<img width="100%" :src="dialogImageUrl" alt="">
	</el-dialog>
	</div>
</template>
<script>
	import { TMap } from '@/utils/map'
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
				upimgurl:api.upimgurl,			//上传链接
				data:{
					class_id:'',				//分类ID
					class_name:'',			//分类名称
					name:'',						//商家名称
					mobile:'',					//电话
					is_recommend:'',			//是否推荐
					province:'',						//省
					area:'',						//区
					city:'',						//市
					stars:'',						//评价星级
					lng:'',						//经度
					lat:'',						//纬度
					details:'',						//地址详情
					resume:'',				//商家介绍
					hours:'',						//营业时间
					pic:'',
					permit_img:'',
					safety_img:'',
					source_img:'',
					video:[],
				},
				videos:{img:'',url:'',name:''},
				windowtype:false,		//窗口默认关闭
				lists:null,
				imageUrl: '',
				subtext:'',
				dialogImageUrl: '',
        dialogVisible: false
      }
    },
		created() {
			let that=this;
		  this.formdata()
			window.addEventListener('message', function(event) {
				
				// 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
				var loc = event.data;
// 				console.log(loc)
// 				console.log(that.data)
				if (loc && loc.module == 'locationPicker') {
					var geocoder = new qq.maps.Geocoder({
						complete:function(result){
							console.log(result)
							that.data.province = result.detail.addressComponents.province;
							that.data.city = result.detail.addressComponents.city;
							that.data.area = result.detail.addressComponents.district;
						}
					});
					var latLng = new qq.maps.LatLng(loc.latlng.lat,loc.latlng.lng);
					geocoder.getAddress(latLng);
					that.data.lng = loc.latlng.lng;
					that.data.lat = loc.latlng.lat;
					that.data.details = loc.poiname;
				}
			}, false);
		},
		mounted:{
			

		},
    methods: {
			Upload: function (fileInfo) {
			  let file = fileInfo.file;
			  let that = this;
				this.data.pic = file.name
				js.getBase64(file,1).then(function (value) {
					that.data.pic = value.data.image;
					console.log(value.data.image)
				}).catch(function (error) {
			    
			  })
			},
			addvideo:function(){
				let that = this;
				console.log(that.data)
				if(that.videos.img == ''){
					this.$message({
					  type: 'warning',
					  message: '请上传图片!'
					});
					return false;
				}else if(that.videos.name == ''){
					this.$message({
					  type: 'warning',
					  message: '请填写名称!'
					});
					return false;
				}else if(that.videos.url == ''){
					this.$message({
					  type: 'warning',
					  message: '请填写视频地址!'
					});
					return false;
				}else{
					that.data.video.push(that.videos);
					that.videos = {name:'',url:'',img:''}
				}
				//{name:'',url:'',img:''}
			},
			Uploads: function (fileInfo,i) {
			  let file = fileInfo.file;
			  let that = this;
// 				this.data.pic = file.name
// 				js.getBase64(file,1).then(function (value) {
// 					that.data.pic = value.data.image;
// 					console.log(value.data.image)
// 					console.log(i + '---------------')
// 				}).catch(function (error) {
// 			    
// 			  })
			},
			successimgs:function(response, file, fileList){
				let that = this;
				if(response.code == 0){
					that.videos.img = response.data.image
				}else{
					
				}
			},

			//上传视频
			addAudioFileHandler: function () {
			  let _this = this;
			  let formData = new FormData();
			  formData.append("file", this.$refs.audioFile.files[0]);
				console.log(this.$refs.audioFile.files[0])
				return false
				api.upload({file:'123'}).then((res)=>{
					console.log(res)
				})
				return false;
			  this.api.uploadFile({file:formData}).then((res) => {
			    if (res.data.code == 1) {
			      this.ruleForm.order_ring = res.data.data;
			    }
			    _this.$message({
			      showClose: true,
			      message: res.data.msg,
			      type: 'success'
			    });
			  }).catch((err) => {
			    console.log(err);
			  });
			},
			//下拉框选择
			change(i){
				this.data.class_id = i
			},
			//请求数据
			formdata(){
				let that = this;
				if(that.$route.query.id == '-1'){
					that.subtext = '添加';
					that.data.pics = [];
					that.data.pics1 = [];
					that.data.pics2 = [];
				}else{
					that.subtext = '修改';
					api.business_details({id:that.$route.query.id}).then((res)=>{
						var data = res.data;
						var pics = [];			//图片空数组
						var pics1 = [];			//图片空数组
						var pics2 = [];			//图片空数组
						if(data.permit_img != null){
							data.permit_img.forEach((item,i)=>{
								pics.push({name:i,url:item.image,thumb:item.thumb})
							})
						}
						
						if(data.source_img != null){
							data.source_img.forEach((item,i)=>{
								pics1.push({name:i,url:item.image,thumb:item.thumb})
							})
						}
						
						if(data.safety_img != null){
							data.safety_img.forEach((item,i)=>{
								pics2.push({name:i,url:item.image,thumb:item.thumb})
							})
						}

						data.pics = pics;
						data.pics1 = pics1;
						data.pics2 = pics2;
						console.log(pics)
						that.data = data;
					})
				}
				api.business_class_lists().then((res)=>{
					console.log(res)
					that.lists = res.data
				})
			},
			handleAvatarSuccess(res, file) {
				console.log(res)
				console.log(file)
        this.imageUrl = URL.createObjectURL(file.raw);
				console.log(URL.createObjectURL(file.raw))
      },
			//删除图片
			handleRemove(file, fileList) {
				let that = this;
				that.data.pics = fileList
      },
			handleRemove1(file, fileList) {
				let that = this;
				that.data.pics1 = fileList
			},
			handleRemove2(file, fileList) {
				let that = this;
				that.data.pics2 = fileList
			},
      handlePictureCardPreview(file) {
				console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
//         if (!isJPG) {
//           this.$message.error('上传头像图片只能是 JPG 格式!');
//         }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
			
			//图片成功
			success:function(response, file, fileList){
				let that = this;
				that.data.pics.push({name:1,url:response.data.image,thumb:response.data.thumb})
				console.log(that.data.pics)
			},
			success1:function(response, file, fileList){
				let that = this;
				that.data.pics1.push({name:1,url:response.data.image,thumb:response.data.thumb})
			},
			success2:function(response, file, fileList){
				let that = this;
				that.data.pics2.push({name:1,url:response.data.image,thumb:response.data.thumb})
			},
			//提交
      onSubmit() {
				let that = this;
				this.$refs['form'].validate((valid) => {
					console.log(this.data)
					var data = that.data;
					var pics = [];
					var pics1 = [];
					var pics2 = [];
					//循环拆分多图			-permit_img
					data.pics.forEach((item,i)=>{
						pics.push({image:item.url,thumb:item.thumb})
					})
					data.pics1.forEach((item,i)=>{
						pics1.push({image:item.url,thumb:item.thumb})
					})
					data.pics2.forEach((item,i)=>{
						pics2.push({image:item.url,thumb:item.thumb})
					})
					data.permit_img = pics;
					data.source_img = pics1;
					data.safety_img = pics2;
					console.log(data)
					//return false;
					api.business_save(data).then((res)=>{
						this.$message({
						  type: 'success',
						  message: res.msg
						});
					}).catch((res)=>{
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
	.imgs{margin-top: 10px;}
</style>
