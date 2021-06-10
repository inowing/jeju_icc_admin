<template>
<section>
    <b-row>
        <b-col>
            <b-card no-body>
                    <template #header>
                        <h6><strong>로고</strong></h6>
                    </template>
                    <b-row>
                        <b-col>
                            <b-card>
                                <b-card-text class="ino-480-60-wrap mb-1">
                                    <div>
                                        <b-img :src="logo||prev_default" fluid></b-img>
                                    </div>
                                </b-card-text>
                                <b-card-text class="text-left mt-1">
                                    <b-icon-info-square></b-icon-info-square><span class="p-1 text-secondary">가로 480px 세로 60px (8:1) 이미지 업로드를 권장합니다.</span>
                                </b-card-text>
                                <b-card-text>
                                    <b-row>
                                        <b-col md="9" class="pr-0">
                                            <b-form-file v-model="file1" ref="file-input" @change="onFileChange($event, 'logo')" size="sm"></b-form-file>
                                        </b-col>
                                        <b-col md="3" class="text-right">
                                            <b-button @click="file1 = null; logo = ''; logo_del=true;" size="sm" variant="danger">이미지 삭제</b-button>
                                        </b-col>
                                    </b-row>
                                </b-card-text>
                            </b-card>
                        </b-col>
                        <b-col>
                            <b-card>
                                <b-card-text>
                                    <b-form-group label="매칭 방향">
                                        <b-form-radio-group v-model="is_bizmatching_cross_meeting" :options="match_options" button-variant="outline-primary" size="sm" buttons></b-form-radio-group>
                                    </b-form-group>

                                    <b-form-group label="최대 상담 신청 가능횟수">
                                        <b-form-input type="number" v-model="bizmatching_max_count" min="1" max="3"></b-form-input>
                                    </b-form-group>
                                </b-card-text>
                            </b-card>
                        </b-col>
                    </b-row>
                <b-row>
                    <b-col class="ml-4 mb-3">
                        <b-button size="sm" variant="primary"  class="inoBtn-150" @click="updateEvent">저장</b-button>
                    </b-col>
                </b-row>
			</b-card>
        </b-col>
    </b-row>
    <b-row class="mt-3">
        
        <b-col>
            <b-input-group size="sm" align-v="baseline">
                <b-button size="sm" variant="primary" @click="goRegisterForm"><b-icon-plus></b-icon-plus>탭 추가</b-button>
            </b-input-group>
        </b-col>
    </b-row>
    
    <b-row class="mt-1">
        <b-col>
            <b-table :fields="fields" :items="items" small bordered head-variant="light" class="mt-1">
                <template #cell(id)="row">
                    <div class="text-center">{{row.item.id}}</div>
                </template>
                <template #cell(order)="row">
                    <div class="text-center">{{row.item.order}}</div>
                </template>
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-success" @click="goRegisterForm($event, row.item)">
                            <b-icon-pencil-square></b-icon-pencil-square> 수정
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="deleteItemFn($event, row.item)">
                            <b-icon-trash2-fill></b-icon-trash2-fill> 삭제
                        </b-button>
                    </div>
                </template>
            </b-table>
        </b-col>
    </b-row>
</section>
</template>

<script>
module.exports = {
    name: 'biz_site',
    data: function () {
        return {
            api_url: ``,
            event_id: null,


            logo: '',
            file1: null,
            logo_del: false,

            logo_en: '',
            file1_en: null,
            logo_en_del: false,

            prev_default: this.$store.getters.dummy_image_url(['480x60']),

            menu_id: null,
            company_id: null,
            company_name: null,

            selected: null,
			options: [
				{ value: null, text: '전체' },
				{ value: 'buyer', text: '바이어' },
				{ value: 'seller', text: '셀러' }
			],
            is_bizmatching_cross_meeting: 0,
			match_options: [
				{ value: 0, text: '셀러 -> 바이어' },
				{ value: 1, text: '바이어 -> 셀러' },
				{ value: 2, text: '양방향' }
			],
            
            fields: [{
                    key: 'id',
                    label: '아이디'
                },
                {
                    key: 'tab_name',
                    label: '탭명'
                },
                {
                    key: 'order',
                    label: '순서'
                },
                {
                    key: "manageBtn",
                    label: "관리",
                }
            ],
            items: [],
            question_modal: false,
            selected_item: Object,
            thumb_prev: '',
            thumb_prev_default: this.$store.getters.dummy_image_url(['180x180']),
            movie_file_src: '',
            isNew: true,
            bizmatching_max_count: 1 // 최대상담신청가능횟수
        }
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.api_url = this.$store.getters.api_url;
            this.event_id = this.$store.getters.event_id;
            this.getList();
        })
    },
    methods: {
        getList: async function () {
            let response = await axios.get(`${this.api_url}/bizmatching_menu?event_id=${this.event_id}`);
            let rs = response.data.result;
            // {{ logo setting
                this.logo = rs.bizmatching_logo;
                this.logo_del = false;
                this.logo_en = rs.bizmatching_logo_en;
                this.logo_en_del = false;
                this.is_bizmatching_cross_meeting = rs.is_bizmatching_cross_meeting;
                this.bizmatching_max_count = rs.bizmatching_max_count;
            //}}
            
            this.items = rs.menus;
        },
        goRegisterForm: function (event, item) {
            
            if (item) {
                this.$router.push({ name: 'biz_site_form', query: {id: item.id}});
            } else {
                this.$router.push({ name: 'biz_site_form' });
            }
        },
        deleteItemFn: async function (event, item) {
            if (confirm(`삭제 하시겠습니까?`)) {
                let rs = await axios.delete(`${this.api_url}/bizmatching_menu/${item.id}`);
                this.getList();
                this.$showMsgBoxTwo(rs.status);
            }
        },
        updateEvent: async function () {
            if (confirm('저장 하시겠습니까?')) {
                let url = `${this.api_url}/event/${this.event_id}`;
                
                // 최대상담신청가능횟수 : bizmatching_max_count

                let formData = new FormData();
                    if (this.logo_del) {
                        formData.append('bizmatching_logo_del', 'Y');
                    }
                    if (!this.logo_del && this.file1) {
                        formData.append('bizmatching_logo', this.file1);
                    }
                    if (this.logo_en_del) {
                        formData.append('bizmatching_logo_en_del', 'Y');
                    }
                    if (!this.logo_en_del && this.file1_en) {
                        formData.append('bizmatching_logo_en', this.file1_en);
                    }
    
                    formData.append('is_bizmatching_cross_meeting', this.is_bizmatching_cross_meeting);
                    formData.append('bizmatching_max_count', this.bizmatching_max_count);
    
                let rs = await axios
                        .post(url, formData, { Headers: { 'Content-Type': 'multipart/form-data' }})
                        .catch(error => {
                            console.error(error);
                        });
                this.$showMsgBoxTwo(rs.status);
                this.getList();
            }
        },
        
        
    }
}
</script>
