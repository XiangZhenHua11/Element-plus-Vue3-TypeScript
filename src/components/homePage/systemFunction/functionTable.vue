<template>
  <el-table
    :data="listData"
    row-key="id"
    border
    lazy
    ref="tableRef"
    highlight-current-row
    @current-change="currentChange"
    v-loading="listLoading"
    :load="initChildGrid"
    :tree-props="{ children: 'children', hasChildren: 'isChild' }"
    height="85%"
  >
    <el-table-column
      prop="liName"
      :label="$t('systemFunction.formArr.liName')"
      sortable
      width="180"
    />
    <el-table-column
      prop="liDataName"
      :label="$t('systemFunction.formArr.liDataName')"
      sortable
      width="180"
    />
    <el-table-column
      prop="element_liHref"
      :label="$t('systemFunction.formArr.liHref')"
      width="300"
    />
    <el-table-column
      prop="liIcon"
      :label="$t('systemFunction.formArr.liIcon')"
      width="100"
      align="center"
    >
      <template #default="scope">
        <i :class="scope.row.liIcon" />
      </template>
    </el-table-column>
    <el-table-column
      prop="isChild"
      :label="$t('systemFunction.formArr.isChild')"
      width="100"
      align="center"
    >
      <template #default="scope">
        <el-switch
          v-model="scope.row.isChild"
          active-color="#13ce66"
          inactive-color="#ff4949"
          disabled
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="isEnable"
      :label="$t('systemFunction.formArr.isEnable')"
      width="100"
      align="center"
    >
      <template #default="scope">
        <el-switch
          v-model="scope.row.isEnable"
          active-color="#13ce66"
          inactive-color="#ff4949"
          disabled
        />
      </template>
    </el-table-column>
    <el-table-column
      prop="remark"
      :label="$t('systemFunction.formArr.remark')"
    />
  </el-table>
  <pagination
    :total="total"
    :page="listQuery.page"
    :limit="listQuery.limit"
    @pagination="initGrid"
  />
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from "vue";
import pagination from "@/components/Pagination/index.vue";
import {
  getLazyMenuTable,
  getChildMenuTable,
} from "@/api/homePage/systemFunction";
import store from "@/store";

export default defineComponent({
  name: "functionTable",
  components: {
    pagination,
  },
  setup() {
    let listData = ref<any>([]);
    let listLoading = ref<boolean>(true);
    let total = ref<number>(0);
    let tableRef = ref<HTMLElement | null>(null);
    let loadNodeMap = ref(new Map());
    let listQuery = ref<any>({
      page: 1, //页数
      limit: 20, //行数
      parentGuid: "", //父节点guid
      liName: "", //功能名称
    });
    let currentRow = reactive<any>(null);
    //点击行
    let currentChange = (row: any) => {
      currentRow.values = row;
    };
    //初始化懒加载表格
    let initGrid = async () => {
      listLoading.value = true;
      let { data } = await getLazyMenuTable(listQuery.value);
      listData.value = data.gridData;
      total.value = data.total;
      listLoading.value = false;
      //清空表格选择行
      // tableRef.value.setCurrentRow();
    };
    initGrid();
    //加载子节点
    let initChildGrid = async (tree: any, treeNode: any, resolve: any) => {
      //记录展开的节点
      loadNodeMap.value.set(tree.guid, { tree, treeNode, resolve });
      var { data } = await getChildMenuTable(tree.guid);
      resolve(data);
    };
    return {
      listData,
      listLoading,
      total,
      listQuery,
      initChildGrid,
      initGrid,
      tableRef,
      currentChange,
    };
  },
});
</script>
<style lang="scss" scoped></style>
