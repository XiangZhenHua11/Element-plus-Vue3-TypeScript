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
      <functionTable ref="tableRef"></functionTable>
    </el-card>
    <!-- form表单 -->
    <functionForm ref="functionForm"></functionForm>
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
    let formVisible = ref<boolean>(false);
    let tableRef = ref<HTMLElement | null>(null);
    //修改表单显示隐藏
    let updateFormVisible = (value: boolean) => {
      formVisible.value = value;
    };
    provide("formVisible", formVisible);
    provide("updateFormVisible", updateFormVisible);
    //表格刷新方法
    let refreshGrid = (guid: string) => {
      (tableRef.value as any).listQuery.parentGuid = guid;
      (tableRef.value as any).refreshGrid();
    };
    provide("refreshGrid", refreshGrid);
    return { formVisible, tableRef };
  },
});
</script>
