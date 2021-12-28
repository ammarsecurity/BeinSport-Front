<template>
  <div class="tables-basic">

    <div class="separator">البحث</div>

    <form class="mt" @submit.prevent="getGetSerials()">
      <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
        {{ errorMessage }}
      </b-alert>
      <b-row>

        <b-col
          ><div class="form-group">
            <label>التاريخ</label>
            <input
              class="form-control no-border"
              v-model="search.date"
              type="date"
              name="date"
            /></div
        ></b-col>

        <b-col>
              <div class="form-group">
        <label>معلومات السيريال</label>
        <input
          class="form-control no-border"
          v-model="search.serialInfo"
          type="text"
          name="serialInfo"
          placeholder="معلومات السيريال"
        />
      </div>
        </b-col>

      </b-row>

  

      <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse"
        >بحث</b-button
      >
    </form>
    
    <h2 class="page-title">
      جدول - <span class="fw-semi-bold">السيريلات</span>
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
                  <th>Carton ID</th>
                  <th>Model No</th>
                  <th>Smartcard ID</th>
                  <th>STBID</th>
                  <th>Store Name</th>
                  <th>Cliant Name</th>
                  <th>local ID</th>
                  <th>Local Carton</th>
                  <th>Insert Date</th>
                  <th>UpDate Date</th>
                  <th>File Name</th>
                  <th>
                   بيع
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in allserials" v-bind:key="row.id">
                  <th scope="row">{{ pag - 1 + index + 1 }}</th>
                  <td>
                    {{ row.cartonID }}
                  </td>
                  <td>
                    {{ row.modelNo }}
                  </td>
                  <td>
                    {{ row.smartcardID }}
                  </td>
                  <td>
                    {{ row.stbid }}
                  </td>
                  <td>
                    {{ row.storeName }}
                  </td>
                  <td>
                    {{ row.cliantName }}
                  </td>
                  <td>
                    {{ row.localID }}
                  </td>
                  <td>
                    {{ row.localCarton }}
                  </td>

                  <td>
                    {{ row.insertDate.split("T")[0] }}
                  </td>

                  <td>
                    {{ row.updateDate.split("T")[0] }}
                  </td>
                  <td>
                    {{ row.fileName }}
                  </td>
                  <td>
                          <b-button
                          v-if="row.isSelas == false"
                type="submit"
                size="sm"
                class="auth-btn mb-3"
                @click="salessiral(row.id)"
                variant="inverse"
                style="margin-right: 10px;"
                >بيع</b-button
                >
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="md-group">
              <label class="count"> عدد السجلات : {{ counts }} </label>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="getMore()"
                  :disabled="Next"
                >
                  التالي
                </button>

                <button
                  type="button"
                  class="btn btn-danger"
                  @click="getLess()"
                  :disabled="Previous"
                >
                  السابقة
                </button>
              </div>
            </div>
          </div>
        </Widget>
      
      </b-col>
    </b-row>

   

    <b-modal
      id="salessiral"
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
        <form class="mt" @submit.prevent="salenow()">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{ errorMessage }}
          </b-alert>
          <b-col>
            <div class="form-group">
              <label>الاسم الكامل</label>
              <input
                class="form-control no-border"
                v-model="selas.fullName"
                type="text"
                name="serialInfo"
                required
                placeholder=""
              />
            </div>
          </b-col>
 <b-col>
            <div class="form-group">
              <label>رقم الهاتف</label>
              <input
                class="form-control no-border"
                v-model="selas.phoneNumer"
                type="text"
                name="serialInfo"
                required
                placeholder=""
              />
            </div>
          </b-col>
           <b-col>
            <div class="form-group">
              <label>السعر</label>
              <input
                class="form-control no-border"
                v-model="selas.price"
                type="text"
                name="serialInfo"
                required
                placeholder=""
              />
            </div>
          </b-col>
          <hr />
          <div class="center-elem">
            <semipolar-spinner
              :animation-duration="2000"
              :size="65"
              color="#ff1d5e"
              v-if="isLoading"
            />
          </div>
          <b-row>
            <b-col cols="4">
              <b-button
                class="mt-3"
                variant="danger"
                block
                @click="$bvModal.hide('salessiral')"
                >غلق</b-button
              ></b-col
            >

            <b-col cols="8"
              ><b-button class="mt-3" variant="success" block type="submit"
                >بيع</b-button
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
      changeform: {},
      addform: {
        StoreId: "",
        FileName: "",
        LocalID: "",
      },
      counts: 0,
      errorMessage: null,
      GetSentSMSlist: [],
      isLoading: false,
      search: {
        fileName: "",
        storeId: "",
        date: "",
        serialInfo: "",
        localID: "",
      },
      filesnames: [],
      filesnameslist: [],
      file: "",
      stores: [],
      storeslist: [],
      allserials: [],
      pag: 1,
      index: 0,
      length: "",
      Next: false,
      Previous: "",
      selected: [],
      selectAll: false,
      listid: [],
      clinetlist :[],
      clinet :[],
      changeformtoclinet : {
        clinetid : "",
      },
      selas : {
serialId : "",
fullName : "",
price : "" ,
phoneNumer : "",
id : ""
      }
    };
  },
  mounted() {
    // this.getGetSerials();

    this.GetClinetSerial();
  },
  methods: {

 

    salenow() {
      if (
        this.selas.fullName == "" ||
        this.selas.phoneNumer == "" ||
        this.selas.price == "" 
      
      ) {
        this.$swal("انتباه!", "جميع الخانات ملطوبة", "info");
      }
      
      this.axios
        .post("Users/AddSales", this.selas)
        .then((res) => {
          if (res) {
            this.$swal("تم!", "  تم البيع بنحاج", "success");
            this.$bvModal.hide("salessiral");
            this.GetClinetSerial();
            this.isLoading = false;

          }
        })

        .catch(function() {
          this.isLoading = false;
          this.alert = true;
        });
    },
   
  
    salessiral(id) {
     
      this.selas.serialId = id ;
      this.$bvModal.show("salessiral");
    },
   
    GetClinetSerial() {
      
      this.isLoading = true;
      this.axios
        .get(
          `Users/GetClinetSerial?skip=0&take=100&date=${this.search.date}&serialInfo=${this.search.serialInfo}`
        )
        .then((res) => {
          this.allserials = res.data.data;
          this.counts = res.data.message;

          this.isLoading = false;
        })
        .catch((err) => {
          if (err) {
            this.isLoading = false;
            this.alert = true;
          }
        });
    },

    getMore: function() {
      this.isLoading = true;

      // if (!this.name && !this.type && this.items.length === 0) return false;
      const tempPage = this.pag + 100;

      this.axios
        .get(
          `Users/GetSerial?skip=${tempPage - 1}&take=100&date=${this.search.date}&serialInfo=${this.search.serialInfo}`
        )

        .then((res) => {
          this.Previous = false;
          this.allserials = res.data.data;
          this.isLoading = false;
          this.pag = tempPage;
          this.length = res.data.data.length;

          if (res.data.data.length <= 9) {
            this.Next = true;
          }
          if (res.data.data == "") {
            this.Next = true;
            this.isLoading = false;
          }
        })
        .catch((err) => {
          if (err) {
            this.Next = true;
            this.isLoading = false;
          }
        });
    },
    getLess: function() {
      this.isLoading = true;

      const tempPage = this.pag - 100;
      this.axios
        .get(
          `Users/GetSerial?skip=${tempPage - 1}&take=100&date=${this.search.date}&serialInfo=${this.search.serialInfo}`
        )
        .then((res) => {
          this.allserials = res.data.data;
          this.isLoading = false;
          this.pag = tempPage;
          this.Next = false;
          // console.log(tempPage);
          if (tempPage == 1) {
            this.Previous = true;
          }
          this.length = res.data.data.length;
        })
        .catch((err) => {
          if (err) {
            this.isLoading = false;
            this.Previous = true;
          }
        });
    },

    getGetFileName() {
      this.isLoading = true;
      this.axios
        .get("Users/GetFilesName")
        .then((res) => {
          this.filesnames.push({ value: "", text: "اختر" });
          this.filesnameslist = res.data.data;
          for (var i = 0; i < this.filesnameslist.length; i++) {
            var option = [];
            for (var key in this.filesnameslist[i]) {
              if (key == "value") {
                option["value"] = this.filesnameslist[i][key];
              } else if (key == "fileName") {
                option["text"] = this.filesnameslist[i][key];
              }
            }
            this.filesnames.push(Object.assign({}, option));
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
    getGetStore() {
      this.isLoading = true;
      this.axios
        .get("Users/GetStores")
        .then((res) => {
          this.stores.push({ value: "", text: "اختر" });
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
    getGetClinet() {
      this.isLoading = true;
      this.axios
        .get("Users/GetClient")
        .then((res) => {
          this.clinet.push({ value: "", text: "اختر" });
          this.clinetlist = res.data.data;
          for (var i = 0; i < this.clinetlist.length; i++) {
            var option = [];
            for (var key in this.clinetlist[i]) {
              if (key == "id") {
                option["value"] = this.clinetlist[i][key];
              } else if (key == "userPhone") {
                option["text"] = this.clinetlist[i][key];
              }
            }
            this.clinet.push(Object.assign({}, option));
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

    Deleteseach() {
      if (this.search.localID == "") {
        this.$swal("انتباه", "يرجى اختيار القسم", "info");

        return;
      }

      this.$swal({
        title: "هل انت متأكد?",
        text: "هل انت متأكد من الحذف",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم ,  امسح!",
        CancelButtonText: "الغاء",
      })
        .then((result) => {
          if (result.isConfirmed) {
            this.isLoading = true;
            this.axios
              .get(
                `Users/DeleteSearchSerial?fileName=${this.search.fileName}&storeId=${this.search.storeId}&date=${this.search.date}&serialInfo=${this.search.serialInfo}`
              )
              .then((res) => {
                if (res) {
                  this.allserials = [];
                  this.$swal("تم!", "تم المسح بنحاج", "success");
                  this.isLoading = false;
                }
              })
              .catch((err) => {
                if (err) {
                  this.isLoading = false;
                  this.alert = true;
                }
              });
          }
        })
        .catch(function() {
          this.isLoading = false;
          this.$swal("خطا!", "خطا في عملية الحذف  ", "error");
        });
    },
  },
};
</script>

<style>
.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -20px;
  margin-left: -20px;
  justify-content: flex-end;
}
.afimg {
  width: 63%;
}

.form-control {
  text-align: end;
}

.btn-group {
  direction: ltr;
}

.count {
  font-weight: 400;
  padding: 2px;
  margin-right: 6px;
  background: #e91e63;
  color: #fff;
  border: 1px;
  border-radius: 7px;
  margin-left: 6px;
  margin-top: 6px;
  padding: 6px;
}
td{
      font-weight: 600;
}
</style>
