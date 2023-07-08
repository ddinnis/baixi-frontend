<template>
  <div class="app-container">
    <div class="table-container">
      <el-button type="primary" class="add-btn" @click="addReviewer"
        >增加访查员</el-button
      >
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          align="center"
          label="开通日期"
          width="120"
          prop="openDate"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="访查队员openid" width="200">
          <template slot-scope="scope">
            {{ scope.row.content }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="访查队员ID" width="200">
          <template slot-scope="scope">
            {{ scope.row.content }}
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" prop="remark">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created_at"
          label="删除"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :page-count="10"
        layout="prev, pager, next"
        :total="totoalList.length"
      >
      </el-pagination>
    </div>
    <div class="dialog-container">
      <el-dialog
        title="添加访查队员"
        :visible.sync="dialogVisible"
        width="30%"
        center
      >
        <el-form
          label-position="left"
          label-width="120px"
          :model="addReviewerForm"
        >
          <el-form-item label="开通日期">
            <el-date-picker
              style="width: 150px"
              v-model="addReviewerForm.openDate"
              type="date"
              placeholder="选择日期"
              size="small"
              width="150"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="审查员openid">
            <el-input v-model="addReviewerForm.openID"></el-input>
          </el-form-item>
          <el-form-item label="审查员ID">
            <el-input v-model="addReviewerForm.ID"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="addReviewerForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="comfirmForm">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      permissionDeadline: '',
      openDate: '',
      totoalList: [],
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      addReviewerForm: {
        openDate: '',
        openID: '',
        ID: '',
        remark: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then((response) => {
        this.totoalList = response.data.items
        this.list = response.data.items.slice(0, 10)
        this.listLoading = false
      })
    },
    addReviewer() {
      this.dialogVisible = true
    },
    comfirmForm() {
      this.dialogVisible = false
      this.totoalList.push(this.addReviewerForm)
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.list.splice(index, 1)
    },
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`handleCurrentChange每页 ${val} 条`)
      this.currentPage = val
      this.list = this.totoalList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
    }
  }
}
</script>

<style lang="scss">
.add-btn {
  margin-bottom: 20px;
}
.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
