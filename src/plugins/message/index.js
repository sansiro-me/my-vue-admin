import { MessageBox, Notification, Message } from 'element-ui';

// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
// Vue.prototype.$message = Message;

export default {
  msgbox: MessageBox,
  alert: MessageBox.alert,
  confirm(content, title = '提示') {
    return new Promise((resolve) => {
      MessageBox.confirm(content, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // type: 'warning'
      }).then(() => {
        resolve({
          button: 'ok'
        })
      }).catch(() => {
        resolve({
          button: 'cancel'
        })
      });
    });
  },
  prompt: MessageBox.prompt,
  notify: Notification,
  message: Message
}