<template>
  <el-card>
    <h2>平台运营数据概览</h2>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-statistic title="总商家数" :value="128" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="总用户数" :value="5680" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="今日销售额" :value="12580" suffix="元" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="待审核商家" :value="8" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
// 暂时空着，后续加 ECharts 图表
</script>
