import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Element from 'element-ui'
import BookSearch from '@/components/BookSearch.vue'

//Elementプラグインをインストール
const localVue = createLocalVue()	
localVue.use(Element)

describe('BookSearch.vue', () => {
  let $http;

  beforeEach(() => {
    //モック（テスト用オブジェクト）の準備＆Promiseオブジェクトを生成
    $http = () => Promise.resolve({
      //jsonメソッド
      json: () => {
        return {
          totalItems: 5,
          items: [
            {
              id: 1,
              volumeInfo: {
                title: 'テスト1',
                authors: [ '山田太郎' ],
                publisher: 'WINGSプロジェクトA',
                publishedDate: '2018-04-11',
                imageLinks: {
                  smallThumbnail: 'https://wings.msn.to/books/978-4-7981-5757-3/978-4-7981-5757-3.jpg'
                }
              },
              saleInfo: {
                listPrice: { amount: 1001 }
              }
            },
            {
              id: 2,
              volumeInfo: {
                title: 'テスト2',
                authors: [ '山田次郎' ],
                publisher: 'WINGSプロジェクトB',
                publishedDate: '2019-10-30',
                imageLinks: {
                  smallThumbnail: 'https://wings.msn.to/books/978-4-7981-5757-3/978-4-7981-5757-3.jpg'
                }
              },
              saleInfo: {
                retailPrice: { amount: 1002 }
              }
            },
            {
              id: 3,
              volumeInfo: {
                title: 'テスト3',
                authors: [ '山田三郎' ],
                publisher: 'WINGSプロジェクトC',
                publishedDate: '2020-01-11',
                imageLinks: {
                  smallThumbnail: 'https://wings.msn.to/books/978-4-7981-5757-3/978-4-7981-5757-3.jpg'
                }
              },
              saleInfo: {
                retailPrice: { amount: 1003 }
              }
            }
          ]
        }
      }
    })
  })

  it('fetch test', async () => {
    //book-searchコンポーネントをマウント
    const wrapper = mount(BookSearch, {
      //$httpプロパティにモック（テスト用オブジェクト）を設定
      mocks: {
        $http
      },
      localVue
    })
    //onclickメソッドを実行
    wrapper.vm.onclick()
    //非同期処理の終了まで待機
    await flushPromises()
    //取得した結果を検査
    expect(wrapper.vm.books[0].title).toBe('テスト1')
    expect(wrapper.vm.books[1].publisher).toBe('WINGSプロジェクトB')
    expect(wrapper.vm.books[2].publisher).toEqual('WINGSプロジェクトC')
  })
})