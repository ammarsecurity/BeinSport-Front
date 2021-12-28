
<template>
  <div>
    <v-otp-input
      inputClasses="otp-input"
      :numInputs="4"
       separator="-"
      :shouldAutoFocus="true"
      @on-complete="handleOnComplete"
      @on-change="handleOnChange"
    />
  </div>
</template>
<script>
export default {
  methods: {
    handleOnComplete(value) {
      console.log("OTP: ", value);
    },
    handleOnChange(value) {
      console.log("OTP: ", value);
    }
  }
  
};</script>