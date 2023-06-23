<template>
  <div class="app-container">
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
      <el-col :span="8">
        <el-form-item label="">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="未审查" name="type" />
            <el-checkbox label="被冻结" name="type" />
            <el-checkbox label="不可见" name="type" />
          </el-checkbox-group>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="btn">
      <el-button type="primary" class="querybtn">查找</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="到期时间" width="95">
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
          {{ scope.row.isRead }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="信件/图片"
        width="200"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="审查"
        width="100"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
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
          <span>{{ scope.row.Remark }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="信件状态"
        width="100"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="通信状态"
        width="100"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="操作"
        width="200"
      />
    </el-table>
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
      form: {
        name: '',
        region: '',
        startTime: '',
        endTime: '',
        type: []
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
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
<style type="sass" scoped>
.btn {
  width: 100%;
  margin-bottom: 22px;
  display: flex;
  justify-content: end;
}
</style>
