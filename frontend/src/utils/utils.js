// @ts-ignore
import { ElMessage } from 'element-plus';
export default {
  showMessage(message) {
    ElMessage({
      message: message,
      type: 'success',
    });
  },
};
