<template>
  <div class="login_page fillcontain">
    <transition name="form-fade">
      <section class="form_contianer">
        <div class="manage_tip">
          <p>基金后台管理系统</p>
        </div>
        <el-form :model="loginForm">
          <el-form-item label="用户名" label-width="90px">
            <el-input placeholder="用户名" v-model="loginForm.id"></el-input>
          </el-form-item>
          <el-form-item label="密码" label-width="90px">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm()">登录</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        id: '',
        password: ''
      }
    }
  },
  methods: {
    submitForm () {
      if (this.loginForm.id.length <= 20 && this.loginForm.id.length >= 1) {
        if (this.loginForm.password.length >= 1) {
          console.log(this.loginForm)
          // 登录
          this.$api.registerOrLogin.login.login(this.loginForm).then(res => {
            console.log(res)
            localStorage.setItem('imCustNo', res.data.data.imCustNo)
            // 跳转到主页
            this.$router.push('/setBudgetParam')
          })
        } else {
          alert('密码要大于2字符')
        }
      } else {
        alert('用户名为5-20字符')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../style/mixin';
.login_page{
  background-color: #324057;
}
.manage_tip{
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p{
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer{
  .wh(320px, 210px);
  .ctp(320px, 210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn{
    width: 100%;
    font-size: 16px;
  }
}
.tip{
  font-size: 12px;
  color: red;
}
.form-fade-enter-active, .form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter, .form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
