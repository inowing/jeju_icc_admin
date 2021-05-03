<template>
    <b-card no-body>
      <b-overlay :show="spin_show2" rounded="sm">
      <b-tabs v-model="invitaion_tabIndex" small card>
        <b-tab title="Moderator/Presenter">
          좌장/발표자를 이메일로 초대합니다.
          <b-row>
            <b-col cols="3">
              <b-img class="ml-4" src="./static/images/img_url.png" alt=""></b-img>
            </b-col>
            <b-col cols="9">
              <p class="m-0">Join URL</p>
              <p class="m-0 text-primary">
                <span>{{conference_item ? conference_item.link : ''}}</span>
                <input type="hidden" ref="email2" :value="conference_item ? conference_item.link : ''">
                <b-button size="sm" variant="outline-info" @click.stop.prevent="exeCopy($event, 'email2')">
                  <b-icon-clipboard-plus></b-icon-clipboard-plus>
                </b-button>
              </p>
            </b-col>
          </b-row>
          <b-row class="p-1" style="height: 42px;">
            <b-col cols="auto" class="mr-auto">
              <b-button variant="outline-success" @click="openOverlayModal" size="sm">
                신규 계정 생성</b-button>
              <b-button href="#" variant="outline-success" size="sm" @click="excelUpload">
                <b-icon-upload></b-icon-upload> 엑셀 업로드
              </b-button>

              <b-button href="#" variant="outline-info" size="sm" @click="excelDownload">
                <b-icon-download></b-icon-download> 엑셀 템플릿 다운로드
              </b-button>
              <b-button size="sm" variant="primary" @click="sendEmail">
                <b-icon-envelope></b-icon-envelope> 초대메일 전송
              </b-button>
            </b-col>
            <b-col cols="auto">
              <div align="right">
                <b-pagination v-model="moderator_pagination.current_page" :total-rows="moderator_pagination.total_count"
                  :per-page="moderator_pagination.limit" size="sm" @change="paginationFn($event, 1)">
                </b-pagination>
              </div>
            </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col>
              <b-table :fields="moderator_fields" :items="moderator_items" selectable select-mode="multi"
                @row-selected="onModeratorSelected" ref="ModeraterSelectableTable" small bordered head-variant="light">

                <template #head(selected)="scope">
                  <div class="text-center">
                    <b-form-checkbox v-model="moderator_all" :indeterminate="moderator_indeterminate"
                      @change="toggleAllModerator($event)"> {{ scope.label }}
                    </b-form-checkbox>
                  </div>
                </template>

                <template #cell(selected)="row">
                  <template v-if="row.rowSelected">
                    <div class="text-center">
                      <b-form-checkbox v-model="row.rowSelected"
                        @change="checked(row.index, row.rowSelected, 'ModeraterSelectableTable')">
                        {{ moderator_pagination.total_count - (moderator_pagination.limit*(moderator_pagination.current_page-1) + row.index) }}</b-form-checkbox>
                    </div>
                  </template>
                  <template v-else>
                    <div class="text-center">
                      <b-form-checkbox v-model="row.rowSelected"
                        @change="checked(row.index, row.rowSelected, 'ModeraterSelectableTable')">
                        {{ moderator_pagination.total_count - (moderator_pagination.limit*(moderator_pagination.current_page-1) + row.index) }}</b-form-checkbox>
                    </div>
                  </template>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Attendee">
          참석자를 이메일로 초대합니다.
          <b-row>
            <b-col cols="3">
              <b-img class="ml-4" src="./static/images/img_url.png" alt=""></b-img>
            </b-col>
            <b-col cols="9">
              <p class="m-0">Join URL</p>
              <p class="m-0 text-primary">
                <span>{{conference_item ? conference_item.link : ''}}</span>
                <input type="hidden" ref="email3" :value="conference_item ? conference_item.link : ''">
                <b-button size="sm" variant="outline-info" @click.stop.prevent="exeCopy($event, 'email3')">
                  <b-icon-clipboard-plus></b-icon-clipboard-plus>
                </b-button>
              </p>
            </b-col>
          </b-row>
          <b-row class="p-1" style="height: 42px;">
            <b-col cols="auto" class="mr-auto">
              <b-button variant="outline-success" @click="openOverlayModal" size="sm">
                신규 계정 생성</b-button>
              <b-button href="#" variant="outline-success" size="sm" @click="excelUpload">
                <b-icon-upload></b-icon-upload> 엑셀 업로드
              </b-button>

              <b-button href="#" variant="outline-info" size="sm" @click="excelDownload">
                <b-icon-download></b-icon-download> 엑셀 템플릿 다운로드
              </b-button>
              <b-button size="sm" variant="primary" @click="sendEmail">
                <b-icon-envelope></b-icon-envelope> 초대메일 전송
              </b-button>
            </b-col>
            <b-col cols="auto">
              <div align="right">
                <b-pagination v-model="attendee_pagination.current_page" :total-rows="attendee_pagination.total_count"
                  :per-page="attendee_pagination.limit" size="sm" @change="paginationFn($event, 2)">
                </b-pagination>
              </div>
            </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col>
              <b-table :fields="attendee_fields" :items="attendee_items" selectable select-mode="multi"
                @row-selected="onAttendeeSelected" ref="AttendeeSelectableTable" small bordered head-variant="light">

                <template #head(selected)="scope">
                  <div class="text-center">
                    <b-form-checkbox v-model="attendee_all" :indeterminate="attendee_indeterminate"
                      @change="toggleAllAttendee($event)"> {{ scope.label }} </b-form-checkbox>
                  </div>
                </template>

                <template #cell(selected)="row">
                  <template v-if="row.rowSelected">
                    <div class="text-center">
                      <b-form-checkbox v-model="row.rowSelected"
                        @change="checked(row.index, row.rowSelected, 'AttendeeSelectableTable')">
                        {{ attendee_pagination.total_count - (attendee_pagination.limit*(attendee_pagination.current_page-1) + row.index) }}
                      </b-form-checkbox>
                    </div>
                  </template>
                  <template v-else>
                    <div class="text-center">
                      <b-form-checkbox v-model="row.rowSelected"
                        @change="checked(row.index, row.rowSelected, 'AttendeeSelectableTable')">
                        {{ attendee_pagination.total_count - (attendee_pagination.limit*(attendee_pagination.current_page-1) + row.index) }}
                      </b-form-checkbox>
                    </div>
                  </template>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Operator">
          운영자를 이메일로 초대합니다.
          <b-row>
            <b-col cols="3">
              <b-img class="ml-4" src="./static/images/img_url.png" alt=""></b-img>
            </b-col>
            <b-col cols="9">
              <p class="m-0">Join URL</p>
              <p class="m-0 text-primary">
                <span>{{conference_item ? conference_item.link : ''}}</span>
                <input type="hidden" ref="email1" :value="conference_item ? conference_item.link : ''">
                <b-button size="sm" variant="outline-info" @click.stop.prevent="exeCopy($event, 'email1')">
                  <b-icon-clipboard-plus></b-icon-clipboard-plus>
                </b-button>
              </p>
            </b-col>
          </b-row>
          <b-row class="p-1" style="height: 42px;">
            <b-col cols="auto" class="mr-auto">
              <b-button variant="outline-success" @click="openOverlayModal" size="sm">
                신규 계정 생성</b-button>
              <b-button href="#" variant="outline-success" size="sm" @click="excelUpload">
                <b-icon-upload></b-icon-upload> 엑셀 업로드
              </b-button>

              <b-button href="#" variant="outline-info" size="sm" @click="excelDownload">
                <b-icon-download></b-icon-download> 엑셀 템플릿 다운로드
              </b-button>
              <b-button size="sm" variant="primary" @click="sendEmail">
                <b-icon-envelope></b-icon-envelope> 초대메일 전송
              </b-button>
            </b-col>
            <b-col cols="auto">
              <div align="right">
                <b-pagination v-model="operator_pagination.current_page" :total-rows="operator_pagination.total_count"
                  :per-page="operator_pagination.limit" size="sm" @change="paginationFn($event, 0)">
                </b-pagination>
              </div>
            </b-col>
          </b-row>
          <b-row class="p-1">
            <b-col>
              <b-table :fields="operator_fields" :items="operator_items" selectable select-mode="multi"
                @row-selected="onRowSelected" ref="selectableTable" small bordered head-variant="light">

                <template #head(selected)="scope">
                  <div class="text-center">
                    <b-form-checkbox v-model="operator_all" :indeterminate="operator_indeterminate"
                      @change="toggleAll($event)">{{ scope.label }}</b-form-checkbox>
                  </div>
                </template>

                <template #cell(selected)="row">
                  <template v-if="row.rowSelected">
                    <div class="text-center">
                      <b-form-checkbox v-model="row.rowSelected"
                        @change="checked(row.index, row.rowSelected, 'selectableTable')">
                        {{ operator_pagination.total_count - (operator_pagination.limit*(operator_pagination.current_page-1) + row.index) }}
                      </b-form-checkbox>
                    </div>
                  </template>
                  <template v-else>
                    <div class="text-center">
                      <b-form-checkbox v-model="row.rowSelected"
                        @change="checked(row.index, row.rowSelected, 'selectableTable')">
                        {{ operator_pagination.total_count - (operator_pagination.limit*(operator_pagination.current_page-1) + row.index) }}
                      </b-form-checkbox>
                    </div>
                  </template>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>

      <b-modal v-model="overlayModal" title="신규 계정 생성" hide-footer>
        <b-form-group label-cols-sm="4" label-cols-lg="4" content-cols-sm content-cols-lg="8" label="이름">
          <b-form-input size="sm" v-model="userForm.name" :state="user_validation.valid1" @keydown.enter="storeUser"></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="4" label-cols-lg="4" content-cols-sm content-cols-lg="8" label="이메일">
          <b-form-input size="sm" type="email" v-model="userForm.email" :state="user_validation.valid2" @keydown.enter="storeUser"></b-form-input>
        </b-form-group>

        <b-form-group label-cols-sm="4" label-cols-lg="4" content-cols-sm content-cols-lg="8" label="소속">
          <b-form-input size="sm" v-model="userForm.department" @keydown.enter="storeUser"></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="4" label-cols-lg="4" content-cols-sm content-cols-lg="8" label="직책">
          <b-form-input size="sm" type="email" v-model="userForm.position" @keydown.enter="storeUser"></b-form-input>
        </b-form-group>

        <b-form-group 
          v-show="invitaion_tabIndex != 1"
          label-cols-sm="4" label-cols-lg="4" content-cols-sm content-cols-lg="8" label="Passcode">
          <b-form-input size="sm" type="email" v-model="userForm.passcode" @keydown.enter="storeUser"></b-form-input>
        </b-form-group>

        <b-button size="sm" class="inoBtn-150" variant="success" @click="storeUser">생성</b-button>
      </b-modal>

    

      <b-modal v-model="uploadModal" title="업로드 파일 선택" hide-footer>
        <b-overlay :show="spin_show" rounded="sm">
          <b-form-file v-model="file1" size="sm"></b-form-file>
          <b-button size="sm" class="inoBtn-150 mt-1" variant="success" @click="uploadExcelTemplate">
            업로드
          </b-button>
        </b-overlay>
      </b-modal>

      </b-overlay>
    </b-card>
  
