<template>
<section>
    <b-row>
        <b-col>
            <b-button href="#" variant="primary" size="sm" @click="openModal1">
                <b-icon-plus></b-icon-plus> VM 생성
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
                                <b-button href="#" :variant="selected_btn_index == 0 ? primary : outline_primary" size="sm" @click="searchDayList(0)">ALL</b-button>
                                <span v-for="(item, index) in weeks" :key="index">
                                    <b-button href="#" :variant="selected_btn_index == (index+1) ? primary : outline_primary" size="sm" class="mr-1" @click="searchDayList(index+1, item);">{{item.text}}</b-button>
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
                        <b-row class="mt-1" v-for="item in upcoming" :key="item.id">
                            <b-col>
                                <b-card no-body>
                                    <b-row>
                                        <b-col cols="2" class="text-center vm_card_v_left">
                                            <div>
                                                <span style="font-size:smaller;">{{item.date.split(' ')[0]}}</span><br>

                                                <span style="font-size:smaller;">({{ week[(new Date(Date.parse(item.date.split(' ')[0]))).getDay()] }})</span><br>
                                                <b-button variant="danger" pill size="sm">Broadcast START</b-button>
                                            </div>
                                        </b-col>
                                        <b-col cols="8" class="vm_card_v_center">
                                            <b-row style="min-height: 90px;">
                                                <b-col cols="9">
                                                    <span style="font-size:smaller;">vm id : {{item.id}}</span>
                                                    <h5 class="text-primary">{{item.name}}</h5>
                                                    <br>
                                                    <span class="text-secondary">{{item.venue}} {{item.date.substr(5,5).replace('-', '/')}} {{item.date.split(' ')[1]}} ~ {{item.time}}m / GMT +09:00 SEOUL</span>
                                                </b-col>
                                                <b-col cols="3" class="p-1">
                                                    <p class="text-secondary" style="font-size:smaller; width: 100%; height: 100%; padding: 5px; border-left:1px solid silver; line-height: 85px; margin-bottom:0px;">
                                                        <span style="margin-top: 15px;">{{item.host}}</span>
                                                    </p>
                                                </b-col>
                                            </b-row>
                                            <hr style="padding: 0; margin: 0">
                                            <b-row class="mt-1">
                                                <b-col>
                                                    <b-row>
                                                        <b-col>

                                                            <b-collapse :id="'toggle_'+item.id" style="width:100%;">
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
                                                                                </b-button>&nbsp;{{item.moderator_count}}명
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
                                                                                </b-button>&nbsp;{{item.presenter_count}}명
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
                                                                    <b-col class="pl-1">
                                                                        <b-card align="center" no-body class="p-2">
                                                                            <p class="p-0 mb-1">
                                                                                <b-button size="sm" variant="primary" class="inoBtn-200" disabled>Attendee</b-button>
                                                                            </p>
                                                                            <p class="p-0 mb-1">
                                                                                <b-button size="sm" 
                                                                                    @click="openModal4(item, 1)"
                                                                                    pill variant="outline-secondary">
                                                                                    <b-icon-people></b-icon-people>
                                                                                </b-button>&nbsp;{{item.attendee_count}}명
                                                                            </p>
                                                                            <p class="p-0 mb-1">
                                                                                <b-button size="sm" 
                                                                                    @click="modal3=true; invitaion_tabIndex=2"
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
                                                                            예상 참가자수 <strong class="text-primary">{{ item.event_size }}</strong> 명
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
                                                            <b-button v-b-toggle="'toggle_'+item.id" size="sm" variant="outline-primary" @click="openId.includes(item.id) ? openId.splice(openId.indexOf(item.id), 1) : openId.push(item.id);">
                                                                <b-icon-chevron-down v-show="!openId.includes(item.id)"></b-icon-chevron-down>
                                                                <b-icon-chevron-up v-show="openId.includes(item.id)"></b-icon-chevron-up>
                                                            </b-button>
                                                            <b-button size="sm" variant="outline-danger" @click="deleteData(item)">
                                                                <b-icon-trash></b-icon-trash>
                                                            </b-button>
                                                        </b-col>
                                                    </b-row>

                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col cols="2" class="vm_card_v_right ino-180-180-wrap">
                                            <div style="border: none; padding: 0px;">
                                                <b-img :src="item.logo||logo_prev" fluid></b-img>
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
                        <b-row class="mt-1" v-for="item in past" :key="item.id">
                            <b-col>
                                <b-card no-body>
                                    <b-row>
                                        <b-col cols="2" class="text-center vm_card_v_left">
                                            <div>
                                                <span style="font-size:smaller;">{{item.date.split(' ')[0]}}</span><br>

                                                <span style="font-size:smaller;">({{ week[(new Date(Date.parse(item.date.split(' ')[0]))).getDay()] }})</span><br>
                                                <b-button variant="danger" pill size="sm">Broadcast START</b-button>
                                            </div>
                                        </b-col>
                                        <b-col cols="8" class="vm_card_v_center">
                                            <b-row style="min-height: 90px;">
                                                <b-col cols="9">
                                                    <span style="font-size:smaller;">vm id : {{item.id}}</span>
                                                    <h5 class="text-primary">{{item.name}}</h5>
                                                    <br>
                                                    <span class="text-secondary">{{item.venue}} {{item.date.substr(5,5).replace('-', '/')}} {{item.date.split(' ')[1]}} ~ {{item.time}}m / GMT +09:00 SEOUL</span>
                                                </b-col>
                                                <b-col cols="3" class="p-1">
                                                    <p class="text-secondary" style="font-size:smaller; width: 100%; height: 100%; padding: 5px; border-left:1px solid silver; line-height: 85px; margin-bottom:0px;">
                                                        <span style="margin-top: 15px;">{{item.host}}</span>
                                                    </p>
                                                </b-col>
                                            </b-row>
                                            <hr style="padding: 0; margin: 0">
                                            <b-row class="mt-1">
                                                <b-col>
                                                    <b-row>
                                                        <b-col>

                                                            <b-collapse :id="'toggle_'+item.id" style="width:100%;">
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
                                                                                </b-button>&nbsp;{{item.moderator_count}}명
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
                                                                                </b-button>&nbsp;{{item.presenter_count}}명
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
                                                                    <b-col class="pl-1">
                                                                        <b-card align="center" no-body class="p-2">
                                                                            <p class="p-0 mb-1">
                                                                                <b-button size="sm" variant="primary" class="inoBtn-200" disabled>Attendee</b-button>
                                                                            </p>
                                                                            <p class="p-0 mb-1">
                                                                                <b-button size="sm" 
                                                                                    @click="openModal4(item, 1)"
                                                                                    pill variant="outline-secondary">
                                                                                    <b-icon-people></b-icon-people>
                                                                                </b-button>&nbsp;{{item.attendee_count}}명
                                                                            </p>
                                                                            <p class="p-0 mb-1">
                                                                                <b-button size="sm" 
                                                                                    @click="modal3=true; invitaion_tabIndex=2"
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
                                                                            예상 참가자수 <strong class="text-primary">{{ item.event_size }}</strong> 명
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
                                                            <b-button v-b-toggle="'toggle_'+item.id" size="sm" variant="outline-primary" @click="openId.includes(item.id) ? openId.splice(openId.indexOf(item.id), 1) : openId.push(item.id);">
                                                                <b-icon-chevron-down v-show="!openId.includes(item.id)"></b-icon-chevron-down>
                                                                <b-icon-chevron-up v-show="openId.includes(item.id)"></b-icon-chevron-up>
                                                            </b-button>
                                                            <b-button size="sm" variant="outline-danger" @click="deleteData(item)">
                                                                <b-icon-trash></b-icon-trash>
                                                            </b-button>
                                                        </b-col>
                                                    </b-row>

                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col cols="2" class="vm_card_v_right ino-180-180-wrap">
                                            <div style="border: none; padding: 0px;">
                                                <b-img :src="item.logo||logo_prev" fluid></b-img>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </b-card>

                            </b-col>
                        </b-row>
                    </b-tab>

                </b-tabs>
            </b-card>

        </b-col>
    </b-row>
    
    <b-modal v-model="modal1" hide-footer title="Event Information" body-bg-variant="light">
        <b-card no-body class="p-1" :border-variant="modal1_border" v-show="form_page == 1">
            <b-tabs card>
                <b-tab title="국문" active>
                    <b-form-group label="Event title" label-variant="primary">
                        <b-form-input v-model="form.name" size="sm" :state="form.name ? true: false"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Sub title">
                        <b-form-input v-model="form.sub_title" size="sm"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Venue">
                        <b-form-input v-model="form.venue" size="sm" :state="form.venue ? true: false"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Host">
                        <b-form-input v-model="form.host" size="sm" :state="form.host ? true: false"></b-form-input>
                    </b-form-group>
                </b-tab>
                <b-tab title="영문">
                    <b-form-group label="Event title" label-variant="primary">
                        <b-form-input v-model="form.name_en" size="sm"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Sub title">
                        <b-form-input v-model="form.sub_title_en" size="sm"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Venue">
                        <b-form-input v-model="form.venue_en" size="sm"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Host">
                        <b-form-input v-model="form.host_en" size="sm"></b-form-input>
                    </b-form-group>
                </b-tab>
            </b-tabs>
            <hr class="mt-0">
            <b-form-group label="Event Size (최대 예상인원, 누적 인원 수)">
                <b-button size="sm" style="width: 80px;" :variant="event_size == 100 ? 'warning' : 'outline-warning'" @click="event_size = 100">100</b-button>
                <b-button size="sm" style="width: 80px;" :variant="event_size == 200 ? 'warning' : 'outline-warning'"  @click="event_size = 200">200</b-button>
                <b-button size="sm" style="width: 80px;" :variant="event_size == 500 ? 'warning' : 'outline-warning'"  @click="event_size = 500">500</b-button>
                <b-button size="sm" style="width: 80px;" :variant="event_size == 1000 ? 'warning' : 'outline-warning'" @click="event_size = 1000">1000</b-button>
                <b-button size="sm" style="width: 80px;" :variant="event_size == 2500 ? 'warning' : 'outline-warning'" @click="event_size = 2500">2500</b-button>
            </b-form-group>
            <b-row>
                <b-col>
                    <b-form-group label="Date">
                        <!-- ko_KR -->
                        <b-form-datepicker v-model="form.date" locale="ko" 
                            :min="min"
                            :normal="datepicker_state == 'normal' ? true : false" :readonly="datepicker_state == 'readonly' ? true : false" size="sm"></b-form-datepicker>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="시간">
                        <b-input-group>
                            <b-form-input
                                v-model="start_time"
                                :state="start_time ? true: false"
                                type="text"
                                placeholder="HH:mm"
                                size="sm"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-form-timepicker v-model="start_time" size="sm" locale="kr" button-only></b-form-timepicker>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="진행시간(분)">
                        <b-form-input v-model="form.time" :state="form.time ? true: false" type="number" size="sm"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Event Logo">
                        <b-card no-body>
                            <b-card-text class="ino-180-180-wrap mt-1">
                                <div>
                                    <b-img :src="form.logo||logo_prev" fluid></b-img>
                                </div>
                            </b-card-text>
                            <b-card-text class="mt-1 pl-1 pb-1">
                                <span style="font-size: 10pt;">권장 사이즈는 ★★:★★ 입니다. </span>
                                <b-input-group>
                                    <b-form-file v-model="logo_file" @change="onFileChange($event, 'logo', form)" size="sm"></b-form-file>
                                    <b-input-group-append>
                                        <b-button @click="logo_file = null; form.logo=''; logo_del=true;" size="sm" variant="danger">삭제</b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-card-text>
                        </b-card>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Sponsor Banner">
                        <b-card no-body>
                            <b-card-text class="ino-180-180-wrap mt-1">
                                <div>
                                    <b-img :src="form.banner||banner_prev" fluid></b-img>
                                </div>
                            </b-card-text>
                            <b-card-text class="mt-1 pl-1 pb-1">
                                <span style="font-size: 10pt;">권장 사이즈는 ★★:★★ 입니다. </span>
                                <b-input-group>
                                    <b-form-file v-model="banner_file" @change="onFileChange($event, 'banner', form)" size="sm"></b-form-file>
                                    <b-input-group-append>
                                        <b-button @click="banner_file = null; form.banner=''; banner_del=true;" size="sm" variant="danger">삭제</b-button>
                                    </b-input-group-append>
                                </b-input-group>
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
                                    <b-img :src="form.background||background_prev" fluid></b-img>
                                </div>
                            </b-card-text>
                            <b-card-text class="mt-1 pl-1 pb-1">
                                <span style="font-size: 10pt;">권장 사이즈는 ★★:★★ 입니다. </span>
                                <b-form-file v-model="background_file" @change="onFileChange($event, 'background', form)" 
                                style="max-width:70%;" class="mr-2" size="sm"></b-form-file>
                                <b-button @click="background_file = null; form.background=''; background_del=true;" size="sm" variant="danger">삭제</b-button>
                            </b-card-text>
                        </b-card>
                    </b-form-group>
                </b-col>
                <b-col>
                </b-col>
            </b-row>
            <b-form-group label="Languages">
                <b-input-group v-for="(item, index) in lang_arr" :key="item.user_id" class="mb-1">
                    <b-form-input v-model="item.language" type="text"></b-form-input>
                    <b-form-select v-model="item.user_id" @change="selectedChange(item, index)">
                          <b-form-select-option :value="item.user_id">{{item.name}}</b-form-select-option>
                          <b-form-select-option v-for="user in available" :key="user.value" :value="user.value">{{user.text}}</b-form-select-option>
                    </b-form-select>
                    <b-input-group-append>
                        <b-button size="sm" variant="danger" @click="removeLang(item, index)">X</b-button>
                    </b-input-group-append>
                </b-input-group>
                <b-row class="text-center">
                    <b-col>
                        <b-button size="sm" variant="info" @click="addLanguage"><b-icon-plus></b-icon-plus> 언어추가</b-button>
                    </b-col>
                </b-row>
            </b-form-group>
        </b-card>

        <b-card no-body class="p-1" :border-variant="modal1_border" v-show="form_page == 2">
            <b-form-group label="Event type">
                <b-form-checkbox v-model="form.is_login_attendee" unchecked-value="1" value="0" variant="success">
                    Attendee 로그인 계정 불필요
                </b-form-checkbox>
                <b-form-checkbox v-model="form.is_login_attendee" unchecked-value="0" value="1" variant="success">
                    Attendee 로그인 계정 필요
                </b-form-checkbox>
                <div class="pl-4" v-show="form.is_login_attendee == 1">
                    <p class="m-0" style="color: silver; font-size: 10pt;">- Attendee에 참가등록 이메일을 전송합니다.</p>
                    <p class="m-0" style="color: silver; font-size: 10pt;">(참가등록 알림을 수령한 이메일로만 로그인 가능합니다.)</p>
                    <b-form-checkbox v-model="form.is_type_attendee" unchecked-value="1" value="0" variant="success">
                        비밀번호 없이 이메일 ID로만 로그인 합니다.
                    </b-form-checkbox>
                    <b-form-checkbox v-model="form.is_type_attendee" unchecked-value="0" value="1" variant="success">
                        이메일 ID + Passcode로 로그인 합니다.
                    </b-form-checkbox>
                    <b-form-input v-show="form.is_type_attendee == 1" v-model="form.attendee_password" placeholder="Passcode를 입력하세요.(6자리 숫자)" size="sm" type="number" :max="6"></b-form-input>
                </div>
            </b-form-group>
            <b-form-group label="Event 정책설정">
                <b-form-checkbox v-model="form.is_qna_chat" unchecked-value="1" value="0" variant="success">
                    Event Chatting
                </b-form-checkbox>
                <div class="pl-4">
                    <p class="m-0" style="color: silver; font-size: 10pt;">- Attendees 사이에 chatting할 수 있습니다.</p>
                </div>
                <b-form-checkbox v-model="form.is_qna_chat" unchecked-value="0" value="1" variant="success">
                    Q&A / Chat
                </b-form-checkbox>
                <p class="pl-4 m-0" style="color: silver; font-size: 10pt;">- Attendees 가 Moderators와 Presenters에 질문할 수 있습니다.</p>
                <div class="pl-4" v-show="form.is_qna_chat==1">
                    <b-form-checkbox v-model="form.is_question_anonymous" unchecked-value="0" value="1" variant="success">
                        익명질문을 허용합니다.
                    </b-form-checkbox>
                    <b-form-checkbox v-model="form.is_question_auto" unchecked-value="0" value="1" variant="success">
                        질문을 자동으로 승인합니다.
                    </b-form-checkbox>
                </div>

                <b-form-checkbox v-model="form.is_show_attendee_count" unchecked-value="0" value="1" variant="success">
                    Live Attendee
                </b-form-checkbox>

                <b-form-checkbox v-model="form.is_play_music" unchecked-value="0" value="1" variant="success">
                    Welcome Music Play
                </b-form-checkbox>
                <div class="pl-4">
                    <p class="m-0" style="color: silver; font-size: 10pt;">- Broadcast 시작 전 Attendee를 위해 music play</p>
                </div>
            </b-form-group>
            <b-form-group label="Survey">
                <b-form-checkbox v-model="form.is_use_survey" unchecked-value="0" value="1" variant="success">
                    Attendee가 종료 후 사전 설정된 survey에 참여토록 합니다.
                </b-form-checkbox>
                <div class="pl-4" v-show="form.is_use_survey == 1">
                    <b-form-input size="sm" v-model="form.survey_link" placeholder="https://(servey 링크를 입력하세요)"></b-form-input>
                </div>
            </b-form-group>
        </b-card>
        <b-row class="text-right mt-1"><b-col><b-button size="sm" variant="info" @click="goNext" v-show="form_page == 1">Next <b-icon-chevron-right></b-icon-chevron-right></b-button></b-col></b-row>
        <b-row class="text-right mt-1">
            <b-col>
                <b-button size="sm" variant="info" @click="form_page = 1" v-show="form_page == 2"><b-icon-chevron-left></b-icon-chevron-left> Previous</b-button>
                <b-button size="sm" variant="primary" @click="storeData" v-show="form_page == 2 && !form.id"> Done </b-button>
                <b-button size="sm" variant="success" @click="update" v-show="form_page == 2 && form.id"> Update </b-button>
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
                    <b-row>
                        <b-col cols="3">
                            <b-img class="ml-4" src="./static/images/img_url.png" alt=""></b-img>
                        </b-col>
                        <b-col cols="9">
                            <p class="m-0">Join URL</p>
                            <p class="m-0 text-primary">
                                <span>http://earth-sandwich.com/VM/conference_m.html?event_id={{event_id}}</span>
                                <input type="hidden" ref="email1" :value="`http://earth-sandwich.com/VM/conference_m.html?event_id=${event_id}`">
                                <b-button size="sm" variant="outline-info" @click.stop.prevent="exeCopy($event, 'email1')" ><b-icon-clipboard-plus></b-icon-clipboard-plus></b-button>
                            </p>
                        </b-col>
                    </b-row>
                </b-tab>
                <b-tab title="Presenter">
                    발표자를 이메일로 초대합니다.
                    <b-row>
                        <b-col cols="3">
                            <b-img class="ml-4" src="./static/images/img_url.png" alt=""></b-img>
                        </b-col>
                        <b-col cols="9">
                            <p class="m-0">Join URL</p>
                            <p class="m-0 text-primary">
                                <span>http://earth-sandwich.com/VM/conference_p.html?event_id=37</span>
                                <input type="hidden" ref="email2" :value="`http://earth-sandwich.com/VM/conference_p.html?event_id=${event_id}`">
                                <b-button size="sm" variant="outline-info" @click.stop.prevent="exeCopy($event, 'email2')" ><b-icon-clipboard-plus></b-icon-clipboard-plus></b-button>
                            </p>
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
                                <span>http://earth-sandwich.com/VM/conference_1.html?event_id=37</span>
                                <input type="hidden" ref="email3" :value="`http://earth-sandwich.com/VM/conference_1.html?event_id=${event_id}`">
                                <b-button size="sm" variant="outline-info" @click.stop.prevent="exeCopy($event, 'email3')" ><b-icon-clipboard-plus></b-icon-clipboard-plus></b-button>
                            </p>
                        </b-col>
                    </b-row>
                </b-tab>
            </b-tabs>
            
            
            <b-row class="p-1">
                <b-col>
                    <b-form-group label="VM" label-for="tags-component-select">
                        <b-form-tags id="tags-component-select" v-model="tagValue" size="sm" add-on-change no-outer-focus>
                            <template v-slot="{ tags, addTag, disabled, removeTag }">

                                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                                    <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                        <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                                    </li>
                                </ul>
                                
                                <b-form-input v-model="search" id="tag-search-input" type="search" size="sm" autocomplete="off" list="input-list" ref="shobal" @update="multi_onOptionClick({ search, addTag, removeTag })"></b-form-input>
                                <datalist id="input-list">
                                    <option v-for="option in availableOptions" :key="option.id">{{ option.name }}</option>
                                    <option v-if="availableOptions.length === 0">There are no tags available to select</option>
                                </datalist>

                            </template>
                        </b-form-tags>
                    </b-form-group>

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
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const minDate = new Date(today)
        
        return {
            tabIndex: 0,
            openId: [],
            expectNum: 100,
            weeks: [],
            primary: 'primary',
            outline_primary: 'outline-primary',
            selected_btn_index: 0,
            event_size: 0,
            datepicker_state: 'normal', // disabled, readonly, normal
            modal1: false,
            modal1_border: "primary",

            modal2: false,
            modal2_type: 'Q&A',
            modal3: false,
            modal4: false,

            logo_file: null,
            logo_prev: this.$store.getters.dummy_image_url(['480x60']),
            logo_del: false,

            banner_file: null,
            banner_prev: this.$store.getters.dummy_image_url(['100x600']),
            banner_del: false,

            background_file: null,
            background_prev: this.$store.getters.dummy_image_url(['480x60']),
            background_del: false,
            
            form_page: 1,

			lang_options: [
				{value: 1, text: '박지성'},
				{value: 2, text: '김종국'},
				{value: 3, text: '홀란드'},
				{value: 4, text: '파루크'},
				{value: 5, text: '이순신'}
			],
			lang_arr: [], // {user_id, language, available}
            available: [],

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
            
            form_date: '',
            start_time: '',
            form: {},
            min: minDate,

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
            event_id: 0,
            api_url: ``,

            upcoming: [],
            past: [],
            week: ['Sun', 'Mon', 'Tue', 'Wen', 'Thur', 'Fri', 'Sat'],

            vm: [],
            search: '', // 선택한 vm 키워드
            tagValue: [], // 선택된 vm 키워드 문자 집합
        };
    },
    watch: {
        lang_arr: {
            deep: true,
            handler: function() {
                
            }
            
        }
    },
    computed: {
        validation: function () {
            return this.form.name && this.form.venue && this.form.host && this.event_size
            && this.form.date && this.start_time && this.form.time;
        },
        criteria() {
            return this.search.trim().toLowerCase()
        },
        availableOptions() {
            const criteria = this.criteria;
            const options = this.vm.filter(opt => this.tagValue.indexOf(opt.name) === -1);
            if (criteria) {
                return options.filter(opt => opt.name.toLowerCase().indexOf(criteria) > -1); // return new array
            }
            return options;
        },
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.event_id = this.$store.getters.event_id;
            this.api_url = this.$store.getters.api_url;
            this.setWeek(7);
            await this.getSelects();
            this.getList();
        })
    },
    methods: {

        /**
         * 기본
         */
        getList: async function (item) {
            let url = `${this.api_url}/conference?event_id=${this.event_id}`;
            if (item) {
                url = `${url}&date=${item.value}`;
            }
            let rs = await axios.get(url);
            this.upcoming = rs.data.result.upcoming;
            this.past = rs.data.result.past;
        },
        searchDayList: async function (index, item) {
            this.selected_btn_index = index;
            this.getList(item);
        },
        storeData: async function () {
            console.log(this.form);
            
            
            let url = `${this.api_url}/conference`;
            let formData = new FormData();
                formData.append('event_id', this.event_id);
                
                // language
                let language = [];
                this.lang_arr.forEach(el => {
                    language.push({user_id: el.user_id, language: el.language});
                });
                
                formData.append('language', JSON.stringify(language));

                // event size
                formData.append('event_size', this.event_size);

                if (this.form.survey_link && !this.form.survey_link.includes('http')) {
                    this.form.survey_link = `http://${this.form.survey_link}`;
                }
                // etc 
                for (let item in this.form) {
                    formData.append(item, this.form[item]);
                }

                // files
                formData.delete('logo');
                formData.delete('banner');
                formData.delete('background');

                let date = `${this.form.date} ${this.start_time ? this.start_time.substr(0, 5) : '00:00'}`;
                formData.append('date', date); // date 리셋
                

                !this.logo_file && this.logo_del ? formData.append('logo_del', 'Y') : formData.append('logo', this.logo_file);
                !this.banner_file && this.banner_del ? formData.append('banner_del', 'Y') : formData.append('banner', this.banner_file);
                !this.background_file && this.background_del ? formData.append('background_del', 'Y') : formData.append('background', this.background_file);

                // form submit
                try {
                    let rs = await axios.post(url, formData, {
                        Headers: {'Content-Type': 'multipart/form-data'}
                    });

                    // function callback () {
                    //     this.$router.go(-1);
                    // }
                    this.getList();
                    this.$showMsgBoxTwo(rs.status);
                } catch (error) {
                    this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
                } finally {
                    this.modal1 = false;
                }

        },
        update: async function() {
            console.log(this.form);
            
            let url = `${this.api_url}/conference/${this.form.id}`;
            let formData = new FormData();
                // language
                let language = [];
                this.lang_arr.forEach(el => {
                    language.push({user_id: el.user_id, language: el.language});
                });
                
                formData.append('language', JSON.stringify(language));

                // event size
                formData.append('event_size', this.event_size);

                if (this.form.survey_link && !this.form.survey_link.includes('http')) {
                    this.form.survey_link = `http://${this.form.survey_link}`;
                }
                // etc 
                for (let item in this.form) {
                    formData.append(item, this.form[item]);
                }

                // files
                formData.delete('logo');
                formData.delete('banner');
                formData.delete('background');

                console.log(this.form.start_time);

                let date = `${this.form.date} ${this.start_time ? this.start_time.substr(0, 5) : '00:00'}`;
                formData.append('date', date); // date 리셋

                !this.logo_file && this.logo_del ? formData.append('logo_del', 'Y') : formData.append('logo', this.logo_file);
                !this.banner_file && this.banner_del ? formData.append('banner_del', 'Y') : formData.append('banner', this.banner_file);
                !this.background_file && this.background_del ? formData.append('background_del', 'Y') : formData.append('background', this.background_file);

                // form submit
                try {
                    let rs = await axios.post(url, formData, {
                        Headers: {'Content-Type': 'multipart/form-data'}
                    });
                    this.getList();
                    this.$showMsgBoxTwo(rs.status);
                } catch (error) {
                    this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
                } finally {
                    this.modal1 = false;
                }
        },
        deleteData: async function (item) {
            //http://14.63.172.119/api/v1/conference/3
            if (confirm('삭제 하시겠습니까?')) {
                try {
                    let rs = await axios.delete(`${this.api_url}/conference/${item.id}`);
                    if (rs.data.code == 412) {
                        this.$showMsgBoxTwo(rs.data.code, '', '컨퍼런스 메뉴에서 사용중인 VM 입니다.');
                        return;
                    }
                    this.getList();
                    this.$showMsgBoxTwo(rs.status);
                    
                } catch (error) {
                    this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
                }
            }
        },
        deleteQnA: async function (item) {

        },

        /**
         * 기타
         */
        selectedChange: function(item, index) {
            console.log(index, item); // id, name, language(memo)
            if (!this.available.length) {
                return;
            }
            let filterd = this.available.filter(el => el.value == item.user_id);
            item.name = filterd[0].text;

            let selected_ids = [];
            this.lang_arr.forEach(el => {
                selected_ids.push(el.user_id);
            })
            
            this.available = [];
            this.lang_options.forEach(el => {
                if (!selected_ids.includes(el.value)) {
                    this.available.push(el);
                }
            });
            
        },
        addLanguage: function () {
            console.log(this.lang_arr);

            // lang_arr를 만들어준다. {user_id, name, language, available: [{text: user_id, value: name}]}
            let user_id = ''; // 요소 1
            let name = '';
            let language = '';
            if (!this.lang_arr.length) {
                user_id = this.lang_options[0].value;
                name = this.lang_options[0].text;
                language = '';
                this.available = [...this.lang_options];
                this.available.splice(0, 1);
                this.lang_arr.push({user_id, name, language});
                return;
            }
            // 최초순환 끝

            // 두번째부터 수행
            let selected = [];
            let selected_name = {};
            this.lang_arr.forEach(el => {
                selected.push(el.user_id);
                selected_name[el.user_id] = {name: el.name, language: el.language};
            });
            
            this.available = [];
            this.lang_options.forEach(el => {
                if (!selected.includes(el.value)) {
                    this.available.push(el); // 순수한 선택옵션들로 재구성
                }
            });

            if (!this.available.length) {
                return;
            }

            selected.push(this.available[0].value); // 가능목록 중 1번을 선택됨에 추가
            selected_name[this.available[0].value] = {name: this.available[0].text, language: ''}; // 가능목록 중 1번 이름을 선택됨에 추가
            this.available.splice(0, 1); // 추가시킨 항목을 가능 목록에서 제거
            
            this.lang_arr = []; // 초기화
            // 선택됨을 토대로 다시 그려줌.
            selected.forEach(user_id => {
                let obj = selected_name[user_id];
                this.lang_arr.push({user_id, name: obj.name, language: obj.language});
            });
        },
        removeLang: function (item, index) {
            let revive = {value: item.user_id, text: item.name}; // 되살릴 아이템 구성
            this.lang_arr.splice(index, 1); // 일단 목록에서 줄어든다.
            this.available.push(revive); // 남은 목록 안에 선택 가능한 옵션으로 되살린 아이템 넣어준다.
        },
        goNext: function () {
            if (this.validation) {
                this.form_page = 2;
            } else {
                this.$toast('Alert', '폼을 모두 입력해 주세요.', 'danger');
            }
        },
        setForm: function () {
            // 등록폼 모달의 초기 폼 세팅
            this.form = {};
            const now = new Date();

            let month = now.getMonth() + 1;
                month = month < 10 ? `0${month}` : month;

            let date = now.getDate();
                date = date < 10 ? `0${date}` : date;

            this.form.date = `${now.getFullYear()}-${month}-${date}`;
            this.form.is_login_attendee = 0;
            this.event_size = 100;
        },
        setWeek: function (days) {
            // 상단 1주일치 날짜버튼 생성
            var date = new Date();
            let week = this.week;
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
        excelDownload: function () {
            console.log(this.modal2_type, ' download...');
        },
        openModal1: function(event, item) {
            if (item) {
                console.log(item);
                this.form = {...item};
                let times = this.form.date.split(' ');
                this.form.date = times[0];
                this.start_time = times[1];
                this.event_size = this.form.event_size;
                this.modal1_border = "success";

                // temp test
                item.language = JSON.stringify([{user_id: 1, language: 'k4eke'},
                                        {user_id: 2, language: 'keke1'},
                                        {user_id: 3, language: 'keke3'}]);
                // test..... end
                if (item.language) {
                    let temp_arr = JSON.parse(item.language); // 저장되어 있는 목록
                    if (temp_arr.length) {
                        this.lang_arr = [];
    
                        let selected_value = []; // 아이디만 있는 목록
                        let obj = {};
                        this.lang_options.forEach(el => {
                            obj[el.value] = el.text;
                        });

                        temp_arr.forEach(el => {
                            selected_value.push(el.user_id);
                            this.lang_arr.push({user_id: el.user_id, name:obj[el.user_id], language: el.language});
                        });
    
                        this.available = [];
                        this.lang_options.forEach(el => {
                            if (!selected_value.includes(el.value)) {
                                this.available.push(el);
                            }
                        });
                    }
                }


            } else {
                this.setForm();
                this.lang_arr = [];
                this.available = this.lang_options;
                this.modal1_border = "primary";
            }

            this.form_page = 1;
            this.modal1 = true;
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
        openModal4: async function(item, index) {
            // get list... 참가자 초청리스트
            this.attend_tabIndex = index;
            this.modal4 = true;
        },
        exeCopy: function (event, ref_id) {
            // 이메일 주소 복사
            let testingCodeToCopy = this.$refs[ref_id];
                testingCodeToCopy.setAttribute('type', 'text');
                testingCodeToCopy.select();
             try {
                var successful = document.execCommand('copy');
                if (successful) {
                    this.$toast('Good', 'email address copied', 'success');
                } else {
                    this.$toast('Ooops', 'unable to copy', 'danger');
                }
            } catch (err) {
                this.$toast('Ooops', 'unable to copy', 'danger');
            }
            testingCodeToCopy.setAttribute('type', 'hidden');
            window.getSelection().removeAllRanges();
        },

        getSelects: async function () { // modal select options 초기화
            let url = `${this.api_url}/menu_conference/get_item_list?menu_id=${this.menu_id}`;
            let rs = await axios.get(url);

            this.vm = rs.data.result.conference;
            this.vm = [
                {id: 'abc', name: 'abc@abc.com'},
                {id: 'ade', name: 'ade@abc.com'},
            ]
            console.log('this.vm ', this.vm);
        },
        
        multi_onOptionClick({search, addTag}) { // VM 목록에서 클릭시 태그 추가.
            for (let option of this.vm) {
                if (option.name == search) {
                    addTag(option.name); // string만 되는듯하다...
                    this.conference_id = option.id;
                    this.search = '';
                    this.$refs.shobal.localValue = '';
                }
            }
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
