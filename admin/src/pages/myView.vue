<template>

  <div class="myView">
    <!-- 卡片 -->
    <div class="cardsBox">
      <!-- 文档管理员 -->
      <div class="card">
        <div class="cardImg">
          <img class="cardImg" src="../assets/png/管理人员 .png" />
        </div>

        <div class="cardA">
          <a class="theA">用户数量</a>
          <countTo class="theA" :startVal="0" :endVal="userCount" :duration="4000"></countTo>
        </div>
      </div>

      <!-- 文档列表 -->
      <div class="card">
        <div class="cardImg">
          <img class="cardImg" src="../assets/png/人员.png" />
        </div>

        <div class="cardA">
          <a class="theA">文档数量</a>
          <countTo class="theA" :startVal="0" :endVal="noteCount" :duration="4000"></countTo>
        </div>
      </div>
    </div>

    <!-- 图表 -->
    <div class="chartsBox">
      <!-- 文档类型比例 -->
      <div class="chart">
        <h3>文档类型比例</h3>
        <div id="chart1" style="width: 800px; height: 400px; left: 30px; top: 30px"></div>
      </div>

      <!-- 文档状态统计 -->
      <div class="chart">
        <h3>文档状态统计</h3>
        <div id="chart2" style="width: 800px; height: 400px; left: 30px; top: 30px"></div>
      </div>
    </div>
  </div>
</template>

<script>
//引入vue-count-to
import countTo from 'vue-count-to'
//引入Echarts
import * as echarts from 'echarts'
import axios from 'axios';


export default {
  name: 'myView',
  components: { countTo },
  data() {
    return {
      userCount: 0,
      noteCount: 0,
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
    fetchCounts() {
      axios.get(`${process.env.VUE_APP_API_URL}/api/user-count`)
        .then(response => {
          this.userCount = response.data.count;
        })
        .catch(error => {
          console.error('Error fetching user count:', error);
        });

      axios.get(`${process.env.VUE_APP_API_URL}/api/note-count`)
        .then(response => {
          this.noteCount = response.data.count;
        })
        .catch(error => {
          console.error('Error fetching note count:', error);
        });
    },
    // 各学院入住人数比例图表
    chart1() {
      let chartDom = document.getElementById('chart1')
      let myChart1 = echarts.init(chartDom)
      let option = {
        title: {
          text: '文档类型比例',
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
              { value: this.xg, name: '娱乐' },
              { value: this.cm, name: '学习' },
              { value: this.s, name: '工作' },
              { value: this.sj, name: '其他' }
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
          text: '注册用户数量',
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
        this.$store.state.tableData[this.index].school === '' ? this.xg++ : ''
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
    },
    renderCharts() {
      // 使用 ECharts 渲染图表
      const chart1 = echarts.init(document.getElementById('chart1'))
      const chart2 = echarts.init(document.getElementById('chart2'))

      // 文档类型比例数据
      const option1 = {
        title: {
          text: '文档类型比例',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '类型',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 40, name: '类型1' },
              { value: 60, name: '类型2' }
            ]
          }
        ]
      }

      // 文档状态统计数据
      const option2 = {
        title: {
          text: '文档状态统计',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['草稿', '已提交']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [10, 20],
            type: 'bar'
          }
        ]
      }

      chart1.setOption(option1)
      chart2.setOption(option2)
    }
  },
  mounted() {
    this.fetchCounts();
    this.getData()
    // 等所有节点插入完成后运行
    this.$nextTick(() => {
      this.chart1()
      this.chart2()
    })
    this.$store.state.now = '情况总览'
    this.renderCharts()
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
  box-shadow: 0 0 10px rgba(217, 219, 221, 0.2);
  display: flex;
  flex-direction: column;

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
