<template>
<section>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>6.Bizmatching &#62; 바로가기</strong></h6>
        </b-col>
    </b-row>
    <b-row class="mb-2" >
         <b-input-group size="lg" prepend="$" append=".00">
            <b-form-input v-model="ahaha"></b-form-input>
        </b-input-group>
    </b-row>
    <b-row class="mb-1">
        <b-col>
            <h6><strong>{{ ahaha }}</strong></h6>
        </b-col>
    </b-row>
    
</section>
</template>

<script>
module.exports = {
    name: 'kht_test',
    data: function () {
        return {    
            ahaha: ''
           
        }
    },
    mounted: function () {
        this.$nextTick(async function () {
            
        })
    },

    methods: {
        
    }
}
</script>
