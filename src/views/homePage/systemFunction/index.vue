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
      <el-container>
        <!-- 头部工具栏 -->
        <el-header class="toolbar">
          <el-form :inline="true">
            <el-form-item :label="$t('systemFunction.formArr.liName')">
              <el-input></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="initGrid"
                circle
              ></el-button>
            </el-form-item>
            <el-button-group>
              <el-button
                type="primary"
                size="medium"
                icon="el-icon-plus"
                round
                plain
                @click="addForm"
              ></el-button>
              <el-button
                type="primary"
                size="medium"
                icon="el-icon-edit"
                round
                plain
                @click="updateForm"
              ></el-button>
              <el-button
                type="primary"
                size="medium"
                icon="el-icon-delete"
                round
                plain
                @click="deleteForm"
              ></el-button>
            </el-button-group>
          </el-form>
        </el-header>
        <!-- 表格主体 -->
        <el-main>
          <functionTable></functionTable>
        </el-main>
      </el-container>
    </el-card>
  </el-container>
</template>
<script lang="ts">
//功能目录-tree
import functionTree from "@/components/homePage/systemFunction/functionTree.vue";
//功能目录-table
import functionTable from "@/components/homePage/systemFunction/functionTable.vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "systemFunction",
  components: {
    functionTree,
    functionTable,
  },
});
</script>
