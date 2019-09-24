import Vue from 'vue';

import mainCC from './main.vue';

const Box = Vue.extend(mainCC);

export default {
  component: mainCC,

  dialog(name, options = {}) {
    const store = this.$store;

    let defaultOptions = {};

    Object.assign(defaultOptions, options)

    return new Promise((resolve) => {
      const box = new Box({
        el: document.createElement('div'),

        props: {

        },

        components: {
          dialogContent: () => import('@/views/' + name + '.vue')
            .then(components => {

              components.default._Ctor = {};

              if (!components.default.mixins) {
                components.default.mixins = [];
              }

              components.default.mixins.push({
                data() {
                  return {
                    dialogOptions: {}
                  }
                }
              });

              const dialogOptions = typeof components.default.data === 'function' ? components.default.data().dialogOptions || {} : {};


              if (!components.default.attached) {
                components.default.backupCreated = components.default.created;
                components.default.backupMounted = components.default.mounted;
              }

              components.default.created = function() {
                // 子组件已经实例化完毕
  
                // 注入 vuex 实例 
                this.$store = store;
  
                // 传递调用者提供的参数
                this.$data.dialogOptions.data = this.$parent.dialogData;
  
                if (components.default.backupCreated) {
                  components.default.backupCreated.call(this);
                }
              };

              components.default.mounted = function() {
                if (components.default.backupMounted) {
                  components.default.backupMounted.call(this);
                }
              };

              box.buttons = options.buttons || dialogOptions.buttons || { ok: '确认', cancel: '取消' };
              box.title = options.title || dialogOptions.title || '对话框';
              box.hideClose = options.hideClose || dialogOptions.hideClose;
              box.dialogData = options.data || {};
              box.dialogProps = options.props || {};

              box.size = options.size || dialogOptions.size || 'medium';

              if (dialogOptions.width) {
                box.width = dialogOptions.width;
              }

              components.default.attached = true;

              return components;
            })
        }
      });

      box.$on('action', function(button) {
        const instance = this.$refs.body;

        if (this.disabled || !instance) {
          return;
        }

        this.disabled = true;

        if (!instance.dialogClickButton) {
          box.close();

          resolve({ button: 'close' });

          return;
        }

        // if (button === 'ok' || button === 'yes') {
        //   this.disabled = false;

        //   return;
        // }

        const result = instance.dialogClickButton(button);

        if (result && result.then) {
          result.then(result => {
            if (typeof result === 'object') {
              if (result.close === true || typeof result.close === 'undefined') {
                box.close();

                resolve({ button, data: result });
              }
              else {
                this.disabled = false;
              }
            }
            else {
              if (result === true || typeof result === 'undefined') {
                box.close();

                resolve({ button, data: result });
              }
              else {
                this.disabled = false;
              }
            }
          });
        }
        else {
          if (typeof result === 'object') {
            if (result.close === true || typeof result.close === 'undefined') {
              box.close();

              resolve({ button, data: result });
            }
            else {
              this.disabled = false;
            }
          }
          else {
            if (result === true || typeof result === 'undefined') {
              box.close();

              resolve({ button, data: result });
            }
            else {
              this.disabled = false;
            }
          }
        }
      });

      box.$on('close', () => {
        document.body.removeChild(box.$el)
        box.$destroy();
      });

      document.body.appendChild(box.$el);
      box.open();
      // Vue.nextTick(() => {
      //   box.visible = true;
      // });
    })
  }
}