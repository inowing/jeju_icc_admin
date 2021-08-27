<template>
<section>
    <b-row>
        <b-col>
            <h6><strong>2.메뉴 및 컨텐츠 관리 > 쇼핑 (컨텐츠) > 상품 목록</strong></h6>
        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col cols="8">
            <b-button  href="#" variant="outline-primary" size="sm" @click.prevent="$router.go(-1)">
                <b-icon-arrow-left></b-icon-arrow-left> 이전으로
            </b-button>
            <b-button size="sm" variant="primary">상품 관리</b-button>
            <b-button size="sm" variant="outline-primary" @click="goShopOrderList">판매 내역 관리</b-button>
        </b-col>
        <b-col cols="4" style="display: flex;">
            <b-button v-show="!is_shoping_pay" size="sm" variant="outline-secondary" @click="updateMenu(true)" style="margin-left: auto;"><b-icon-eye-slash></b-icon-eye-slash>결제버튼 비활성화</b-button>
            <b-button v-show="is_shoping_pay" size="sm" variant="outline-success" @click="updateMenu(false)" style="margin-left: auto;"><b-icon-eye></b-icon-eye>결제버튼 활성화</b-button>

        </b-col>
    </b-row>
    <b-row class="mt-3">
        <b-col>
            <b-row>
                <b-col cols="8">
                    <b-button size="sm" variant="primary" @click="goShopRegist"><b-icon-plus></b-icon-plus>상품 추가하기</b-button>
                </b-col>
                <b-col cols="4">
                    <b-input-group size="sm" align-v="baseline">
                        <b-form-input aria-placeholder="검색어를 입력하세요." v-model="search_key" @keydown.enter="getList"></b-form-input>
                        <b-input-group-append>
                            <b-button variant="info" size="sm" @click="getList">검색하기</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-col>
            </b-row>
            <b-table :fields="fields" :items="items" small bordered head-variant="light" class="mt-1">
                <template #cell(id)="row">
                    <div class="text-center">{{row.item.id}}</div>
                </template>
                <template #cell(order)="row">
                    <div class="text-center">{{row.item.order}}</div>
                </template>
                <template #cell(price)="row">
                    <div class="text-right">{{ row.item.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}}</div>
                </template>
                <template #cell(discount)="row">
                    <div class="text-center" v-show="row.item.sale_price < row.item.price">{{Math.floor((row.item.price-row.item.sale_price)/row.item.price*100)}} %</div>
                </template>
                <template #cell(sale_price)="row">
                    <div class="text-right">
                        {{ row.item.sale_price.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}}
                    </div>
                </template>
                <template #cell(product_delivery)="row">
                    <div class="text-right">
                        {{ row.item.product_delivery.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}}
                    </div>
                </template>
                <template #cell(limit_quantity)="row">
                    <div class="text-right">
                        {{ row.item.limit_quantity.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}}
                    </div>
                </template>
                <template #cell(is_visible)="row">
                    <div class="text-center">
                        <b-button size="sm" variant="outline-success" disabled  v-show="row.item.is_visible == 1"><b-icon-eye></b-icon-eye></b-button>
                        <b-button size="sm" variant="outline-secondary" disabled  v-show="row.item.is_visible == 0"><b-icon-eye-slash></b-icon-eye-slash></b-button>
                    </div>
                </template>
                
                <template #cell(manageBtn)="row">
                    <b-button size="sm" variant="outline-success" @click="goShopRegist($event, row.item)">
                        <b-icon-pencil-square></b-icon-pencil-square>수정
                    </b-button>
                    <b-button size="sm" variant="outline-danger" @click="deleteItemFn(row.item, $event, row.index)">
                        <b-icon-trash2-fill></b-icon-trash2-fill>삭제
                    </b-button>
                </template>
            </b-table>
        </b-col>
    </b-row>
</section>
</template>

<script>
module.exports = {
    name: 'shop_product',
    data: function () {
        return {
            api_url: ``,
            event_id: null,
            menu_id: null,

            company_id: null,
            company_name: null,
            search_key: '',
            selected: null,
			options: [
				{ value: null, text: '전체' },
				{ value: 'buyer', text: '바이어' },
				{ value: 'seller', text: '셀러' }
			],
            
            fields: [{
                    key: 'id',
                    label: '아이디',
                    sortable: true
                },
                {
                    key: 'order',
                    label: '순서',
                    sortable: true
                },
                {
                    key: 'category_name',
                    label: '카테고리'
                },
                {
                    key: 'name',
                    label: '업체명',
                    sortable: true
                },

                {
                    key: 'title',
                    label: '상품명',
                    sortable: true
                },
                {
                    key: 'price',
                    label: '원가',
                    sortable: true
                },
                {
                    key: 'discount', //calc
                    label: '할인율'
                },
                {
                    key: 'sale_price',
                    label: '판매가',
                    sortable: true
                },
                {
                    key: 'product_delivery',
                    label: '제품 배송비'
                },
                {
                    key: 'limit_quantity',
                    label: '1회구매제한수량'
                },
                {
                    key: 'is_visible',
                    label: '게시상태'
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
            is_shoping_pay:true,
        }
    },
    mounted: function () {
        this.$nextTick(async function () {
            this.api_url = this.$store.getters.api_url;
            this.event_id = this.$store.getters.event_id;
            this.menu_id = this.$route.query.menu_id;
            this.getList();
        })
    },

    methods: {
        getList: async function () {
            // search_key
            let url = `${this.api_url}/product?menu_id=${this.menu_id}`;
            if (this.search_key) {
                url = url + '&search_key=' + this.search_key;
            }
            let response = await axios.get(url);
            let rs = response.data.result;
            this.items = rs;
            this.is_shoping_pay = response.data.is_shoping_pay == 1 ? true : false;
        },
        goAdminList: function (item) {
            this.$router.push({ name: 'admin_list', query: {company_id: item.id, company_name: item.name}});
        },
        goRegisterForm: function (item) {
            this.$router.push({ name: 'company_regist', query: {company_id: item.id, company_name: item.name}});
        },
        deleteItemFn: async function (item) {
            if (confirm(`${item.id, item.name} 삭제 하시겠습니까?`)) {
                
                let rs = await axios.delete(`${this.api_url}/product/${item.id}`);
                this.getList();
                this.$showMsgBoxTwo(rs.status);
            }
        },
        goShopRegist: function (event, item) {
            if (item) {
                this.$router.push({ name: 'shop_regist', query: {menu_id : this.menu_id, product_id: item.id}});
            } else {
                this.$router.push({ name: 'shop_regist', query: {menu_id : this.menu_id}});
            }
        },
        goShopOrderList: function () {
            this.$router.push({ name: 'shop_order', query: {menu_id : this.menu_id}});
        },
        updateMenu: async function (set_shoping_pay){
            let url = `${this.api_url}/menu/${this.menu_id}`;
            var formData = new FormData();
            formData.append('is_shoping_pay', set_shoping_pay ? 1 : 0);
            let rs = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            this.getList();
            this.$showMsgBoxTwo(rs.status);
        }
    }
}
</script>
