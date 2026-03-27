<template>
  <el-card>
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="店铺名称">
        <el-input v-model="searchForm.shopName" placeholder="请输入店铺名称" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchForm.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="searchForm.status" placeholder="请选择状态">
          <el-option label="待审核" value="pending" />
          <el-option label="已通过" value="pass" />
          <el-option label="已拒绝" value="reject" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 入驻列表 -->
    <el-table :data="applyList" border stripe>
      <el-table-column prop="id" label="ID" width="70" />
      <el-table-column prop="shopName" label="店铺名称" min-width="150" />
      <el-table-column prop="phone" label="手机号" width="130" />

      <!-- 新增：申请人 + 身份证号 -->
      <el-table-column prop="userName" label="申请人" width="110" />
      <el-table-column prop="idCardNo" label="申请人身份证号" width="160" />

      <el-table-column prop="businessLicense" label="营业执照" width="100">
        <template #default="scope">
          <el-button type="text" @click="previewImage(scope.row.businessLicense)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="healthCert" label="健康证" width="100">
        <template #default="scope">
          <el-button type="text" @click="previewImage(scope.row.healthCert)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="idCardFront" label="身份证正面" width="110">
        <template #default="scope">
          <el-button type="text" @click="previewImage(scope.row.idCardFront)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="idCardBack" label="身份证反面" width="110">
        <template #default="scope">
          <el-button type="text" @click="previewImage(scope.row.idCardBack)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="申请时间" width="170" />
      <el-table-column prop="status" label="审核状态" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 'pending'" type="warning">待审核</el-tag>
          <el-tag v-if="scope.row.status === 'pass'" type="success">已通过</el-tag>
          <el-tag v-if="scope.row.status === 'reject'" type="danger">已拒绝</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleAudit(scope.row)">审核</el-button>
          <el-button type="info" size="small" @click="handleDetail(scope.row)">详情</el-button>
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
  shopName: '',
  phone: '',
  status: ''
})

// 商家入驻列表
const applyList = ref([
  {
    id: 1,
    shopName: '雅安蒙顶山茶业合作社',
    phone: '13800138000',
    userName: '李师傅',        // 新增
    idCardNo: '510101198512031111', // 新增
    password: '123456',
    confirmPassword: '123456',
    businessLicense: '营业执照_雅安蒙顶山.jpg',
    healthCert: '健康证_雅安蒙顶山.jpg',
    idCardFront: '身份证正面_李师傅.jpg',
    idCardBack: '身份证反面_李师傅.jpg',
    createTime: '2026-03-27 10:20:33',
    status: 'pending'
  },
  {
    id: 2,
    shopName: '宜宾柑橘种植基地',
    phone: '13900139000',
    userName: '王老板',        // 新增
    idCardNo: '510101198610222222', // 新增
    password: '654321',
    confirmPassword: '654321',
    businessLicense: '营业执照_宜宾柑橘.jpg',
    healthCert: '健康证_宜宾柑橘.jpg',
    idCardFront: '身份证正面_王老板.jpg',
    idCardBack: '身份证反面_王老板.jpg',
    createTime: '2026-03-27 11:10:22',
    status: 'pass'
  },
  {
    id: 3,
    shopName: '成都有机蔬菜基地',
    phone: '13700137000',
    userName: '刘姐',          // 新增
    idCardNo: '510101198803153333', // 新增
    password: 'abc123',
    confirmPassword: 'abc123',
    businessLicense: '营业执照_成都蔬菜.jpg',
    healthCert: '健康证_成都蔬菜.jpg',
    idCardFront: '身份证正面_刘姐.jpg',
    idCardBack: '身份证反面_刘姐.jpg',
    createTime: '2026-03-27 09:30:15',
    status: 'reject'
  }
])

// 分页参数
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(applyList.value.length)

// 查询
const handleSearch = () => ElMessage.success('查询成功')
const resetSearch = () => {
  searchForm.value = { shopName: '', phone: '', status: '' }
}

const handleSizeChange = (val: number) => pageSize.value = val
const handleCurrentChange = (val: number) => currentPage.value = val

// 预览图片
const previewImage = (imgName: string) => {
  ElMessage.info(`预览图片：${imgName}`)
}

// 审核
const handleAudit = (row: any) => {
  ElMessageBox.confirm(`是否审核【${row.shopName}】的入驻申请？`, '审核提示', {
    confirmButtonText: '通过',
    cancelButtonText: '拒绝',
    distinguishCancelAndClose: true
  }).then(() => {
    row.status = 'pass'
    ElMessage.success('审核通过')
  }).catch(() => {
    row.status = 'reject'
    ElMessage.error('已拒绝入驻')
  })
}

// 查看详情
const handleDetail = (row: any) => {
  ElMessage.info(`查看【${row.shopName}】的入驻详情`)
}
</script>

<style scoped>
.search-form {
  margin-bottom: 20px;
}
</style>
