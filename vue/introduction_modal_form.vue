<template>
  <!-- 기업소개자료 추가 모달 폼 -->
  <div>
    <b-row>
      <b-col>
        <b-form-group label="순서" label-for="input-sm1" label-cols="4" label-cols-lg="2" label-size="sm">
          <b-form-input id="input-sm1" v-model="selected_item.order" size="sm" type="number"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="타입" label-cols="4" label-cols-lg="2" label-size="sm">
          <b-form-select v-model="selected_item.library_type" :options="library_type_options" size="sm">
          </b-form-select>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="노출" label-cols="4" label-cols-lg="2" label-size="sm">
          <b-form-select v-model="selected_item.lang_type" :options="lang_type_options" size="sm">
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col class="pr-0">
        <b-form inline>
          <b-form-group label="타이틀" label-size="sm" class="mr-3">
          </b-form-group>
          <b-form-input id="input-sm2" v-model="selected_item.title" size="sm" style="width: 1049px;">
          </b-form-input>
        </b-form>
      </b-col>
    </b-row>
    <b-row v-show="selected_item.library_type == 0">
      <b-col>
        <div>
          <b-row>
            <b-col class="p-1 ml-2">
              <b-card no-body style="padding:0 max-width:182px;">
                <b-card-text class="ino-180-180-wrap">
                  <div>
                    <b-img :src="photo_1_prev||selected_item.photo_1.url||photo_prev_default" fluid></b-img>
                  </div>
                </b-card-text>
                <b-form inline class="p-1">
                  <b-form-file v-model="selected_item.photo_1.file" @change="imagePrev($event, 'photo_1')" size="sm"
                    style="max-width:80%;">
                  </b-form-file>
                  <b-button
                    @click="selected_item.photo_1 = {file: null, url: null, del: true, message: null}; photo_1_prev=null;"
                    size="sm" variant="danger">
                    <b-icon-trash></b-icon-trash>
                  </b-button>
                </b-form>
                <b-form-textarea v-model="selected_item.photo_1.message" rows="3" max-rows="6">
                </b-form-textarea>
              </b-card>
            </b-col>
            <b-col class="p-1">
              <b-card no-body style="padding:0 max-width:182px;">
                <b-card-text class="ino-180-180-wrap">
                  <div>
                    <b-img :src="photo_2_prev||selected_item.photo_2.url||photo_prev_default" fluid></b-img>
                  </div>
                </b-card-text>
                <b-form inline class="p-1">
                  <b-form-file v-model="selected_item.photo_2.file" @change="imagePrev($event, 'photo_2')" size="sm"
                    style="max-width:80%;">
                  </b-form-file>
                  <b-button
                    @click="selected_item.photo_2 = {file: null, url: null, del: true, message: null}; photo_2_prev=null;"
                    size="sm" variant="danger">
                    <b-icon-trash></b-icon-trash>
                  </b-button>
                </b-form>
                <b-form-textarea v-model="selected_item.photo_2.message" rows="3" max-rows="6">
                </b-form-textarea>
              </b-card>
            </b-col>
            <b-col class="p-1">
              <b-card no-body style="padding:0 max-width:182px;">
                <b-card-text class="ino-180-180-wrap">
                  <div>
                    <b-img :src="photo_3_prev||selected_item.photo_3.url||photo_prev_default" fluid></b-img>
                  </div>
                </b-card-text>
                <b-form inline class="p-1">
                  <b-form-file v-model="selected_item.photo_3.file" @change="imagePrev($event, 'photo_3')" size="sm"
                    style="max-width:80%;">
                  </b-form-file>
                  <b-button
                    @click="selected_item.photo_3 = {file: null, url: null, del: true, message: null}; photo_3_prev=null;"
                    size="sm" variant="danger">
                    <b-icon-trash></b-icon-trash>
                  </b-button>
                </b-form>
                <b-form-textarea v-model="selected_item.photo_3.message" rows="3" max-rows="6">
                </b-form-textarea>
              </b-card>
            </b-col>
            <b-col class="p-1">
              <b-card no-body style="padding:0 max-width:182px;">
                <b-card-text class="ino-180-180-wrap">
                  <div>
                    <b-img :src="photo_4_prev||selected_item.photo_4.url||photo_prev_default" fluid></b-img>
                  </div>
                </b-card-text>
                <b-form inline class="p-1">
                  <b-form-file v-model="selected_item.photo_4.file" @change="imagePrev($event, 'photo_4')" size="sm"
                    style="max-width:80%;">
                  </b-form-file>
                  <b-button
                    @click="selected_item.photo_4 = {file: null, url: null, del: true, message: null}; photo_4_prev=null;"
                    size="sm" variant="danger">
                    <b-icon-trash></b-icon-trash>
                  </b-button>
                </b-form>
                <b-form-textarea v-model="selected_item.photo_4.message" rows="3" max-rows="6">
                </b-form-textarea>
              </b-card>
            </b-col>
            <b-col class="p-1">
              <b-card no-body style="padding:0 max-width:182px;">
                <b-card-text class="ino-180-180-wrap">
                  <div>
                    <b-img :src="photo_5_prev||selected_item.photo_5.url||photo_prev_default" fluid></b-img>
                  </div>
                </b-card-text>
                <b-form inline class="p-1">
                  <b-form-file v-model="selected_item.photo_5.file" @change="imagePrev($event, 'photo_5')" size="sm"
                    style="max-width:80%;">
                  </b-form-file>
                  <b-button
                    @click="selected_item.photo_5 = {file: null, url: null, del: true, message: null}; photo_5_prev=null;"
                    size="sm" variant="danger">
                    <b-icon-trash></b-icon-trash>
                  </b-button>
                </b-form>
                <b-form-textarea v-model="selected_item.photo_5.message" rows="3" max-rows="6">
                </b-form-textarea>
              </b-card>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col class="p-1 ml-2">
              <b-card no-body style="padding:0 max-width:182px;">
                <b-card-text class="ino-180-180-wrap">
                  <div>
                    <b-img :src="photo_6_prev||selected_item.photo_6.url||photo_prev_default" fluid></b-img>
                  </div>
                </b-card-text>
                <b-form inline class="p-1">
                  <b-form-file v-model="selected_item.photo_6.file" @change="imagePrev($event, 'photo_6')" size="sm"
                    style="max-width:80%;">
                  </b-form-file>
                  <b-button
                    @click="selected_item.photo_6 = {file: null, url: null, del: true, message: null}; photo_6_prev=null;"
                    size="sm" variant="danger">
                    <b-icon-trash></b-icon-trash>
                  </b-button>
                </b-form>
                <b-form-textarea v-model="selected_item.photo_6.message" rows="3" max-rows="6">
                </b-form-textarea>
              </b-card>
            </b-col>
            <b-col class="p-1">
              <b-card no-body style="padding:0 max-width:182px;">
                <b-card-text class="ino-180-180-wrap">
                  <div>
                    <b-img :src="photo_7_prev||selected_item.photo_7.url||photo_prev_default" fluid></b-img>
                  </div>
                </b-card-text>
                <b-form inline class="p-1">
                  <b-form-file v-model="selected_item.photo_7.file" @change="imagePrev($event, 'photo_7')" size="sm"
                    style="max-width:80%;">
                  </b-form-file>
                  <b-button
                    @click="selected_item.photo_7 = {file: null, url: null, del: true, message: null}; photo_7_prev=null;"
                    size="sm" variant="danger">
                    <b-icon-trash></b-icon-trash>
                  </b-button>
                </b-form>
                <b-form-textarea v-model="selected_item.photo_7.message" rows="3" max-rows="6">
                </b-form-textarea>
              </b-card>
            </b-col>
            <b-col class="p-1">
              <b-card no-body style="padding:0 max-width:182px;">
                <b-card-text class="ino-180-180-wrap">
                  <div>
                    <b-img :src="photo_8_prev||selected_item.photo_8.url||photo_prev_default" fluid></b-img>
                  </div>
                </b-card-text>
                <b-form inline class="p-1">
                  <b-form-file v-model="selected_item.photo_8.file" @change="imagePrev($event, 'photo_8')" size="sm"
                    style="max-width:80%;">
                  </b-form-file>
                  <b-button
                    @click="selected_item.photo_8 = {file: null, url: null, del: true, message: null}; photo_8_prev=null;"
                    size="sm" variant="danger">
                    <b-icon-trash></b-icon-trash>
                  </b-button>
                </b-form>
                <b-form-textarea v-model="selected_item.photo_8.message" rows="3" max-rows="6">
                </b-form-textarea>
              </b-card>
            </b-col>
            <b-col class="p-1">
              <b-card no-body style="padding:0 max-width:182px;">
                <b-card-text class="ino-180-180-wrap">
                  <div>
                    <b-img :src="photo_9_prev||selected_item.photo_9.url||photo_prev_default" fluid></b-img>
                  </div>
                </b-card-text>
                <b-form inline class="p-1">
                  <b-form-file v-model="selected_item.photo_9.file" @change="imagePrev($event, 'photo_9')" size="sm"
                    style="max-width:80%;">
                  </b-form-file>
                  <b-button
                    @click="selected_item.photo_9 = {file: null, url: null, del: true, message: null}; photo_9_prev=null;"
                    size="sm" variant="danger">
                    <b-icon-trash></b-icon-trash>
                  </b-button>
                </b-form>
                <b-form-textarea v-model="selected_item.photo_9.message" rows="3" max-rows="6">
                </b-form-textarea>
              </b-card>
            </b-col>
            <b-col class="p-1">
              <b-card no-body style="padding:0 max-width:182px;">
                <b-card-text class="ino-180-180-wrap">
                  <div>
                    <b-img :src="photo_10_prev||selected_item.photo_10.url||photo_prev_default" fluid></b-img>
                  </div>
                </b-card-text>
                <b-form inline class="p-1">
                  <b-form-file v-model="selected_item.photo_10.file" @change="imagePrev($event, 'photo_10')" size="sm"
                    style="max-width:80%;">
                  </b-form-file>
                  <b-button
                    @click="selected_item.photo_10 = {file: null, url: null, del: true, message: null}; photo_10_prev=null;"
                    size="sm" variant="danger">
                    <b-icon-trash></b-icon-trash>
                  </b-button>
                </b-form>
                <b-form-textarea v-model="selected_item.photo_10.message" rows="3" max-rows="6">
                </b-form-textarea>
              </b-card>
            </b-col>
          </b-row>
        </div>
      </b-col>
    </b-row>

    <b-row v-show="selected_item.library_type == 1">
      <!-- Youtube : 썸네일파일이 image_prev -->
      <b-col>
        <span style="font-size:10pt;">youtube 썸네일 이미지</span>
        <b-card align="center">
          <b-card-text class="ino-180-180-wrap">
            <div>
              <b-img :src="selected_item.thumb_prev||thumb_prev_default" fluid></b-img>
            </div>
          </b-card-text>
          <b-form inline class="mt-1">
            <b-form-file v-model="selected_item.image_prev" ref="file-input"
              @change="onFileChange($event, 'thumb_prev', selected_item)" size="sm" style="width:300px;" class="mr-1">
            </b-form-file>
            <b-button @click="selected_item.image_prev = null; selected_item.thumb_prev = null; selected_item.thumb_prev_del = true;"
              size="sm" variant="danger">이미지 삭제</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col>
        <b-row>
          <b-col sm="4"><label style="font-size: 10pt;" placeholder="반드시 http:// 를 입력해주세요.">영상
              링크(Youtube)</label></b-col>
          <b-col sm="8">
            <b-form-input type="text" size="sm" v-model="selected_item.link">
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col sm="4"><label style="font-size: 10pt;">링크 메시지</label></b-col>
          <b-col sm="8">
            <b-form-textarea v-model="selected_item.link_message" rows="3" max-rows="6"></b-form-textarea>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row v-show="selected_item.library_type == 2">
      <!-- video -->
      <b-col>
        <span style="font-size:10pt;">썸네일 이미지</span>
        <b-card align="center">
          <!-- <b-img :src="thumb_prev||thumb_prev_default" fluid alt="Responsive image" style="max-width:250px;"></b-img> -->
          <b-card-text class="ino-180-180-wrap">
            <div>
              <b-img :src="selected_item.thumb_prev||thumb_prev_default" fluid></b-img>
            </div>
          </b-card-text>
          <b-form inline class="mt-1">
            <b-form-file v-model="selected_item.image_prev" ref="file-input"
              @change="onFileChange($event, 'thumb_prev', selected_item)" size="sm" style="width:300px;" class="mr-1">
            </b-form-file>
            <b-button @click="selected_item.image_prev = null; selected_item.thumb_prev = null; selected_item.thumb_prev_del = true;"
              size="sm" variant="danger">이미지 삭제</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col>
        <b-row>
          <b-col sm="4"><label style="font-size: 10pt;">영상 파일</label></b-col>
          <b-col sm="8">
            <b-form-file v-model="selected_item.file" size="sm" :placeholder="movie_file_src" style="width: 260px;"
              class="mr-1">
            </b-form-file>
            <b-button @click="selected_item.file = null; selected_item.movie_file_del = true; movie_file_src='';"
              size="sm" variant="danger">영상 삭제</b-button>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col sm="4"><label style="font-size: 10pt;">링크 메시지</label></b-col>
          <b-col sm="8">
            <b-form-textarea v-model="selected_item.link_message" rows="3" max-rows="6"></b-form-textarea>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <b-button size="sm" variant="outline-primary" @click="$emit('add-item')" v-show="isNew">완료</b-button>
        <b-button size="sm" variant="outline-success" @click="$emit('update-item')" v-show="!isNew">수정</b-button>
        <b-button size="sm" variant="outline-danger">취소</b-button>
      </b-col>
    </b-row>
  </div>
