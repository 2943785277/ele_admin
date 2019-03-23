import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRouterMap = [
	  {
	  path: '/redirect',
	  component: Layout,
	  hidden: true,
	  children: [
	    {
	      path: '/redirect/:path*',
	      component: () => import('@/views/redirect/index')
	    }
	  ]
	},
	{
	  path: '/login',
	  component: () => import('@/views/login/index'),
	  hidden: true
	},
	{
	  path: '/auth-redirect',
	  component: () => import('@/views/login/authredirect'),
	  hidden: true
	},
	{
	  path: '/404',
	  component: () => import('@/views/errorPage/404'),
	  hidden: true
	},
	{
	  path: '/401',
	  component: () => import('@/views/errorPage/401'),
	  hidden: true
	},
		{
		path: '/banner',
		hidden: true,
		component: Layout,
		redirect: '/banner/index',
		meta: {
			title: '轮播图',
			icon: 'documentation',
		},
		children: [
			{
				path: 'index',
				hidden: true,
				component: () => import('@/views/banner/index'),
				name: 'bannerindex',
				meta: {
					title: '轮播图',
				}
			},{
				path: 'add',
				hidden: true,
				component: () => import('@/views/banner/add'),
				name: 'banneradd',
				meta: {
					title: '添加轮播图',
				}
			},
		],
	},
	{
	  path: '',
	  component: Layout,
	  redirect: 'dashboard',
	  children: [
	    {
	      path: 'dashboard',
	      component: () => import('@/views/dashboard/index'),
	      name: 'Dashboard',
	      meta: { title: '轮播图', icon: 'dashboard',}
	    }
	  ]
	},
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
	{
		path: '/product',
		component: Layout,
		redirect: '/product/index',
		meta: {
			title: '产品列表',
			icon: 'documentation',
		},
		children: [
			{
				path: 'index',
				component: () => import('@/views/product/index'),
				name: 'productindex',
				meta: {
					title: '产品列表',
				}
			},{
				path: 'add',
				hidden: true,
				component: () => import('@/views/product/add'),
				name: 'productadd',
				meta: {
					title: '添加修改',
				}
			},
		],
	},
	{
		path: '/article',
		component: Layout,
		redirect: '/article/index',
		meta: {
			title: '文章',
			icon: 'documentation',
		},
		children: [
			{
				path: 'class',
				component: () => import('@/views/article/class'),
				name: 'articleclass',
				meta: {
					title: '文章分类',
				}
			},
			{
				path: 'index',
				component: () => import('@/views/article/index'),
				name: 'articleindex',
				meta: {
					title: '文章列表',
				}
			},
			{
				path: 'details',
				hidden: true,
				component: () => import('@/views/article/details'),
				name: 'articledetails',
				meta: {
					title: '文章详情',
				}
			},
			{
				path: 'comment',
				component: () => import('@/views/article/comment'),
				name: 'articlecomment',
				meta: {
					title: '文章评论',
				}
			},
		]
	},
	{
		path: '/business',
		component: Layout,
		redirect: '/business/class',
		meta: {
			title: '商家',
			icon: 'documentation',
		},
		children: [
			{
				path: 'class',
				component: () => import('@/views/business/class'),
				name: 'businessclass',
				meta: {
					title: '商家分类',
				}
			},
			{
				path: 'index',
				component: () => import('@/views/business/index'),
				name: 'businessindex',
				meta: {
					title: '商家管理',
				}
			},
			{
				path: 'add',
				hidden: true,
				component: () => import('@/views/business/add'),
				name: 'businessadd',
				meta: {
					title: '商家添加修改',
				}
			},
		],
	},
		{
			path: '/businesslun',
			component: Layout,
			redirect: '/businesslun/index',
			meta: {
				title: '商家评论',
				icon: 'documentation',
			},
			children: [
				{
					path: 'index',
					component: () => import('@/views/businesslun/index'),
					name: 'businesslunindex',
					meta: {
						title: '商家评论',
					}
				},
			],
		},	
	{
		path: '/user',
		component: Layout,
		redirect: '/user/index',
		meta: {
			title: '用户管理',
			icon: 'documentation',
		},
		children: [
			{
				path: 'index',
				component: () => import('@/views/user/index'),
				name: 'userindex',
				meta: {
					title: '用户列表',
				}
			},
		],
	},	
	{
		path: '/lable',
		component: Layout,
		redirect: '/lable/index',
		meta: {
			title: '评论标签',
			icon: 'documentation',
		},
		children: [
			{
				path: 'index',
				component: () => import('@/views/lable/index'),
				name: 'lableindex',
				meta: {
					title: '评论标签',
				}
			},{
				path: 'add',
				hidden: true,
				component: () => import('@/views/lable/add'),
				name: 'lableadd',
				meta: {
					title: '添加',
				}
			},
		],
	},
		{
		path: '/we',
		component: Layout,
		redirect: '/we/index',
		meta: {
			title: '产品列表',
			icon: 'documentation',
		},
		children: [
			{
				path: 'index',
				component: () => import('@/views/we/index'),
				name: 'weindex',
				meta: {
					title: '关于我们',
				}
			}
		],
	},
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/permission',hidden: true,
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },

  {
    path: '/icon',hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/svg-icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** When your routing table is too long, you can split it into small modules**/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',hidden: true,
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',hidden: true,
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',hidden: true,
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: () => import('@/views/errorLog/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',hidden: true,
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/exportExcel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/selectExcel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/uploadExcel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      },
			{
			  path: 'a',
			  component: () => import('@/views/excel/a'),
			  name: 'a',
			  meta: { title: 'a' }
			},
    ]
  },

  {
    path: '/zip',hidden: true,
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/pdf',hidden: true,
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',hidden: true,
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',hidden: true,
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',hidden: true,
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',hidden: true,
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

