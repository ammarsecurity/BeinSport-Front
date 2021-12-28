<template>
  <b-navbar class="header d-print-none app-header">
    <b-navbar-brand href="#"><img src="../../assets/logo.png" alt="logo" style="width: 13%;" /></b-navbar-brand>
    <b-nav>
   
      <b-nav-item-dropdown
        id="v-step-2"
        class="settingsDropdown d-sm-down-none"
        no-caret
        right
      >
        <template slot="button-content">
          <i class="fi flaticon-settings-10 px-2" />
        </template>
     
        <b-dropdown-item-button>
          <router-link class="d-block text-center" to="/logout">
            <i class="fi flaticon-power-1 px-3 mr-3" /> تسجيل الخروج
          </router-link>
        </b-dropdown-item-button>
      </b-nav-item-dropdown>
    </b-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Notifications from "@/components/Notifications/Notifications";

export default {
  name: "Header",
  components: { Notifications },
  computed: {
    ...mapState("layout", ["sidebarClose", "sidebarStatic"]),
  },
  methods: {
    ...mapActions("layout", [
      "toggleSidebar",
      "switchSidebar",
      "changeSidebarActive",
    ]),
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split("/");
        paths.pop();
        this.changeSidebarActive(paths.join("/"));
      }
    },
    toggleSidebarMethod() {
      if (this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      } else {
        this.toggleSidebar();
        const paths = this.$route.fullPath.split("/");
        paths.pop();
        this.changeSidebarActive(paths.join("/"));
      }
    },
  },
};
</script>

<style src="./Header.scss" lang="scss"></style>
