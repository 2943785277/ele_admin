import router from '@/router'
import api from '@/api/api'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
function ax(o){		//url,method,params
	if(o.method == 'post'){
		return new Promise((resolve, reject) => {
		  axios.post(o.url,qs.stringify(o.params))
		    .then(response => {
					if(response.data.code == -1){
						Message.error(response.data.msg); 
					}else if(response.data.code == 401){
						window.location.href= api.url + 'login'
					}else{
						resolve(response.data);
					}
		    })
		    .catch((error) => {
		      reject(error)
		    })
		})
	}else{
		return new Promise((resolve, reject) => {
		  axios.get(o.url,qs.stringify(o.params))
		    .then(response => {
					if(response.data.code == -1){
						Message.error(response.data.msg); 
					}else if(response.data.code == 401){
						window.location.href= api.url + 'login/out'
					}else{
						resolve(response.data);
					}
		    })
		    .catch((error) => {
		      reject(error)
		    })
		})
	}
}

//转Base64
function getBase64(file,type) {
	return new Promise(function(resolve, reject) {
		let reader = new FileReader();
		let imgResult = "";
		reader.readAsDataURL(file);
		console.log(file)
		reader.onload = function() {
			imgResult = reader.result;
		};
		reader.onerror = function(error) {
			reject(error);
		};
		reader.onloadend = function() {
			if(type == 1){
				api.upload({file:imgResult}).then(res=>{
					resolve(res);
				})
				console.log('这是一个图片上传')
			}
		};
	});
}		
//ax('http://k8hfe7.natappfree.cc/home/news_class/index','post',{page:1})
//跳转
function url(url,data) {
  router.push({
  	path: url,
  	query: data
  })
}
export default {url,ax,getBase64}