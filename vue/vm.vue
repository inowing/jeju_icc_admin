<template>
<section>
    <b-row>
        <b-col>
            <b-button href="#" variant="primary" size="sm" @click="openModal1">
                <b-icon-plus></b-icon-plus> Create Event
            </b-button>
        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
            <b-card no-body>
                <b-tabs v-model="tabIndex" small card>
                    <b-tab title="Upcoming Events">
                        <b-row class="mb-2">
                            <b-col cols="9">
                                <b-button href="#" :variant="selected_btn_index == 0 ? primary : outline_primary" size="sm" @click="selected_btn_index = 0; getList(0)">ALL</b-button>
                                <span v-for="(item, index) in weeks" :key="index">
                                    <b-button href="#" :variant="selected_btn_index == (index+1) ? primary : outline_primary" size="sm" class="mr-1" @click="selected_btn_index = (index+1); getList(item);">{{item.text}}</b-button>
                                </span>
                            </b-col>
                            <b-col>
                                <b-input-group size="sm" align-v="baseline">
                                    <b-form-input aria-placeholder="검색어를 입력하세요."></b-form-input>
                                    <b-input-group-append>
                                        <b-button variant="info" size="sm">
                                            <b-icon-search></b-icon-search>
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-col>
                        </b-row>

                        <!-- 반복할 리스트 -->
                        <b-row class="mt-1" v-for="item in [{id:'a1', title: 'jeju icc', logo: ''}, {id:'b1', title: 'ccc gogogo', logo: ''}]" :key="item.id">
                            <b-col>
                                <b-card no-body>
                                    <b-row>
                                        <b-col cols="2" class="text-center vm_card_v_left">
                                            <div>
                                                <span style="font-size:smaller;">08/25</span><br>
                                                <span style="font-size:smaller;">(Wed)</span><br>
                                                <b-button variant="danger" pill size="sm">Broadcast START</b-button>
                                            </div>
                                        </b-col>
                                        <b-col cols="8" class="vm_card_v_center">
                                            <b-row style="min-height: 90px;">
                                                <b-col cols="9">
                                                    <span style="font-size:smaller;">vm id : 420</span>
                                                    <h5 class="text-primary">제주 ICC 개회식</h5>
                                                    <br>
                                                    <span class="text-secondary">제주 ICC Grand Hall / 08.25 09:00 ~ 0m / GMT +09:00 SEOUL</span>
                                                </b-col>
                                                <b-col cols="3" class="p-1">
                                                    <p class="text-secondary" style="font-size:smaller; width: 100%; height: 100%; padding: 5px; border-left:1px solid silver; line-height: 85px; margin-bottom:0px;">
                                                        <span style="margin-top: 15px;">제주 발전연구원</span>
                                                    </p>
                                                </b-col>
                                            </b-row>
                                            <hr style="padding: 0; margin: 0">
                                            <b-row class="mt-1">
                                                <b-col>
                                                    <b-row>
                                                        <b-col>

                                                            <b-collapse :id="item.id" style="width:100%;">
                                                                <b-row>
                                                                    <b-col class="pr-1">
                                                                        <b-card align="center" no-body class="p-2">
                                                                            <p class="p-0 mb-1">
                                                                                <b-button size="sm" variant="primary" class="inoBtn-200" disabled>Moderator</b-button>
                                                                            </p>
                                                                            <p class="p-0 mb-1">
                                                                                <b-button size="sm" 
                                                                                    @click="openModal4(item, 0)"
                                                                                    pill variant="outline-secondary">
                                                                                    <b-icon-people></b-icon-people>
                                                                                </b-button>&nbsp;2명
                                                                            </p>
                                                                            <p class="p-0 mb-1">
                                                                                <b-button size="sm" 
                                                                                    @click="modal3=true; invitaion_tabIndex=0"
                                                                                    pill variant="outline-primary">
                                                                                    <b-icon-envelope></b-icon-envelope> Invitation
                                                                                </b-button>
                                                                            </p>
                                                                        </b-card>
                                                                    </b-col>
                                                                    <b-col class="pl-1">
                                                                        <b-card align="center" no-body class="p-2">
                                                                            <p class="p-0 mb-1">
                                                                                <b-button size="sm" variant="primary" class="inoBtn-200" disabled>Presenter</b-button>
                                                                            </p>
                                                                            <p class="p-0 mb-1">
                                                                                <b-button size="sm" 
                                                                                    @click="openModal4(item, 1)"
                                                                                    pill variant="outline-secondary">
                                                                                    <b-icon-people></b-icon-people>
                                                                                </b-button>&nbsp;8명
                                                                            </p>
                                                                            <p class="p-0 mb-1">
                                                                                <b-button size="sm" 
                                                                                    @click="modal3=true; invitaion_tabIndex=1"
                                                                                    pill variant="outline-primary">
                                                                                    <b-icon-envelope></b-icon-envelope> Invitation
                                                                                </b-button>
                                                                            </p>
                                                                        </b-card>
                                                                    </b-col>
                                                                </b-row>
                                                                <b-row class="mt-3">
                                                                    <b-col align="center">
                                                                        <b-button size="sm" variant="outline-secondary">
                                                                            <b-icon-info-circle></b-icon-info-circle> 공지사항
                                                                        </b-button>
                                                                        <b-button size="sm" variant="outline-secondary" @click="openModal2(item, 'Q&A')">
                                                                            <b-icon-chat-dots></b-icon-chat-dots> Q&amp;A(0)
                                                                        </b-button>
                                                                        <b-button size="sm" variant="outline-secondary" @click="openModal2(item, '참가자')">
                                                                            <b-icon-people></b-icon-people> 참가자(0)
                                                                        </b-button>
                                                                    </b-col>
                                                                </b-row>
                                                                <hr>
                                                                <b-row>
                                                                    <b-col align="center">
                                                                        <p>
                                                                            <b-button size="sm" pill variant="outline-primary">
                                                                                <b-icon-people></b-icon-people>
                                                                            </b-button>
                                                                            예상 참가자수 <strong class="text-primary">{{ expectNum }}</strong> 명
                                                                        </p>
                                                                        <p class="mb-1">
                                                                            <b-button size="sm" variant="danger" class="inoBtn-200">
                                                                                <b-icon-stop-circle></b-icon-stop-circle> BroadCast 멈추기
                                                                            </b-button>
                                                                        </p>
                                                                        <p class="mb-1">
                                                                            <b-button size="sm" variant="success" class="inoBtn-200" @click="openModal1($event, item)">
                                                                                <b-icon-files-alt></b-icon-files-alt> 수정
                                                                            </b-button>
                                                                        </p>
                                                                    </b-col>
                                                                </b-row>
                                                            </b-collapse>
                                                        </b-col>
                                                    </b-row>

                                                    <b-row class="text-right mb-1">
                                                        <b-col>
                                                            <b-button v-b-toggle="item.id" size="sm" variant="outline-primary" @click="openId.includes(item.id) ? openId.splice(openId.indexOf(item.id), 1) : openId.push(item.id);">
                                                                <b-icon-chevron-down v-show="!openId.includes(item.id)"></b-icon-chevron-down>
                                                                <b-icon-chevron-up v-show="openId.includes(item.id)"></b-icon-chevron-up>
                                                            </b-button>
                                                            <b-button size="sm" variant="outline-danger">
                                                                <b-icon-trash></b-icon-trash>
                                                            </b-button>
                                                        </b-col>
                                                    </b-row>

                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col cols="2" class="vm_card_v_right ino-180-180-wrap">
                                            <div style="border: none; padding: 0px;">
                                                <b-img :src="item.logo||'https://picsum.photos/480/60/?image=20'" fluid></b-img>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </b-card>

                            </b-col>
                        </b-row>

                    </b-tab>

                    <!-- . -->
                    <!-- . -->
                    <!-- . -->
                    <!-- . -->

                    <b-tab title="Past Events">
                        Past Events
                        <b-card>I'm the card in tab</b-card>
                    </b-tab>

                </b-tabs>
            </b-card>

        </b-col>
    </b-row>
  
    <b-modal v-model="modal1" hide-footer title="Event Information" body-bg-variant="light">
        <b-card no-body class="p-1" :border-variant="modal1_border" v-show="form_page == 1">
            <b-form-group label="Event title">
                <b-form-input v-model="form.title" size="sm"></b-form-input>
            </b-form-group>
            <b-form-group label="Menu">
                <b-form-input v-model="form.link" size="sm"></b-form-input>
            </b-form-group>
            <b-form-group label="Host">
                <b-form-input v-model="form.link" size="sm"></b-form-input>
            </b-form-group>
            <b-form-group label="Event Size (최대 예상인원, 누적 인원 수)">
                <b-button size="sm" style="width: 80px;" :variant="selected_event_size == 100 ? 'warning' : 'outline-warning'" @click="selected_event_size = 100">100</b-button>
                <b-button size="sm" style="width: 80px;" :variant="selected_event_size == 200 ? 'warning' : 'outline-warning'"  @click="selected_event_size = 200">200</b-button>
                <b-button size="sm" style="width: 80px;" :variant="selected_event_size == 500 ? 'warning' : 'outline-warning'"  @click="selected_event_size = 500">500</b-button>
                <b-button size="sm" style="width: 80px;" :variant="selected_event_size == 1000 ? 'warning' : 'outline-warning'" @click="selected_event_size = 1000">1000</b-button>
                <b-button size="sm" style="width: 80px;" :variant="selected_event_size == 2500 ? 'warning' : 'outline-warning'" @click="selected_event_size = 2500">2500</b-button>
            </b-form-group>
            <b-row>
                <b-col>
                    <b-form-group label="Date">
                        <!-- ko_KR -->
                        <b-form-datepicker v-model="form.date" locale="ko" :normal="datepicker_state == 'normal' ? true : false" :readonly="datepicker_state == 'readonly' ? true : false" size="sm"></b-form-datepicker>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="진행시간(분)">
                        <b-form-input v-model="form.term" type="number" size="sm"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Event Logo">
                        <b-card no-body>
                            <b-card-text class="ino-180-180-wrap mt-1">
                                <div>
                                    <b-img :src="logo_prev||logo_prev_default" fluid></b-img>
                                </div>
                            </b-card-text>
                            <b-card-text class="mt-1 pl-1 pb-1">
                                <span style="font-size: 10pt;">권장 사이즈는 ★★:★★ 입니다. </span>
                                <b-form-file v-model="logo_file" @change="onFileChange($event, 'logo_prev')" 
                                style="max-width:70%;" class="mr-2" size="sm"></b-form-file>
                                <b-button @click="logo_file = null; logo_prev=''; logo_del=true;" size="sm" variant="danger">삭제</b-button>
                            </b-card-text>
                        </b-card>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Sponsor Banner">
                        <b-card no-body>
                            <b-card-text class="ino-180-180-wrap mt-1">
                                <div>
                                    <b-img :src="banner_prev||banner_prev_default" fluid></b-img>
                                </div>
                            </b-card-text>
                            <b-card-text class="mt-1 pl-1 pb-1">
                                <span style="font-size: 10pt;">권장 사이즈는 ★★:★★ 입니다. </span>
                                <b-form-file v-model="banner_file" @change="onFileChange($event, 'banner_prev')" 
                                style="max-width:70%;" class="mr-2" size="sm"></b-form-file>
                                <b-button @click="banner_file = null; banner_prev=''; banner_del=true;" size="sm" variant="danger">삭제</b-button>
                            </b-card-text>
                        </b-card>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Event Background Image">
                        <b-card no-body>
                            <b-card-text class="ino-180-180-wrap mt-1">
                                <div>
                                    <b-img :src="background_prev||background_prev_default" fluid></b-img>
                                </div>
                            </b-card-text>
                            <b-card-text class="mt-1 pl-1 pb-1">
                                <span style="font-size: 10pt;">권장 사이즈는 ★★:★★ 입니다. </span>
                                <b-form-file v-model="background_file" @change="onFileChange($event, 'background_prev')" 
                                style="max-width:70%;" class="mr-2" size="sm"></b-form-file>
                                <b-button @click="background_file = null; background_prev=''; background_del=true;" size="sm" variant="danger">삭제</b-button>
                            </b-card-text>
                        </b-card>
                    </b-form-group>
                </b-col>
                <b-col>
                </b-col>
            </b-row>
            <b-form-group label="Languages">
                <b-input-group v-for="(item, index) in lang_arr" :key="index" class="mb-1">
                    <b-form-select v-model="item.language" :options="lang_options" style="width:427px;"></b-form-select>
                    <b-input-group-append>
                        <b-button size="sm" variant="danger" @click="lang_arr.splice(index, 1)">X</b-button>
                    </b-input-group-append>
                </b-input-group>
                <b-row class="text-center" @click="lang_arr.push({language: '한국어'})"><b-col><b-button size="sm" variant="info"><b-icon-plus></b-icon-plus> 언어추가</b-button></b-col></b-row>
            </b-form-group>
        </b-card>

        <b-card no-body class="p-1" :border-variant="modal1_border" v-show="form_page == 2">
            <b-form-group label="Event type">
                <b-form-checkbox v-model="login" unchecked-value="1" value="0" variant="success">
                    Attendee 로그인 계정 불필요
                </b-form-checkbox>
                <b-form-checkbox v-model="login" unchecked-value="0" value="1" variant="success">
                    Attendee 로그인 계정 필요
                </b-form-checkbox>
                <div class="pl-4" v-show="login==1">
                    <p class="m-0" style="color: silver; font-size: 10pt;">- Attendee에 참가등록 이메일을 전송합니다.</p>
                    <p class="m-0" style="color: silver; font-size: 10pt;">(참가등록 알림을 수령한 이메일로만 로그인 가능합니다.)</p>
                    <b-form-checkbox v-model="login_type" unchecked-value="1" value="0" variant="success">
                    비밀번호 없이 이메일 ID로만 로그인 합니다.
                    </b-form-checkbox>
                    <b-form-checkbox v-model="login_type" unchecked-value="0" value="1" variant="success">
                    이메일 ID + Passcode로 로그인 합니다.
                    </b-form-checkbox>
                    <b-form-input v-show="login_type == 1" placeholder="Passcode를 입력하세요.(6자리 숫자)" size="sm" type="number"></b-form-input>
                </div>
            </b-form-group>
            <b-form-group label="Event 정책설정">
                <b-form-checkbox v-model="event_chat" unchecked-value="1" value="0" variant="success">
                    Event Chatting
                </b-form-checkbox>
                <div class="pl-4">
                    <p class="m-0" style="color: silver; font-size: 10pt;">- Attendees 사이에 chatting할 수 있습니다.</p>
                </div>
                <b-form-checkbox v-model="qna" unchecked-value="0" value="1" variant="success">
                    Q&A / Chat
                </b-form-checkbox>
                <p class="pl-4 m-0" style="color: silver; font-size: 10pt;">- Attendees 가 Moderators와 Presenters에 질문할 수 있습니다.</p>
                <div class="pl-4" v-show="qna==1">
                    <b-form-checkbox v-model="qna_noname" unchecked-value="0" value="1" variant="success">
                        익명질문을 허용합니다.
                    </b-form-checkbox>
                    <b-form-checkbox v-model="qna_auto" unchecked-value="0" value="1" variant="success">
                        질문을 자동으로 승인합니다.
                    </b-form-checkbox>
                </div>

                <b-form-checkbox v-model="show_count" unchecked-value="0" value="1" variant="success">
                    Live Attendee
                </b-form-checkbox>

                <b-form-checkbox v-model="music" unchecked-value="0" value="1" variant="success">
                    Welcome Music Play
                </b-form-checkbox>
                <div class="pl-4">
                    <p class="m-0" style="color: silver; font-size: 10pt;">- Broadcast 시작 전 Attendee를 위해 music play</p>
                </div>
            </b-form-group>
            <b-form-group label="Survey">
                <b-form-checkbox v-model="survey" unchecked-value="0" value="1" variant="success">
                    Attendee가 종료 후 사전 설정된 survey에 참여토록 합니다.
                </b-form-checkbox>
                <div class="pl-4" v-show="survey == 1">
                    <b-form-input size="sm" v-model="survey_link" placeholder="https://(servey 링크를 입력하세요)"></b-form-input>
                </div>
            </b-form-group>
        </b-card>
        <b-row class="text-right mt-1"><b-col><b-button size="sm" variant="info" @click="form_page = 2" v-show="form_page == 1">Next <b-icon-chevron-right></b-icon-chevron-right></b-button></b-col></b-row>
        <b-row class="text-right mt-1">
            <b-col>
                <b-button size="sm" variant="info" @click="form_page = 1" v-show="form_page == 2"><b-icon-chevron-left></b-icon-chevron-left> Previous</b-button>
                <b-button size="sm" variant="primary" @click="storeData" v-show="form_page == 2"> Done </b-button>
            </b-col>
        </b-row>
    </b-modal>

    <!-- 참가자 초정리스트 -->
    <b-modal v-model="modal4" hide-footer title="참가자 초정리스트">
         <b-card no-body>
            <b-tabs v-model="attend_tabIndex" small card>
                <b-tab title="Moderator">
                    <b-table
                        :fields="modal4_fields" :items="modal4_items_1" small bordered head-variant="light" class="mt-1" style="font-size: 9pt; vertical-align: center; line-height:33px;">
                        <template #cell(id)="row">
                            <div class="text-center">{{row.item.id}}</div>
                        </template>
                    </b-table>
                </b-tab>
                <b-tab title="Presenter">
                    <b-table
                        :fields="modal4_fields" :items="modal4_items_2" small bordered head-variant="light" class="mt-1" style="font-size: 9pt; vertical-align: center; line-height:33px;">
                        <template #cell(id)="row">
                            <div class="text-center">{{row.item.id}}</div>
                        </template>
                    </b-table>
                </b-tab>

            </b-tabs>
        </b-card>
        
    </b-modal>

    <!-- qna, 참가자 -->
    <b-modal v-model="modal2" hide-footer :title="modal2_type">
        <b-row class="text-right">
            <b-col>
                <b-button size="sm" @click="excelDownload"> 엑셀 다운로드 </b-button>
            </b-col>
        </b-row>
        <b-table v-show="modal2_type == 'Q&A'"
            :fields="qna_fields" :items="qna_items" small bordered head-variant="light" class="mt-1" style="font-size: 9pt; vertical-align: center; line-height:33px;">
            <template #cell(id)="row">
                <div class="text-center">{{row.item.id}}</div>
            </template>
            <template #cell(manageBtn)="row">
                <div class="text-center">
                    <b-button size="sm" variant="outline-danger" @click="deleteQnA(row.item, $event, row.index)">
                        <b-icon-trash2-fill></b-icon-trash2-fill>삭제
                    </b-button>
                </div>
            </template>
        </b-table>

        <b-table v-show="modal2_type == '참가자'"
            :fields="attend_fields" :items="attend_items" small bordered head-variant="light" class="mt-1" style="font-size: 9pt; vertical-align: center; line-height:33px;">
            <template #cell(id)="row">
                <div class="text-center">{{row.item.id}}</div>
            </template>
        </b-table>
    </b-modal>

    <!-- Invitation -->
    <b-modal v-model="modal3" hide-footer title="INVITATION">
        <b-card no-body>
            <b-tabs v-model="invitaion_tabIndex" small card>
                <b-tab title="Moderator">
                    좌장을 이메일로 초대합니다.
                </b-tab>
                <b-tab title="Presenter">
                    발표자를 이메일로 초대합니다.
                </b-tab>
                <b-tab title="Attendee">
                    발표자를 이메일로 초대합니다.
                </b-tab>
            </b-tabs>
            
            <b-row>
                <b-col cols="3">
                    <b-img class="ml-4" src="./static/images/img_url.png" alt=""></b-img>
                </b-col>
                <b-col cols="9">
                    <p class="m-0">Join URL</p>
                    <p class="m-0 text-primary">https://primetime.bluejeans.com/a2m/live-event/ykrqgdsh</p>
                </b-col>
            </b-row>
            <b-row class="p-1">
                <b-col>
                    <b-form-textarea
                    v-model="email_content"
                    rows="3"
                    max-rows="6"
                    ></b-form-textarea>

                </b-col>
            </b-row>
            <b-row class="mt-1 mb-1 text-center">
                <b-col>
                    <b-button size="sm" variant="primary">초대메일 전송</b-button>
                </b-col>
            </b-row>
        </b-card>
    </b-modal>
