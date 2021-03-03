<template>
  <el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12"><el-card class="box-card"> </el-card></el-col>
        <el-col :span="12"><el-card class="box-card"> </el-card></el-col>
      </el-row>
      <!-- echart图表 -->
      <el-card class="box-card echart-con">
        <!-- 使用keep-alive组件缓存非活动组件，可以保留状态，避免重新渲染，默认每次都会销毁非活动组件并重新创建 -->
        <!-- <keep-alive>
          <component :is="currentView"></component>
        </keep-alive> -->
        <ul
          class="el-carousel__indicators el-carousel__indicators--horizontal el-carousel__indicators--outside"
        >
          <li
            v-for="(item, index) in echart_list"
            :key="item"
            :class="{ 'is-active': index === isactive }"
            @click="changeView(index)"
            class="el-carousel__indicator el-carousel__indicator--horizontal"
          >
            <button class="el-carousel__button"><!----></button>
          </li>
        </ul>
      </el-card>
    </el-main>
    <!-- 最新动态 -->
    <el-aside width="30%">
      <el-card class="box-card">
        <div class="clearfix">
          <span>最新动态</span>
        </div>
        <timeLine></timeLine>
      </el-card>
    </el-aside>
  </el-container>
</template>
<style>
.el-row {
  height: 40%;
}
.el-col-12 {
  height: 100%;
}
.echart-con {
  height: 58%;
  margin-top: 1%;
}
</style>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "console",
  setup() {
    let isactive = ref<Number>(0);
    let echart_list = ref<Array<string>>(["bar", "pie", "lin"]);
    let changeView = (index: Number): void => {
      isactive.value = index;
    };
    return {
      isactive,
      echart_list,
      changeView,
    };
  },
});
</script>
