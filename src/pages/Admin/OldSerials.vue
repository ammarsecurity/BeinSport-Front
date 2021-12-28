<template>
  <div class="tables-basic">
    <b-row>
      <b-button
        type="submit"
        size="sm"
        class="auth-btn mb-3"
        @click="addserials()"
        variant="inverse"
        >اضافة سيريلات</b-button
      >
 
    </b-row>
    <div class="separator">البحث</div>

    <form class="mt" @submit.prevent="getGetSerials()">
      <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
        {{ errorMessage }}
      </b-alert>
      <b-row>
        <b-col>
          <label style="margin-bottom: 6px">اسم الملف</label>
          <b-input-group class="mb-3">
            <b-form-select
              style="height: 37px"
              :options="filesnames"
              v-model="search.fileName"
            />
          </b-input-group>
        </b-col>
        <b-col>
          <label style="margin-bottom: 6px">المخزن</label>
          <b-input-group class="mb-3">
            <b-form-select
              style="height: 37px"
              :options="stores"
              v-model="search.storeId"
            />
          </b-input-group>
        </b-col>

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
            <label>القسم</label>
            <select class="form-control no-border" v-model="search.localID">
              <option value="">القسم</option>
              <option value="beIN">beIN</option>
              <option value="OSN">OSN</option>
              <option value="HUMAX">HUMAX</option>
              <option value="MASTER CARDS">MASTER CARDS</option>
              <option value="MASTER CARDS">Others</option>
            </select>
          </div>
        </b-col>
      </b-row>

      <div class="form-group">
        <label></label>
        <input
          class="form-control no-border"
          v-model="search.serialInfo"
          type="text"
          name="serialInfo"
          placeholder="معلومات السيريال"
        />
      </div>

      <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse"
        >بحث</b-button
      >
    </form>
    <b-row>
    
      <b-button
        type="submit"
        size="sm"
        class="auth-btn mb-3"
        @click="deletselect()"
        variant="danger"
        style="    margin-right: 10px;"
        >مسح</b-button
      >
    </b-row>
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
                  <th>local ID</th>
                  <th>Local Carton</th>
                  <th>Insert Date</th>
                  <th>UpDate Date</th>
                  <th>File Name</th>
                  <th>
                    <input
                      type="checkbox"
                      v-model="selectAll"
                      @click="select"
                    />
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
                    <input type="checkbox" :value="row.id" v-model="selected" />
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
        <b-button
          type="submit"
          @click="Deleteseach()"
          size="sm"
          class="auth-btn mb-3"
          variant="danger"
          v-if="search.fileName != '' || search.storeId != '' || search.date != '' || search.serialInfo != ''"
          >مسح نتائج البحث
        </b-button>
      </b-col>
    </b-row>

    <b-modal
      id="addModel"
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
        <form class="mt" @submit.prevent="addserialsnow()">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{ errorMessage }}
          </b-alert>
          <b-col>
            <div class="form-group">
              <label></label>
              <input
                class="form-control no-border"
                v-model="addform.FileName"
                type="text"
                name="filename"
                placeholder="اسم الملف"
                required
              />
            </div>
          </b-col>
          <b-col>
            <label style="margin-bottom: 6px">المخزن</label>
            <b-input-group class="mb-3">
              <b-form-select
                style="height: 37px"
                :options="stores"
                v-model="addform.StoreId"
                required
              />
            </b-input-group>
          </b-col>
          <b-col>
            <div class="form-group">
              <label></label>
              <select class="form-control no-border" v-model="addform.LocalID">
                <option value="0">القسم</option>
                <option value="beIN">beIN</option>
                <option value="OSN">OSN</option>
                <option value="HUMAX">HUMAX</option>
                <option value="MASTER CARDS">MASTER CARDS</option>
                <option value="MASTER CARDS">Others</option>
              </select>
            </div>
          </b-col>

          <b-col>
            <div class="form-group">
              <label></label>
              <input
                class="form-control no-border"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
                type="file"
                name="serialInfo"
                required
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
                @click="$bvModal.hide('addModel')"
                >غلق</b-button
              ></b-col
            >

            <b-col cols="8"
              ><b-button class="mt-3" variant="success" block type="submit"
                >اضافة</b-button
              ></b-col
            >
          </b-row>
        </form>
      </div>
    </b-modal>

    <b-modal
      id="sentserials"
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
        <form class="mt" @submit.prevent="sentserialssnow()">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{ errorMessage }}
          </b-alert>
          <b-col>
            <div class="form-group">
              <label></label>
              <input
                class="form-control no-border"
                v-model="changeform.serialInfo"
                type="text"
                name="serialInfo"
                required
                placeholder="رقم الكارتون او رقم الموديل او رقم الجهاز"
              />
            </div>
          </b-col>
          <b-col>
            <label style="margin-bottom: 6px">المخزن</label>
            <b-input-group class="mb-3">
              <b-form-select
                style="height: 37px"
                :options="stores"
                v-model="changeform.StoreId"
                required
              />
            </b-input-group>
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
                @click="$bvModal.hide('sentserials')"
                >غلق</b-button
              ></b-col
            >

            <b-col cols="8"
              ><b-button class="mt-3" variant="success" block type="submit"
                >اضافة</b-button
              ></b-col
            >
          </b-row>
        </form>
      </div>
    </b-modal>

    <b-modal
      id="sentserials2"
      hide-footer
      hide-header
      no-close-on-backdrop
      body-text-variant="light"
    >
      <div class="d-block text-center">
        <hr />
        <div class="center-elem">
          <semipolar-spinner
            :animation-duration="2000"
            :size="65"
            color="#ff1d5e"
            v-if="isLoading"
          />
        </div>
        <form class="mt" @submit.prevent="changeselect()">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{ errorMessage }}
          </b-alert>

          <b-col>
            <label style="margin-bottom: 6px">المخزن</label>
            <b-input-group class="mb-3">
              <b-form-select
                style="height: 37px"
                :options="stores"
                v-model="changeform.StoreId"
                required
              />
            </b-input-group>
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
                @click="$bvModal.hide('sentserials2')"
                >غلق</b-button
              ></b-col
            >

            <b-col cols="8"
              ><b-button class="mt-3" variant="success" block type="submit"
                >اضافة</b-button
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
    };
  },
  mounted() {
    // this.getGetSerials();
    this.getGetFileName();
    this.getGetStore();
  },
  methods: {
    changeselect1() {
      if (this.selected.length == 0) {
        this.$swal("خطا!", "يرجى التحديد  ", "error");
        return;
      }
      this.$bvModal.show("sentserials2");
    },

    changeselect() {
      this.$swal({
        title: "هل انت متأكد?",
        text: "هل انت متأكد من نقل الى المخزن",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم ,  انقل!",
        CancelButtonText: "الغاء",
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          for (var i = 0; i < this.selected.length; i++) {
            this.listid.push({ id: this.selected[i] });
          }
          this.axios
            .put(
              `Admin/ChangeSerialStoreByIds?storeId=${this.changeform.StoreId}`,
              this.listid
            )
            .then((res) => {
              if (res) {
                this.$swal("تم!", "تم النقل بنحاج", "success");
                this.getGetSerials();
                this.selectAll = false;
                this.selected = [];
                this.listid = [];
                this.$bvModal.hide("sentserials2");
                this.isLoading = false;
              }
            })

            .catch(function() {
              this.isLoading = false;
              this.$swal("خطا!", "خطا في عملية النقل  ", "error");
            });
        }
      });
    },
    deletselect() {
      if (this.selected.length == 0) {
        this.$swal("خطا!", "يرجى التحديد  ", "error");
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
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          for (var i = 0; i < this.selected.length; i++) {
            this.listid.push({ id: this.selected[i] });
          }
          this.axios
            .put("Admin/DeletOldSerialStoreByIds", this.listid)
            .then((res) => {
              if (res) {
                this.$swal("تم!", "تم الحذف بنحاج", "success");
                this.getGetSerials();
                this.selectAll = false;
                this.selected = [];
                this.listid = [];
                this.isLoading = false;
              }
            })

            .catch(function() {
              this.isLoading = false;
              this.$swal("خطا!", "خطا في عملية الحذف  ", "error");
            });
        }
      });
    },
    select() {
      this.selected = [];
      if (!this.selectAll) {
        for (let i in this.allserials) {
          this.selected.push(this.allserials[i].id);
        }
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    addserialsnow() {
      if (
        this.addform.LocalID == 0 ||
        this.addform.StoreId == "" ||
        this.addform.FileName == "" ||
        this.file == ""
      ) {
        this.$swal("انتباه!", "جميع الخانات ملطوبة", "info");
      }
      let formData = new FormData();
      formData.append("StoreId", this.addform.StoreId);
      formData.append("FileName", this.addform.FileName);
      formData.append("LocalID", this.addform.LocalID);
      formData.append("file", this.file);
      this.axios
        .post("Admin/AddXlsxOldSerailFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res) {
            this.$swal("تم!", "  تم الاضافة بنحاج", "success");
            this.$bvModal.hide("addModel");
            this.isLoading = false;
            this.file = "";
            this.addform = {};
          }
        })

        .catch(function() {
          this.isLoading = false;
          this.alert = true;
        });
    },
    sentserialssnow() {
      this.isLoading = true;
      this.axios
        .put(
          `Admin/ChangeSerialStore?serialInfo=${this.changeform.serialInfo}&storeId=${this.changeform.StoreId}`
        )
        .then((res) => {
          if (res) {
            this.$swal("تم!", "  تم الاضافة بنحاج", "success");
            this.$bvModal.hide("sentserials");
            this.isLoading = false;
            this.getGetSerials();
            this.changeform = {};
          }
        })

        .catch(function() {
          this.isLoading = false;
          this.alert = true;
        });
    },
    addserials() {
      this.$bvModal.show("addModel");
    },
    sentserials() {
      this.$bvModal.show("sentserials");
    },

    getGetSerials() {
      if (this.search.localID == "") {
        this.$swal("انتباه", "يرجى اختيار القسم", "info");

        return;
      }
      this.isLoading = true;
      this.axios
        .get(
          `Admin/GetOldSerial?skip=0&take=100&fileName=${this.search.fileName}&storeId=${this.search.storeId}&date=${this.search.date}&serialInfo=${this.search.serialInfo}`
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
          `Admin/GetOldSerial?skip=${tempPage - 1}&take=100&fileName=${
            this.search.fileName
          }&storeId=${this.search.storeId}&date=${
            this.search.date
          }&serialInfo=${this.search.serialInfo}`
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
          `Admin/GetOldSerial?skip=${tempPage - 1}&take=100&fileName=${
            this.search.fileName
          }&storeId=${this.search.storeId}&date=${
            this.search.date
          }&serialInfo=${this.search.serialInfo}`
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
        .get("Admin/GetOldFilesName")
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
        .get("Admin/GetStores")
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
                `Admin/DeleteOldSearchSerial?fileName=${this.search.fileName}&storeId=${this.search.storeId}&date=${this.search.date}&serialInfo=${this.search.serialInfo}`
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
