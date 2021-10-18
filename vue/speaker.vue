<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 >	연자소개2 > 컨텐츠 (관리)</strong></h6>
        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col cols="8">
            <b-button href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
            <b-button size="sm" variant="primary" @click="goForm"><b-icon-plus></b-icon-plus>추가하기</b-button>
        </b-col>
        <b-col cols="4" style="display: flex;">
            <b-button size="sm" variant="outline-success" @click="upload_excel=!upload_excel" style="margin-left: auto;"><b-icon-upload></b-icon-upload> 엑셀로 올리기</b-button>

        </b-col>
    </b-row>
    <b-row class="mt-3" v-if="upload_excel">
        <b-col>
            <b-button href="/data/form/speaker.csv" size="sm" variant="secondary">양식 다운받기</b-button>
            <b-form-file v-model="upload_file" @change="onFileChange($event, 'upload_file')" 
                style="max-width:40%;" class="mr-2" size="sm"></b-form-file>
            <b-button @click="uploadExcel()" size="sm" variant="danger">파일 적용하기</b-button>
        </b-col>
    </b-row>

    <b-table :fields="fields" :items="items" small bordered head-variant="light" class="mt-1">
        <template #cell(reverse_index)="row">
            <div class="text-center">{{items.length - row.index}}</div>
        </template>
        <template #cell(order)="row">
            <div class="text-center">{{row.item.order}}</div>
        </template>
        <template #cell(photo_1)="row">
            <b-img 
                :src="row.item.photo_1||$store.getters.dummy_image_url(['30x30'])" 
                :id="'tooltip_image_'+row.item.id" 
                fluid 
                style="width:30px; max-height:30px;"></b-img>
            <b-tooltip :target="'tooltip_image_'+row.item.id" title="Online!" variant="light">
                <b-img :src="row.item.photo_1||$store.getters.dummy_image_url(['30x30'])" fluid ></b-img>
            </b-tooltip>
        </template>
        <template #cell(title)="row">
            <div class="text-center ino-space-dot" v-b-tooltip.hover :title="row.item.title" style="max-width:150px;">{{row.item.title}}</div>
        </template>
        <template #cell(speaker_name)="row">
            <div class="text-center">{{row.item.speaker_name}}</div>
        </template>
        <template #cell(position)="row">
            <div class="text-center">{{row.item.position}}</div>
        </template>
        <template #cell(contents)="row">
            <div class="text-center ino-space-dot" v-b-tooltip.hover :title="row.item.contents" style="max-width:150px;">{{row.item.contents}}</div>
        </template>
        <template #cell(introduction)="row">
            <div class="text-center ino-space-dot" v-b-tooltip.hover :title="row.item.introduction" style="max-width:150px;">{{row.item.introduction}}</div>
        </template>
        <template #cell(file)="row">
            <div class="text-center"><b-button v-if="row.item.file" variant="info" size="sm" @click="fileDownload(row.item.file, row.item.file_name_1)"><b-icon-download></b-icon-download></b-button></div>
        </template>
        <template #cell(manageBtn)="row">
            <div class="text-center">
                <b-button size="sm" variant="outline-success" @click="goForm($event, row.item)">
                    <b-icon-pencil-square></b-icon-pencil-square>수정
                </b-button>
                <b-button size="sm" variant="outline-danger" @click="deleteData($event, row.item)">
                    <b-icon-trash2-fill></b-icon-trash2-fill>삭제
                </b-button>
            </div>
        </template>
    </b-table>
</section>
</template>

<script>
module.exports = {
    name: "speaker",
    data: function () {
        return {
            event_id: 0,
            api_url: '',
            menu_id: null,
            upload_excel:false,
            upload_file:'',
            
            fields: [{
                    key: 'reverse_index',
                    label: 'No'
                },
                {
                    key: 'order',
                    label: '노출순서',
                    sortable: true
                },
                {
                    key: 'photo_1',
                    label: '연자사진'
                },
                {
                    key: 'top_category',
                    label: '대분류'
                },
                {
                    key: 'sub_category',
                    label: '소분류'
                },
                {
                    key: 'title',
                    label: '제목'
                },
                {
                    key: 'speaker_name',
                    label: '연자이름'
                },
                {
                    key: 'position',
                    label: '소속/직책'
                },
                {
                    key: 'contents',
                    label: '발표주제'
                },
                {
                    key: 'introduction',
                    label: '연자소개'
                },
                {
                    key: 'file',
                    label: '초록'
                },
                {
                    key: 'manageBtn',
                    label: '관리'
                }
            ],
            items: []
        };
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.menu_id = this.$route.query.menu_id;
            this.event_id = this.$store.getters.event_id;
            this.api_url = this.$store.getters.api_url;
            await this.getList();
        });
    },
    methods: {
        /**
         *  리스트
         **/
        getList: async function () {
            let url = `${this.api_url}/speaker?menu_id=${this.menu_id}`;
            let rs = await axios.get(url);
            this.items = rs.data.result;
        },
        goForm: function (event, item) {
            if (item) {
                this.$router.push({ name: 'speaker_form', query: {menu_id: this.menu_id, id: item.id}});
            } else {
                this.$router.push({ name: 'speaker_form', query: {menu_id: this.menu_id}});
            }
        },
        deleteData: async function (event, item) {
            let url = `${this.api_url}/speaker/${item.id}`;
            
            try {
                if (confirm('삭제 하시겠습니까?')) {
                    let rs = await axios.delete(url);
                    this.$showMsgBoxTwo(rs.status);
                    this.getList();
                }
            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }
        },
        fileDownload(url, file_name) {
            var link = document.createElement("a");
            link.setAttribute('download', file_name);
            link.href = url;
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        uploadExcel: async function(){
            if(this.upload_file==null || this.upload_file==''){
                this.$toast("Alert", "파일을 확인해주세요.", "danger");
                return;
            }
            if (confirm('서버에 업로드 하시겠습니까?')) {
                try {
                    let formData = new FormData();
                    formData.append('upload_file', this.upload_file);
    
                    let url = `${this.api_url}/speaker/excel_upload/${this.menu_id}`;
                    let rs = await axios.post(url, formData, {
                        Headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
    
                    async function callback () {
                        await this.getList();
                    }
                    this.$showMsgBoxTwo(rs.status, '', '', callback.bind(this));
    
                } catch (error) {
                    this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
                }
            }
        }
    }
};
</script>
