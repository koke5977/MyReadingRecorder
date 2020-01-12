<template>
<!--検索画面-->
  <div id="search">
    <el-form v-bind:inline="true" v-on:keyup.enter="onclick">
      <el-form-item label="キーワード">
        <el-input type="text" size="large" v-model="keyword" 
        v-on:keyup.enter="onclick"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onclick" 
        v-on:keyup.enter="onclick" placeholder="keyup.enter">検索</el-button>
      </el-form-item>
    </el-form>
    <hr/>    
    <!--一致した書籍情報をリスト表示-->
    <BookInfo v-for="(b, i) of books"
      v-bind:linkable="true" v-bind:book="b" v-bind:index="i + 1" v-bind:key="b.isbn">
    </BookInfo>       
  </div>
</template>

<script>
import BookInfo from '@/components/BookInfo.vue'

export default {
  name: 'book-search',
  //ローカルコンポーネントを登録
  components: {
    BookInfo
  },
  data() {
    return {
      keyword: '', //検索キーワード
      books: [], //検索結果
    }
  },
  methods: {
    //「検索」ボタンで書籍情報を検索
    onclick: function() {
      this.$http('https://www.googleapis.com/books/v1/volumes?'
        +'orderBy=relevance&maxResults=20&q=' + this.keyword)
        //ResponseオブジェクトをJavaScriptオブジェクト(jsonデータ)として取得
        .then((response) => {
          return response.json()
        })
        //jsonの内容をbooks配列に詰め替える
        .then((data) => {
          this.books = []
          for (let b of data.items) {
            let authors = b.volumeInfo.authors
            let price = b.saleInfo.listPrice
            let img = b.volumeInfo.imageLinks
            this.books.push({
              id: b.id,//id値
              title: b.volumeInfo.title,//書名
              author: authors ? authors.join(',') : '',//著者
              price: price ? price.amount : '-',//価格
              publisher: b.volumeInfo.publisher,//出版社
              published: b.volumeInfo.publishedDate,//刊行日
              image: img ? img.smallThumbnail : '',//表紙画像
            })
          }
        })
    },
  }, 
}
</script>

<style scoped>
#search form {
  margin-top: 15px;
}
</style>
