import Vue from 'vue';

import mainCC from './main.vue';

const Box = Vue.extend(mainCC);

export default {
  component: mainCC,

  dialog(name, options = {}) {
    return new Promise((resolve) => {
      const box = new Box({
        el: document.createElement('div'),

        props: {

        },

        components: {
          dialogContent: () => import('@/views/' + name + '.vue')
            .then(components => {

              // components.default._Ctor = {};

              // if (!components.default.mixins) {
              //   components.default.mixins = [];
              // }

              // if (!components.default.attached) {
              //   components.default.backupCreated = components.default.created;
              //   components.default.backupMounted = components.default.mounted;
              // }

              return components;
            })
        }
      });

      box.$on('action', button => {});

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