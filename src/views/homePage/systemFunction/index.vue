<template>
  <el-container>
    <!-- 左侧树形菜单 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ $t("systemFunction.functionMenu") }}</span>
        </div>
      </template>
      <el-aside>
        <functionTree></functionTree>
      </el-aside>
    </el-card>
    <el-card class="box-card">
      <!-- 表格 -->
      <functionTable ref="functionTableRef"></functionTable>
    </el-card>
    <!-- form表单 -->
    <functionForm ref="functionFormRef"></functionForm>
  </el-container>
</template>
<script lang="ts">
// 左侧树形菜单
import functionTree from "@/components/homePage/systemFunction/tree.vue";
// 表格
import functionTable from "@/components/homePage/systemFunction/table.vue";
// form表单
import functionForm from "@/components/homePage/systemFunction/form.vue";
import { defineComponent, ref, provide } from "vue";
export default defineComponent({
  name: "systemFunction",
  components: {
    functionTree,
    functionTable,
    functionForm,
  },
  setup() {
    let functionFormRef = ref<HTMLElement | null>(null);
    let functionTableRef = ref<HTMLElement | null>(null);
    //修改表单信息
    let updateFormInfo = (show: boolean, formData: any) => {
      //修改表单显示
      (functionFormRef.value as any).show = show;
      //修改表单数据源
      (functionFormRef.value as any).formData = Object.assign(
        {},
        formData || {}
      );
    };
    provide("updateFormInfo", updateFormInfo);
    //表格刷新方法
    let refreshGrid = (guid: string) => {
      if (!!guid) {
        (functionTableRef.value as any).listQuery.parentGuid = guid;
      }
      (functionTableRef.value as any).refreshGrid();
    };
    provide("refreshGrid", refreshGrid);
    return { functionFormRef, functionTableRef };
  },
});
</script>
