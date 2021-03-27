<template>
  <el-dialog
    v-model="show"
    :title="$t('systemFunction.name')"
    @close="onClose()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
    >
      <el-col :span="12">
        <el-form-item
          :label="$t('systemFunction.form.liDataName')"
          prop="liDataName"
        >
          <el-input
            v-model="formData.liDataName"
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
            v-model="formData.liName"
            clearable
            :placeholder="$t('common.enter') + $t('systemFunction.form.liName')"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('systemFunction.form.parentGuid')">
          <el-input
            v-model="formData.parentGuid"
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
          <el-input v-model="formData.liIcon" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('systemFunction.form.liHref')">
          <el-input
            v-model="formData.element_liHref"
            clearable
            :placeholder="$t('common.enter') + $t('systemFunction.form.liHref')"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('systemFunction.form.orderNum')">
          <el-input
            v-model="formData.orderNum"
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
            v-model="formData.isEnable"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('systemFunction.form.isChild')">
          <el-switch
            v-model="formData.isChild"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('systemFunction.form.remark')">
          <el-input
            type="textarea"
            v-model="formData.remark"
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
    let formRef = ref<HTMLElement | null>(null);
    let formData = reactive({
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
    //登录验证规则
    let formRules = computed((): any => {
      return reactive({
        liDataName: [
          {
            required: true,
            message: t("common.enter") + t("systemFunction.form.liDataName"),
            trigger: "change",
          },
        ],
        liName: [
          {
            required: true,
            message: t("common.enter") + t("systemFunction.form.liName"),
            trigger: "change",
          },
        ],
        liIcon: [
          {
            required: true,
            message: t("common.enter") + t("systemFunction.form.liIcon"),
            trigger: "change",
          },
        ],
      });
    });
    //关闭
    let onClose = (): void => {
      context.emit("update:formVisible", false);
    };
    //确定
    let onSave = (): void => {
      (formRef.value as any).validate(async (valid: boolean) => {
        if (valid) {
          context.emit("update:formVisible", false);
        }
      });
    };
    return {
      show,
      formData,
      formRef,
      formRules,
      onClose,
      onSave,
    };
  },
});
</script>
