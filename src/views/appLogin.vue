<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">农产品商家管理系统</h2>
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入管理员账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 路由实例
const router = useRouter()
// 表单引用
const loginFormRef = ref(null)
// 登录表单数据
const loginForm = ref({
  username: '',
  password: ''
})
// 表单校验规则
const loginRules = ref({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 登录方法
const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      // 模拟登录（后续替换为真实接口）
      if (loginForm.value.username === 'admin' && loginForm.value.password === '123456') {
        // 存储token，让路由守卫识别已登录
        localStorage.setItem('token', 'mock_admin_token')
        ElMessage.success('登录成功')
        // 跳转到首页
        router.push('/home')
      } else {
        ElMessage.error('账号或密码错误')
      }
    }
  })
}
</script>

<style scoped>
/* 全局清除body默认margin（穿透样式） */
:global(body) {
  margin: 0;
  padding: 0;
}

.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 清除容器自身的padding/margin */
  margin: 0;
  padding: 0;
}

.login-card {
  width: 400px;
  /* 自定义el-card内边距，替代默认值 */
  padding: 20px !important;
  /* 清除card默认的margin */
  margin: 0 !important;
  border-radius: 8px;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: #1989fa;
  /* 清除标题默认margin */
  margin-top: 0;
}

.login-btn {
  width: 100%;
}

:deep(.el-form) {
  margin: 0 !important;
}
</style>
