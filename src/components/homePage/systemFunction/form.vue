<template>
  <el-dialog
    :visible="visible"
    :show="show"
    :title="系统功能"
    @close="onClose()"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-col :span="12">
        <el-form-item label="编号" prop="liDataName">
          <el-input
            v-model="form.liDataName"
            clearable
            placeholder="请输入编号"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="名称" prop="liName">
          <el-input
            v-model="form.liName"
            clearable
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="上级">
          <treeselect
            :options="treeDatas"
            v-model="form.parentGuid"
            :searchable="true"
            :load-options="loadOptions"
            :auto-load-root-options="false"
            placeholder="请选择上级节点"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="图标" prop="liIcon">
          <e-icon-picker v-model="form.liIcon" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="地址">
          <el-input
            v-model="form.element_liHref"
            clearable
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="排序号">
          <el-input
            v-model="form.orderNum"
            clearable
            placeholder="请输入排序号"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="有效">
          <el-switch
            v-model="form.isEnable"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="子节点">
          <el-switch
            v-model="form.isChild"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="备注">
          <el-input
            type="textarea"
            v-model="form.remark"
            :autosize="{ minRows: 2 }"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-form>

    <!-- 底部按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { saveForm } from "@/api/homePage/systemFunction";
import pagination from "@/components/Pagination/index.vue";
import store from "@/store";

export default defineComponent({
  name: "functionForm",
  components: {
    pagination,
  },
  props: {
    formVisible: { type: Boolean, default: false },
  },
  setup(props, context) {
    let show = ref(props.formVisible);
    let onClose = (): void => {
      context.emit("update:show", false);
    };
    let onSave = (): void => {
      context.emit("update:show", false);
    };
    return {
      show,
      onClose,
      onSave,
    };
  },
});
</script>
