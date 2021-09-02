<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 >	연자소개2 > 상세 </strong></h6>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
        </b-col>
    </b-row>
    <b-card>
        <template #header>
            <h6><strong>입력</strong></h6>
        </template>
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
                <b-card no-body>
					<b-tabs content-class="" card>
						<b-tab title="국문" active>
                            <b-form-group label="노출순서">
                                <b-form-input type="number" v-model="order"></b-form-input>
                            </b-form-group>

                            <b-form-group label="발표주제">
                                <b-form-input type="text" v-model="title"></b-form-input>
                            </b-form-group>
                            <b-row>
                                <b-col>
                                    <b-form-group label="연자이름">
                                        <b-form-input type="text" v-model="speaker_name"></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col>
                                    <b-form-group label="소속/직책">
                                        <b-form-input type="text" v-model="position"></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-form-group label="연자이미지">
                                        <b-card-text>
                                            <div class="img-box" style="max-width:200px;">
                                                <b-img class="center-fit" :src="photo_1||photo_prev" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-card-text class="mt-1">
                                            <b-form-file v-model="file" @change="onFileChange($event, 'photo_1')" 
                                            style="max-width:70%;" class="mr-2" size="sm"></b-form-file>
                                            <b-button @click="file = null; photo_1 = ''; photo_1_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
                                        </b-card-text>
                                    </b-form-group>
                                </b-col>
                                <b-col>
                                </b-col>
                            </b-row>

                            <b-form-group label="연자소개">
                                <b-card-text>
                                    <b-form-textarea rows="8" v-model="introduction"></b-form-textarea>
                                </b-card-text>
                            </b-form-group>

                            <b-form-radio v-model="select_speaker" name="select_speaker" value="0">초록내용</b-form-radio>
                            <b-form-group v-if="select_speaker == 0" >
                                <!-- label="초록내용" -->
                                <b-card-text>
                                    <b-form-textarea rows="8" v-model="contents"></b-form-textarea>
                                </b-card-text>
                            </b-form-group>

                            <b-form-radio v-model="select_speaker" name="select_speaker" value="1">초록업로드</b-form-radio>
                            <b-form-group  v-if="select_speaker == 1">
                                <!-- <label style="color: #007BFF;">*초록업로드</label> -->
                                <b-card-text>
                                    <b-input-group v-show="file_name_1" prepend="file">
                                        <b-form-input disabled :value="file_name_1"></b-form-input>
                                        <b-input-group-append>
                                            <b-button variant="outline-success" @click="fileDownload(file2, file_name_1)">Download</b-button>
                                            <b-button variant="danger" @click="file2=null; file2_del = true;">Delete</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                    <b-form-file v-show="!file_name_1" v-model="file2" size="sm" class="w-50 mr-sm-2"></b-form-file>
                                </b-card-text>
                            </b-form-group>
						</b-tab>
						<b-tab title="영문">
                            <b-form-group label="노출순서">
                                <b-form-input type="number" v-model="order"></b-form-input>
                            </b-form-group>
                            <b-form-group label="발표주제">
                                <b-form-input type="text" v-model="title_en"></b-form-input>
                            </b-form-group>
                            <b-row>
                                <b-col>
                                    <b-form-group label="연자이름">
                                        <b-form-input type="text" v-model="speaker_name_en"></b-form-input>
                                    </b-form-group>
                                </b-col>
                                <b-col>
                                    <b-form-group label="소속/직책">
                                        <b-form-input type="text" v-model="position_en"></b-form-input>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-form-group label="연자이미지">
                                        <b-card-text>
                                            <div class="img-box" style="max-width:200px;">
                                                <b-img class="center-fit" :src="photo_1_en||photo_prev" fluid></b-img>
                                            </div>
                                        </b-card-text>
                                        <b-card-text class="mt-1">
                                            <b-form-file v-model="file_en" @change="onFileChange($event, 'photo_1_en')" 
                                            style="max-width:70%;" class="mr-2" size="sm"></b-form-file>
                                            <b-button @click="file_en = null; photo_1_en = ''; photo_1_en_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
                                        </b-card-text>
                                    </b-form-group>
                                </b-col>
                                <b-col>
                                </b-col>
                            </b-row>
                            
                            <b-form-group label="연자소개">
                                <b-card-text>
                                    <b-form-textarea rows="8" v-model="introduction_en"></b-form-textarea>
                                </b-card-text>
                            </b-form-group>

                            <b-form-radio v-model="select_speaker_en" name="select_speaker_en" value="0">초록내용</b-form-radio>
                            <b-form-group v-if="select_speaker_en == 0">
                                <b-card-text>
                                    <b-form-textarea rows="8" v-model="contents_en"></b-form-textarea>
                                </b-card-text>
                            </b-form-group>

                            <b-form-radio v-model="select_speaker_en" name="select_speaker_en" value="1">초록업로드</b-form-radio>
                            <b-form-group  v-if="select_speaker_en == 1">
                                <!-- <label style="color: #007BFF;">초록업로드</label> -->
                                <b-card-text>
                                    <b-input-group v-show="file_name_1_en" prepend="file">
                                        <b-form-input disabled :value="file_name_1_en"></b-form-input>
                                        <b-input-group-append>
                                            <b-button variant="outline-success" @click="fileDownload(file2_en, file_name_1_en)">Download</b-button>
                                            <b-button variant="danger" @click="file2_en=null; file2_en_del = true;">Delete</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                    <b-form-file v-show="!file_name_1_en" v-model="file2_en" size="sm" class="w-50 mr-sm-2"></b-form-file>
                                </b-card-text>
                            </b-form-group>
						</b-tab>
					</b-tabs>
				</b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form class="mt-2">
                    <b-form-group label="e-Poster">
                        <b-card-text>
                            <div class="img-box" style="max-width:200px;">
                                <b-img v-show="video" src="/data/default/pdf-upload.png" style="width:172px;height:172px;"></b-img>
                            </div>
                        </b-card-text>
                        <b-form-file v-model="eposter" size="sm" class="w-50 mr-sm-2" accept=".pdf"></b-form-file>
                        <b-button v-show="eposter" size="sm" variant="danger" @click="eposter=null; eposter_del = true;">e-Poster Delete</b-button>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form class="mt-2">
                    <b-form-group label="Video">
                        <b-card-text>
                            <div class="img-box" style="max-width:200px;">
                                <b-img v-show="video" src="/data/default/video-upload.png"></b-img>
                            </div>
                        </b-card-text>
                        <b-form-file v-model="video" size="sm" class="w-50 mr-sm-2" accept=".mp4"></b-form-file>
                        <b-button v-show="video" size="sm" variant="danger" @click="video=null; video_del = true;">Video Delete</b-button>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-button v-show="!id" variant="primary" size="sm" class="inoBtn-150 mt-2" @click="storeData">저장</b-button>
        <b-button v-show="id" variant="success" size="sm" class="inoBtn-150 mt-2" @click="updateData">수정</b-button>
    </b-card>
