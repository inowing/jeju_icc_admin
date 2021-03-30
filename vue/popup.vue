<template>
	<section>
		<b-row>
			<b-col>
				<b-button variant="primary" size="sm" @click="openModal"><b-icon-plus></b-icon-plus>팝업 추가</b-button>
			</b-col>
		</b-row>
		
		<b-row class="mt-1">
			<b-col>
				<b-table small :fields="fields" :items="items" bordered head-variant="light">
					<!-- A virtual column -->
					<template #cell(id)="data">
						<div class="text-center">
							{{data.item.id}}
						</div>
					</template>
					<template #cell(is_visible)="data">
						<div class="text-center">
							{{data.item.is_visible ? 'ON' : 'OFF'}}
						</div>
					</template>
					
					<template #cell(manageBtn)="row">
						<div class="text-center">
							<b-button size="sm" variant="outline-success" @click="openModal($event.target, row.item)">
								<b-icon-pencil-square></b-icon-pencil-square> 수정
							</b-button>
							<b-button size="sm" variant="outline-danger" @click="deletePopup(row.item, row.index, $event.target)">
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
	name: 'popup',
	data: function () {
	return {
		api_url: '',
		event_id: '',
		fields: [
			{ key: 'id', label: '번호' },
			{ key: 'name', label: '제목' },
			{ key: 'link', label: '링크' },
			{ key: 'is_visible', label: '활성화 상태' },
			{ key: 'manageBtn', label: '관리항목' },
		],
		items: [],
		border_class: 'primary';
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			this.api_url = this.$store.getters.api_url;
			this.event_id = this.$store.getters.event_id;
			this.getList();
		});
	},
	methods: {
		getList: async function () {
			let url = `${this.api_url}/popup?event_id=${this.event_id}`;
			let rs = await axios.get(url);
			this.items = rs.data.result;
		},
		openModal(target, item) {
			if (item) {
				// 
				this.border_class = 'success';
			} else {
				this.border_class = 'primary';
			}
			console.log(item, index, target);
		},
		deletePopup(item, index, target) {
			console.log(item, index, target);
		}
	}
}
</script>
