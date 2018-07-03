<template>
  <div class="top-container">
    <div class="nav">
      <div class="container">
        <div class="tags-breadcrumb" :class="[{ 'tag-collapse_right': isCollapse }]">
          <i class="iconfont icon-menu" @click="showCollapse"></i>
        </div>
        <div>
          <div @click="OpenPage">首页</div>
          <div>
            <el-dropdown>
              <span class="el-dropdown-link">
                {{userInfo.userName}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/info/index">修改信息</router-link>
                </el-dropdown-item>
                <el-dropdown-item @click.native="logout" divided>退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <opened-pages></opened-pages>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import openedPages from './openedpages'

export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(['isFullScreen', 'isCollapse'])
  },
  methods: {
    showCollapse () {
      this.$store.dispatch('SetCollapseState')
    },
    OpenPage () {
      this.$router.push('/admin')
      this.$store.dispatch('SetPageState', {name: '首页', path: '/admin'})
    },
    logout () {
      this.$confirm('是否退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({ path: '/admin/login' })
        })
      })
    }
  },
  components: {
    openedPages
  }
}
</script>
<style lang="scss" scoped>
  .top-container {
    position: fixed;
    top: 0;
    width: 100%;
    height: 104px;
    .nav {
      border-bottom: 1px solid #eee;
      padding-left: 10px;
    }
    .container {
      display: flex;
      justify-content: start;
    }
    .tags-breadcrumb {
      cursor: pointer;
      .icon-menu {
        padding: 0 16px;
        font-size: 32px;
        color: #595959;
      }
      button {
        border: 0;
        background: transparent;
      }
    }
    .tag-collapse_right {
      transform: rotate(90deg);
    }
  }
</style>
