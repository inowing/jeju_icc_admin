<template>
  <section>
    <b-row>
      <b-col>
        <h6><b>상세검색</b></h6>
      </b-col>
    </b-row>
    <br>

    <b-row>
      <b-col cols="2">
        <b-form-select v-model="selected" @change="changeType" :options="options" size="sm"></b-form-select>
      </b-col>
      <b-col cols="6">
        <b-form inline size="sm">

          <b-input-group size="sm">
            <b-form-input
                id="example-input"
                v-model="date1"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off"
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker
                  v-model="date1"
                  button-only
                  right
                  locale="en-US"
                  aria-controls="example-input"
                  @context="onContextFrom"
                  size="sm"
              ></b-form-datepicker>
            </b-input-group-append>
          </b-input-group>

          &nbsp;-&nbsp;

          <b-input-group size="sm">
            <b-form-input
                id="example-input2"
                v-model="date2"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off"
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker
                  v-model="date2"
                  button-only
                  right
                  locale="en-US"
                  aria-controls="example-input2"
                  @context="onContextTo"
                  size="sm"
              ></b-form-datepicker>
            </b-input-group-append>
          </b-input-group>

        </b-form>

      </b-col>
      <b-col cols="2">
        <b-input-group size="sm" align-v="baseline">
          <b-form-input v-model="search" aria-placeholder="검색어를 입력하세요."></b-form-input>
          <b-input-group-append>
            <b-button variant="info" @click="makeSearch" size="sm">검색하기</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col cols="2">
        <b-button variant="info" @click="excelDownload" size="sm">
          <b-icon-download></b-icon-download>
          엑셀 다운로드
        </b-button>
      </b-col>
    </b-row>
    <br>

    <b-row>
      <b-col>
        <b-table small :fields="fields" :items="items" responsive="sm" class="text-center">
          <template #cell(manageBtn)="row">
            <b-button size="sm" pill variant="outline-success" @click="loginInfo(row.item, row.index, $event.target)">
              상세보기
            </b-button>
          </template>
        </b-table>

        <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            first-number
        ></b-pagination>

      </b-col>
    </b-row>
  </section>
</template>

<script>
module.exports = {
  name: "statsLogin",
  data: function () {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    // 15th two months prior
    const minDate = new Date(today)
    minDate.setMonth(minDate.getMonth() - 2)
    minDate.setDate(15)
    // 15th in two months
    const maxDate = new Date(today)
    maxDate.setMonth(maxDate.getMonth() + 2)
    maxDate.setDate(15)
    return {
      date1: '',
      date2: '',
      formatted: '',
      selectedDate: '',
      dateFrom: '',
      dateTo: '',
      attendType: '',
      currentPage: 0,
      rows: 0,
      perPage: 10,
      search: "",

      selected: null,
      options: [
        {value: null, text: '전체'},
        {value: 'buyer', text: '바이어'},
        {value: 'seller', text: '셀러'}
      ],
      fields: [
        {key: 'id', label: '번호'},
        {key: 'type', label: '구분'},
        {key: 'company', label: '업체'},
        {key: 'email', label: '아이디'},
        {key: 'loginCnt', label: '총 로그인 횟수'},
        {key: 'manageBtn', label: '상세보기'}
      ],
      items: [
        // {id: 6, type: '셀러', company: '기업 #1', email: 'admin@companyA.com', loginCnt: 12},
      ]

    };
  },
  mounted: async function () {
    this.$nextTick(async function () {
      this.event_id = this.$store.getters.event_id;
      this.api_url = this.$store.getters.api_url;
      this.id = this.$route.query.id;
      await this.getData();
    });
  },
  methods: {
    loginInfo(item, index, target) {
      window.location.href = "#/stats_login_detail?user_id=" + item.user_id;
      console.log(item, index, target);
    },
    getData: async function () { // 데이터 가져오기
      let url = `${this.api_url}/front/bm_statistic/get_login_statistic_list?event_id=${this.event_id}&page=${this.currentPage}&limit=${this.perPage}&attend_type=${this.attendType}&date_from=${this.dateFrom}&date_to=${this.dateTo}&search=${this.search}`;
      let rs = await axios.get(url);
      let data = rs.data.result;
      let pagination = rs.data.pagination;
      let new_object = [];

      let items = Object.keys(data);
      for (var j = 0; j < items.length; j++) {

        new_object[j] = {
          id: data[j]['id'],
          type: data[j]['attend_type'] == 0 ? "바이어" : "셀러",
          company: data[j]['company_name'],
          email: data[j]['user_email'],
          loginCnt: data[j]['count'],
          user_id: data[j]['user_id'],
        };
      }
      console.log(new_object)


      this.currentPage = pagination.current_page;
      this.rows = pagination.total_count;
      this.perPage = pagination.limit;

      this.items = new_object;
    },
    onContextFrom(ctx) {
      if (ctx.selectedYMD == "")
        return false;

      this.dateFrom = ctx.selectedYMD
      this.getData();
    },
    onContextTo(ctx) {
      if (ctx.selectedYMD == "")
        return false;

      this.dateTo = ctx.selectedYMD
      this.getData();
    },
    changeType(selected_type) {
      if (selected_type == null) {
        this.attendType = "";
      } else if (selected_type == "buyer") {
        this.attendType = "0";
      } else if (selected_type == "seller") {
        this.attendType = "1";
      }
      this.currentPage = 1;
      this.getData();
    },
    makeSearch() {
      console.log(this.search)
      // this.search = "";
      this.getData();
    },
    excelDownload() {
      window.location.href = `${this.api_url}/front/bm_statistic/get_login_statistic_list_excel?event_id=${this.event_id}&page=${this.currentPage}&limit=${this.perPage}&attend_type=${this.attendType}&date_from=${this.dateFrom}&date_to=${this.dateTo}&search=${this.search}`;
    }
  },
  watch: {
    currentPage: {
      handler: function (new_val, old) {
        if (new_val == null || old == null)
          return false;

        this.getData().catch(error => {
          console.error(error)
        })
      }
    }
  }
};
</script>
