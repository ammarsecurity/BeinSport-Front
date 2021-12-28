<template>
  <div class="tables-basic">
    <b-row>
    
    </b-row>
    <div class="separator">البحث</div>

    <form class="mt" @submit.prevent="GetSales()">
      <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
        {{ errorMessage }}
      </b-alert>
      <b-row>
    
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

            <b-col>
          
          <div class="form-group">
    <label style="margin-bottom: 6px">نقطة بيع</label>
        <input
          class="form-control no-border"
          v-model="search.clientName"
          type="text"
          name="serialInfo"
          placeholder=""
        />
      </div>
        </b-col>


      </b-row>
      <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse"
        >بحث</b-button
      >
    </form>

    <h2 class="page-title">
      جدول - <span class="fw-semi-bold">المبيعات</span>
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
                  <th>الاسم الكامل</th>
                  <th>رقم الهاتف</th>
                  <th>السعر</th>
                  <th>ID</th>
                  <th>المخزن</th>
                  <th>نقطة بيع</th>
                  <th>التاريخ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in allserials" v-bind:key="row.id">
                  <th scope="row">{{ pag - 1 + index + 1 }}</th>
                  <td>
                    {{ row.fullName }}
                  </td>
                  <td>
                    {{ row.phoneNumer }}
                  </td>
                  <td>
                    {{ row.price }}
                  </td>
                  <td>
                    {{ row.smartcardID }}
                  </td>
                <td>
                    {{ row.storeName }}
                  </td>
                  <td>
                    {{ row.clinetName }}
                  </td>

                  <td>
                    {{ row.insertDate.split("T")[0] }}
                  </td>

                
                
                </tr>
              </tbody>
            </table>
            <div class="md-group">
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
     stores: [],
      storeslist: [],
      isLoading: false,
      search: {
       clientName : "",
        storeId: "",
    
      },
      allserials: [],
      pag: 1,
      index: 0,
      length: "",
      Next: false,
      Previous: "",
    };
  },
  mounted() {
    this.GetSales();
   this.getGetStore();
  },
  methods: {
 

 getGetStore() {
      this.isLoading = true;
      this.axios
        .get("Admin/GetStores")
        .then((res) => {
               this.stores.push({'value' : "" , 'text' : "اختر"});
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
    GetSales() {
      this.isLoading = true;
      this.axios
        .get(`Admin/GetSales?skip=0&take=20&storeId=${this.search.storeId}&clientName=${this.search.clientName}`)
        .then((res) => {
          this.allserials = res.data.data;
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
      const tempPage = this.pag + 10;

      this.axios
        .get(
          `Admin/GetSalesl?skip=${tempPage - 1}&take=20&storeId=${this.search.storeId}&clientName=${this.search.clientName}`
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

      const tempPage = this.pag - 10;
      this.axios
        .get(
          `Admin/GetSalesl?skip=${tempPage - 1}&take=20&storeId=${this.search.storeId}&clientName=${this.search.clientName}`
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
</style>
