<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 > 컨퍼런스관리 > 컨텐츠 (관리)</strong></h6>
            <b-button class="mt-2" href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>

        </b-col>
    </b-row>
    <b-card>
        <template #header>
            <h6><strong>메뉴수정</strong></h6>
        </template>
        <b-row>
            <b-col>
                <b-form-group label="메뉴명(국문)">
                    <b-form-input type="text" v-model="form.name"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group label="메뉴명(영문)">
                    <b-form-input type="text" v-model="form.name_en"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group label="메뉴 순서">
                    <b-form-input type="number" v-model="form.order"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col></b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-form-group label="행사 일정 이미지 #1">
                    <b-card>
                        <b-card-text class="ino-180-70-wrap mb-1">
                            <div>
                                <b-img :src="form.photo_1||photo_1_prev" fluid></b-img>
                            </div>
                        </b-card-text>
                        <b-card-text class="mt-1">
                            <b-form-file v-model="form.file1" @change="onFileChange($event, 'photo_1', form)" style="max-width:70%;" class="mr-2" size="sm"></b-form-file>
                            <b-button @click="form.file1 = null; form.photo_1 = ''; form.photo_1_del = true;" size="sm" variant="danger">이미지 삭제</b-button>
                        </b-card-text>
                    </b-card>
                </b-form-group>
            </b-col>
            <b-col></b-col>
        </b-row>
        <b-button variant="primary" size="sm" class="inoBtn-150" @click="updateData(form, event_id, `${api_url}/menu/${menu_id}`)">저장</b-button>
    </b-card>
    <b-row>
        <b-col>
            <b-button class="mt-2" href="#" variant="primary" size="sm" @click="openModal($event)">
                <b-icon-plus></b-icon-plus> VM 추가
            </b-button>
            <b-table :fields="fields" :items="items" small responsive="sm" bordered head-variant="light" sticky-header class="mt-1">
                <template #cell(id)="row">
                    <div class="text-center">{{row.item.id}}</div>
                </template>
                <template #cell(order)="row">
                    <div class="text-center">{{row.item.order}}</div>
                </template>
                <template #cell(like_count)="row">
                    <div class="text-center">{{row.item.like_count}}</div>
                </template>
                <template #cell(is_top)="row">
                    <div class="text-center mt-1">
                        <b-form-group class="p-0 m-0">
                            <b-form-checkbox value="1" v-model="row.item.is_top" name="check-button" switch @change="updateIsTop($event, row.item)"></b-form-checkbox>
                        </b-form-group>
                    </div>
                </template>
                <template #cell(manageBtn)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-info" @click="updateFn(row.item, $event)">
                            <b-icon-credit-card2-front></b-icon-credit-card2-front>
                            부스 개요 수정
                        </b-button>
                        <b-button size="sm" variant="outline-primary" @click="updateFn(row.item, $event, 1)">
                            <b-icon-film></b-icon-film>
                            전시관
                        </b-button>
                        <b-button size="sm" variant="outline-secondary" @click="goQuestion(row.item, $event)">
                            <b-icon-patch-question-fill></b-icon-patch-question-fill>
                            문의내역
                        </b-button>
                        <b-button size="sm" variant="outline-danger" @click="deleteFn(row.item, $event)">
                            <b-icon-trash2-fill></b-icon-trash2-fill>
                            삭제
                        </b-button>
                    </div>
                </template>
            </b-table>
        </b-col>
    </b-row>

    <b-modal v-model="modal1" hide-footer title="VM">
        <b-form-group label="대분류" class="mb-1">
            <b-form-select size="sm"></b-form-select>
        </b-form-group>
        <b-form-group label="컬러 Template" class="mb-1">
            <b-form-select size="sm"></b-form-select>
        </b-form-group>

        <div>
            <b-form-group label="VM" label-for="tags-component-select">
                <!-- Prop `add-on-change` is needed to enable adding tags vie the `change` event -->
                <b-form-tags id="tags-component-select" v-model="tagValue" size="sm" add-on-change no-outer-focus>
                    <template v-slot="{ tags, inputAttrs,addTag, inputHandlers, disabled, removeTag }">

                        <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                            <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="info">{{ tag }}</b-form-tag>
                            </li>
                        </ul>

                        <!-- <b-form-input v-model="search" id="tag-search-input" type="search" size="sm" autocomplete="off"></b-form-input> -->

                        <b-form-select 
                            
                            v-bind="inputAttrs" v-on="inputHandlers" :disabled="disabled || availableOptions.length === 0" :options="availableOptions">
                            
                        </b-form-select>




                        <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                            <template #button-content>
                            <b-icon icon="tag-fill"></b-icon> Choose tags
                            </template>
                            <b-dropdown-form @submit.stop.prevent="() => {}">
                            <b-form-group
                                label="Search tags"
                                label-for="tag-search-input"
                                label-cols-md="auto"
                                class="mb-0"
                                label-size="sm"
                                :disabled="disabled"
                            >
                                <b-form-input
                                v-model="search"
                                id="tag-search-input"
                                type="search"
                                size="sm"
                                autocomplete="off"
                                ></b-form-input>
                            </b-form-group>
                            </b-dropdown-form>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item-button
                            v-for="option in availableOptions"
                            :key="option"
                            @click="onOptionClick({ option, addTag })"
                            >
                            {{ option }}
                            </b-dropdown-item-button>
                            <b-dropdown-text v-if="availableOptions.length === 0">
                            There are no tags available to select
                            </b-dropdown-text>
                        </b-dropdown>
                         
                    </template>
                </b-form-tags>
            </b-form-group>
        </div>

        <b-button variant="primary" size="sm" class="inoBtn-150" @click="updateData(form, event_id, `${api_url}/menu/${menu_id}`)">저장</b-button>
    </b-modal>

