// utils.js
import { ElMessage } from 'element-plus';
export default {
  showMessage(message) {
    ElMessage({
      message: message,
      type: 'success',
    });
  },
};
