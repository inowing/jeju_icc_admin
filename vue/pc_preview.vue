<template>
	<b-card title="PC버전 보기" sub-title="* 국문페이지만 보기가 가능합니다.">
		<b-card-text>
			<b-row>
				<b-col cols="2">
					<b-img :src="url.url2" fluid alt="Responsive image" style="margin-bottom:5px;"></b-img>
					<b-img :src="url.url3" fluid alt="Responsive image"></b-img>
				</b-col>
				<b-col cols="7">
					<b-img :src="url.url1" fluid alt="Responsive image" style="max-width:250px;"></b-img>
				</b-col>
				<b-col cols="3">
					<b-form-select v-model="selected" :options="['Korea', 'English']" size="sm"></b-form-select>
					<p><span style="font-size: 10pt;">로그인 | 회원가입</span></p>
					<b-img :src="url.url6" fluid alt="Responsive image" style="max-width:20px;"></b-img>
					<b-img :src="url.url7" fluid alt="Responsive image" style="max-width:20px;"></b-img>
					<b-img :src="url.url8" fluid alt="Responsive image" style="max-width:20px;"></b-img>
				</b-col>
			</b-row>
		</b-card-text>

	</b-card>
  
</template>


<script>
module.exports = {
  name: "pc",
	props: [ 'url' ],
  data: function () {
    return {
      selected: 'Korea'
    };
  },
  methods: {
    
  },
};
</script>