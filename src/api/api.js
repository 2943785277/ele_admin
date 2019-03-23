import request from '@/utils/request'
import js from '@/utils/js'
var url = 'https://jiankong.sxzmw.com/';
var upimgurl = url + '/home/upload'
//上传
function upload(data) {
  return js.ax({url: url + '/home/upload',method: 'post',params: data
  })
}
//文章
//增加/修改
function news_class_save(data) {
  return js.ax({url: url + '/home/news_class/save',method: 'post',params: data
  })
}
//获取数据
function news_class_index(data) {
  return js.ax({url: url + '/home/news_class/index',method: 'post',params: data})
}
//删除
function news_class_remove(data) {
  return js.ax({url: url + '/home/news_class/remove',method: 'post',params: data})
}

//文章管理
//分类列表
function news_class_lists(data) {
  return js.ax({url: url + '/home/news_class/lists',method: 'post',params: data})
}
//文章列表
function news_index(data) {
  return js.ax({url: url + '/home/news/index',method: 'post',params: data})
}
//添加修改
function news_save(data) {
  return js.ax({url: url + '/home/news/save',method: 'post',params: data})
}
//删除
function news_remove(data) {
  return js.ax({url: url + '/home/news/remove',method: 'post',params: data})
}
//详情
function news_details(data) {
  return js.ax({url: url + '/home/news/details',method: 'post',params: data})
}

//评论管理
//文章评论
function news_discuss(data) {
  return js.ax({url: url + '/home/news/discuss',method: 'post',params: data})
}
//删除评论
function news_discuss_remove(data) {
  return js.ax({url: url + '/home/news/discuss_remove',method: 'post',params: data})
}

//用户管理
//用户列表
function user_index(data) {
  return js.ax({url: url + '/home/user/index',method: 'post',params: data})
}

//商家
//商家分类
function business_class_index(data) {
  return js.ax({url: url + '/home/business_class/index',method: 'post',params: data})
}
//商家分类添加
function business_class_save(data) {
  return js.ax({url: url + '/home/business_class/save',method: 'post',params: data})
}
//商家分类删除
function business_class_remove(data) {
  return js.ax({url: url + '/home/business_class/remove',method: 'post',params: data})
}
//商家管理列表
function business_index(data) {
  return js.ax({url: url + '/home/business/index',method: 'post',params: data})
}
//商家添加
function business_save(data) {
  return js.ax({url: url + '/home/business/save',method: 'post',params: data})
}
//商家分类删除
function business_remove(data) {
  return js.ax({url: url + '/home/business/remove',method: 'post',params: data})
}
//商家详情
function business_details(data) {
  return js.ax({url: url + '/home/business/details',method: 'post',params: data})
}
//商家分类数据
function business_class_lists(data) {
  return js.ax({url: url + '/home/business_class/lists',method: 'post',params: data})
}
//轮播图
//列表数据
function banner_index(data) {
  return js.ax({url: url + '/home/banner/index',method: 'post',params: data})
}
//删除
function banner_remove(data) {
  return js.ax({url: url + '/home/banner/remove',method: 'post',params: data})
}
//添加修改
function banner_save(data) {
  return js.ax({url: url + '/home/banner/save',method: 'post',params: data})
}
//详情
function banner_details(data) {
  return js.ax({url: url + '/home/banner/details',method: 'post',params: data})
}
//评论标签
//标签数据
function assess_label_index(data) {
  return js.ax({url: url + '/home/assess_label/index',method: 'post',params: data})
}
//修改/保存
function assess_label_save(data) {
  return js.ax({url: url + '/home/assess_label/save',method: 'post',params: data})
}
//删除
function assess_label_remove(data) {
  return js.ax({url: url + '/home/assess_label/remove',method: 'post',params: data})
}

//产品
//产品数据
function goods_index(data) {
  return js.ax({url: url + '/home/goods/index',method: 'post',params: data})
}
//产品删除
function goods_remove(data) {
  return js.ax({url: url + '/home/goods/remove',method: 'post',params: data})
}
//产品详情
function goods_details(data) {
  return js.ax({url: url + '/home/goods/details',method: 'post',params: data})
}
//产品添加修改
function goods_save(data) {
  return js.ax({url: url + '/home/goods/save',method: 'post',params: data})
}
//关于我们
function setting(data) {
  return js.ax({url: url + '/home/setting',method: 'post',params: data})
}
function setting_save(data) {
  return js.ax({url: url + '/home/setting/save',method: 'post',params: data})
}
//商家评论
function business_discuss_index(data) {
  return js.ax({url: url + '/home/business_discuss/index',method: 'post',params: data})
}
//删除评论
function business_discuss_remove(data) {
  return js.ax({url: url + '/home/business_discuss/remove',method: 'post',params: data})
}
export default {url,upimgurl,upload,news_class_save,news_class_index,news_class_remove,news_class_lists,news_index,news_save,news_remove,
	news_details,news_discuss,news_discuss_remove,user_index,business_class_index,business_class_save,business_class_remove,
	business_index,business_save,business_details,business_class_lists,banner_index,banner_remove,banner_save,banner_details,assess_label_index,
	assess_label_save,assess_label_remove,goods_index,goods_remove,goods_details,goods_save,setting,setting_save,business_remove,
	business_discuss_index,business_discuss_remove}
