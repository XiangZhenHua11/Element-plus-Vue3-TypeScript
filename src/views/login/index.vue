<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      class="login-form"
      :model="loginForm"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <i class="iconfont icon-account"></i>
        </span>
        <el-input
          v-model="loginForm.username"
          ref="username"
          name="username"
          autocomplete="on"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont icon-password"></i>
        </span>
        <el-input
          v-model="loginForm.password"
          show-password
          autocomplete="on"
          ref="password"
          name="password"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-button :loading="loading" type="primary" @click.prevent="loginOn">
        登录
      </el-button>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "login",
  setup() {
    const router = useRouter();
    const store = useStore();
    const loading = ref<boolean>(false);
    const loginFormRef = ref<HTMLElement | null>(null);
    const loginForm = {
      username: "system",
      password: "wwww",
    };
    const loginRules = {
      username: [{ required: true, message: "请输入账号", trigger: "blur" }],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
      ],
    };
    const loginOn = (): void => {
      (loginFormRef.value as any).validate(async (valid: boolean) => {
        if (valid) {
          const submitResult = await store.dispatch("user/login", loginForm);
          console.log(submitResult);
          // router.push({
          //   path: this.redirect || "/",
          //   query: this.otherQuery,
          // });
        }
      });
    };
    return {
      loading,
      loginRules,
      loginForm,
      loginFormRef,
      loginOn,
    };
  },
  components: {},
});
</script>
<style lang="scss">
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input {
      color: $loginCursorColor;
    }
    input::first-line {
      color: $lightGray;
    }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 90%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #283443 inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-button {
    width: 100%;
    margin-bottom: 30px;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
