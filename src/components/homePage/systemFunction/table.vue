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
            @click="addForm_btn"
          ></el-button>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-edit"
            round
            plain
            @click="updateForm_btn"
          ></el-button>
          <el-button
            type="primary"
            size="medium"
            icon="el-icon-delete"
            round
            plain
            @click="deleteForm_btn"
          ></el-button>
        </el-button-group>
      </el-form>
    </el-header>
    <!-- 表格主体 -->
    <el-main>
      <el-table
        :data="listData"
        border
        lazy
        ref="tableRef"
        highlight-current-row
        row-key="guid"
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
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
  nextTick,
  inject,
} from "vue";
import pagination from "@/components/Pagination/index.vue";
import {
  getLazyMenuTable,
  getChildMenuTable,
  deleteForm,
} from "@/api/homePage/systemFunction";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "functionTable",
  components: {
    pagination,
  },
  setup() {
    //父组件修改表单信息
    let updateFormInfo = <any>inject("updateFormInfo");
    let tableRef = ref<HTMLElement | null>(null);
    //当前选中行
    let currentRow = reactive<any>(null);
    //点击行
    let currentChange = (row: any) => {
      currentRow = row;
    };
    //判断是否选中行
    let checkCurrentRrow = () => {
      if (!currentRow) {
        ElMessage({
          showClose: true,
          message: "您没有选中任何数据项,请选中后再操作!",
          type: "warning",
        });
        return false;
      }
      return true;
    };
    //表格参数
    let listData = ref<any>([]);
    let listLoading = ref<boolean>(true);
    let total = ref<number>(0);
    let listQuery = ref<any>({
      page: 1, //页数
      limit: 20, //行数
      parentGuid: "", //父节点guid
      liName: "", //功能名称
    });
    //初始化懒加载表格
    let initGrid = async () => {
      try {
        listLoading.value = true;
        let { data } = await getLazyMenuTable(listQuery.value);
        listData.value = data.gridData;
        total.value = data.total;
        nextTick(() => {
          if (!listQuery.value.parentGuid) {
            //默认展开第一个节点
            (document.getElementsByClassName(
              "el-table__expand-icon"
            )[0] as any).click();
          }
        });
      } finally {
        listLoading.value = false;
      }
    };
    //记录打开的节点
    let loadNodeMap = ref(new Map());
    //加载子节点
    let initChildGrid = async (tree: any, treeNode: any, resolve: any) => {
      //记录展开的节点
      loadNodeMap.value.set(tree.guid, { tree, treeNode, resolve });
      var { data } = await getChildMenuTable(tree.guid);
      resolve(data);
    };
    //刷新表格
    let refreshGrid = () => {
      //获取当前行主键
      var guid: string = (currentRow || {}).parentGuid;
      //判断子/父节点
      var rootNodeMap = loadNodeMap.value.get(guid);
      let { tree, treeNode, resolve } = rootNodeMap || {};
      //判断刷新表格/父节点
      !!rootNodeMap ? initChildGrid(tree, treeNode, resolve) : initGrid();
      //清空表格选择行
      currentRow = null;
    };
    onMounted(() => {
      initGrid();
    });
    //新增form
    let addForm_btn = (): void => {
      updateFormInfo(true);
    };
    //编辑form
    let updateForm_btn = (): void => {
      if (checkCurrentRrow()) {
        updateFormInfo(true, currentRow);
      }
    };
    //删除form
    let deleteForm_btn = async () => {
      if (checkCurrentRrow()) {
        await deleteForm(currentRow.id);
        ElMessage({
          message: "操作成功!",
          type: "success",
        });
        //刷新表格
        refreshGrid();
      }
    };
    return {
      tableRef,
      currentChange,
      listData,
      listLoading,
      total,
      listQuery,
      initChildGrid,
      initGrid,
      refreshGrid,
      addForm_btn,
      updateForm_btn,
      deleteForm_btn,
    };
  },
});
</script>
<style lang="scss" scoped></style>
