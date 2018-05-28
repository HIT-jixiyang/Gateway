<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      
      <el-input v-model="filter.app_id" style="width: 200px;" class="filter-item" placeholder="请输入appId"></el-input>
      <el-input v-model="filter.api_name" style="width: 200px;" class="filter-item" placeholder="请输入api名称"></el-input>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="initPage">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="app_id"
        label="appId"
        width="300">
      </el-table-column>
      <el-table-column
        prop="api_name"
        label="api名称">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="请求时间">
        <template slot-scope="scope">
          <span>{{scope.row.create_time | parseTime()}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="request_time"
        label="请求耗时(秒)">
      </el-table-column>
      <el-table-column
        prop="response_code"
        label="请求状态码">
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
      style="float:right; margin-top:10px">
    </el-pagination>
  </div>
</template>

<script>
import BizService from '../../services/biz-service.js'
import { parseTime } from '@/utils'
var service = new BizService()
export default {
  data() {
    return {
      filter: {
        api_name: '',
        app_id: null,
        begintime: null,
        endtime: null,
        pageSize: 10,
        pageNo: 1
      },
      date: [],
      tableDataLength: 1,
      tableData: []
    };
  },
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      if (this.date.length > 0) {
        GBFL.Util.openDateFormat()
        this.filter.begintime = this.date[0].format('yyyy-MM-dd hh:mm:ss')
        this.filter.endtime = this.date[1].format('yyyy-MM-dd hh:mm:ss')
        GBFL.Util.closeDateFormat()
      }
      if (this.filter.app_id == null || this.filter.app_id == '')
        this.filter.app_id = null
      var params = this.filter
      service.getBillList(params,(isOk, data) => {
        this.tableData = data.data.data
        this.tableDataLength = data.data.total
      })
    },
    handleSizeChange (val) {
      this.filter.pageSize = val
      this.initPage()
    },
    handleCurrentChange (val) {
      this.filter.pageNo = val
      this.initPage()
    }
  }
}
</script>
<style scoped>
  .filter-item{
    margin-bottom: 2px;
  }
</style>
