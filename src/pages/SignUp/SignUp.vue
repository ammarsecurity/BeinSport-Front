<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        نظام الـ SMS
        <i class="fa fa-circle text-danger"></i>
      </h5>
      <Widget
        class="widget-auth mx-auto"
        title="<h3 class='mt-0'>تسجيل حساب جديد</h3>"
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
         الرجاء ملئ جميع المعلومات بصورة صحيحة
        </p>
        <form class="mt" @submit.prevent="reg">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{ errorMessage }}
          </b-alert>
          <div class="form-group">
            <input
              class="form-control no-border"
              v-model="form.fullName"
              required
              type="text"
              name="fullName"
              placeholder="الاسم الكامل"
            />
          </div>
          <div class="form-group">
            <input
              class="form-control no-border"
              v-model="form.phoneNumber"
              required
              type="text"
              name="phoneNumber"
              placeholder="رقم الهاتف"
            />
          </div>
          <div class="form-group">
            <input
              class="form-control no-border"
              v-model="form.userName"
              required
              type="text"
              name="phoneNumber"
              placeholder="اسم الدخول"
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
        </form>
        <p class="widget-auth-info">لديك حساب سابقة</p>
        <router-link class="d-block text-center" to="/"
          >تسجيل الدخول</router-link
        >
      </Widget>
    </b-container>
    <footer class="auth-footer">2021 &copy; الافق <a href="#"></a></footer>
   

    <b-modal id="OtpModel" hide-footer hide-header no-close-on-backdrop  body-text-variant="light">
      <div class="d-block text-center" >
      <img src="../../assets/otp.jpg" alt="otp"  class="otpimg"/>
      <hr/>
      <div class="center-elem">
          <semipolar-spinner
            :animation-duration="2000"
            :size="65"
            color="#ff1d5e"
            v-if="isLoading"
          />
        </div>
        
        <v-otp-input
          style="display: flex;justify-content: center;"
          inputClasses="otp-input"
          :numInputs="6"
          separator="-"
          :shouldAutoFocus="true"
          @on-complete="handleOnComplete"
        />
      </div>
      <hr/>
      <b-row>
   
    <b-col cols="4"> <b-button class="mt-3" variant="danger"  block @click="$bvModal.hide('OtpModel')"
        >غلق</b-button
      ></b-col>

       <b-col cols="8"><b-button class="mt-3" variant="success" block @click="sendOtp()"
        >دخول</b-button></b-col>
    
  </b-row>
     
        
    </b-modal>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import { SemipolarSpinner } from "epic-spinners";
export default {
  name: "LoginPage",
  components: { Widget, SemipolarSpinner },
  data() {
    return {
      errorMessage: null,
      form: {
        fullName: "",
        phoneNumber: "",
        userName: "",
        password: "",
      },
      isLoading: false,
      otpform: {
        key: "",
        otp: "",
      },
    };
  },
  methods: {
    handleOnComplete(value) {
      this.otpform.otp = value;
    },
    reg() {
     
     
      this.isLoading = true;
      this.axios
        .post("Auth/SignUp", this.form)
        .then((res) => {
          localStorage.setItem("token", res.data.data);
          localStorage.setItem("role", res.data.message);
          this.isLoading = false;
          this.otpform.key = res.data.data;
          this.$bvModal.show('OtpModel');
        })
        .catch((err) => {
          if (err) {
            this.isLoading = false;
            this.$swal("خطا!", "حدث خطا ما", "error");
          }
        });
    },

      sendOtp() {
      this.isLoading = true;
      this.axios
        .post(`Auth/Otp?otp=${this.otpform.otp}&Key=${this.otpform.key}`)
        .then((res) => {
          localStorage.setItem("token", res.data.data);
          localStorage.setItem("role", res.data.message);
          this.isLoading = false;
          this.$router.push("/sms/addAffiliate");
          this.$bvModal.hide('OtpModel');
        })
        .catch((err) => {
          if (err) {
            this.isLoading = false;
            this.$swal("خطا!", "حدث خطا ما", "error");
          }
        });
    },
  },
  created() {

  },
};
</script>
<style>
.form-control {
 text-align : right
}
.otpimg{
      width: 63%;
}
.modal-body {
    background: #ffffff;
}

.form-control.no-border {
    border: none;
    background-color: #f2f2f2;
    font-family: 'Almarai', sans-serif;
    text-align: right;
}
.auth-page {
  direction: rtl;
  padding-top: 10vh;
  height: 100vh;
}
.center-elem {
  display: flex;
  justify-content: center;
  align-items: center;
}
.centerotp: {
  display: flex;
  justify-content: center;
}
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  textalign: "center";
}
.error {
  border: 1px solid red !important;
}
</style>
