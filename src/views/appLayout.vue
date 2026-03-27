<template>
  <el-container style="height: 100vh;">
    <!-- 侧边栏 -->
    <el-aside width="200px" style="background-color: #2e3b4e;">
      <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#2e3b4e" text-color="#fff"
        active-text-color="#ffd04b" router>
        <el-menu-item index="/home">
          <el-icon>
            <House />
          </el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <Shop />
            </el-icon>
            <span>商家管理</span>
          </template>
          <el-menu-item index="/merchant/list">商家列表</el-menu-item>
          <el-menu-item index="/merchant/audit">入驻审核</el-menu-item>
          <el-menu-item index="/merchant/statistics">数据统计</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <User />
            </el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/user/list">用户列表</el-menu-item>
          <el-menu-item index="/user/permission">权限配置</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <List />
            </el-icon>
            <span>订单管理</span>
          </template>
          <el-menu-item index="/shop/list">销售单管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon>
              <Setting />
            </el-icon>
            <span>系统设置</span>
          </template>
          <el-menu-item index="/system/config">基础配置</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <!-- 主内容区 -->
    <el-container>
      <!-- 顶部导航 -->
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>超级管理员</span>
      </el-header>

      <!-- 页面内容 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// 引入 Element Plus 图标
import { House, Shop, User, Setting, List } from '@element-plus/icons-vue'

const router = useRouter()

// 退出登录
const handleLogout = () => {
  ElMessage.success('退出成功')
  router.push('/login')
}
</script>

<style scoped>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #e6e6e6;
}

.el-aside {
  color: #333;
}
</style>
