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
      <functionTable v-model:formVisible="formVisible"></functionTable>
    </el-card>
    <!-- form表单 -->
    <functionForm
      v-model:formVisible="formVisible"
      ref="functionForm"
    ></functionForm>
  </el-container>
</template>
<script lang="ts">
// 左侧树形菜单
import functionTree from "@/components/homePage/systemFunction/tree.vue";
// 表格
import functionTable from "@/components/homePage/systemFunction/table.vue";
// form表单
import functionForm from "@/components/homePage/systemFunction/form.vue";
import { defineComponent, ref } from "vue";
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
