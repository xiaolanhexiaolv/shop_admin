<template>
  <div class="login">
  <el-form ref="form" :model="form" label-width="80px" :rules="rules" status-icon>
    <img src="@/assets/avatar.jpg" alt="">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
</el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    reset() {
      this.$refs.form.resetFields()
    },
    login() {
      this.$refs.form.validate(view => {
        if (!view) return false
        axios({
          method: 'post',
          url: 'http://localhost:8888/api/private/v1/login',
          data: this.form
        }).then(res => {
          console.log(res.data)
          if (res.data.meta.status === 200) {
            this.$message({
              message: '登录成功了',
              type: 'success',
              duration: 1000
            })
            localStorage.setItem('token', res.data.data.token)
            this.$router.push('/home')
            // 把token存起来
          } else {
            this.$message({
              message: res.data.meta.msg,
              type: 'error'
            })
          }
        })
      })
    }
  }

}

</script>

<style lang="less">
.login{
  width: 100%;
  height: 100%;
  background-color: #2D434C;
  overflow: hidden;
.el-form{
  width: 400px;
  background-color: #fff;
  margin: 200px auto;
  padding: 75px 40px 15px;
  border-radius: 10px;
  position: relative;
  img{
    position: absolute;
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    border: 6px solid #fff;
  }
  .el-button:nth-child(2){
    margin-left: 100px;
  }
}
}

</style>
