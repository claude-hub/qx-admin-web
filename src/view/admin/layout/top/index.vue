<template>
  <div>
    <div class="nav">
      <div class="left-menu">
        <div class="tags-breadcrumb" :class="[{ 'tag-collapse_right': isCollapse }]">
          <i class="iconfont iconmenu" @click="showCollapse"></i>
        </div>
        <div :class="{'is-active' : currentPage.path === defaultHomePage.path}" class="menu-item" @click="openPage">
          首页
        </div>
      </div>
      <div class="top-operate">
        <!--<el-tooltip class="item-operate" effect="dark" :content="isFullScreen?'退出全屏':'全屏'" placement="bottom">-->
            <!--<span class="top-item">-->
            <!--<i class="iconfont" :class="isFullScreen?'icontuichuquanping':'iconquanping'" @click="handleScreen"></i>-->
          <!--</span>-->
        <!--</el-tooltip>-->
        <el-dropdown class="item-operate" size="small">
              <span class="el-dropdown-link">
                {{userInfo.userName || userInfo.phone}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/admin/user/edit">修改信息</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout" divided>退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <opened-pages></opened-pages>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { fullscreenToggel, listenfullscreen } from '@/tools/utiltools'
import openedPages from './openedpages'

export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    ...mapGetters(['isFullScreen', 'isCollapse', 'currentPage', 'defaultHomePage'])
  },
  mounted () {
    listenfullscreen(this.setScreen)
  },
  methods: {
    showCollapse () {
      this.$store.dispatch('SetCollapseState')
    },
    handleScreen () {
      fullscreenToggel()
    },
    setScreen () {
      this.$store.dispatch('SetFullScreen')
    },
    openPage () {
      this.$router.push(this.defaultHomePage.path)
      this.$store.dispatch('SetPageState', this.defaultHomePage)
    },
    logout () {
      this.$confirm('是否退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push({path: '/login'})
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
  .nav {
    height: 64px;
    line-height: 64px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    .left-menu {
      display: flex;
      justify-content: flex-start;
      .tags-breadcrumb {
        cursor: pointer;
        .iconmenu {
          padding: 0 16px;
          font-size: 32px;
          color: #595959;
        }
      }
      //转动90°
      .tag-collapse_right {
        transform: rotate(90deg);
      }
      .menu-item {
        padding: 0 20px;
        font-size: 14px;
        cursor: pointer;
      }
      .menu-item:hover{
        color: #595959;
      }
      .is-active {
        border-bottom: 2px solid #409EFF;
        color: #409EFF;
      }
    }
    .top-operate{
      display: flex;
      align-items: center;
      .el-dropdown-link {
        cursor: pointer;
      }
      .item-operate{
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
</style>
