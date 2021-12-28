<template>
  <div class="tables-basic">
    <form class="mt" @submit.prevent="adduser()">
      <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
        {{ errorMessage }}
      </b-alert>
      <b-row>
        <b-col>
          <label style="margin-bottom: 6px">اضافة عضو اعضاء</label>
          <b-input-group class="mb-3">
            <b-form-select
              style="height: 37px"
              :options="stores"
              v-model="form.storeId"
            />
          </b-input-group>
        </b-col>
        <b-col>
          <div class="form-group">
            <label></label>
            <input
              class="form-control no-border"
              v-model="form.userPhone"
              type="text"
              name="serialInfo"
              placeholder="اسم الدخول"
            />
          </div>
        </b-col>
        <b-col>
          <div class="form-group">
            <label></label>
            <input
              class="form-control no-border"
              v-model="form.userPhone2"
              type="text"
              name="serialInfo"
              placeholder="رقم الهاتف"
            />
          </div>
        </b-col>
        <b-col>
          <div class="form-group">
            <label></label>
            <input
              class="form-control no-border"
              v-model="form.userPassword"
              type="text"
              name="serialInfo"
              placeholder="الرمز السري"
            />
          </div>
               
        </b-col>

          <b-col>
          <div class="form-group">
            <label></label>
            <select  class="form-control no-border" v-model="form.role">
              <option value="0">اختيار العضوية</option>
              <option value="Admin">أدارة</option>
              <option value="User">مخزن</option>
              <option value="Client">نقطة بيع</option>
            </select>
          </div>
        </b-col>
      </b-row>
      <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse"
        >اضافة</b-button
      >
    </form>
    <h2 class="page-title">
      جدول - <span class="fw-semi-bold">المتشركين</span>
    </h2>
    <b-row>
      <b-col>
        <Widget
          title="<h5><span class='fw-semi-bold'>اعدادت</span></h5>"
          customHeader
          settings
          close
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th>اسم الدخول</th>
                  <th>رقم الهاتف</th>
                  <th>الرقم السري</th>
                  <th>العضوية</th>
                  <th>المخزن</th>
                  <th>اعدادات</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in userslist" :key="row.id">
                  <td>
                    {{ row.userPhone }}
                  </td>
                  <td>
                    {{ row.userPhone2 }}
                  </td>
                  <td>
                    {{ row.userPassword }}
                  </td>
                  <td v-if="row.role == 'Admin'">  ادارة </td>
                  <td v-if="row.role == 'User'">  مخزن </td>
                  <td v-if="row.role == 'Client'">  نقطة بيع </td>
                
                  <td>
                    {{ row.storeName }}
                  </td>
             
                  <td class="width-150">
                    <b-button-group>
                      <b-button variant="warning" @click="deleteuser(row.id)"
                        >مسح</b-button
                      >
                      <b-button variant="info" @click="getuserinfo(row)"
                        >تعديل</b-button
                      >
                    </b-button-group>
                  </td>
                </tr>
              </tbody>
            </table>
           
          </div>
        </Widget>
      </b-col>
    </b-row>
    <b-row>
      <div class="center-elem">
        <semipolar-spinner
          :animation-duration="2000"
          :size="65"
          color="#ff1d5e"
          v-if="isLoading"
        />
      </div>
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
        <form class="mt" @submit.prevent="edituser">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{ errorMessage }}
          </b-alert>
           <b-col>
          <label style="margin-bottom: 6px">المخزن</label>
          <b-input-group class="mb-3">
            <b-form-select
              style="height: 37px"
              :options="stores"
              v-model="edit.storeId"
            />
          </b-input-group>
        </b-col>
        <b-col>
          <div class="form-group">
            <label></label>
            <input
              class="form-control no-border"
              v-model="edit.userPhone2"
              type="text"
              name="serialInfo"
              placeholder="رقم الهاتف"
            />
          </div>
        </b-col>
        <b-col>
          <div class="form-group">
            <label></label>
            <input
              class="form-control no-border"
              v-model="edit.userPhone"
              type="text"
              name="serialInfo"
              placeholder="اسم الدخول "
            />
          </div>
        </b-col>
        <b-col>
          <div class="form-group">
            <label></label>
            <input
              class="form-control no-border"
              v-model="edit.userPassword"
              type="text"
              name="serialInfo"
              placeholder="الرمز السري"
            />
          </div>
        </b-col>

            <b-col>
          <div class="form-group">
            <label></label>
            <select  class="form-control no-border" v-model="edit.role">
              <option value="Admin">أدارة</option>
              <option value="User">مخزن</option>
            </select>
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
      search: {
        fullName: "",
      },
      errorMessage: null,
      userslist: [],
      isLoading: false,
  
      form: {
        role : "User"
      },
      edit: {
        storeId: "",
        userPhone: "",
        userPhone2: "",
        userPassword: "",
        id: "",
        role : ""
      
      },
      storeslist: [],
      stores: [],
    };
  },
  mounted() {
    this.users();
    this.getGetStore();
  },
  methods: {
    users() {
      this.isLoading = true;
      this.axios
        .get(
          `Admin/GetUser`
        )
        .then((res) => {
          this.userslist = res.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          if (err) {
            this.isLoading = false;
            this.alert = true;
          }
        });
    },

    getGetStore() {
      this.isLoading = true;
      this.axios
        .get("Admin/GetStores")
        .then((res) => {
          this.storeslist = res.data.data;
          for (var i = 0; i < this.storeslist.length; i++) {
            var option = [];
            for (var key in this.storeslist[i]) {
              if (key == "id") {
                option["value"] = this.storeslist[i][key];
              } else if (key == "storeName") {
                option["text"] = this.storeslist[i][key];
              }
            }
            this.stores.push(Object.assign({}, option));
          }

          this.isLoading = false;
        })
        .catch((err) => {
          if (err) {
            this.$swal("Error", "Internet Erorr", "error");
            this.isLoading = false;
          }
        });
    },

    getuserinfo(item) {
      this.edit.id = item.id;
      this.edit.storeId = item.storeId;
      this.edit.userPhone = item.userPhone;
      this.edit.userPhone2 = item.userPhone2;
      this.edit.userPassword = item.userPassword;
      this.edit.role = item.role;
      this.$bvModal.show("editModel");
    },


    edituser() {
      this.isLoading = true;
      this.axios
        .put(`Admin/EditUser?id=${this.edit.id}`, this.edit)
        .then((res) => {
          if (res) {
            this.isLoading = false;
            this.$swal("تم!", "  تم التعديل بنحاج", "success");
            this.users();
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
    adduser() {
      this.isLoading = true;
      this.axios
        .post(`Admin/AddUser` , this.form)
        .then((res) => {
          if (res) {
            this.isLoading = false;
            this.$swal("تم!", "  تم الاضافة بنحاج", "success");
            this.users();
          }
        })
        .catch((err) => {
          if (err) {
            this.isLoading = false;
            this.$swal("خطا!", "حدث خطا ما", "error");
          }
        });
    },

        deleteuser(id) {
      this.$swal
        .fire({
          title: "هل انت متأكد؟",
          text: "هل انت متأكد من مسح !",
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
              .put(`Admin/DeleteUser?id=${id}`)
              .then(res => {
                if (res) {
                  this.$swal.fire("مسح!", "تم المسح بنجاح.", "success");

                     this.users();
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

.center-elem {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
