<template>
  <el-card>
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="商家名称">
        <el-input v-model="searchForm.name" placeholder="请输入商家名称" />
      </el-form-item>
      <el-form-item label="产地">
        <el-select v-model="searchForm.address" placeholder="请选择产地">
          <el-option label="四川宜宾" value="宜宾" />
          <el-option label="四川雅安" value="雅安" />
          <el-option label="四川成都" value="成都" />
        </el-select>
      </el-form-item>
      <el-form-item label="经营状态">
        <el-select v-model="searchForm.status" placeholder="请选择状态">
          <el-option label="正常" value="normal" />
          <el-option label="待审核" value="pending" />
          <el-option label="禁用" value="disabled" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 批量操作 -->
    <div class="batch-operation">
      <el-button type="primary" @click="handleBatchAudit">批量审核</el-button>
      <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
    </div>

    <!-- 商家列表 -->
    <el-table :data="merchantList" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="商家名称" />
      <el-table-column prop="address" label="产地" />
      <el-table-column prop="productType" label="主营产品" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 'pending'" type="warning">待审核</el-tag>
          <el-tag v-if="scope.row.status === 'normal'" type="success">正常</el-tag>
          <el-tag v-if="scope.row.status === 'disabled'" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleAudit(scope.row)">审核</el-button>
          <el-button type="warning" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
      style="margin-top: 20px; text-align: right;">
    </el-pagination>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 搜索表单
const searchForm = ref({
  name: '',
  address: '',
  status: ''
})

// 商家列表数据（模拟）
const merchantList = ref([
  { id: 1, name: '宜宾柑橘合作社', address: '宜宾', productType: '柑橘', status: 'normal' },
  { id: 2, name: '雅安蒙顶山茶农', address: '雅安', productType: '茶叶', status: 'pending' },
  { id: 3, name: '成都有机蔬菜基地', address: '成都', productType: '蔬菜', status: 'normal' }
])

// 分页参数
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(merchantList.value.length)

// 选中的行
const selectedRows = ref([])

// 搜索
const handleSearch = () => {
  // 后续替换为真实接口查询
  ElMessage.info('查询成功')
}

// 重置搜索
const resetSearch = () => {
  searchForm.value = {
    name: '',
    address: '',
    status: ''
  }
}

// 分页大小改变
const handleSizeChange = (val) => {
  pageSize.value = val
}

// 当前页改变
const handleCurrentChange = (val) => {
  currentPage.value = val
}

// 选中行改变
const handleSelectionChange = (val) => {
  selectedRows.value = val
}

// 审核
const handleAudit = (row) => {
  ElMessageBox.confirm('是否审核通过该商家？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(() => {
    row.status = 'normal'
    ElMessage.success('审核通过')
  })
}

// 编辑
const handleEdit = (row) => {
  ElMessage.info(`编辑商家：${row.name}`)
  // 后续打开编辑弹窗
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm('是否删除该商家？', '警告', {
    type: 'warning'
  }).then(() => {
    merchantList.value = merchantList.value.filter(item => item.id !== row.id)
    total.value = merchantList.value.length
    ElMessage.success('删除成功')
  })
}

// 批量审核
const handleBatchAudit = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请选择要审核的商家')
    return
  }
  selectedRows.value.forEach(row => {
    row.status = 'normal'
  })
  ElMessage.success(`批量审核通过 ${selectedRows.value.length} 个商家`)
}

// 批量删除
const handleBatchDelete = () => {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请选择要删除的商家')
    return
  }
  ElMessageBox.confirm('是否批量删除选中的商家？', '警告', {
    type: 'warning'
  }).then(() => {
    const ids = selectedRows.value.map(item => item.id)
    merchantList.value = merchantList.value.filter(item => !ids.includes(item.id))
    total.value = merchantList.value.length
    ElMessage.success(`批量删除 ${selectedRows.value.length} 个商家`)
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
