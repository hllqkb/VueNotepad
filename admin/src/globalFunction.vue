<script>
// 全局函数

exports.install = function (Vue) {
  // Elemeng-UI的提醒
  Vue.prototype.myError = function (theMessage) {
    this.$message({
      type: "error",
      message: theMessage,
      center: true,
    });
  };
  Vue.prototype.myWarning = function (theMessage) {
    this.$message({
      type: "warning",
      message: theMessage,
      center: true,
    });
  };
  Vue.prototype.mySuccess = function (theMessage) {
    this.$message({
      type: "success",
      message: theMessage,
      center: true,
    });
  };
  Vue.prototype.myInfo = function (theMessage) {
    this.$message({
      type: "info",
      message: theMessage,
      center: true,
    });
  };
};
</script>