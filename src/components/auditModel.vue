<template>
  <!-- 商家审核抽屉 -->
  <el-drawer v-model="visible" title="商家入驻审核" direction="rtl" size="65%" :before-close="handleClose">
    <div class="audit-container">
      <!-- 左侧：商家信息 -->
      <div class="left-info">
        <el-card shadow="hover">
          <template #header>
            <span>商家基本信息</span>
          </template>
          <div class="info-item">
            <label>商家名称：</label>
            <span>雅安蒙顶山茶业合作社</span>
          </div>
          <div class="info-item">
            <label>联系人：</label>
            <span>张三</span>
          </div>
          <div class="info-item">
            <label>联系电话：</label>
            <span>13800138000</span>
          </div>
          <div class="info-item">
            <label>所属产地：</label>
            <span style="color:#14c9c9; font-weight:bold">四川省 - 雅安市 - 蒙顶山</span>
          </div>
          <div class="info-item">
            <label>主营产品：</label>
            <span>绿茶、红茶、乌龙茶</span>
          </div>
          <div class="info-item">
            <label>经营类型：</label>
            <span>农民专业合作社</span>
          </div>
          <div class="info-item">
            <label>申请时间：</label>
            <span>2026-03-26 14:30:22</span>
          </div>
          <div class="info-item">
            <label>当前状态：</label>
            <el-tag type="warning">待审核</el-tag>
          </div>
        </el-card>

        <el-card shadow="hover" style="margin-top:15px">
          <template #header>
            <span>资质证明材料</span>
          </template>
          <div style="padding:10px 0">
            <div class="file-item">营业执照.jpg</div>
            <div class="file-item">食品经营许可证.jpg</div>
            <div class="file-item">产地资质证明.jpg</div>
          </div>
        </el-card>
      </div>

      <!-- 右侧：审核操作 + 审核记录 -->
      <div class="right-operate">
        <el-card shadow="hover">
          <template #header>
            <span>审核操作</span>
          </template>
          <div style="margin-bottom:15px">
            <label>当前审核状态：</label>
            <el-tag type="warning">待审核</el-tag>
          </div>

          <el-form label-width="80px">
            <el-form-item label="审核意见">
              <el-input v-model="auditRemark" type="textarea" rows="4" placeholder="请填写审核意见（拒绝时必填）" />
            </el-form-item>

            <el-form-item>
              <el-button type="success" @click="handlePass">
                审核通过
              </el-button>
              <el-button type="danger" @click="handleReject">
                审核拒绝
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 审核历史记录 -->
        <el-card shadow="hover" style="margin-top:15px">
          <template #header>
            <span>审核历史记录</span>
          </template>
          <el-timeline>
            <el-timeline-item timestamp="2026-03-26 14:35:10" type="primary">
              提交入驻申请
            </el-timeline-item>
          </el-timeline>
          <div style="text-align:center; color:#999; margin-top:10px">
            暂无审核记录
          </div>
        </el-card>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { ElMessage } from 'element-plus'

const visible = ref(false)
const auditRemark = ref('')
const currentRow = ref({}) // 当前审核的商家

// 打开弹窗（供父组件调用）
const open = (row) => {
  currentRow.value = row
  visible.value = true
}

// 关闭
const handleClose = (done) => {
  done()
}

// 审核通过
const handlePass = () => {
  currentRow.value.status = 'normal'
  visible.value = false
  ElMessage.success('审核成功')
}

// 审核拒绝
const handleReject = () => {
  if (!auditRemark.value) {
    ElMessage.warning('请填写拒绝原因！')
    return
  }
  currentRow.value.status = 'disabled'
  visible.value = false
  ElMessage.error('已拒绝')
}

// 暴露方法给父组件调用
defineExpose({ open })
</script>

<style scoped>
.audit-container {
  display: flex;
  gap: 15px;
}

.left-info {
  width: 50%;
}

.right-operate {
  width: 50%;
}

.info-item {
  padding: 8px 0;
  font-size: 14px;
}

.info-item label {
  font-weight: bold;
  color: #333;
  width: 110px;
  display: inline-block;
}

.file-item {
  padding: 6px 12px;
  background: #f5f5f5;
  margin-bottom: 8px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
