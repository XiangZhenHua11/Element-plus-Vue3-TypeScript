<template>
  <el-container>
    <!-- 头部工具栏 -->
    <el-header class="toolbar">
      <el-form :inline="true">
        <el-form-item :label="$t('systemFunction.form.liName')">
          <el-input v-model="listQuery.liName"></el-input>
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
          :label="$t('systemFunction.form.liName')"
          sortable
          width="180"
        />
        <el-table-column
          prop="liDataName"
          :label="$t('systemFunction.form.liDataName')"
          sortable
          width="180"
        />
        <el-table-column
          prop="element_liHref"
          :label="$t('systemFunction.form.liHref')"
          width="300"
        />
        <el-table-column
          prop="liIcon"
          :label="$t('systemFunction.form.liIcon')"
          width="100"
          align="center"
        >
          <template #default="scope">
            <i :class="scope.row.liIcon" />
          </template>
        </el-table-column>
        <el-table-column
          prop="isChild"
          :label="$t('systemFunction.form.isChild')"
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
          :label="$t('systemFunction.form.isEnable')"
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
          :label="$t('systemFunction.form.remark')"
        />
      </el-table>
      <pagination
        :total="total"
        :page="listQuery.page"
        :limit="listQuery.limit"
        @pagination="initGrid"
      />
    </el-main>
  </el-container>
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
  props: {
    //表单显示状态
    formVisible: { type: Boolean, default: false },
    key: String,
  },
  // emits: {
  //   updateFormVisible: (payload: any) => {
  //     return payload.type === "close";
  //   },
  // },
  setup(props, context) {
    let show = ref(props.formVisible);
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
    //新增form
    let addForm = (): void => {
      context.emit("update:formVisible", true);
    };
    //编辑form
    let updateForm = (): void => {
      debugger;
      context.emit("update:formVisible", true);
    };
    //删除form
    let deleteForm = (): void => {
      debugger;
      context.emit("update:formVisible", true);
    };
    return {
      listData,
      listLoading,
      total,
      listQuery,
      initChildGrid,
      initGrid,
      addForm,
      updateForm,
      deleteForm,
      tableRef,
      currentChange,
      show,
    };
  },
});
</script>
<style lang="scss" scoped></style>
