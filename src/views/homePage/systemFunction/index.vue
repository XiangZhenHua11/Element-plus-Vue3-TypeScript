<template>
  <el-container>
    <!-- 左侧树形菜单 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ $t("systemFunction.functionMenu") }}</span>
          <span>{{ formVisible }}</span>
        </div>
      </template>
      <el-aside>
        <functionTree></functionTree>
      </el-aside>
    </el-card>
    <el-card class="box-card">
      <!-- 表格 -->
      <functionTable :formVisible="formVisible"></functionTable>
    </el-card>
    <!-- form表单 -->
    <functionForm :formVisible="formVisible" ref="functionForm"></functionForm>
  </el-container>
</template>
<script lang="ts">
//功能目录-tree
//功能目录-tree
import functionTree from "@/components/homePage/systemFunction/tree.vue";
//功能目录-table
import functionTable from "@/components/homePage/systemFunction/table.vue";
import functionForm from "@/components/homePage/systemFunction/form.vue";
import { defineComponent, ref } from "vue";
import variables from "@/styles/variables.scss";
export default defineComponent({
  name: "systemFunction",
  components: {
    functionTree,
    functionTable,
    functionForm,
  },
  setup() {
    let formVisible = ref<boolean>(false);
    return {
      formVisible,
    };
  },
});
</script>
