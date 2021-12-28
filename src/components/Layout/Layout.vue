<template>
<div class="sing-dashboard">
 <!-- <Sidebar /> --> 
  <Helper />
  <div class="wrap">
    <Header />
    <v-touch class="content">
    <!-- <breadcrumb-history></breadcrumb-history> -->  
      <transition name="router-animation">
        <router-view />
      </transition>
      <footer class="contentFooter">
       نظام الرسائل  <a href="#" rel="nofollow noopener noreferrer" target="_blank">الافق</a>
      </footer>
    </v-touch>
  </div>
</div>
</template>

<script>


// import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import Helper from '@/components/Helper/Helper';
// import BreadcrumbHistory from '@/components/BreadcrumbHistory/BreadcrumbHistory';

import './Layout.scss';

export default {
  name: 'Layout',
  components: {Header, Helper },

  
};
</script>

<style src="./Layout.scss" lang="scss" />
