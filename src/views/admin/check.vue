<template>
  <div>
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" v-model="filter.key" placeholder="请输入关键字" @keyup.enter.native="initPage"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="initPage">搜索</el-button>
      <el-select style="width: 150px;margin-left: 20px;" v-model="tableType" class="filter-item" placeholder="请选择" @change="initPage">
        <el-option label="服务消费者" value="0"/>
        <el-option label="服务提供商" value="1"/>
      </el-select>
    </div>
    <el-table
      v-if="tableType=='1'"
      border
      :data="spTable"
      class="user-table">
      <el-table-column
        prop="sp_name"
        label="提供商用户名">
      </el-table-column>
      <el-table-column
        prop="sp_email"
        label="提供商邮箱">
      </el-table-column>
      <el-table-column
        prop="sp_representative_id"
        label="提供商法人身份证">
      </el-table-column>
      <el-table-column
        prop="sp_description"
        label="提供商描述">
      </el-table-column>
      <el-table-column
        prop="sp_state"
        width="150px"
        align="center"
        label="提供商账户状态"
        :filters="[{ text: '未审核', value: 0 }, { text: '已通过', value: 1 }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.sp_state === 0 ? 'warning' : 'success'"
            close-transition>{{formatTag(scope.row.sp_state)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        label="操作">
        <template slot-scope="scope">
          <el-dropdown trigger="click" split-button type="primary" size="small">
            操作            
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" type="info">详情</el-button>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <el-button size="mini" type="success">通过</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-if="tableType=='0'"
      border
      :data="userTable"
      class="user-table">
      <el-table-column
        prop="consumer_name"
        label="消费者用户名">
      </el-table-column>
      <el-table-column
        prop="consumer_email"
        label="消费者邮箱">
      </el-table-column>
      <el-table-column
        prop="consumer_card_id"
        label="消费者身份证">
      </el-table-column>
      <el-table-column
        prop="consumer_intro"
        label="消费者描述">
      </el-table-column>
      <el-table-column
        prop="consumer_state"
        width="150"
        align="center"
        label="消费者账户状态"
        :filters="[{ text: '未审核', value: 0 }, { text: '已通过', value: 1 }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.consumer_state === 0 ? 'warning' : 'success'"
            close-transition>{{formatTag(scope.row.consumer_state)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        label="操作">
        <template slot-scope="scope">
          <el-dropdown trigger="click" split-button type="primary" size="small">
            操作            
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button size="mini" type="info">详情</el-button>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <el-button size="mini" type="success">通过</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
</template>
<script>
import BizService from '../../services/biz-service.js'
var service = new BizService()
export default {
  data () {
    return {
      tableType: '0',
      spTable: [],
      userTable: [],
      tableDataLength: 0,
      filter: {
        pageSize: 10,
        pageNo: 1,
        key: ''
      }
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      var params = this.filter
      params.role = parseInt(this.tableType)
      service.getUserPageList (params,(isOk, data) => {
        if (this.tableType == '1') {
          this.spTable = data.data.data
        } else if (this.tableType == '0') {
          this.userTable = data.data.data
        }
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
    },
    filterTag(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    formatTag(val) {
      return val == 1 ? '已通过' : '未审核'
    }
  }
}
</script>
<style scope>
  .filter-container {
    margin-left: 10px;
		margin-top: 20px;
	}
  .user-table {
    margin-left: 10px;
    width: 100%;
	}
</style>

