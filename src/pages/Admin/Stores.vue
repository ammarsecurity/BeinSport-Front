<template>
  <div class="tables-basic">
    <div class="separator">البحث</div>

    <form class="mt" @submit.prevent="AddStore()">
      <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
        {{ errorMessage }}
      </b-alert>
  
      <div class="form-group">
        <label></label>
        <input
          class="form-control no-border"
          v-model="addform.storeName"
          type="text"
          name="storeName"
          placeholder="اسم المخزن"
        />
      </div>

      <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse"
        >اضافة</b-button
      >
    </form>

    <h2 class="page-title">
      جدول - <span class="fw-semi-bold">المخازن</span>
    </h2>
    <b-row>
      <b-col>
        <Widget
          title="<h5><span class='fw-semi-bold'></span></h5>"
          customHeader
          settings
          close
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>اسم المخزن</th>
                  <th>اعدادات</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in storeslist" v-bind:key="row.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    {{ row.storeName }}
                  </td>
                  <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                <button
                  type="button"
                  class="btn btn-success"
                  @click="getinfo(row)"
                 
                >
                  تعديل
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deletestore(row.id)"
                
                >
                  مسح
                </button>
              </div>
                  </td>
                </tr>
              </tbody>
            </table>
            
          </div>
        </Widget>
      </b-col>
    </b-row>

    <b-modal
      id="editModel"
      hide-footer
      hide-header
      no-close-on-backdrop
      body-text-variant="light"
    >
      <div class="d-block text-center">
        <img src="../../assets/af.png" alt="af" class="afimg" />
        <hr />
        <div class="center-elem">
          <semipolar-spinner
            :animation-duration="2000"
            :size="65"
            color="#ff1d5e"
            v-if="isLoading"
          />
        </div>
        <form class="mt" @submit.prevent="editstore">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{ errorMessage }}
          </b-alert>
        <b-col>
          <div class="form-group">
            <label></label>
            <input
              class="form-control no-border"
              v-model="edit.storeName"
              type="text"
              name="serialInfo"
              placeholder="اسم المتجر"
            />
          </div>
        </b-col>
          <hr />
          <b-row>
            <b-col cols="4">
              <b-button
                class="mt-3"
                variant="danger"
                block
                @click="$bvModal.hide('editModel')"
                >غلق</b-button
              ></b-col
            >

            <b-col cols="8"
              ><b-button class="mt-3" variant="success" block type="submit"
                >تعديل</b-button
              ></b-col
            >
          </b-row>
        </form>
      </div>
    </b-modal>

  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import { SemipolarSpinner } from "epic-spinners";
export default {
  name: "Affilliate",
  components: { Widget, SemipolarSpinner },
  data() {
    return {
      errorMessage: null,
      isLoading: false,
      addform: {
        storeName: "",
      },
      editform: {
        storeName: "",
        id : ""
      }, 
      stores: [],
      storeslist: [],
    
      index: 0,
      edit  :{
        storeName : "",
        id : ""
      }
  
    };
  },
  mounted() {

    this.GetStores();
  },
  methods: {
      editstore() {
      this.isLoading = true;
      this.axios
        .put(`Admin/EditStore?id=${this.edit.id}`, this.edit)
        .then((res) => {
          if (res) {
            this.isLoading = false;
            this.$swal("تم!", "  تم التعديل بنحاج", "success");
            this.GetStores();
            this.$bvModal.hide("editModel");
          }
        })
        .catch((err) => {
          if (err) {
            this.isLoading = false;
            this.$swal("خطا!", "حدث خطا ما", "error");
          }
        });
    },

    GetStores() {
      this.isLoading = true;
      this.axios
        .get(
          `Admin/GetStores`
        )
        .then((res) => {
          this.storeslist = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          if (err) {
            this.isLoading = false;
            this.alert = true;
          }
        });
    },


    getinfo(item) {
      this.edit.id = item.id;
      this.edit.storeName = item.storeName;
      this.$bvModal.show("editModel");
    },


   AddStore() {
      this.isLoading = true;
      this.axios
        .post(`Admin/AddStore`, this.addform )
        .then((res) => {
          if(res){
         this.GetStores();
          this.isLoading = false;

          }
        
        })
        .catch((err) => {
          if (err) {
            this.isLoading = false;
            this.alert = true;
          }
        });
    },

    deletestore(id) {
      this.$swal
        .fire({
          title: "هل انت متأكد؟",
          text: "هل انت متأكد من مسح الصورة!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "نعم, امسح!",
          cancelButtonText: "غلق"
        })
        .then(result => {
          if (result.isConfirmed) {
            this.axios
              .put(`Admin/DeleteStore?id=${id}`)
              .then(res => {
                if (res) {
                  this.$swal.fire("مسح!", "تم المسح بنجاح.", "success");

                     this.GetStores();
                  this.isLoading = false;
                }
              })
              .catch(err => {
                if (err) {
                  this.$toast.open({
                    message: "خطا في عملية المسح",
                    type: "error",
                    duration: 5000,
                    dismissible: true
                  });
                  this.isLoading = false;
                }
              });
          }
        });
    }
  },
};
</script>

<style>
.afimg {
  width: 63%;
}

.form-control {
  text-align: end;
}

.btn-group {
  direction: ltr;
}
</style>
