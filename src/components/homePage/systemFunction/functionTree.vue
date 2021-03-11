<template>
  <el-tree
    :props="defaultProps"
    highlight-current
    :load="initLazyTree"
    :show-checkbox="showCheckBox"
    lazy
    @node-click="handleNodeClick"
    :expand-on-click-node="false"
  >
    <template #default="{ data }">
      <span class="custom-tree-node">
        <span>
          <i :class="data.liIcon"></i>
          {{ data[field] }}
        </span>
      </span>
    </template>
  </el-tree>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { getLazyTreeData } from "@/api/homePage/systemFunction";
import store from "@/store";

export default defineComponent({
  name: "functionTree",
  props: {
    //是否多选
    showCheckBox: { type: Boolean, default: false },
  },
  setup() {
    //获取当前语言后缀
    let field = computed(() => {
      return "liName" + store.getters.language.suffix;
    });
    let defaultProps = ref({
      children: "children",
      isLeaf: "isChild",
    });
    let initLazyTree = async (node: any, resolve: any) => {
      //节点guid
      let guid = !node.data ? "" : node.data.guid;
      const { data } = await getLazyTreeData(guid);
      data.map((item: any) => {
        //isLeaf false-有子节点 true-无子节点
        item.isChild = !item.isChild;
        return item;
      });
      resolve(data);
    };
    let handleNodeClick = (node: any): void => {
      
    };
    return {
      initLazyTree,
      defaultProps,
      handleNodeClick,
      field,
    };
  },
});
</script>
<style lang="scss" scoped></style>
