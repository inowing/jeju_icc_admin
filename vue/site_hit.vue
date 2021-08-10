<template>
  <section>
    <b-row>
      <b-col>
        <h6><b>상세검색</b></h6>
      </b-col>
    </b-row>
    <br>

    <b-row>

      <b-col cols="7">
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

    </b-row>
    <br>

    <b-row>
      <b-col>
        <!-- <b-table small :fields="fields" :items="items" bordered center responsive="sm">
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
        ></b-pagination> -->

        <div>
          <canvas id="myChart"></canvas>
        </div>

      </b-col>
    </b-row>
  </section>
</template>

<script>
module.exports = {
  name: "siteHit",
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
        {key: 'id', label: '번호', tdClass: 'text-center',},
        {key: 'date', label: '일자', tdClass: 'text-center'},
        {key: 'hit', label: '사이트 방문수', tdClass: 'text-center'},
        {key: 'empty', label: '비고', tdClass: 'text-center'},

      ],
      items: [
        // {id: 6, type: '셀러', company: '기업 #1', email: 'admin@companyA.com', loginCnt: 12},
      ],
      chart: null,
      chart_setting: {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '사이트 방문수',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1
            }]
        },
        options: {
          plugins:{
            legend: {
              display: false
            },
            scales: {
              y: {
                  beginAtZero: true
              }
            }
          },
        }
      }
    };
  },
  mounted: async function () {
    this.$nextTick(async function () {
      this.event_id = this.$store.getters.event_id;
      this.api_url = this.$store.getters.api_url;
      this.id = this.$route.query.id;
      // await this.getData();
      console.log('mounted nextTick');
    var ctx = document.getElementById('myChart');
    this.chart = new Chart(ctx, this.chart_setting);
      await this.getChartData();
    });
  },
  methods: {
    loginInfo(item, index, target) {
      window.location.href = "#/stats_login_detail?user_id=" + item.user_id;
      console.log(item, index, target);
    },
    getData: async function () { // 데이터 가져오기
      let url = `${this.api_url}/front/bm_statistic/get_site_hit_statistic?event_id=${this.event_id}&page=${this.currentPage}&limit=${this.perPage}&attend_type=${this.attendType}&date_from=${this.dateFrom}&date_to=${this.dateTo}&search=${this.search}`;
      let rs = await axios.get(url);
      let data = rs.data.result;
      let pagination = rs.data.pagination;
      let new_object = [];

      let items = Object.keys(data);
      for (var j = 0; j < items.length; j++) {

        new_object[j] = {
          id: data[j]['id'],
          date: data[j]['date'],
          hit: data[j]['hit'],
        };
      }
      console.log(new_object)


      this.currentPage = pagination.current_page;
      this.rows = pagination.total_count;
      this.perPage = pagination.limit;

      this.items = new_object;
    },
    getChartData: async function () {
      let url = `${this.api_url}/front/bm_statistic/get_site_hit_statistic_chart?event_id=${this.event_id}&date_from=${this.dateFrom}&date_to=${this.dateTo}`;
      let rs = await axios.get(url);
      let data = rs.data.result;

      this.chart_setting.data.labels = data.label;
      this.chart_setting.data.datasets[0].data = data.hit;
      console.log('chart_setting', this.chart_setting);
      this.chart.update();
    },
    onContextFrom(ctx) {
      if (ctx.selectedYMD == "")
        return false;

      this.dateFrom = ctx.selectedYMD
      // this.getData();
      this.getChartData();
    },
    onContextTo(ctx) {
      if (ctx.selectedYMD == "")
        return false;

      this.dateTo = ctx.selectedYMD
      // this.getData();
      this.getChartData();
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