</template>
<script>
module.exports = {
  name: 'introduction_modal_form',
  props: ['params'],
  data: function () {
    return {
      selected_item: this.params.selected_item,
      isNew: this.params.isNew,

      library_type_options: [
        {value: 0, text: '이미지'},
        {value: 1, text: 'YouTube'},
        {value: 2, text: 'Video' }
      ],
      lang_type_options: [
        {value: 0, text: '국문'},
        {value: 1, text: '영문'},
        {value: 2, text: '국문 및 영문'}
      ],
      photo_1_prev: '',
      photo_2_prev: '',
      photo_3_prev: '',
      photo_4_prev: '',
      photo_5_prev: '',
      photo_6_prev: '',
      photo_7_prev: '',
      photo_8_prev: '',
      photo_9_prev: '',
      photo_10_prev: '',
      // thumb_prev: this.params.selected_item.thumb_prev, // youtube, movie 썸네일 같이쓴다
      movie_file_src: this.params.selected_item.file, // 영상 첨부파일
      photo_prev_default: this.$store.getters.dummy_image_url(['180x180']),
      thumb_prev_default: this.$store.getters.dummy_image_url(['180x180']),
    }
  },
  methods: {
    imagePrev: function (e, key) {
      const file = e.target.files[0];
      let file_url = URL.createObjectURL(file);
      this.selected_item[key].url = file_url;
      this[key + "_prev"] = file_url;
    },
  }
}
</script>
