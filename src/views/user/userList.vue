<template>
  <el-card>
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="用户名">
        <el-input v-model="searchForm.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="searchForm.gender" placeholder="请选择性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchForm.status" placeholder="请选择状态">
          <el-option label="正常" value="normal" />
          <el-option label="禁用" value="disabled" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 操作按钮 -->
    <div class="batch-operation">
      <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
    </div>

    <!-- 用户列表 -->
    <el-table :data="userList" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="gender" label="性别" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="status" label="账号状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 'normal'" type="success">正常</el-tag>
          <el-tag v-if="scope.row.status === 'disabled'" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button type="warning" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
      style="margin-top: 20px; text-align: right" />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 搜索表单
const searchForm = ref({
  username: '',
  gender: '',
  status: ''
})

// 用户列表（写死模拟数据）
const userList = ref([
  { id: 1, username: 'zhangsan', nickname: '张三', gender: '男', phone: '13800138000', status: 'normal' },
  { id: 2, username: 'lisi', nickname: '李四', gender: '女', phone: '13900139000', status: 'normal' },
  { id: 3, username: 'wangwu', nickname: '王五', gender: '男', phone: '13700137000', status: 'disabled' },
  { id: 4, username: 'zhaoliu', nickname: '赵六', gender: '女', phone: '13600136000', status: 'normal' }
])

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(userList.value.length)

// 选中项
const selectedRows = ref([])

// 查询
const handleSearch = () => {
  ElMessage.success('查询成功')
}

// 重置
const resetSearch = () => {
  searchForm.value = { username: '', gender: '', status: '' }
}

// 分页
const handleSizeChange = (val: number) => {
  pageSize.value = val
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

// 多选
const handleSelectionChange = (val: any[]) => {
  selectedRows.value = val
}

// 编辑
const handleEdit = (row: any) => {
  ElMessage.info('编辑用户：' + row.username)
}

// 删除
const handleDelete = (row: any) => {
  ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
    type: 'warning'
  }).then(() => {
    userList.value = userList.value.filter(item => item.id !== row.id)
    total.value = userList.value.length
    ElMessage.success('删除成功')
  })
}

// 批量删除
const handleBatchDelete = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请选择用户')
    return
  }
  ElMessageBox.confirm('确定批量删除？', '警告', {
    type: 'warning'
  }).then(() => {
    const ids = selectedRows.value.map(item => item.id)
    userList.value = userList.value.filter(item => !ids.includes(item.id))
    total.value = userList.value.length
    ElMessage.success('批量删除成功')
  })
}
</script>

<style scoped>
.search-form {
  margin-bottom: 20px;
}

.batch-operation {
  margin-bottom: 10px;
}
</style>
