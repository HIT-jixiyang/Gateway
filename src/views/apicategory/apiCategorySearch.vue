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
        <el-button class="filter-item" type="primary" style="float:right; margin-right:10px" icon="el-icon-edit" @click="addCategory">新增</el-button>
      </div>
    </div>
    <div class="api-table">
      <el-table
        border
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="api_category_name"
          label="api名称">
        </el-table-column>
        <el-table-column
            prop="api_category_total_times"
            label="总调用次数">
        </el-table-column>
        <el-table-column
            label="记账方式">
            <template slot-scope="scope">
              {{formatMethod(scope.row.api_category_bill_type)}}
            </template>
        </el-table-column>
        <el-table-column
            label="服务评价星级">
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.api_category_comment"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
              </el-rate>
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="100px">
          <template slot-scope="scope">
            <el-button type="info" size="mini" @click="showDetail(scope.row)">详情</el-button>
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
        type: 'api_category_name',
        value: null
      },
      options: [{
        value: 'api_category_name',
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
      params[this.filter.type] = this.filter.value
      service.getApiCategoryPageList (params,(isOk, data) => {
        console.log(data)
        console.log(isOk)
        this.tableData = data.data.data
        this.tableDataLength = data.data.total
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
    formatMethod (val) {
      if (val == 0)
            return '按照访问次数计费'
      else if (val == 1)
          return '按流量计费'
    },
    showDetail (apiCategory) {
      GBFL.Cache.set('apiCategory', apiCategory)
      this.$router.push('/apicategory/detail')
    },
    addCategory () {
      this.$router.push('/apicategory/add')
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