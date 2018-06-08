<template>
  <div>
    <div class="search-bar">
      <div class="filter-container">
        <el-input style="width: 300px;" class="filter-item" placeholder="请输入关键字" v-model="filter.value" @keyup.enter.native="initPage"></el-input>
        <el-select style="width: 150px;" class="filter-item" v-model="filter.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="initPage">搜索</el-button>
        <el-button class="filter-item" type="primary" style="float:right; margin-right:10px" icon="el-icon-edit" @click="addApp()">增加App</el-button>
      </div>
    </div>
    <div class="api-table">
      <el-table
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="app_name"
          label="App名称">
        </el-table-column>
        <el-table-column
          prop="app_id"
          label="AppID">
        </el-table-column>
        <el-table-column
          prop="app_secret"
          label="AppSecret">
        </el-table-column>

        <el-table-column
          prop="app_create_time"
          label="创建时间">
        </el-table-column>

        <el-table-column
          label="操作"
          width="300px">
          <template slot-scope="scope">
            <el-button type="info" size="mini" @click="showAppDetail(scope.row)">详情</el-button>
            <el-button type="info" size="mini" @click="editApp(scope.row)">编辑</el-button>
            <el-button type="warning" size="mini" @click="deleteApp(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="filter.pageNo"
        :page-sizes="[5, 10, 15]"
        :page-size="filter.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataLength"
        style="float:right">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import BizService from '../../services/biz-service.js'
  var service = new BizService()
  export default {
    data () {
      return {
        tableData: [],
        tableDataLength: null,
        filter: {
          pageSize: 10,
          pageNo: 1,
          type: 'app_name',
          value: null
        },
        options: [{
          value: 'app_name',
          label: '名称'
        }]
      }
    },
    created () {
      this.initPage()
    },
    methods: {
      initPage () {
        var params = {}
        params.pageNo = this.filter.pageNo
        params.pageSize = this.filter.pageSize
        params.consumer_id= localStorage.getItem("id");
        params.name=this.filter.value
        service.getAppList(params,(isOk, data) => {
          console.log(data)
          console.log(isOk)
          this.tableData = data.data
          this.tableDataLength = data.total
        })
      },
      handleSizeChange (val) {
        this.filter.pageSize = val
        console.log(this.filter)
        this.initPage()
      },
      handleCurrentChange (val) {
        this.filter.pageNo = val
        // console.log(this.filter)
        this.initPage()
      },


      addApp(){
        this.$router.push('/appmanage/add')
      },
      showAppDetail(App){
        GBFL.Cache.set('App', App)
        this.$router.push('/appmanage/detail')
      },
      editApp(App){
        GBFL.Cache.set('App', App)
        this.$router.push('/appmanage/edit')
      },
      deleteApp(App){
        var params={}
        params.app_id=App.app_id
        service.deleteApp(params,(isOk, data) => {
          if(isOk){
            this.$message({
              type: 'success',
              message: '删除成功',
              showClose: true
            })
            var view = {
              path: this.$route.path,
              name: this.$route.name
            }
            this.$store.dispatch('delVisitedViews', view).then((views) => {
              if (this.isActive(view)) {
                const latestView = views.slice(-1)[0]
                if (latestView) {
                  this.$router.push(latestView.path)
                } else {
                  this.$router.push('/')
                }
              }
            })
          }else{
            this.$message({
              type: 'warning',
              message: data.message,
              showClose: true
            })
          }
        })

      },
      isActive(route) {
        return route.path === this.$route.path || route.name === this.$route.name
      }

    }
  }
</script>
<style>
  .search-bar {
    margin-left: 10px;
    margin-top: 20px;
  }
  .api-table {
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
