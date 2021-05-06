<template>
  <section>
    <!-- 온라인전시관 컨첸츠 관리의 리스트 추가버튼 클릭시 나오는 입력폼 입니다. -->
    <b-row class="mb-1">
      <b-col>
        <h6><strong>2.메뉴 및 컨텐츠 관리 > 컨텐츠 (관리) > {{$route.query.id ? company.name + ' 수정' : '리스트 추가'}}</strong></h6>
        <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
          <b-icon-arrow-left></b-icon-arrow-left> 이전으로
        </b-button>
      </b-col>
    </b-row>
    <b-card>
      <b-row>
        <b-col>
          <b-form>
            <b-form-group label="대분류 :">
              <b-form-select v-model="category.selected_top" :options="category.topcategory" size="sm" @change="getSubcategory"></b-form-select>
            </b-form-group>
          </b-form>
        </b-col>
        <b-col>
          <b-form>
            <b-form-group label="소분류 :">
              <b-form-select v-model="category.selected_sub" :options="category.subcategory" size="sm"></b-form-select>
            </b-form-group>
          </b-form>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form>
            <b-form-group label="기업 선택 :">
              <b-form-select v-model="company_index" :options="company_list" size="sm" @change="company = company_list[company_index]"></b-form-select>
            </b-form-group>
          </b-form>
        </b-col>
        <b-col>
          <b-form>
            <b-form-group label="기업노출/미노출 :">
              <b-form-radio-group size="sm" buttons  button-variant="outline-primary" v-model="boothForm.is_top" :options="is_show_options">
              </b-form-radio-group>
            </b-form-group>
          </b-form>
        </b-col>
      </b-row>
    </b-card>

    <b-card no-body class="mt-1">
      <b-tabs v-model="tabIndex" card>
        <b-tab title="국문" active>
          <b-row class="mb-3">
            <b-col>
              <b-card>
                <b-card-text align="center" class="ino-400-320-wrap">
                  <div><b-img :src="logo_preview_local||logo_preview_default" fluid></b-img></div>
                </b-card-text>
              </b-card>
              <b-form inline class="mt-1">
                <span class="mr-sm-2" style="width: 100px;">업체로고#1</span>
                <span>:&nbsp;</span>
                <b-form-file v-model="logo_file" @change="onFileChange($event, 'logo_preview_local')"
                  size="sm" class="mr-1" style="width:250px;">
                </b-form-file>
                <b-button @click="logo_file = null; logo_preview_local = null; logo_del = true;" size="sm" variant="danger">삭제</b-button>
              </b-form>
              <b-form inline class="mt-1">
                <span class="mr-sm-2" style="width: 100px;">카탈로그#1</span>
                <span>:&nbsp;</span>
                <b-input-group v-show="file_src" prepend="file" size="sm">
                    <b-form-input disabled :value="file_src"></b-form-input>
                    <b-input-group-append>
                        <b-button variant="outline-success" @click="fileDownload(file_src)"><b-icon-download></b-icon-download></b-button>
                        <b-button variant="danger" @click="file=null; file_src=''; file_del = true;"><b-icon-trash></b-icon-trash></b-button>
                    </b-input-group-append>
                </b-input-group>
                <b-form-file v-show="!file_src" v-model="file" size="sm" class="w-50 mr-sm-2"></b-form-file>
              </b-form>
              <b-form inline class="mt-1">
                <span class="mr-sm-2" style="width: 100px;">방문자</span>
                <span>:&nbsp;</span>
                <b-form-radio-group size="sm" v-model="boothForm.is_show_visitor" :options="is_show_options"
                  buttons button-variant="outline-primary"></b-form-radio-group>
              </b-form>
            </b-col>
            <b-col>
              <b-card>
                <h6>기업개요</h6>
                <b-table-simple small bordered head-variant="light">
                  <b-tbody>
                    <b-tr variant="secondary">
                      <b-th style="width: 150px;" class="text-center">업체명</b-th>
                      <b-td> {{company.name}} </b-td>
                    </b-tr>
                    <b-tr>
                      <b-th class="text-center">대표자</b-th>
                      <b-td>{{company.representation_name}}</b-td>
                    </b-tr>
                    <b-tr variant="secondary">
                      <b-th class="text-center">소재지</b-th>
                      <b-td>{{company.address}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-th class="text-center">연락처</b-th>
                      <b-td>{{company.representation_phone}}</b-td>
                    </b-tr>
                    <b-tr variant="secondary">
                      <b-th class="text-center">이메일</b-th>
                      <b-td>{{company.email}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-th class="text-center">홈페이지</b-th>
                      <b-td>{{company.homepage}}</b-td>
                    </b-tr>
                    <b-tr variant="secondary">
                      <b-th class="text-center">직원수</b-th>
                      <b-td>{{company.employees_count}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-th class="text-center">국가</b-th>
                      <b-td>{{company.country}}</b-td>
                    </b-tr>
                    <b-tr variant="secondary">
                      <b-th class="text-center">업태</b-th>
                      <b-td>{{company.condition}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-th class="text-center">업종</b-th>
                      <b-td>{{company.sectors}}</b-td>
                    </b-tr>
                    <b-tr variant="secondary">
                      <b-th class="text-center">개요</b-th>
                      <b-td>{{company.introduce}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <h6>기업 요약 (한글환산 : {{summary_bytes}} / 45 자) </h6>
              <b-form-textarea v-model="boothForm.summary" rows="2" max-rows="6"></b-form-textarea>

              <h6 class="mt-3">기업 소개글 ( HTML Tag 포함 : {{desc_byte}} / 1,000 byte)</h6>
              <quill-editor ref="quillEditor1" class="editor" :options="editorOption" v-model="boothForm.desc" />
              <div class="content ql-editor" v-html="boothForm.desc"></div>
            </b-col>
          </b-row>
          
          <b-row class="mt-3">
            <b-col>
              <span>기업소개자료 </span>
              <b-button href="#" variant="primary" size="sm" @click="introductionNewFn"><b-icon-plus></b-icon-plus>추가</b-button>
              <b-table class="mt-1" :fields="introduction_fields" :items="boothForm.introduction" small responsive="sm" bordered head-variant="light">
                <template #cell(id)="row">
                  <div class="text-center">
                    {{row.item.id}}
                  </div>
                </template>
                <template #cell(order)="row">
                  <div class="text-center">
                    {{row.item.order}}
                  </div>
                </template>
                <template #cell(library_type)="row">
                  <div class="text-center">
                    {{row.item.library_type == 0 ? 'photo' : row.item.library_type == 1 ? 'youtube' : 'video' }}
                  </div>
                </template>
                <template #cell(manageBtn)="row">
                  <div class="text-center">
                    <b-button size="sm" variant="outline-success"
                      @click="introductionUpdateFn(row.item, $event, row.index)">
                      <b-icon-pencil-square></b-icon-pencil-square>수정
                    </b-button>
                    <b-button size="sm" variant="outline-danger" @click="introductionDeleteFn(row.item, $event, row.index)">
                      <b-icon-trash2-fill></b-icon-trash2-fill>삭제
                    </b-button>
                  </div>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-tab>

        <b-tab title="영문">
          <b-row class="mb-3">
            <b-col>
              <b-card>
                <b-card-text align="center" class="ino-400-320-wrap">
                  <div>
                    <b-img :src="logo_en_preview_local||logo_preview_default" fluid></b-img>
                  </div>
                </b-card-text>
              </b-card>
              <b-form inline class="mt-1">
                <span class="mr-sm-2" style="width: 100px;">업체로고#1</span>
                <span>:&nbsp;</span>
                <b-form-file v-model="logo_en_file" @change="onFileChange($event, 'logo_en_preview_local')" size="sm" class="mr-1" style="width:250px;">
                </b-form-file>
                <b-button @click="logo_en_file = null; logo_en_preview_local = null; logo_en_del = true;" variant="danger" size="sm">삭제</b-button>
              </b-form>
              <b-form inline class="mt-1">
                <span class="mr-sm-2" style="width: 100px;">카탈로그#1</span>
                <span>:&nbsp;</span>
                <b-input-group v-show="file_en_src" prepend="file" size="sm">
                    <b-form-input disabled :value="file_en_src"></b-form-input>
                    <b-input-group-append>
                        <b-button variant="outline-success" @click="fileDownload(file_en_src)"><b-icon-download></b-icon-download></b-button>
                        <b-button variant="danger" @click="file_en=null; file_en_src=''; file_en_del = true;"><b-icon-trash></b-icon-trash></b-button>
                    </b-input-group-append>
                </b-input-group>
                <b-form-file v-show="!file_en_src" v-model="file_en" size="sm" class="w-50 mr-sm-2"></b-form-file>
              </b-form>
              <b-form inline class="mt-1">
                <span class="mr-sm-2" style="width: 100px;">방문자</span>
                <span>:&nbsp;</span>
                <b-form-radio-group size="sm" v-model="boothForm.is_show_visitor_en" :options="is_show_options"
                  buttons button-variant="outline-primary"></b-form-radio-group>
              </b-form>
            </b-col>
            <b-col>
              <b-card>
                <h6>기업개요</h6>
                <b-table-simple small bordered head-variant="light">
                  <b-tbody>
                    <b-tr variant="secondary">
                      <b-th style="width: 150px;" class="text-center">업체명</b-th>
                      <b-td> {{company.name_en}} </b-td>
                    </b-tr>
                    <b-tr>
                      <b-th class="text-center">대표자</b-th>
                      <b-td>{{company.representation_name_en}}</b-td>
                    </b-tr>
                    <b-tr variant="secondary">
                      <b-th class="text-center">소재지</b-th>
                      <b-td>{{company.address_en}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-th class="text-center">연락처</b-th>
                      <b-td>{{company.representation_phone}}</b-td>
                    </b-tr>
                    <b-tr variant="secondary">
                      <b-th class="text-center">이메일</b-th>
                      <b-td>{{company.email}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-th class="text-center">홈페이지</b-th>
                      <b-td>{{company.homepage}}</b-td>
                    </b-tr>
                    <b-tr variant="secondary">
                      <b-th class="text-center">직원수</b-th>
                      <b-td>{{company.employees_count}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-th class="text-center">국가</b-th>
                      <b-td>{{company.country}}</b-td>
                    </b-tr>
                    <b-tr variant="secondary">
                      <b-th class="text-center">업태</b-th>
                      <b-td>{{company.condition}}</b-td>
                    </b-tr>
                    <b-tr>
                      <b-th class="text-center">업종</b-th>
                      <b-td>{{company.sectors}}</b-td>
                    </b-tr>
                    <b-tr variant="secondary">
                      <b-th class="text-center">개요</b-th>
                      <b-td>{{company.introduce_en}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-card>
            </b-col>
          </b-row>

          <b-row>
            <b-col>
              <h6>기업 요약 (한글환산 : {{summary_en_bytes}} / 45 자) </h6>
              <b-form-textarea v-model="boothForm.summary_en" rows="2" max-rows="6"></b-form-textarea>

              <h6 class="mt-3">기업 소개글 ( HTML Tag 포함 : {{desc_en_byte}} / 1,000 byte)</h6>
              <quill-editor ref="quillEditor1" class="editor" :options="editorOption" v-model="boothForm.desc_en"/>
              <div class="content ql-editor" v-html="boothForm.desc_en"></div>
            </b-col>
          </b-row>

          <b-row class="mt-3">
            <b-col>
              <span>기업소개자료 </span>
              <b-button href="#" variant="primary" size="sm" @click="introductionNewFn"><b-icon-plus></b-icon-plus>추가</b-button>
              <b-table class="mt-1" :fields="introduction_fields" :items="boothForm.introduction_en" small responsive="sm" bordered head-variant="light">
                <template #cell(id)="row">
                  <div class="text-center">
                    {{row.item.id}}
                  </div>
                </template>
                <template #cell(order)="row">
                  <div class="text-center">
                    {{row.item.order}}
                  </div>
                </template>
                <template #cell(library_type)="row">
                  <div class="text-center">
                    {{row.item.library_type == 0 ? 'photo' : row.item.library_type == 1 ? 'youtube' : 'video' }}
                  </div>
                </template>
                <template #cell(manageBtn)="row">
                  <div class="text-center">
                    <b-button size="sm" variant="outline-success"
                      @click="introductionUpdateFn(row.item, $event, row.index)">
                      <b-icon-pencil-square></b-icon-pencil-square>수정
                    </b-button>
                    <b-button size="sm" variant="outline-danger" @click="introductionDeleteFn(row.item, $event, row.index)">
                      <b-icon-trash2-fill></b-icon-trash2-fill>삭제
                    </b-button>
                  </div>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-card>
    <b-row class="mt-3">
      <b-col>
        <b-button href="#" variant="primary" size="sm" @click="storeData">저장하기</b-button>
        <b-button href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
          <b-icon-arrow-left></b-icon-arrow-left> 이전으로
        </b-button>
      </b-col>
    </b-row>

    <!-- 기업소개자료 추가 및 수정 모달 -->
    <b-modal v-model="introduction_modal" hide-footer title="기업소개자료" size="xl">
      <introduction-modal-form :params="{selected_item, isNew}" @add-item="addItemFn" @update-item="updateItemFn"></introduction-modal-form>
    </b-modal>
  </section>
</template>

<script>
  module.exports = {
    name: 'exhibition_form',
    components: {
				'introduction-modal-form': window.httpVueLoader(`./vue/introduction_modal_form.vue`)
    },
    data: function () {
      return {
        api_url: this.$store.getters.api_url,
        menu_id: this.$route.query.menu_id,
        editorOption: {theme: "snow"}, // 퀼 에디터 옵션

        // category - 대,소분류
        category: {
          topcategory: [],
          top_id_key_store: {}, // for the menu search
          selected_top: '',
          subcategory: [],
          sub_id_key_store: {},
          selected_sub: ''
        },
        company_list: [], // 기업 선택용 리스트
        company_index: 0, // 선택된 기업 인덱스
        company: {}, // 기업개요 - 리스트에서 선택된 컴퍼니

        tabIndex: 0,
        boothForm: {}, // 기업부스 정보
        is_show_options: [{text: '노출', value: 1}, {text: '미노출', value: 0}],

        // 이놈에 파일 ... start
        logo_preview_default: this.$store.getters.dummy_image_url(['400x320']), // 로고 미리보기

        logo_file: null, // 기업로고 (한글) - 업로드할 로고 파일 저장할 변수
        logo_preview_local: null, // 기업로고 (한글) - 사용자PC가 올리겠다는 로고 프리뷰
        logo_preview_data: null, // 기업로고 (한글) - DB에 저장된 로고 url
        logo_del: false, // 로고 지우겠다는 의사표시

        logo_en_file: null, // 기업로고 (영문) - 업로드할 파일 저장할 변수
        logo_en_preview_local: null,
        logo_en_preview_data: null,
        logo_en_del: false,

        file: null, // 카탈로그
        file_src: 'No file chosen', // 카탈로그 DB 소스 경로
        file_del: false,
        file_en: null,
        file_en_src: 'No file chosen',
        file_en_del: false,
        // 이미지 관련 ... end
        
        // 기업소개자료
        introduction_fields: [
          {key: 'id', label: '아이디'},
          {key: 'order', label: '순서'},
          {key: 'library_type', label: '라이브러리 타입'}, //  0 - photo, 1 - youtube link, 2 - file
          {key: 'title', label: '타이틀'},
          {key: 'link', label: '링크'},
          {key: "manageBtn", label: "관리항목"}
        ],

        // 모달 관련
        isNew: true,
        selected_item: {}, // 선택된 기업소개자료
        selected_index: 0,
        e_library_delete_ids: [],
        introduction_modal: false
      }
    },
    mounted: function () {
      this.$nextTick(async function () {
        await this.getTopCategory();
        await this.getData();
        await this.getCompanyList(); // 기업 선택용 리스트
      })
    },
    computed: {
      summary_bytes: function () {
        let str = Math.ceil(this.strByteLength(this.boothForm.summary) / 3);
        return str;
      },
      summary_en_bytes: function () {
        let str = Math.ceil(this.strByteLength(this.boothForm.summary_en) / 3);
        return str;
      },
      desc_byte: function () {
        return this.strByteLength(this.boothForm.desc);
      },
      desc_en_byte: function () {
        return this.strByteLength(this.boothForm.desc_en);
      }
    },
    methods: {
      /**
       * API 연동
       */
      getTopCategory: async function () {
        let response = await axios.get(`${this.api_url}/menucategory/topcategory?menu_id=${this.menu_id}`);
        let temArr = response.data.result;
        let top = {};
        temArr.forEach(element => {
          element.text = element.name;
          element.value = element.id;
          top[element.id] = element; // 메뉴 작성에 찾기 좋은 형태로 빼둠.
        });
        this.category.top_id_key_store = top;
        this.category.topcategory = temArr;
        this.getSubcategory();
      },
      getSubcategory: async function () {
        this.category.selected_sub = '';
        let response = await axios.get(`${this.api_url}/menucategory/subcategory?menu_id=${this.menu_id}&category_id=${this.category.selected_top}`);
        let temArr = response.data.result;
        let sub = {};
        temArr.forEach(element => {
          element.text = element.name;
          element.value = element.id;
          sub[element.id] = element; // 메뉴 작성에 찾기 좋은 형태로 빼둠.
        });
        this.category.sub_id_key_store = sub;
        this.category.subcategory = temArr;
      },
      getData: async function () {
        // 신규 폼이면 바로 나간다.
        if (!this.$route.query.id) return;

        // 수정 폼이면 값을 바인딩한다.
        let response = await axios.get(`${this.api_url}/exhibition/${this.$route.query.id}?type=0`);
        let rs = response.data.result;

        this.boothForm = rs;

        this.company = rs.company; // 기업개요
        this.logo_preview_data = rs.logo; // DB 값
        this.logo_en_preview_data = rs.logo_en;
        this.logo_preview_local = rs.logo; // 로컬 값
        this.logo_en_preview_local = rs.logo_en;

        this.file_src = rs.file;
        this.file_en_src = rs.file_en;

        this.category.selected_top = rs.top_category_id; // 탑 셀렉트
        await this.getSubcategory(); // 서브검색
        this.category.selected_sub = rs.sub_category_id;
      },
      getCompanyList: async function () {
        if (!this.$route.query.id) {
          let url = `${this.$store.getters.api_url}/company/list?menu_id=${this.menu_id}`;
          let res = await axios.get(url);
          this.company_list = res.data.result;
        } else {
          this.company_list = [this.company]; // 수정 폼이면 수정할 수 없다.
        }

        this.company_list.forEach((element, index) => {
          element.text = element.name;
          element.value = index;
          // top[element.id] = element; // 메뉴 작성에 찾기 좋은 형태로 빼둠.
        });
        this.company = this.company_list[0];
      },
      storeData: async function () {
        // 최종 저장하기 1, 2단계 나뉨.
        let url = `${this.$store.getters.api_url}/exhibition`;
        if (this.$route.query.id) {
          url = `${this.$store.getters.api_url}/exhibition/${this.$route.query.id}`;
        }

        let param = {
          menu_id: this.menu_id,
          category_id: this.category.selected_sub != 0 ? this.category.selected_sub : this.category.selected_top,
          company_id: this.company.id,
          desc: this.boothForm.desc,
          desc_en: this.boothForm.desc_en,
          is_top: this.boothForm.is_top,
          is_show_visitor: this.boothForm.is_show_visitor,
          is_show_visitor_en: this.boothForm.is_show_visitor_en,
          summary: this.boothForm.summary,
          summary_en: this.boothForm.summary_en
        }

        let formData = new FormData();
        Object.entries(param).forEach((element, index) => {
          element[1] + '' ? formData.append(element[0], element[1]) : '';
        });

        !this.file && this.file_del ? formData.append('file_del', 'Y') : formData.append('file', this.file);
        !this.file_en && this.file_en_del ? formData.append('file_en_del', 'Y') : formData.append('file_en', this.file_en);

        !this.logo_file && this.logo_del ? formData.append('logo_del', 'Y') : formData.append('logo', this.logo_file);
        !this.logo_en_file && this.logo_en_del ? formData.append('logo_en_del', 'Y') : formData.append('logo_en', this.logo_en_file);

        /**
         * 1단계 저장. 상단 데이터 저장
         */
        let rs = await axios.post(url, formData, {
          Headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        /**
         * 2단계 저장. 상단 데이터 저장
         */
        // 기업소개자료 입력
        let intro_store_url = `${this.api_url}/e_library`;

        if (!this.$route.query.id) { // query.id = exhibition_id
          let exhibition_id = rs.data.result.id;
          for (let item of this.boothForm.introduction) {
            await this.postIntroduction(item, intro_store_url, exhibition_id);
          }
          for (let item of this.boothForm.introduction_en) {
            await this.postIntroduction(item, intro_store_url, exhibition_id);
          }
        }

        // 기업소개자료 수정된 경우
        if (this.$route.query.id) {
          for (let item of this.boothForm.introduction) {
            if (item.id) { // 소개자료 수정한 경우
              await this.postIntroduction(item, `${this.api_url}/e_library/${item.id}`);
            } else { // 소개자료가 더 추가된 경우
              await this.postIntroduction(item, intro_store_url, this.$route.query.id);
            }
          }
          for (let item of this.boothForm.introduction_en) {
            // todo. 영문일때 API 에서, 같은 이름 위로 덮어써지고 있는 현상으롱 인해 화면에서도 사이드이팩트가 발생하여 막았음....
            // API 완비되면 아래 주석을 풀것.
            // if (item.id) { // 소개자료 수정한 경우
            //   await this.postIntroduction(item, `${this.api_url}/e_library/${item.id}`);
            // } else { // 소개자료가 더 추가된 경우
            //   await this.postIntroduction(item, intro_store_url, this.$route.query.id);
            // }
          }
          for (let id of this.e_library_delete_ids) {
            // 소개자료가 지워진 경우
            let delete_url = `${this.api_url}/e_library/${id}`;
            await axios.delete(delete_url);
          }
        }
        
        //---------------------------------------------------------------------------------///
        function callback() {
          this.$router.go(-1);
        }
        this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this)); // 상단 자료 입력결과
      },
      postIntroduction: async function (item, url, exhibition_id) {
        // 기업소개자료 추가 - 현재는, 기업부스정보가 입력된 뒤에만 입력이 가능하다.
        let formData2 = new FormData();
        if (exhibition_id) {
          formData2.append('exhibition_id', exhibition_id);
        }
        formData2.append('type', 0); // 기업소개자료
        formData2.append('library_type', item.library_type);
        formData2.append('lang_type', item.lang_type);

        formData2.append('title', item.title);
        formData2.append('order', item.order);

        switch (item.library_type) {
          case 0:
            // photo_1_del~10_del ....   photo_1_del 조작이 필요하다.
            for (var i = 1; i < 11; i++) {
              !item[`photo_${i}`].file && item[`photo_${i}`].del ? formData2.append(`photo_${i}_del`, 'Y') : formData2.append(`photo_${i}`, item[`photo_${i}`].file);
              formData2.append(`photo_${i}_message`, item[`photo_${i}`].message);
            }
            break;
          case 1:
            !item.thumb_prev && item.thumb_prev_del ? formData2.append('image_prev_del', 'Y') : formData2.append('image_prev', item.image_prev); // 유튜브 썸네일 프리뷰 파일
            formData2.append('link', item.link);
            formData2.append('link_message', item.link_message);
            break;
          case 2:
            // 2 영상파일
            !item.thumb_prev && item.thumb_prev_del ? formData2.append('image_prev_del', 'Y') : formData2.append('image_prev', item.image_prev); // 영상 썸네일 프리뷰 파일
            !item.file && item.movie_file_del ? formData2.append('file_del', 'Y') : formData2.append('file', item.file); // 영상 파일
            formData2.append('link_message', item.link_message); // 영상 메시지
            break;
        }

        let rs = await axios.post(url, formData2, {
          Headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        return rs;
      },

      /**
       * 기타함수
       */
      introductionNewFn: function (item, event, index) {
        // 기업소개자료 신규 추가
        this.selected_item = {
          order: 0,
          library_type: 0, // 이미지
          lang_type: 2, // 국문 및 영문
          thumb_prev_del: false, // 썸네일 이미지 지울까요
          movie_file_del: false // 첨부 영상 파일 지울까요
        };
        for (var i = 1; i < 11; i++) {
          this.selected_item[`photo_${i}`] = {
            url: this.$store.getters.dummy_image_url(['180x180']),
            message: "",
            file: null,
            del: false
          };
        }
        this.isNew = true; // 모달에서 완료버튼이 보이도록 만든다.
        this.introduction_modal = true; // 모달을 연다.
      },
      addItemFn: function () {
        // ---> 모달에서 완료버튼을 누른다. (실제 저장은 아니고 배열에만 추가된다.)
        if (this.tabIndex == 0) {
          this.boothForm.introduction.push({ ...this.selected_item }); // 기업소개 목록에 추가하고
        } else {
          this.boothForm.introduction_en.push({ ...this.selected_item }); // 기업소개 영문 목록에 추가하고
        }
        this.introduction_modal = false; // 모달 닫는다.
      },
      introductionUpdateFn: async function (item, event, index) {
        // 기업소개자료 수정하기 세팅
        this.isNew = false; // 이제 모달에서 수정 버튼으로 보이도록 값을 바꾼다.
        this.selected_index = index; // 선택한 인덱스 저장해둔다. 바꿀자리 찾기 위해서...

        this.selected_item = {
          ...item,
          thumb_prev_del: false, // 썸네일 이미지 지울까요
          movie_file_del: false, // 첨부 영상 파일 지울까요
        };
        let thumb_prev = '';
        if (item.thumb_prev) {
          thumb_prev = item.thumb_prev
        } else if (typeof item.image_prev === 'string') {
          thumb_prev = item.image_prev;
        }
        this.selected_item.thumb_prev = thumb_prev;
        
        this.introduction_modal = true; // 모달을 연다.
      },
      updateItemFn: function () {
        // 기업소개자료 모달의 수정버튼을 누른다.
        
        if (this.tabIndex == 0) {
          let newArr = [...this.boothForm.introduction];
          newArr[this.selected_index] = {...this.selected_item};
          this.boothForm.introduction = newArr; // 목록에서 수정된 아이템을 바꿔준다.
          // this.boothForm.introduction[this.selected_index] = Object.create(this.selected_item); // 목록에서 수정된 아이템을 바꿔준다.
        } else {
          let newArr = [...this.boothForm.introduction_en];
          newArr[this.selected_index] = {...this.selected_item};
          this.boothForm.introduction_en = newArr; // 목록에서 수정된 아이템을 바꿔준다.
          // this.boothForm.introduction_en[this.selected_index] = Object.create(this.selected_item); // 목록에서 수정된 아이템을 바꿔준다.
        }
        this.introduction_modal = false; // 모달을 닫는다.
      },
      introductionDeleteFn: async function (item, event, index) {
        if (this.tabIndex == 0) {
          this.boothForm.introduction.splice(index, 1);
        } else {
          this.boothForm.introduction_en.splice(index, 1);
        }
        if (item.id) {
          this.e_library_delete_ids.push(item.id);
        }
      },
      strByteLength: function (s, b, i, c) {
        if (!s) return 0;
        for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
        return b
      },
      fileDownload(url) {
        var link = document.createElement("a");
        link.setAttribute('download', '');
        link.href = url;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    }
  }
</script>
