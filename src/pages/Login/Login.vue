<template>
  <div class="auth-page">
    <b-container>
     
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
      مخزن السيريالات
        <i class="fa fa-circle text-danger"></i>
      </h5>
      <Widget
        class="widget-auth mx-auto"
        title="<h3 class='mt-0'>لوحة تسجيل الدخول</h3>"
        customHeader
      >
      <div class="center-elem">
        <semipolar-spinner
        :animation-duration="2000"
        :size="65"
        color="#ff1d5e"
         v-if="isLoading"
      />
      </div>
     
        <p class="widget-auth-info">
          استخدم البيانات التي قمت بالتسجيل فيها
        </p>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{ errorMessage }}
          </b-alert>
          <div class="form-group">
            <input
              class="form-control no-border"
              v-model="form.phonenumber"
              required
              type="text"
              name="nameOrPhone"
              placeholder="رقم الهاتف"
            />
          </div>
          <div class="form-group">
            <input
              class="form-control no-border"
              v-model="form.password"
              required
              type="password"
              name="password"
              placeholder="الرمز السري"
            />
          </div>
          <b-button
            type="submit"
            size="sm"
            class="auth-btn mb-3"
            variant="inverse"
            >دخول</b-button
          >
          <!-- <p class="widget-auth-info">or sign in with</p>
          <div class="social-buttons">
            <b-button variant="primary" class="social-button mb-2">
              <i class="social-icon social-google"></i>
              <p class="social-text">GOOGLE</p>
            </b-button>
            <b-button variant="success" class="social-button">
              <i class="social-icon social-microsoft"></i>
              <p class="social-text">MICROSOFT</p>
            </b-button>
          </div> -->
        </form>
        <!-- <p class="widget-auth-info">ليس لديك حساب أنشا حساب الان</p>
        <router-link class="d-block text-center" to="signUp"
          >انشاء حساب جديد</router-link
        > -->
      </Widget>
    </b-container>
    <footer class="auth-footer">2021 &copy; الافق <a href="#"></a></footer>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import { SemipolarSpinner } from "epic-spinners";
export default {
  name: "LoginPage",
  components: { Widget , SemipolarSpinner},
  data() {
    return {
      isLoading : false,
      errorMessage: null,
      form: {
        phonenumber: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      this.axios
        .post("Auth/Login", this.form)
        .then((res) => {
          localStorage.setItem("token", res.data.data);
          localStorage.setItem("role", res.data.message);
          this.isLoading = false;
          if(res.data.message == "User"){
            this.$router.push("/sysuser/serials");

          }else if(res.data.message == "Admin"){
            this.$router.push("/sys/serials");
         
          }else if(res.data.message == "Client"){
            this.$router.push("/sysclinet/serials");
          }
          
        })
        .catch((err) => {
          if (err) {
            this.isLoading = false;
            this.$swal("خطا!", "خطا في معلومات الدخول", "error");

          }
        });
    },
  },

};
</script>
<style>
.form-control.no-border {
    border: none;
    background-color: #f2f2f2;
    font-family: 'Almarai', sans-serif;
    text-align: right;
}
.form-control {
 text-align : right
}
.auth-page {
  direction: rtl;
  padding-top: 10vh;
  height: 100vh;
}
.center-elem{

  display: flex;
    justify-content: center;
    align-items: center;
}
</style>
