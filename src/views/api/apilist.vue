<template>
  <div>
    <div class="search-bar">
      <div class="filter-container">
        <el-input style="width: 300px;" class="filter-item" placeholder="请输入关键字" v-model="filter.value"
                  @keyup.enter.native="initPage"></el-input>
        <el-select style="width: 150px;" class="filter-item" v-model="filter.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="initPage">搜索</el-button>

      </div>
    </div>
    <div class="api-table">
      <el-table
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="api_name"
          label="api名称">
        </el-table-column>
        <el-table-column
          prop="sp_name"
          label="提供商">
        </el-table-column>
        <el-table-column
          label="Api审核状态">
          <template slot-scope="scope">
            {{formatMethod(scope.row.api_verify_state)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="api_category_name"
          label="Api所属Api类">
        </el-table-column>
        <el-table-column
          prop="api_create_time"
          label="Api创建时间">
        </el-table-column>
        <el-table-column

          label="Api是否可用">
          <template slot-scope="scope">
            {{formateAble(scope.row.api_enable)}}
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          width="300px">
          <template slot-scope="scope">
            <el-button type="info" size="mini" @click="showDetail(scope.row)">详情</el-button>
            <el-button type="info" size="mini" :dispaly=" judgeRole()" @click="pass(scope.row)">通过</el-button>
            <el-button type="info" size="mini" @click="showDetail(scope.row)">适配</el-button>
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
    data() {
      return {
        tableData: [],
        tableDataLength: null,
        filter: {
          pageSize: 10,
          pageNo: 1,
          key: '',
          api_verify_state: '',
          type: '',
          api_adapt_state: ''
        },
        options: [{
          value: 'api_category_name',
          label: '名称'
        }]
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      initPage() {
        var params = {}
        params.pageNo = this.filter.pageNo
        params.pageSize = this.filter.pageSize
        params.key = this.filter.key
        params.id = localStorage.getItem("id")
        params.role = localStorage.getItem("role")
        if (this.api_verify_state != null) {
          params.api_verify_state = this.filter.api_verify_state
        }
        if (this.api_adapt_state != null) {
          params.api_adapt_state = this.filter.api_adapt_state
        }

        service.getApiList(params, (isOk, data) => {
          console.log(data)
          console.log(isOk)
          this.tableData = data.data.data
          this.tableDataLength = data.data.total
          if (localStorage.getItem("role") == 1) {

          }
        })
      },
      judgeRole() {
        var role = localStorage.getItem("role");
        if (role === 1) {
          return none;
        }

      },
      formateAble(val) {
        if (val == 0)
          return '不可用'
        else
          return '正常'

      },
      handleSizeChange(val) {
        this.filter.pageSize = val
        console.log(this.filter)
        this.initPage()
      },
      handleCurrentChange(val) {
        this.filter.pageNo = val
        // console.log(this.filter)
        this.initPage()
      },
      formatMethod(val) {
        if (val == 0)
          return '未通过'
        else if (val == 1)
          return '已通过'
      },
      showDetail(api) {
        GBFL.Cache.set('api', api)
        this.$router.push('/admin/apidetail')
      },
      pass(api) {
        api.api_verify_state = 1
      }

    }
  }
</script>
<style scope>
  .search-bar {
    margin-left: 10px;
    margin-top: 20px;
  }

  .api-table {
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
