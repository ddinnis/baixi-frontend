<template>
  <div class="app-container">
    <div class="table-container">
      <div class="operations">
        <el-form ref="form" :model="form" label-width="80px">
          <el-col :span="4">
            <el-form-item label="发信人">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="收信人" label-width="80px">
              <el-select v-model="form.region" placeholder="请选择收信人">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="日期范围">
              <el-date-picker
                v-model="form.startTime"
                type="date"
                style="width: 50%"
              />
              <el-date-picker
                v-model="form.endTime"
                type="date"
                style="width: 50%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <div class="checkbox">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="未审查" name="type" />
                <el-checkbox label="被冻结" name="type" />
                <el-checkbox label="不可见" name="type" />
              </el-checkbox-group>
            </div>
          </el-col>
        </el-form>
        <el-button type="primary" class="querybtn" @click="queryData"
          >查找</el-button
        >
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="日期时间" width="95">
          <template slot-scope="scope">
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发信人" width="95">
          <template slot-scope="scope">
            {{ scope.row.author }}
          </template>
        </el-table-column>
        <el-table-column label="收信人" width="95" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否读信" width="80" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isRead | isReadFilter">{{
              scope.row.isRead
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          class-name="status-col"
          label="信件/图片"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.content }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created_at"
          label="审查"
          width="100"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.isRead | isReadFilter"
              @click="clickHandler(scope.row.isRead)"
              >{{ scope.row.isRead }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="审查人" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审查时间" align="center" width="95">
          <template slot-scope="scope">
            <span>{{ scope.row.display_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审查备注" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created_at"
          label="信件状态"
          width="100"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.mailStatus !== '可见'">
              <el-tag>{{ scope.row.mailStatus }}</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created_at"
          label="通信状态"
          width="100"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.communicationStatus !== '正常'">
              <el-tag>{{ scope.row.communicationStatus }}</el-tag>
            </template>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="created_at"
          label="操作"
          width="100"
        >
          <el-button type="primary" @click="dialogVisible = true" size="small"
            >command</el-button
          >
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
    <div class="dialogCommands">
      <el-dialog title="操作" :visible.sync="dialogVisible" width="30%">
        <div class="btns">
          <el-button class="btn" type="primary" plain
            >此信收信人不可见</el-button
          >
          <el-button class="btn" type="primary" plain
            >撤销收信人不可见</el-button
          >
          <el-button class="btn" type="primary" plain>冻结双方的通信</el-button>
          <el-button class="btn" type="primary" plain>解冻双方的通信</el-button>
        </div>
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
    },
    isReadFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'gray'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      clickTimer: null,
      list: null,
      listLoading: true,
      totoalList: [],
      currentPage: 1,
      pageSize: 10,
      form: {
        name: '',
        region: '',
        startTime: '',
        endTime: '',
        type: []
      },
      dialogVisible: false
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
    queryData() {
      console.log('this.form', this.form)
    },
    clickHandler(data) {
      console.log('first', data)
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
<style type="sass" scoped>
.checkbox {
  width: 100%;
  height: 40.8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.operations {
  display: flex;
}

.btns {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dialogCommands {
  .el-button + .el-button {
    margin-left: 0;
  }
  .el-button {
    margin-bottom: 10px;
    width: 180px;
  }
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
