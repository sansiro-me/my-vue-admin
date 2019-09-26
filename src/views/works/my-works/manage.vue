<template>
  <el-container v-loading="loading">
    <el-main>
      <div class="card-container">
        <el-card class="card" :body-style="{ padding: '0px' }" shadow="always" v-for="(item, index) in worksList" :key="index">
          <div class="card-top" @click="gotoWork(item.url)">
            <el-image :src="item.poster" :fit="'cover'" lazy>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div class="abstract">{{ item.abstract }}</div>
          </div>
          <div class="card-info">
            <div>
              <span class="card-title">{{ item.title }}</span>
              <template v-if="item.status == 1">
                <el-tag class="right" type="success" size="mini">线上</el-tag>
              </template>
              <template v-else>
                <el-tag class="right" type="info" size="mini">未上线</el-tag>
              </template>
            </div>
            <div class="bottom clearfix">
              <time class="time">{{ item.createtime }}</time>
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">操作<i class="el-icon-arrow-down el-icon--right"></i></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="icon-arrow-down" :command="{ name: 'offline', obj: item.id }"  v-if="item.status == 1">下线作品</el-dropdown-item>
                  <el-dropdown-item icon="icon-arrow-up" :command="{ name: 'online', obj: item.id }" v-else>上线作品</el-dropdown-item>
                  <el-dropdown-item icon="icon-edit" :command="{ name: 'edit', obj: item}">修改信息</el-dropdown-item>
                  <!-- <el-dropdown-item icon="icon-delete" :command="{ name: 'remove', obj: { ok: 1 }}">删除作品</el-dropdown-item> -->
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-card>

        <div class="inline" @click="addWork">
          <el-card class="card add icon-plus" :body-style="{ padding: '0px' }" shadow="hover"></el-card>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { getWorksList, changeStatus } from '@/request/works'

export default {
  data() {
    return {
      loading: false,
      worksList: []
    }
  },

  mounted() {
    this.getWorksList();
  },

  methods: {
    async getWorksList() {
      this.loading = true;
      const { isSuccess, data } = await getWorksList();

      if(isSuccess) {
        this.worksList = data;
      }
      this.loading = false;
     },
    handleCommand(command) {
      console.log(command);

      switch (command.name) {
        case 'online':
        case 'offline':
        case 'remove':
          this.onAction(command.name, command.obj);
          break;
        case 'edit':
          this.editWorkInfo(command.obj);
          break;
        default:
          this.$notify.error({
            title: '错误',
            message: '无此操作！'
          });
      }
    },
    async onAction(name, id) {
      const { button } = await this.$confirm(`你确定要 ${name} 此作品吗？`, "提示");

      if(button == 'ok') {
        this.change(name, id);
      }
    },
    async change(name, id) {
      const { isSuccess, data } = await changeStatus({
        status: name,
        workid: id
      });

      if(isSuccess) {
        this.$notify.success({
          title: '成功',
          message: '成功操作！'
        });

        this.getWorksList();
      }
    },
    async editWorkInfo(info) {
      const { button, data } = await this.$dialog('works/my-works/work-info-layer', {
        title: '修改作品信息',
        data: info
      });

      if(button == 'ok' && data) {
        this.getWorksList();
      }
    },
    async addWork() {
      const { button, data } = await this.$dialog('works/my-works/work-info-layer', {
        title: '添加信息'
      });

      if(button == 'ok' && data) {
        this.getWorksList();
      }
    },
    gotoWork(url) {
      window.open(url, '_blank');
    }
  }
}
</script>

<style lang="scss" scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

.card-container {
  min-height: 360px;
}

.card {
  display: inline-block;
  width: 260px;
  margin: 10px 15px;
  cursor: pointer;

  &:hover {
    .card-top{
      .abstract {
        opacity: 1;
      }
    }
  }

  &.add {
    height: 331px;
    font-size: 100px;
    color: #eee;
    text-align: center;
    line-height: 331px;

    &:hover {
      color: #409eff;
    }
  }

  .card-top {
    position: relative;
    height: 251px;
    overflow: hidden;

    .abstract {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      padding: 15px;
      line-height: 30px;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      font-weight: bold;
      overflow-y: hidden;
      word-break: break-all;
      opacity: 0;
      transition: .4s;
    }

    .el-image {
      width: 100%;
      height: 100%;
    }
  }

  .card-info {
    padding: 12px;

    .card-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 160px;
      display: inline-block;
    }
  }
}

.right {
  float: right;
}

.el-dropdown {
  float: right;
}

.el-dropdown-link {
  transition: .4s;
}

.el-dropdown-link:hover {
  color: #409eff;
}

.inline {
  display: inline-block;
  font-size: 0;
}
</style>