</section>
</template>

<script>
module.exports = {
    name: "conference",
    data: function () {
        return {
            event_id: 0,
            api_url: '',
            menu_id: null,
            modal1: false,
            form: {
                name: '',
                type: 15,
                name_en: '',
                order: 0,
                file1: null,
                photo_1: '',
                photo_1_del: false,
            },

            modal_form: {},

            search: '',
            options: ['Apple', 'Orange', 'Banana', 'Lime', 'Peach', 'Chocolate', 'Strawberry'],
            tagValue: [],

            photo_1_prev: this.$store.getters.dummy_image_url(['180x70']),

            fields: [{
                    key: "order",
                    label: "순서",
                },
                {
                    key: "top_category",
                    label: "대분류",
                },
                {
                    key: "company.name",
                    label: "VM 타이틀",
                },
                {
                    key: "like_count",
                    label: "시작일",
                },
                {
                    key: "manageBtn",
                    label: "관리항목",
                }
            ],
            items: [],

        };
    },
    mounted: function () {
        this.$nextTick(function () {
            this.menu_id = this.$route.query.menu_id;
            this.event_id = this.$store.getters.event_id;
            this.api_url = this.$store.getters.api_url;
            this.getData();

        });
    },
    computed: {
        criteria() {
            // Compute the search criteria
            return this.search.trim().toLowerCase()
        },
        availableOptions() {
            const criteria = this.criteria
            // Filter out already selected options
            const options = this.options.filter(opt => this.tagValue.indexOf(opt) === -1)
            if (criteria) {
                // Show only options that match criteria
                return options.filter(opt => opt.toLowerCase().indexOf(criteria) > -1);
            }
            // Show all options available
            return options;
        },
        
    },
    methods: {
        onOptionClick({ option, addTag }) {
        addTag(option)
        this.search = ''
      },
        getData: async function () {
            let url = `${this.api_url}/menu/${this.menu_id}`;
            let data = (await axios.get(url)).data;
            this.form = data.result;
            console.log(this.form);
        },
        updateData: async function (form, event_id, url) {
            let formData = new FormData();
            formData.append('event_id', event_id);

            formData.append('type', form.type);
            formData.append('name', form.name);
            formData.append('name_en', form.name_en);
            formData.append('order', form.order);
            !form.file1 && form.photo_1_del ? formData.append('photo_1_del', 'Y') : formData.append('photo_1', form.file1);

            try {

                let rs = await axios.post(url, formData, {
                    Headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(rs);

                this.$showMsgBoxTwo(rs.status);
                this.getData();

            } catch (error) {
                this.$showMsgBoxTwo(error.response.status, '', error.response.statusText);
            }

        },
        openModal: function (event, item) {
            this.modal_form = item ? {} : item;
            this.modal1 = true;
        },

    }
};
</script>
