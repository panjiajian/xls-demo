<template>
  <div>
    <button type="button" @click="$_xls_createdXls">创建xls</button>
    <button type="button" @click="$_xls_createdXls2">回复xls</button>
    <button type="button" @click="$_xls_previewXls">预览xls</button>
    <button type="button" @click="$_xls_saveModule">保存xls</button>
    <button type="button" @click="$_xls_inquireModule">查询xls</button>
    <div class="el-select-containner" :style="{ left: cellParms.event.pageX + 'px', top: cellParms.event.pageY + 'px' }">
      <el-select
        v-show="showBtn"
        v-model="colHeardsValue"
        @change="changeSelect"
        @blur="blurSelect"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.colHeardsValue"
          :label="item.label"
          :value="item.colHeardsValue">
        </el-option>
      </el-select>
    </div>
    <!-- <p>{{test}}</p>
    <p>{{xlsModule}}</p> -->
    <div class="xls-box" v-show="showXls" >
      <hot-table
        @blur="$_xls_blur_xls()"
        :data="hotSettings.data"
        :settings="hotSettings"
        :language="language"
        ref="testHot"
        :root="root"
        hot-id="foo"
      />
    </div>
      <div v-for="item in xlsModule" :key="item.id" @click="$_xls_changeModule(item)">
        {{item.colHeaders}}
      </div>
  </div>
    </template>
<script>
import { HotTable } from '@handsontable-pro/vue'
// import Handsontable from 'handsontable-pro'
import { mapActions, mapGetters } from 'vuex'
// import Handsontable from 'handsontable-pro'
import 'handsontable-pro/languages/zh-CN' // 引入中文语言包
let add = 0

