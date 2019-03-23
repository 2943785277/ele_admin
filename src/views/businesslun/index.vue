<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange">
      <el-table-column label="ID" prop="id" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
	  </el-table-column>
	  <el-table-column label="商户" align="center">
	    <template slot-scope="scope">
	      <span>{{ scope.row.name }}</span>
	    </template>
	  </el-table-column>
		<el-table-column label="微信昵称" align="center">
		  <template slot-scope="scope">
		    <span>{{ scope.row.nickname }}</span>
		  </template>
		</el-table-column>
		<el-table-column label="微信头像" width="150px" align="center">
			<template slot-scope="scope">
				<img :src="scope.row.avatar_url" width="40px" height="40px"/>
			</template>
		</el-table-column>
		<el-table-column label="评论标签">
		  <template slot-scope="scope">
		    <span>{{ scope.row.label_name }}</span>
		  </template>
		</el-table-column>
		<el-table-column label="评论内容">
		  <template slot-scope="scope">
		    <span>{{ scope.row.content }}</span>
		  </template>
		</el-table-column>
		<el-table-column label="评论图片">
		  <template slot-scope="scope">
		    <img v-for="(item,i) in scope.row.pic" :src="item" width="40px" height="40px"/>
		  </template>
		</el-table-column>
		<el-table-column label="环境星级" align="center">
		  <template slot-scope="scope">
		    <span>{{ scope.row.environment_stars }}星</span>
		  </template>
		</el-table-column>
		<el-table-column label="菜品星级" align="center">
		  <template slot-scope="scope">
		    <span>{{ scope.row.taste_stars }}星</span>
		  </template>
		</el-table-column>
		<el-table-column label="服务星级" align="center">
		  <template slot-scope="scope">
		    <span>{{ scope.row.service_stars }}星</span>
		  </template>
		</el-table-column>
		<el-table-column label="评论日期" width="350px" align="center">
			<template slot-scope="scope">
				<span>{{ scope.row.create_time}}</span>
			</template>
		</el-table-column>
		<el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
			<template slot-scope="scope">
				<el-button size="mini" type="danger" @click="handleModifyStatus(scope.row.id,scope.$index)">删除
				</el-button>
			</template>
		</el-table-column>
	</el-table>

    <pagination v-show="total>0" :total="total" :page.sync="page.page" :limit.sync="page.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="data" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">

        <el-form-item label="名称" prop="title">
          <el-input v-model='data.name'/>
        </el-form-item>
		<el-form-item label="排序" prop="title">
		  <el-input v-model='data.sort'/>
		</el-form-item>
      </el-form>
	  
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import api from '@/api/api'
import waves from '@/directive/waves' // Waves directive
import js from '@/utils/js'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  //console.log(acc)
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
			page:{		//页数
				page:1,limit:10
			},
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
			z_index:0,		//索引  默认0
			data:{			//操作的数据
				name: '',
				sort: '',
			},
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
			let that = this;
			api.business_discuss_index(this.page).then((res)=>{
				that.list = res.data.data;
				that.total = res.data.total;
				this.listLoading = false
			})
//       fetchList(this.listQuery).then(response => {
//         this.list = response.data.items
//         this.total = response.data.total
// 
//         // Just to simulate the time of the request
//         
//       })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(id,index) {
			let that = this;
			var data = {id:id};
			this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					api.business_discuss_remove(data).then((res)=>{
						that.list.splice(index,1)
						this.$message({
						  type: 'success',
						  message: '删除成功!'
						});
					}).catch(()=>{
						this.$message({
						  type: 'info',
						  message: '操作失败!'
						});
					})
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.data = {
        name: '',
        sort: '',
      }
    },
		//添加文章详情跳转
    handleCreate(id) {
			js.url('/article/details',{id:id})
    },
	//添加
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
					api.news_class_save(this.data).then((res) => {
            //this.list.unshift(this.temp)
						this.getList();				//重新请求
						this.dialogFormVisible = false;    //关闭弹框
						this.$message({
						  message: res.msg,
						  type: 'success'
						})
          })
        }
      })
    },
		//编辑
    handleUpdate(i) {
			let that = this;
			that.data = that.list[i];
			that.z_index = i;
			this.dialogStatus = 'update'
			this.dialogFormVisible = true
			this.$nextTick(() => {
			  this.$refs['dataForm'].clearValidate()
			})
			return false
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      
    },
	//修改
    updateData() {
			let that = this;
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
					api.news_class_save(this.data).then((res) => {
						that.list.splice(that.z_index,1,this.data);		//修改当前数据
						this.dialogFormVisible = false;    //关闭弹框
						this.$message({
						  message: res.msg,
						  type: 'success'
						})
					})
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
  }
}
</script>
