<template>
<!--トップ(/),検索(/search),フォーム(/form)の各ページから利用される共通コンポーネント-->
<div class="clearfix" v-bind:class="{ linkable }" v-on:click="onclick">
    <div class="image"><img v-bind:src="book.image" /></div>
    <div class="details">
      <ul>
        <li v-if="index">{{ index }}.</li>
        <li>{{book.title}}（{{ book.price }}円）</li>
        <li>{{book.author}} 著</li>
        <li>{{book.publisher}} /刊</li>
        <li>{{book.published}} /発売</li>        
      </ul>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { UPDATE_CURRENT } from '@/mutation-types'

export default {
  name: 'book-info',
  props: {
    index: { type: Number },
    linkable: { type: Boolean, default: false },
    book: { type: Object },
    form: { type: Object },
  },
  
  methods: {
    ...mapActions([UPDATE_CURRENT]),
    onclick() {
      if (this.linkable) {
        this[UPDATE_CURRENT](this.book) 
        this.$router.push('/form')
      }
    }
  }
}
</script>

<style scoped>
.resistered {
  margin-top: 5px;  
}

#app h4 { 
  color: #008000;
}

.linkable:hover {
    cursor: pointer;
    background-color: #ff9;
}

.image {
  float:left;
  width: 150px;
}

.image img {
  height: 180px;
}

.details {
  float: left;
}

.details li {
  list-style-type: none;
  text-align: left;
}

.clearfix {
  width: 100%;
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
</style>