</template>

<script>
  module.exports = {
    name: "vm_invitation_modal",
    props: ['params'],
    data: function () {
      return {
        event_id: 0,
        api_url: '',
        invitaion_tabIndex: this.params.invitaion_tabIndex,
        conference_item: this.params.conference_item,

        spin_show: false, // spinner
        spin_show2: false, // spinner

        uploadModal: false, // 엑셀 업로드 모달
        file1: null, // 엑셀파일 추가할 경우

        // 신규유저 추가할 경우.
        overlayModal: false,
        userForm: {},
        password_confirm: "",

        operator_items: [],
        operator_fields: [{
            key: "selected",
            label: "No"
          },
          {
            key: "name",
            label: "이름"
          },
          {
            key: "email",
            label: "이메일"
          },
          {
            key: "department",
            label: "소속"
          },
          {
            key: "position",
            label: "직책"
          },
          {
            key: "created_at",
            label: "생성시간"
          },
          {
            key: "time_invitation",
            label: "초대시간"
          },
          {
            key: "passcode",
            label: "passcode"
          },
        ],
        operator_pagination: {
          total_count: 0,
          count_pages: 0,
          current_page: 1,
          limit: 5,
        },
        operator_allSelected: [],
        operator_all: false,
        operator_indeterminate: false,

        /** moderator,presenter */
        moderator_items: [],
        moderator_fields: [{
            key: "selected",
            label: "No"
          },
          {
            key: "name",
            label: "이름"
          },
          {
            key: "email",
            label: "이메일"
          },
          {
            key: "department",
            label: "소속"
          },
          {
            key: "position",
            label: "직책"
          },
          {
            key: "created_at",
            label: "생성시간"
          },
          {
            key: "time_invitation",
            label: "초대시간"
          },
          {
            key: "passcode",
            label: "passcode"
          },
        ],
        moderator_pagination: {
          total_count: 0,
          count_pages: 0,
          current_page: 1,
          limit: 5,
        },
        moderator_allSelected: [],
        moderator_all: false,
        moderator_indeterminate: false,
        /** moderator,presenter */

        /** attendee */
        attendee_items: [],
        attendee_fields: [{
            key: "selected",
            label: "No"
          },
          {
            key: "name",
            label: "이름"
          },
          {
            key: "email",
            label: "이메일"
          },
          {
            key: "department",
            label: "소속"
          },
          {
            key: "position",
            label: "직책"
          },
          {
            key: "created_at",
            label: "생성시간"
          },
          {
            key: "time_invitation",
            label: "초대시간"
          }
        ],
        attendee_pagination: {
          total_count: 0,
          count_pages: 0,
          current_page: 1,
          limit: 5,
        },
        attendee_allSelected: [],
        attendee_all: false,
        attendee_indeterminate: false,
        /** attendee */

      };
    },
    watch: {
      operator_allSelected(newValue, oldValue) {
        // Handle changes in individual flavour checkboxes
        console.log(newValue, oldValue);
        if (newValue.length === 0) {
          this.operator_indeterminate = false;
          this.operator_all = false;
        } else if (newValue.length === this.operator_items.length) {
          this.operator_indeterminate = false;
          this.operator_all = true;
        } else {
          this.operator_indeterminate = true;
          this.operator_all = false;
        }
      },
      moderator_allSelected(newValue, oldValue) {
        // Handle changes in individual flavour checkboxes
        console.log(newValue, oldValue);
        if (newValue.length === 0) {
          this.moderator_indeterminate = false;
          this.moderator_all = false;
        } else if (newValue.length === this.moderator_items.length) {
          this.moderator_indeterminate = false;
          this.moderator_all = true;
        } else {
          this.moderator_indeterminate = true;
          this.moderator_all = false;
        }
      },
      attendee_allSelected(newValue, oldValue) {
        if (newValue.length === 0) {
          this.attendee_indeterminate = false;
          this.attendee_all = false;
        } else if (newValue.length === this.attendee_items.length) {
          this.attendee_indeterminate = false;
          this.attendee_all = true;
        } else {
          this.attendee_indeterminate = true;
          this.attendee_all = false;
        }
      },
    },
    mounted: function () {
      this.$nextTick(async function () {
        this.event_id = this.$store.getters.event_id;
        this.api_url = this.$store.getters.api_url;
        await this.getList(0, 1); // operator
        await this.getList(1, 1); // Moderator/Presenter
        await this.getList(2, 1); // Attendee
      });
    },
    computed: {
      user_validation: function (params) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        let valid1 = this.userForm.name ? true : false;
        let valid2 = this.userForm.email && re.test(String(this.userForm.email).toLowerCase()) ? true : false;
        let valid_result = valid1 && valid2;
        return {
          valid1,
          valid2,
          valid_result
        };
      }
    },
    methods: {
      getList: async function (userType, page) {
        let limit = 50;
        let conference_id = this.conference_item.id;
        let url = `${this.api_url}/conference_invitation?conference_id=${conference_id}&user_type=${userType}&page=${page}&limit=${limit}`;
        try {
          let rs = await axios.get(url);
          if (userType == 0) {
            this.operator_items = rs.data.result; // operator
            this.operator_pagination = rs.data.pagination;
          } else if (userType == 1) {
            this.moderator_items = rs.data.result; // Moderator/Presenter
            this.moderator_pagination = rs.data.pagination;
          } else {
            this.attendee_items = rs.data.result; // Attendee
            this.attendee_pagination = rs.data.pagination;
          }
        } catch (error) {
          console.error(error);
          let pagination = {
            total_count: 0,
            count_pages: 0,
            current_page: 1,
            limit: limit,
          }
          if (userType == 0) {
            this.operator_items = [];
            this.operator_pagination = pagination;
          } else if (userType == 1) {
            this.moderator_items = []; // Moderator/Presenter
            this.moderator_pagination = pagination;
          } else {
            this.attendee_items = []; // Attendee
            this.attendee_pagination = pagination;
          }
        }
      },
      exeCopy: function (event, ref_id) {
        // 이메일 주소 복사
        let testingCodeToCopy = this.$refs[ref_id];
        testingCodeToCopy.setAttribute("type", "text");
        testingCodeToCopy.select();
        try {
          var successful = document.execCommand("copy");
          if (successful) {
            this.$toast("Good", "VM address copied", "success");
          } else {
            this.$toast("Ooops", "unable to copy", "danger");
          }
        } catch (err) {
          this.$toast("Ooops", "unable to copy", "danger");
        }
        testingCodeToCopy.setAttribute("type", "hidden");
        window.getSelection().removeAllRanges();
      },
      openOverlayModal: function () {
        this.userForm = {};
        this.password_confirm = "";
        this.overlayModal = true;
      },
      storeUser: async function () {
        if (!this.user_validation.valid_result) {
          alert("폼을 입력해 주세요.");
          return;
        }
        try {
          let user_type = this.invitaion_tabIndex == 0 ? 1 : this.invitaion_tabIndex == 1 ? 2 : 0;
          
          let url = `${this.api_url}/conference_invitation`;
          let formData = new FormData();
          formData.append("conference_id", this.conference_item.id);
          formData.append("user_type", user_type);
          formData.append("name", this.userForm.name);
          formData.append("department", this.userForm.department); // 소속
          formData.append("position", this.userForm.position); // 직책
          formData.append("passcode", this.userForm.passcode);
          formData.append("email", this.userForm.email);
          let rs = await axios.post(url, formData, {
            Headers: {
              "Content-Type": "application/json",
            },
          });
          
          this.$showMsgBoxTwo(rs.status);
          await this.getList(user_type, 1);
          this.overlayModal = false;
        } catch (error) {
          this.$showMsgBoxTwo(error.response.status,"",error.response.statusText);
        }
      },
      excelUpload: function () {
        this.uploadModal = true;
      },
      uploadExcelTemplate: async function () {
        // http://127.0.0.1:8000/api/v1/conference_invitation/upload_excel?conference_id=6&user_type=0
        try {
          let user_type = this.invitaion_tabIndex == 0 ? 1 : this.invitaion_tabIndex == 1 ? 2 : 0;
          let url = `${this.api_url}/conference_invitation/upload_excel`;
          // http://127.0.0.1:8000/api/v1/conference_invitation/upload_excel
          
          let formData = new FormData();
              formData.append("conference_id", this.conference_item.id);
              formData.append("user_type", user_type);
              formData.append("users", this.file1);
          
          this.spin_show = true;
          let rs = await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart-form/data",
            }
          });
            // <b-spinner v-show="spin_show" variant="primary" label="Spinning"></b-spinner>
          this.spin_show = false;
          if (rs.data.result.fail) {
            console.log(rs);
            this.$showMsgBoxTwo(500, "", `${rs.data.result.fail} 라인의 입력이 실패하였습니다.`);
          } else {
            this.$showMsgBoxTwo(200, "", '성공하였습니다.');
            this.uploadModal = false;
          }
          await this.getList(user_type, 1);
        } catch (error) {
          this.$showMsgBoxTwo(error.response.status, "", error.response.statusText);
        }

      },
      excelDownload: function () {
        window.location.href = `${window.location.origin}/data/form/conference.csv`;
      },
      sendEmail: async function () {
        console.log('send mail');
        try {
          // todo. 선택된 탭의 체크된 리스트를 보내야 한다.
          let user_type = this.invitaion_tabIndex == 0 ? 1 : this.invitaion_tabIndex == 1 ? 2 : 0;
          let arr = user_type == 0 ? this.operator_allSelected : (user_type == 1 ? this.moderator_allSelected : this.attendee_allSelected);
          
          if (arr.length == 0) {
            return;
          }

          if (confirm(`${arr.length}명에 초대메일을 전송하시겠습니까?`)) {
            // let user_type = this.invitaion_tabIndex;
            
            // user_type : 0 - Operator, 1 - Moderator/Presenter, 2 - Attendee, 3 - language
            let url = `${this.api_url}/conference_invitation/send_invitation`;
            let formData = new FormData();
              formData.append("conference_id", this.conference_item.id);
              formData.append("user_type", user_type);
  
            for (var i = 0; i < arr.length; i++) {
              let item = arr[i];
              console.log(item);
              formData.append("users[]", item.id); 
            }
            
            this.spin_show2 = true;
            let rs = await axios.post(url, formData, {
              Headers: {
                "Content-Type": "application/json"
              }
            });
            console.log(rs);
            this.spin_show2 = false;
            let rsCnt = rs.data.result;
            this.$showMsgBoxTwo(rs.status, "", `${rsCnt}명에 초청 email을 전송했습니다.`);
            this.modal3 = false;
          }

        } catch (error) {
          this.$showMsgBoxTwo(error.response.status, "", error.response.statusText);
        }

        this.$emit('get-list'); // 이름이 같으면 동작 안된다.
      },
      paginationFn: async function (requestPage, type) {
        // await getOperationList()
        this.getList(type, requestPage);
        console.log("requestPage ", requestPage, type);
      },
      onRowSelected(items) {
        this.operator_allSelected = items;
      },
      onModeratorSelected(items) {
        this.moderator_allSelected = items;
      },
      onAttendeeSelected(items) {
        this.attendee_allSelected = items;
      },
      selectAllRows(target) {
        this.$refs[target].selectAllRows();
      },
      clearSelected(target) {
        this.$refs[target].clearSelected();
      },
      checked(index, checked, selectableTable) {
        let tableRef = this.$refs[selectableTable];
        checked === true ? tableRef.selectRow(index) : tableRef.unselectRow(index);
      },
      toggleAll(checked) {
        this.operator_all = checked;
        checked ? this.selectAllRows("selectableTable") : this.clearSelected("selectableTable");
      },
      toggleAllModerator(checked) {
        this.moderator_all = checked;
        checked ? this.selectAllRows("ModeraterSelectableTable") : this.clearSelected("ModeraterSelectableTable");
      },
      toggleAllAttendee(checked) {
        this.attendee_all = checked;
        checked ? this.selectAllRows("AttendeeSelectableTable") : this.clearSelected("AttendeeSelectableTable");
      }
    }
  };
</script>
