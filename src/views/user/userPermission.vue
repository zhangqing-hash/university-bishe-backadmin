<template>
  <el-card>
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="角色名称">
        <el-input v-model="searchForm.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 操作 -->
    <div class="batch-operation">
      <el-button type="primary" @click="handleAdd">新增角色</el-button>
    </div>

    <!-- 角色列表 -->
    <el-table :data="roleList" border>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="desc" label="角色描述" />
      <el-table-column label="权限状态">
        <template #default="scope">
          <el-tag type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handlePermission(scope.row)">
            权限配置
          </el-button>
          <el-button type="warning" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination :current-page="1" :page-size="10" :total="total" layout="total, prev, pager, next"
      style="margin-top:20px; text-align:right" />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 搜索
const searchForm = ref({ name: '' })

// 角色数据（写死）
const roleList = ref([
  { id: 1, name: '超级管理员', desc: '拥有所有权限' },
  { id: 2, name: '运营管理员', desc: '负责商家、用户管理' },
  { id: 3, name: '普通用户', desc: '仅查看权限' }
])

const total = ref(roleList.value.length)

// 查询
const handleSearch = () => ElMessage.success('查询成功')
const resetSearch = () => searchForm.value.name = ''

// 新增
const handleAdd = () => ElMessage.info('打开新增角色')

// 权限配置（核心！）
const handlePermission = (row) => {
  ElMessage.success(`打开【${row.name}】权限配置页面`)
}

// 编辑
const handleEdit = (row) => ElMessage.info('编辑角色：' + row.name)

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm('确定删除？').then(() => {
    roleList.value = roleList.value.filter(x => x.id !== row.id)
    ElMessage.success('删除成功')
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