export default {
  name: 'handsontable',
  components: {
    HotTable
  },
  // name: Handsontable,
  data () {
    let _this = this

    return {
      root: 'test-hot',
      options: [{
        colHeardsValue: 'yuwen',
        label: '语文'
      }, {
        colHeardsValue: 'shuxue',
        label: '数学'
      }, {
        colHeardsValue: 'yingyu',
        label: '英语'
      }, {
        colHeardsValue: 'zhengzhi',
        label: '政治'
      }, {
        colHeardsValue: 'wuli',
        label: '物理'
      },
      {
        colHeardsValue: 'huaxue',
        label: '化学'
      }],
      colHeardsValue: '',
      showXls: false,
      showBtn: false,
      cellParms: {
        event: {},
        coords: {}
      },
      initXls: {
        initData: [],
        initColHeaders: [],
        initRowHeaders: []
      },
      hotSettings: {
        data: [],
        colHeaders: [],
        rowHeaders: [],
        contextMenu: true,
        mergeCells: true,
        // observeChanges: true,
        // manualRowMove: true,
        // manualColumnMove: true,
        // manualRowMove: true,
        afterChange: function (changes, source) { // 数据改变时触发此方法
          console.log('数据改变时触发此方法')
          console.log(this)
          console.log(this.getColHeader())
          console.log(this.getData())
          _this.hotSettings.colHeaders = this.getColHeader()
          // console.log(this)
        },
        // afterGetCellMeta () { console.log('afterGetCellMeta............') },//多次调用 获取单元格的配置信息后被调用
        afterUpdateSettings () { 'afterUpdateSettings.......1111' }, // 配置参数配修改后调用
        afterGetColHeader (col, TH) { // 获取列头信息后被调用，TH是行头节点
          // console.log(col)
          // // console.log(TH)
          // console.log(this.getColHeader())
        },
        afterLoadData () {
          console.log('afterLoadData新的数据被加载到数据资源后被调用')
        },
        // 点击投触发
        afterOnCellMouseDown (event, coords) {
          _this.cellParms.event = event
          _this.cellParms.coords = coords
          // // console.log(coords)

          if (coords.row === -1) _this.showBtn = true
          else _this.showBtn = false
        },
        afterCreateCol (index, amount) { // 添加行后被调用
          // console.log('index==>' + index)
          // console.log(_this)
          // console.log('amount==>' + amount)
        },
        modifyRow (row) { // 行被修改时调用
          // // console.log('modifyRow ising')
        }
      },
      language: 'zh-CN'

    }
  },
  computed: {
    ...mapGetters(['xlsModule', 'test'])

  },
  created () {
  },
  mouted () {
    this._this = this
  },
  methods: {
    $_xls_blur_xls () {
      console.log('_xls_blur_xls')
    },
    changeSelect () {
      // console.log('changeSelect')
      // this.$_xls_afterOnCellMouseDown(this.cellParms.event, this.cellParms.coords)
      this.$_xls_afterOnCellMouseDown(this.cellParms.coords)
    },
    blurSelect (event) {
      console.log(event)
      this.colHeardsValue = ''
      this.showBtn = false
    },
    $_xls_createdXls2 () {
      this.$refs.testHot.hotInstance.clear()
      let initColHeaders = this.hotSettings.colHeaders
      let colHeardsValue = this.colHeardsValue
      // initColHeaders[thisCoords.col] = this.colHeardsValue//
      // let newColHeard = this.options.filter(item => item.colHeardsValue === colHeardsValue)[0].label
      // initColHeaders[0] = 'A'//
      initColHeaders = ['A', 'B', 'C', 'D', 'E', 'F']//
      this.hotSettings.colHeaders = initColHeaders
      console.log(this.hotSettings.colHeaders)
      this.colHeardsValue = ''
      this.showBtn = false
      // this.$refs.testHot
    },
    $_xls_createdXls () {
      // // console.log(HotTable)
      // // console.log(this.vm.HotTable)

      // // console.log(this.HotTable.addHook('clear', myCallback))
      // this.HotTable.addHook('clear', myCallback)
      // debugger
      let initData = [
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
      ]
      let initColHeaders = ['A', 'B', 'C', 'D', 'E', 'F']
      // do somthing
      this.hotSettings.data = initData
      this.hotSettings.colHeaders = initColHeaders
      // console.log(this.hotSettings.colHeaders.slice())
      this.showXls = true
      // this.$nextTick(() => {
      let examData = this.$refs.testHot // 这里要注意，如果使用this.hotSettings.data 保存表格数据，拖拽完以后数据的顺序将不会更新，因此使用 this.$refs.testHot.table.getData(); 来获取数据，获取的数据格式为二维数组。
      // console.log(examData)
      // })
    },
    $_xls_inquireModule () {
      console.log(this.$refs.testHot.hotInstance.getData())
      console.log(this.$refs.testHot)
    },
    $_xls_previewXls () {
      // // console.log(this.hotSettings.colHeaders)
      // 请求完数据。。。。
      // 假设头部只有6个 多出来的数据会被裁掉

      let res = [

        ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff'],
        ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff'],
        ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff'],
        ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff'],
        ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff'],
        ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff']

        // ['2016', 'Ford', 'Volvo', 'Toyota', 'Honda', 'aaa', 'bbbbb', 'vvvvv', 'ddsadasd'],
        // ['2016', 'Ford', 'Volvo', 'Toyota', 'Honda', 'aaa', 'bbbbb', 'vvvvv', 'ddsadasd'],
        // ['2016', 'Ford', 'Volvo', 'Toyota', 'Honda', 'aaa', 'bbbbb', 'vvvvv', 'ddsadasd'],
        // ['2016', 'Ford', 'Volvo', 'Toyota', 'Honda', 'aaa', 'bbbbb', 'vvvvv', 'ddsadasd'],
        // ['2016', 'Ford', 'Volvo', 'Toyota', 'Honda', 'aaa', 'bbbbb', 'vvvvv', 'ddsadasd'],
        // ['2016', 'Ford', 'Volvo', 'Toyota', 'Honda', 'aaa', 'bbbbb', 'vvvvv', 'ddsadasd'],
        // ['2016', 'Ford', 'Volvo', 'Toyota', 'Honda', 'aaa', 'bbbbb', 'vvvvv', 'ddsadasd']

      ]
      this.hotSettings.data = res
      // console.log(this.$refs.testHot.$data.hotInstance.getData())
      // let examData = this.$refs.Hot.table.getData() // 这里要注意，如果使用this.hotSettings.data 保存表格数据，拖拽完以后数据的顺序将不会更新，因此使用 this.$refs.testHot.table.getData(); 来获取数据，获取的数据格式为二维数组。
      // // console.log(examData)
    },
    $_xls_saveModule () {
      // let newModule = { id: 1 }

      let newModule = Object.assign({}, this.hotSettings, { id: add })
      add++
      // // console.log(newModule)
      // this.setXlsModule(newModule)
      // // console.log(this.xlsModule)
      // let test = 'newTest'
      let test = 'newTest'
      this.setTest(test)
      this.pushModule(newModule)
    },
    $_xls_changeModule (item) {
      // // console.log(item)
    },
    $_xls_afterOnCellMouseDown (coords) {
      /**
       * 1.获取当前行头位置 显示一个select选项
       * 2.包含了请求回来的数据 通过点击修改 行头
       * 3.获取当前行头数据，
       */

      // // console.log(event)
      // // console.log(coords)
      // // console.log(TD)
      // debugger
      let thisCoords = coords
      if (thisCoords.row === -1) {
        // this.hotSettings.colHeaders[thisCoords.col] = this.colHeardsValue
        // // console.log(this.hotSettings.colHeaders[0])
        let initColHeaders = this.hotSettings.colHeaders.slice()
        let colHeardsValue = this.colHeardsValue
        // initColHeaders[thisCoords.col] = this.colHeardsValue//
        let newColHeard = this.options.filter(item => item.colHeardsValue === colHeardsValue)[0].label
        initColHeaders[thisCoords.col] = newColHeard//
        this.hotSettings.colHeaders = initColHeaders
        console.log(this.hotSettings.colHeaders)
        this.colHeardsValue = ''
        this.showBtn = false
        // 修改完headers
      }
    },
    ...mapActions([
      'setTest', 'pushModule'
    ])
  }

}
</script>

<style lang="scss" >
.el-select-containner{
    // border: 1px solid red;
    display: inline-block;
    position: fixed;
    z-index: 10000;
}
</style>