</section>
</template>

<script>
module.exports = {
    name: "speaker_form",
    data: function () {
        return {
            event_id: 0,
            api_url: '',
            menu_id: null,
            id: 0,
            menu_id: 0,

            category: {
                topcategory: [],
                top_id_key_store: {}, // for the menu search
                selected_top: '',
                subcategory: [],
                sub_id_key_store: {},
                selected_sub: ''
            },

            select_speaker:0,
            select_speaker_en:0,


            id: '',
            order: 0,
            title: '',
            title_en: '',
            contents: null,
			contents_en: null,

            speaker_name : '',
            position : '',
            contents : '',
            introduction : '',

            speaker_name_en : '',
            position_en : '',
            contents_en : '',
            introduction_en : '',
            
            introduction: null,
			introduction_en: null,
            
            file: null,
            file_en: null,
            photo_1: '',
            photo_1_en: '',
            photo_1_del: false,
            photo_1_en_del: false,
            photo_prev: this.$store.getters.dummy_image_url(['400x460']),

            file2: null, // 발표자료 추가파일 (국)
            file2_en: null,  // 발표자료 추가파일 (영)
            file2_del: false,
            file2_en_del: false,
            file_name_1: '',
            file_name_1_en: '',
            eposter:'',
            eposter_del:false,
            video: null,
            video_del: false
        };
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.id = this.$route.query.id;
            this.menu_id = this.$route.query.menu_id;
            this.event_id = this.$store.getters.event_id;
            this.api_url = this.$store.getters.api_url;
            
            await this.getTopCategory();
            await this.getData();
        });
    },
    methods: {
        getData: async function () { // 데이터 가져오기
            let url = `${this.api_url}/speaker/${this.id}`;
            let rs = await axios.get(url);
            let data = rs.data.result;
            this.id = data.id;
            this.order = data.order;
            this.title = data.title;
            this.title_en = data.title_en;
            this.contents = data.contents;
			this.contents_en = data.contents_en;

            if(data.contents.length > 0){
                this.select_speaker = 0;
            }else if(data.file.length > 0){
                this.select_speaker = 1;
            }
            if(data.contents_en.length > 0){
                this.select_speaker_en = 0;
            }else if(data.file_en.length > 0){
                this.select_speaker_en = 1;
            }
            

            this.speaker_name = data.speaker_name;
            this.speaker_name_en = data.speaker_name_en;
            this.position = data.position;
            this.position_en = data.position_en;
            this.introduction = data.introduction;
            this.introduction_en = data.introduction_en;
            
            this.photo_1 = data.photo_1;
            this.photo_1_en = data.photo_1_en;

            this.file2 = data.file;
            this.file2_en = data.file_en;
            this.file_name_1 = data.file_name_1;
            this.file_name_1_en = data.file_name_1_en;
            this.video = data.video;
            this.eposter = data.eposter;

            // 탑 셀렉트
            this.category.selected_top = data.top_category_id
            // 서브검색
            await this.getSubcategory();
            this.category.selected_sub = data.sub_category_id;
        },
        storeData: async function () { // 데이터 저장
            let url = `${this.api_url}/speaker`;
            let formData = new FormData();
                formData.append('menu_id', this.menu_id);
                
                !this.file && this.photo_1_del ? formData.append('photo_1_del', 'Y') : formData.append('photo_1', this.file);
                !this.file_en && this.photo_1_en_del ? formData.append('photo_1_en_del', 'Y') : formData.append('photo_1_en', this.file_en);

                !this.file2 && this.file2_del ? formData.append('file_del', 'Y') : formData.append('file', this.file2);
                !this.file2_en && this.file2_en_del ? formData.append('file_en_del', 'Y') : formData.append('file_en', this.file2_en);

                !this.video && this.video_del ? formData.append('video_del', 'Y') : formData.append('video', this.video);
                !this.eposter && this.eposter_del ? formData.append('eposter_del', 'Y') : formData.append('eposter', this.eposter);

                formData.append('order', this.order);

                this.title ? formData.append('title', this.title) : '';
                this.title_en ? formData.append('title_en', this.title_en) : '';
                // this.contents ? formData.append('contents', this.contents) : '';
                // this.contents_en ? formData.append('contents_en', this.contents_en) : '';
                formData.append('contents', this.contents ? this.contents: '')
                formData.append('contents_en', this.contents_en ? this.contents_en: '')
                this.speaker_name ? formData.append('speaker_name', this.speaker_name) : '';
                this.position ? formData.append('position', this.position) : '';
                this.introduction ? formData.append('introduction', this.introduction) : '';
                this.speaker_name_en ? formData.append('speaker_name_en', this.speaker_name_en) : '';
                this.position_en ? formData.append('position_en', this.position_en) : '';
                this.introduction_en ? formData.append('introduction_en', this.introduction_en) : '';
                
                let category_id = this.category.selected_sub != 0 ? this.category.selected_sub : this.category.selected_top;
                formData.append('category_id', category_id);
                
            try {

                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                function callback () {
                    this.$router.go(-1);
                }
                this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));

            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }

        },
        updateData: async function () { // 데이터 수정저장
            let url = `${this.api_url}/speaker/${this.id}`;
            let formData = new FormData();
                !this.file && this.photo_1_del ? formData.append('photo_1_del', 'Y') : formData.append('photo_1', this.file);
                !this.file_en && this.photo_1_en_del ? formData.append('photo_1_en_del', 'Y') : formData.append('photo_1_en', this.file_en);

                !this.file2 && this.file2_del ? formData.append('file_del', 'Y') : formData.append('file', this.file2);
                !this.file2_en && this.file2_en_del ? formData.append('file_en_del', 'Y') : formData.append('file_en', this.file2_en);

                !this.video && this.video_del ? formData.append('video_del', 'Y') : formData.append('video', this.video);
                !this.eposter && this.eposter_del ? formData.append('eposter_del', 'Y') : formData.append('eposter', this.eposter);

                formData.append('order', this.order);

                this.title ? formData.append('title', this.title) : '';
                this.title_en ? formData.append('title_en', this.title_en) : '';
                // this.contents ? formData.append('contents', this.contents) : '';
                // this.contents_en ? formData.append('contents_en', this.contents_en) : '';
                formData.append('contents', this.contents ? this.contents: '')
                formData.append('contents_en', this.contents_en ? this.contents_en: '')
                this.speaker_name ? formData.append('speaker_name', this.speaker_name) : '';
                this.position ? formData.append('position', this.position) : '';
                this.introduction ? formData.append('introduction', this.introduction) : '';
                this.speaker_name_en ? formData.append('speaker_name_en', this.speaker_name_en) : '';
                this.position_en ? formData.append('position_en', this.position_en) : '';
                this.introduction_en ? formData.append('introduction_en', this.introduction_en) : '';
                
                let category_id = this.category.selected_sub != 0 ? this.category.selected_sub : this.category.selected_top;
                
                formData.append('category_id', category_id);
                
            try {

                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                function callback () {
                    this.$router.go(-1);
                }
                this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));
                

            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }

        },


        /**
         * 기타
         **/
        getTopCategory: async function () {
            // movie 형식으로 menu_id에 등록된 대분류
            let url = `${this.api_url}/menucategory/topcategory?menu_id=${this.menu_id}`;

            let response = await axios.get(url);
            let temArr = response.data.result;
            let top = {};
            temArr.forEach(element => {
                element.text = element.name;
                element.value = element.id;
                top[element.id] = element; // 메뉴 작성에 찾기 좋은 형태로 빼둠.
            });

            this.category.top_id_key_store = top;
            this.category.topcategory = temArr;
            await this.getSubcategory();
        },
        getSubcategory: async function () {
            // movie 형식으로 menu_id에 등록된 대분류의 소분류
            this.category.selected_sub = '';
            let url = `${this.api_url}/menucategory/subcategory?menu_id=${this.menu_id}&category_id=${this.category.selected_top}`;
            let response = await axios.get(url);
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
        fileDownload(url, file_name) {
            var link = document.createElement("a");
            link.setAttribute('download', file_name);
            link.href = url;
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
    }
};
</script>
