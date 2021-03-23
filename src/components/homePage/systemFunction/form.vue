<template>
  <el-dialog
    v-model="show"
    :title="$t('systemFunction.name')"
    @close="onClose()"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-col :span="12">
        <el-form-item
          :label="$t('systemFunction.form.liDataName')"
          prop="liDataName"
        >
          <el-input
            v-model="form.liDataName"
            clearable
            :placeholder="
              $t('common.enter') + $t('systemFunction.form.liDataName')
            "
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('systemFunction.form.liName')" prop="liName">
          <el-input
            v-model="form.liName"
            clearable
            :placeholder="$t('common.enter') + $t('systemFunction.form.liName')"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('systemFunction.form.parentGuid')">
          <el-input
            v-model="form.parentGuid"
            clearable
            :placeholder="
              $t('common.select') + $t('systemFunction.form.parentGuid')
            "
          ></el-input>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="12">
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
      </el-col> -->
      <!-- <el-col :span="12">
        <el-form-item label="图标" prop="liIcon">
          <e-icon-picker v-model="form.liIcon" />
        </el-form-item>
      </el-col> -->
      <el-col :span="12">
        <el-form-item :label="$t('systemFunction.form.liIcon')" prop="liIcon">
          <el-input v-model="form.liIcon" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('systemFunction.form.liHref')">
          <el-input
            v-model="form.element_liHref"
            clearable
            :placeholder="$t('common.enter') + $t('systemFunction.form.liHref')"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('systemFunction.form.orderNum')">
          <el-input
            v-model="form.orderNum"
            clearable
            :placeholder="
              $t('common.enter') + $t('systemFunction.form.orderNum')
            "
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('systemFunction.form.isEnable')">
          <el-switch
            v-model="form.isEnable"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('systemFunction.form.isChild')">
          <el-switch
            v-model="form.isChild"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('systemFunction.form.remark')">
          <el-input
            type="textarea"
            v-model="form.remark"
            :autosize="{ minRows: 2 }"
            :placeholder="$t('common.enter') + $t('systemFunction.form.remark')"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-form>

    <!-- 底部按钮 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">{{ $t("common.cancel") }}</el-button>
        <el-button type="primary" @click="onSave">{{
          $t("common.define")
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from "vue";
import { saveForm } from "@/api/homePage/systemFunction";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "functionForm",
  props: {
    formVisible: { type: Boolean, default: true },
  },
  setup(props, context) {
    let { t } = useI18n();
    let form = ref({
      liDataName: "",
      liName: "",
      parentGuid: "",
      liIcon: "",
      element_liHref: "",
      orderNum: 0,
      isEnable: true,
      isChild: false,
      remark: "",
      id: "",
    });
    let show = ref(props.formVisible);
    //监听路由, 记录路径;
    watch(
      () => props.formVisible,
      () => {
        show.value = props.formVisible;
      },
      {
        immediate: true,
      }
    );
    //验证账号
    let validator_required = (rule: any, value: string, callback: any) => {
      debugger;
      if (!value) {
        return callback(new Error(t("common.enter") + t("login." + rule.feid)));
      }
      return callback();
    };
    //登录验证规则
    let rules = reactive({
      liDataName: [
        {
          validator: validator_required,
          trigger: "change",
        },
      ],
      liName: [
        {
          validator: validator_required,
          trigger: "change",
        },
      ],
      liIcon: [
        {
          validator: validator_required,
          trigger: "change",
        },
      ],
    });
    let onClose = (): void => {
      context.emit("update:formVisible", false);
    };
    let onSave = (): void => {
      context.emit("update:formVisible", false);
    };
    return {
      show,
      form,
      rules,
      onClose,
      onSave,
    };
  },
});
</script>
