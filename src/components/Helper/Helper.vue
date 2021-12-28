<template>
    <div :class="{ 'theme-helper': true, 'theme-helper-opened': opened }">
        <div class="theme-helper-toggler" @click="toggle">
            <div class="theme-helper-spinner bg-primary text-white">
                <i class="la la-cog"></i>
                <i class="la la-cog fs-smaller"></i>
            </div>
        </div>
      <section class="widget theme-helper-content" style="    text-align: center;">
            <div class="widget-body mt-3" v-if="role == 'Admin'">
              <h6>القائمة</h6>
                <div class="mt-4">
                <router-link    role="button"
                    class="btn btn-success btn-rounded-f btn-block fs-mini text-white marg" to="/sys/serials"
                    >السيريلات</router-link
                    >
                <router-link    role="button"
                    class="btn btn-success btn-rounded-f btn-block fs-mini text-white marg" to="/sys/oldserials"
                    >السيريلات القديمه</router-link
                    >
                   

                  <router-link    role="button"
                    class="btn btn-success btn-rounded-f btn-block fs-mini text-white marg" to="/sys/stores"
                    >المخازن</router-link
                    >
            

                 <router-link    role="button"
                    class="btn btn-success btn-rounded-f btn-block fs-mini text-white marg" to="/sys/users"
                    >الاعضاء</router-link
                    >


                 <router-link    role="button"
                    class="btn btn-success btn-rounded-f btn-block fs-mini text-white marg" to="/sys/adminsales"
                    >المبيعات</router-link
                    >
           
                </div>
                <div class="d-flex justify-content-center mt-lg">
                    <a role="button"
                    target="_blank"
                    href="#"
                    class="btn btn-outline-default btn-rounded-f fs-mini text-muted d-flex align-items-center">
                        <i class="glyphicon glyphicon-headphones mr-xs"></i>
                        Support
                    </a>
                   
                </div>
                <div class="mt-lg d-flex flex-column align-items-center theme-sharing">
                    <span class="fs-sm">
                      شكرا لاستخدامك نظامنا
                    </span>
                    <div class="d-flexjustify-content-center text-light mt-2">
                        <a target="_blank"
                        href="#">
                            <i class="fa fa-twitter pr-1"></i>
                        </a>
                        <a href="#"
                        target="_blank">
                            <i class="fa fa-facebook pl-1"></i>
                        </a>
                    </div>
                </div>
            </div>

             <div class="widget-body mt-3" v-if="role == 'User'">
              <h6>القائمة</h6>
                <div class="mt-4">
                <router-link    role="button"
                    class="btn btn-success btn-rounded-f btn-block fs-mini text-white marg" to="/sysuser/serials"
                    >السيريلات</router-link
                    >
                   
               
                </div>
    
                <div class="mt-lg d-flex flex-column align-items-center theme-sharing">
                    <span class="fs-sm">
                      شكرا لاستخدامك نظامنا
                    </span>
                    <div class="d-flexjustify-content-center text-light mt-2">
                        <a target="_blank"
                        href="#">
                            <i class="fa fa-twitter pr-1"></i>
                        </a>
                        <a href="#"
                        target="_blank">
                            <i class="fa fa-facebook pl-1"></i>
                        </a>
                    </div>
                </div>
            </div>
             <div class="widget-body mt-3" v-if="role == 'Client'">
              <h6>القائمة</h6>
                <div class="mt-4">
                <router-link    role="button"
                    class="btn btn-success btn-rounded-f btn-block fs-mini text-white marg" to="/sysclinet/serials"
                    >السيريلات</router-link
                    >
                   
                 <router-link    role="button"
                    class="btn btn-success btn-rounded-f btn-block fs-mini text-white marg" to="/sysclinet/sales"
                    >المبيعات</router-link
                    >
                </div>
    
                <div class="mt-lg d-flex flex-column align-items-center theme-sharing">
                    <span class="fs-sm">
                      شكرا لاستخدامك نظامنا
                    </span>
                    <div class="d-flexjustify-content-center text-light mt-2">
                        <a target="_blank"
                        href="#">
                            <i class="fa fa-twitter pr-1"></i>
                        </a>
                        <a href="#"
                        target="_blank">
                            <i class="fa fa-facebook pl-1"></i>
                        </a>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>

<script>
export default {
    name: 'Helper',
    data() {
        return {
            opened: false,
        }
    },
    computed: {
  role: function () {
    return localStorage.getItem('role')
  }
   },
    methods: {
        toggle() {
            this.opened = !this.opened;
        }
    }
};
</script>

<style src="./Helper.scss" lang="scss">
.marg {
margin-top: 4px;
    margin-bottom: 4px;
}
.fs-mini {
    font-size: 0.9rem;
    margin-top: 4px;
    margin-bottom: 4px;
}
</style>
