<template>
  <div id="app">
    <div class="text">
    <h2>Reading Recorder</h2>   
    <h3>（読書記録アプリ）</h3>
    </div>
    <!--メインメニュー-->
    <el-menu mode="horizontal" background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="1"><router-link to="/">
        トップページ</router-link>
      </el-menu-item>
      <el-menu-item index="2"><router-link to="/search">
        書籍の検索</router-link>
      </el-menu-item>
      <el-menu-item index="3"><router-link to="/howto">
        紹介・使い方</router-link>
      </el-menu-item> 
      <!--サブメニュー-->
      <el-submenu index="4">
        <template v-slot:title>リンク</template>
        <el-menu-item index="4-1">
          <a href="https://jp.vuejs.org/v2/guide/index.html" target="help">Vue.jsガイド</a>
        </el-menu-item>
        <el-menu-item index="4-2">
          <a href="https://element.eleme.io/#/en-US/component/installation" target="help">Elementコンポーネント</a>
        </el-menu-item>
        <el-menu-item index="4-3">
          <a href="https://developers.google.com/books" target="help">Google Books API</a>
        </el-menu-item>
      </el-submenu>       
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 800px;
  margin: 0 auto;
  color: #2c3e50;
  margin-top: 60px;
}

#app h2 {
  color: #009;
}

#app h3 {
  position: relative;
  top: 3px;
  color: #000011;
}

#nav {
  margin-bottom: 15px;
}

.el-menu-item a {
  color: #fff;
}

.text {
  display: flex;
}
</style>