</section>
</template>

<script>
module.exports = {
    name: "Vm",
    data: function () {
        return {
            tabIndex: 0,
            openId: [],
            expectNum: 100,
            weeks: [],
            primary: 'primary',
            outline_primary: 'outline-primary',
            selected_btn_index: 0,
            selected_event_size: 0,
            datepicker_state: 'normal', // disabled, readonly, normal
            modal1: false,
            modal1_border: "primary",

            modal2: false,
            modal2_type: 'Q&A',
            modal3: false,
            modal4: false,

            logo_file: null,
            logo_prev: '',
            logo_prev_default: 'https://via.placeholder.com/480x60',
            logo_del: false,

            banner_file: null,
            banner_prev: '',
            banner_prev_default: 'https://via.placeholder.com/100x600',
            banner_del: false,

            background_file: null,
            background_prev: '',
            background_prev_default: 'https://via.placeholder.com/480x60',
            background_del: false,
            
            form_page: 1,


			lang_options: [
				{value: '한국어', text: '한국어'},
				{value: '영어', text: '영어'},
				{value: '프랑스어', text: '프랑스어'},
			],

			lang_arr: [
				{language: '영어'},
				{language: '한국어'},
			],

            login: 0,
            login_type: 0,
            event_chat: 0,
            qna: 0,
            qna_noname: 0,
            qna_auto: 0,

            show_count: 0,
            music: 0,

            survey: 0,
            survey_link: '',

            form: {
            },

            qna_fields: [
                {key: 'id', label: '번호'},
                {key: 'content', label: '내용'},
                {key: 'creater', label: '작성자'},
                {key: 'created_at', label: '작성일'},
                {key: 'manageBtn', label: '관리'},
            ],
            qna_items: [
                {id:3, content: '질문들이 보이시나요', creater: 'test@test.com', created_at: '2020.12.11 14:00'}
            ],

            attend_fields: [
                {key: 'id', label: '번호'},
                {key: 'email', label: '아이디'},
                {key: 'name', label: '이름'},
                {key: 'login', label: '로그인 시간'},
                {key: 'logout', label: '로그아웃 시간'}
            ],
            attend_items: [
                {id: 3, email: 'test@test.com', name: 'kim youn wu', login: '2020.12.11 14:00', logout: '2020.12.11 15:00'}
            ],

            invitaion_tabIndex: 0,
            attend_tabIndex: 0,
            email_content: '',

            modal4_fields: [
                {key: 'id', label: 'No.'},
                {key: 'email', label: 'E-mail'},
                {key: 'invite_time', label: '초대일시'}
            ],
            modal4_items_1: [
                {id: 3, email: 'test@test.com', invite_time: '2020.12.11 14:00'}
            ],
            modal4_items_2: [
                
            ],
        };
    },
    mounted: function () {
        this.$nextTick(function () {
            this.setWeek(7);
            this.form.title= 'hey';
        })
    },
    methods: {
        update: function(obj, prop, value) {
            console.log(obj, prop, value);
            this.$emit('input', { ...this[obj], [prop]: value })
            // Vue.set(obj, prop, obj[prop]);
        },
        setWeek: function (days) {
            var date = new Date();
            var week = ['Sun', 'Mon', 'Tue', 'Wen', 'Thur', 'Fri', 'Sat'];
            for (var i = 1; i < days + 1; i++) {
                var loadDate = new Date(Date.parse(date) + i * 1000 * 60 * 60 * 24); // ++1 일
                var month = (1 + loadDate.getMonth());
                month = month >= 10 ? month : '0' + month;
                var day = loadDate.getDate();
                day = day >= 10 ? day : '0' + day;

                this.weeks.push({
                    text: `${month}.${day}.(${week[loadDate.getDay()]})`,
                    value: `${loadDate.getFullYear()}-${month}-${day}`
                });
            }
        },
        getList: async function (item) {
            console.log(item);
        },
        openModal1: function(event, item) {
            if (item) {
                console.log(item);
                this.form = {...item};
                this.modal1_border = "success";
            } else {
                this.form = {};
                this.modal1_border = "primary";
            }
            this.modal1 = true;
        },
        openModal4: async function(item, index) {
            // get list... 참가자 초청리스트
            this.attend_tabIndex = index;
            this.modal4 = true;
        },
        // selected_event_size = form.event_size
        storeData: async function () {

        },
        deleteQnA: async function (item) {

        },
        openModal2: async function (item, open_type) {
            console.log(item);
            //todo. get list for type
            if (open_type == 'qna') {
                console.log('qna list...');
            } else {
                console.log('attend list...');
            }
            this.modal2_type = open_type;
            this.modal2 = true;

        },
        excelDownload: function () {
            console.log(this.modal2_type, ' download...');
        }

    },
};
</script>

<style scoped>
.vm_card_v_left {
    display: flex;
    align-items: center;
    justify-content: center;

    /* min-height: 136px; */
    padding-right: 0px;
}

.vm_card_v_center {
    border-left: 1px solid silver;
    border-right: 1px solid silver;
}

.vm_card_v_right {
    padding-left: 0px;
}
</style>
