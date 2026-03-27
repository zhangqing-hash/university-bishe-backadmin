<template>
  <el-card>
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="销售单编号">
        <el-input v-model="searchForm.orderNo" placeholder="请输入销售单编号" />
      </el-form-item>
      <el-form-item label="店铺名称">
        <el-input v-model="searchForm.shopName" placeholder="请输入店铺名称" />
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="searchForm.status" placeholder="请选择状态">
          <el-option label="待收款" value="pending" />
          <el-option label="已完成" value="success" />
          <el-option label="已取消" value="cancel" />
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input v-model="searchForm.customerName" placeholder="客户名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 订单列表 -->
    <el-table :data="orderList" border stripe>
      <el-table-column prop="id" label="ID" width="70" />
      <el-table-column prop="orderNo" label="销售单编号" min-width="160" />
      <el-table-column prop="settleNo" label="销售结算单号" min-width="160" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 'pending'" type="warning">待收款</el-tag>
          <el-tag v-if="scope.row.status === 'success'" type="success">已完成</el-tag>
          <el-tag v-if="scope.row.status === 'cancel'" type="danger">已取消</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="170" />
      <el-table-column prop="createBy" label="创建人" width="100" />
      <el-table-column prop="customerName" label="客户名称" width="110" />
      <el-table-column prop="settleAccount" label="结算账户" min-width="150" />
      <el-table-column prop="totalAmount" label="应收总额" width="100" />
      <el-table-column prop="discountAmount" label="抹零金额" width="100" />
      <el-table-column prop="debtAmount" label="欠款金额" width="100" />
      <el-table-column prop="realAmount" label="实收金额" width="100" />
      <el-table-column prop="receiveTime" label="收款时间" width="170" />
      <el-table-column prop="receiveBy" label="收款人" width="100" />
      <el-table-column prop="userAccount" label="用户账号" width="140" />
      <el-table-column prop="shopOwner" label="店铺注册人" width="110" />
      <el-table-column prop="shopName" label="店铺名称" min-width="150" />

      <!-- 操作 -->
      <el-table-column label="操作" width="120" fixed="right">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleDetail(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
      style="margin-top:20px; text-align:right" />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const searchForm = ref({
  orderNo: '',
  shopName: '',
  status: '',
  customerName: ''
})

const orderList = ref([
  {
    id: 1,
    orderNo: 'XS202603270001',
    settleNo: 'JS202603270001',
    status: 'success',
    createTime: '2026-03-27 10:20:33',
    createBy: '系统管理员',
    customerName: '张三',
    settleAccount: '中国农业银行 6228****8888',
    totalAmount: '1200.00',
    discountAmount: '0.00',
    debtAmount: '0.00',
    realAmount: '1200.00',
    receiveTime: '2026-03-27 10:25:10',
    receiveBy: '财务员',
    userAccount: 'zhangsan123',
    shopOwner: '李师傅',
    shopName: '雅安蒙顶山茶业合作社'
  },
  {
    id: 2,
    orderNo: 'XS202603270002',
    settleNo: 'JS202603270002',
    status: 'pending',
    createTime: '2026-03-27 11:10:22',
    createBy: '运营员',
    customerName: '李四',
    settleAccount: '中国建设银行 6217****6666',
    totalAmount: '860.50',
    discountAmount: '0.50',
    debtAmount: '860.00',
    realAmount: '0.00',
    receiveTime: '--',
    receiveBy: '--',
    userAccount: 'lisi456',
    shopOwner: '王老板',
    shopName: '宜宾柑橘种植基地'
  },
  {
    id: 3,
    orderNo: 'XS202603270003',
    settleNo: 'JS202603270003',
    status: 'cancel',
    createTime: '2026-03-27 09:30:15',
    createBy: '客服',
    customerName: '王五',
    settleAccount: '中国工商银行 6222****9999',
    totalAmount: '520.00',
    discountAmount: '0.00',
    debtAmount: '0.00',
    realAmount: '0.00',
    receiveTime: '--',
    receiveBy: '--',
    userAccount: 'wangwu789',
    shopOwner: '刘姐',
    shopName: '成都有机蔬菜基地'
  }
])

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(orderList.value.length)

const handleSearch = () => ElMessage.success('查询成功')
const resetSearch = () => {
  searchForm.value = { orderNo: '', shopName: '', status: '', customerName: '' }
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

const handleDetail = (row: any) => {
  ElMessage.info('查看订单：' + row.orderNo)
}
</script>

<style scoped>
.search-form {
  margin-bottom: 20px;
}
</style>
