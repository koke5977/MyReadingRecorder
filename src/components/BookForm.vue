<template>
  <div id="form">        
    <!--選択中の書籍を表示-->
    <BookInfo v-bind:book="book"></BookInfo>
    <hr />
    <!--レビュー入力のフォーム-->
    <el-form ref="form" v-bind:model="form" v-bind:rules="rules" label-width="120px">
      <!--読了日-->
      <el-form-item label="読了日">
        <el-date-picker type="date" v-model="form.read" v-bind:disabled="form.checked"></el-date-picker>
        <div class="checked">
        <el-checkbox label="読書中" v-model="form.checked"></el-checkbox>
        </div>
      </el-form-item>
      <!--評価-->
      <el-form-item label="評価">
        <div class="rate">
        <el-rate v-model="form.value" show-score text-color="#ff9900"></el-rate>
        </div>
      </el-form-item>
      <!--感想入力-->
      <el-form-item label="感想" prop="memo">
        <el-input type="textarea" size="large" v-model="form.memo"></el-input>
      </el-form-item>
      <!--登録ボタン-->
      <div class="button">
      <el-form-item>
        <el-button type="primary" v-on:click="onsubmit">登録</el-button>
      </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions  } from 'vuex'
import BookInfo from '@/components/BookInfo.vue'
import { UPDATE_CURRENT, UPDATE_BOOK } from '@/mutation-types'

export default {
  name: 'book-form',
  //ローカルコンポーネントを登録
  components: {
    BookInfo
  },
  data() {
    return {
      //選択中の書籍
      book: {},
      //フォームの内容
      form: { 
        read: new Date(), //読了日
        memo: '', //感想
        value: null, //評価
        checked: false, //読書中の有無
        resistered: false, //登録の有無 
      },
      //検証ルール
      rules: {
        memo: [
          { required: true, 
            message: 'メモが未入力です。',
            trigger: 'blur' }
        ]
      },
    }
  },
  computed: mapGetters([ 'current', 'getBookById' ]),
  //ページロード時の処理
  created() {
    //選択中の書籍が無い場合、トップページへ
    if (!this.current) {
      this.$router.push('/')
    }
    //選択中書籍をbookプロパティへ
    this.book = Object.assign({}, this.current)
  },
  //マウント（初期化）時の処理
  mounted() {
    //選択中書籍でストア内の情報を検索
    let b = this.getBookById(this.book.id)
    //既にレビューがある場合は、その内容をフォームに記載
    if (b) {
      this.form.read = b.read
      this.form.memo = b.memo
      this.form.value = b.value
      this.form.checked = b.checked
      this.form.resistered = b.resistered
    }
  },
  methods: {
    //アクションとメソッドを紐づけ
    ...mapActions([UPDATE_BOOK, UPDATE_CURRENT]),
    //「登録」ボタンでデータを登録
    onsubmit() {
      //読書中である場合、読了日をクリア
      if(this.form.checked){
        this.form.read = ""
      }
      //登録の確認
      this.form.resistered = true
      //入力値を検証
      this.$refs['form'].validate((valid) => {
        //成功したらストアに反映
        if (valid) {
          this[UPDATE_BOOK](
            Object.assign({}, this.book, this.form)
          )
          //選択中書籍をクリア
          this[UPDATE_CURRENT](null)
          //成功時の通知メッセージ
          this.$notify({
            title: 'Reading Recorder',
            message: this.$createElement('p', { style: 'color: #009' },
              '読書情報の登録／更新に成功しました。'),
            duration: 2000
          })
          //フォーム内容をクリア
          this.form.read = new Date()
          this.form.memo = ''
          this.form.value = null
          this.form.checked = false
          //トップページへ
          this.$router.push('/')
        }
      })
    },    
  }
}
</script>

<style scoped>
#form {
  margin-top: 15px;
}

.rate {
  margin-top: 10px;
}

.checked {
  float: right;
  margin-right: 350px; 
}

.button{
  display: flex;
}

.delete{
  margin-left: -100px;
}
</style>