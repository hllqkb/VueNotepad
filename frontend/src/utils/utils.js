// utils.js
import { ElMessage } from 'element-plus';

export function showMessage(message) {
  ElMessage({
    message: message,
    type: 'success',
  });
}
