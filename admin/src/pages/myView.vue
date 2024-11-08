<template>
  <div class="myView">
    <!-- 卡片 -->
    <div class="cardsBox">
      <!-- 管理人员 -->
      <div class="card">
        <div class="cardImg">
          <img class="cardImg" src="../assets/png/管理人员 .png" />
        </div>

        <div class="cardA">
          <a class="theA">管理人员</a>
          <countTo class="theA" :startVal="0" :endVal="this.$store.state.userinfo.length" :duration="4000"></countTo>
        </div>
      </div>

      <!-- 入住学生 -->
      <div class="card">
        <div class="cardImg">
          <img class="cardImg" src="../assets/png/人员.png" />
        </div>

        <div class="cardA">
          <a class="theA">入住学生</a>
          <countTo class="theA" :startVal="0" :endVal="this.$store.state.tableData.length" :duration="3000"></countTo>
        </div>
      </div>

      <!-- 入住申请 -->
      <div class="card">
        <div class="cardImg">
          <img class="cardImg" src="../assets/png/申请.png" />
        </div>

        <div class="cardA">
          <a class="theA">入住申请</a>
          <countTo class="theA" :startVal="0" :endVal="this.$store.state.applyInfo.length" :duration="4000"></countTo>
        </div>
      </div>
    </div>

    <!-- 图表 -->
    <div class="chartsBox">
      <!-- 各学院入住人数比例 -->
      <div class="chart">
        <div id="chart1" style="width: 800px; height: 400px; left: 30px; top: 30px"></div>
      </div>

      <!-- 各宿舍楼入住人数 -->
      <div class="chart">
        <div id="chart2" style="width: 800px; height: 370px; left: 0px; top: 0px"></div>
      </div>
    </div>
  </div>
</template>

<script>
//引入vue-count-to
import countTo from 'vue-count-to'
//引入Echarts
import * as echarts from 'echarts'
export default {
  name: 'myView',
  components: { countTo },
  data() {
    return {
      // 遍历时候的索引
      index: 0,
      // 学院人数
      xg: 0,
      cm: 0,
      s: 0,
      sj: 0,
      wgy: 0,
      rw: 0,
      // 宿舍楼人数
      don8: 0,
      don9: 0,
      don10: 0,
      don11: 0,
      don12: 0,
      don13: 0,
      don14: 0,
      don15: 0,
      don18: 0,
      don21: 0
    }
  },
  methods: {
    // 各学院入住人数比例图表
    chart1() {
      let chartDom = document.getElementById('chart1')
      let myChart1 = echarts.init(chartDom)
      let option = {
        title: {
          text: '各学院入住人数比例',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: [
              { value: this.xg, name: '信工学院' },
              { value: this.cm, name: '传媒学院' },
              { value: this.s, name: '商学院' },
              { value: this.sj, name: '设计学院' },
              { value: this.wgy, name: '外国语学院' },
              { value: this.rw, name: '人文学院' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      option && myChart1.setOption(option)
    },
    // 各宿舍楼入住人数
    chart2() {
      let chartDom = document.getElementById('chart2')
      let myChart2 = echarts.init(chartDom)
      let option = {
        title: {
          text: '各宿舍楼入住人数',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['8栋', '9栋', '10栋', '11栋', '12栋', '13栋', '14栋', '15栋', '18栋', '21栋'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: '60%',
            data: [
              this.don8,
              this.don9,
              this.don10,
              this.don11,
              this.don12,
              this.don13,
              this.don14,
              this.don15,
              this.don18,
              this.don21
            ]
          }
        ]
      }
      option && myChart2.setOption(option)
    },
    // 将数据vuex中的数据进行统计
    getData() {
      // 统计表格需要的数据
      this.index = 0
      this.$store.state.tableData.forEach(() => {
        this.$store.state.tableData[this.index].school === '信工学院' ? this.xg++ : ''
        this.$store.state.tableData[this.index].school === '传媒学院' ? this.cm++ : ''
        this.$store.state.tableData[this.index].school === '商学院' ? this.s++ : ''
        this.$store.state.tableData[this.index].school === '设计学院' ? this.sj++ : ''
        this.$store.state.tableData[this.index].school === '外国语学院' ? this.wgy++ : ''
        this.$store.state.tableData[this.index].school === '人文学院' ? this.rw++ : ''
        this.$store.state.tableData[this.index].don === '8栋' ? this.don8++ : ''
        this.$store.state.tableData[this.index].don === '9栋' ? this.don9++ : ''
        this.$store.state.tableData[this.index].don === '10栋' ? this.don10++ : ''
        this.$store.state.tableData[this.index].don === '11栋' ? this.don11++ : ''
        this.$store.state.tableData[this.index].don === '12栋' ? this.don12++ : ''
        this.$store.state.tableData[this.index].don === '13栋' ? this.don13++ : ''
        this.$store.state.tableData[this.index].don === '14栋' ? this.don14++ : ''
        this.$store.state.tableData[this.index].don === '15栋' ? this.don15++ : ''
        this.$store.state.tableData[this.index].don === '18栋' ? this.don18++ : ''
        this.$store.state.tableData[this.index].don === '21栋' ? this.don21++ : ''
        this.index++
      })
    }
  },
  mounted() {
    this.getData()
    // 等所有节点插入完成后运行
    this.$nextTick(() => {
      this.chart1()
      this.chart2()
    })
    this.$store.state.now = '情况总览'
  }
}
</script>

<style scoped>
/* 情况总览大背景 */
.myView {
  position: absolute;
  top: 240px;
  left: 622px;
  width: 1480px;
  height: 762px;
  box-shadow: 0 0 10px rgb(128 145 165 / 20%);
  display: flex;
  flex-direction: column;
  background-color: pink;
}
/* 所有卡片的背景 */
.cardsBox {
  width: 1480px;
  height: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
/* 所有图表的背景 */
.chartsBox {
  width: 1480px;
  height: 562px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
/* 卡片盒子样式 */
.card {
  width: 466px;
  height: 180px;
  box-shadow: 0 0.1rem 0.6rem 0 rgb(0 0 0 / 10%);
  border-radius: 5px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
/* 卡片中图片的样式 */
.cardImg {
  width: 140px;
  height: 140px;
}
/* 卡片中文字区域盒子 */
.cardA {
  width: 140px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
/* 图表盒子样式 */
.chart {
  width: 700px;
  height: 500px;
  box-shadow: 0 0.1rem 0.6rem 0 rgb(0 0 0 / 10%);
  border-radius: 5px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
/* 卡片中字体样式 */
.theA {
  font-size: 28px;
}
</style>
