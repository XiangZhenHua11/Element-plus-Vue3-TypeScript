<template>
  <el-pagination
    v-if="!hidden"
    :background="background"
    :current-page="currentPage"
    :page-size="pageSize"
    :layout="layout"
    :page-sizes="pageSizes"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >
  </el-pagination>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default: [10, 20, 30, 50],
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    let currentPage = computed({
      get: () => ref(props.page),
      set: (val) => {
        context.emit("update:page", val);
      },
    });
    let pageSize = computed({
      get: () => ref(props.limit),
      set: (val) => {
        context.emit("update:limit", val);
      },
    });
    //size数量改变
    let handleSizeChange = (val: number) => {
      context.emit("pagination", { page: currentPage, limit: val });
    };
    //切换页数
    let handleCurrentChange = (val: number) => {
      context.emit("pagination", { page: val, limit: pageSize });
    };
    return {
      currentPage,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>
<style lang="scss" scoped></style>
