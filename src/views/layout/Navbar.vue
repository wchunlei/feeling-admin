<template>
	<el-menu class="navbar" mode="horizontal">
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
		<levelbar></levelbar>
		<tabs-view></tabs-view>
		<error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>
		<screenfull class='screenfull'></screenfull>
		<div style="display: inline-block;float: left;">
			<el-select v-model="homeSort" placeholder="选择渠道">
				<el-option v-for="item in homeSortOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-button type="primary" @click="dialogFormVisible = true">新增渠道</el-button>
		</div>
		<el-dropdown class="avatar-container" trigger="click">
			<div class="avatar-wrapper">
				<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
				<i class="el-icon-caret-bottom"></i>
			</div>
			<el-dropdown-menu class="user-dropdown" slot="dropdown">
				<!--<router-link class='inlineBlock' to="/">
					<el-dropdown-item>
						首页
					</el-dropdown-item>
				</router-link>
				<a target='_blank' href="http://192.168.1.43/feeling/feeling_admin/">
					<el-dropdown-item>
						项目地址
					</el-dropdown-item>
				</a>-->
				<el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
		<div class="size">
			<el-dialog title="新增渠道" :visible.sync="dialogFormVisible">
				<el-form :model="postForm" ref="postForm" :rules="rule">
					<el-form-item label="渠道名称:" label-width="100px" prop="name" required>
						<el-input v-model="postForm.name" auto-complete="off" placeholder="最多输入10个字" style="width: 190px" maxlength="10"></el-input>
					</el-form-item>
					<el-form-item label="复制于:" label-width="100px" prop="region" required>
						<el-select v-model="postForm.region" placeholder="请选择">
							<el-option v-for="item in  regionOptions" :key="item.label" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</el-menu>
</template>

<script type="text/ECMAScript-6">
  import { mapGetters } from 'vuex';
  import Levelbar from './Levelbar';
  import TabsView from './TabsView';
  import Hamburger from 'components/Hamburger';
  import Screenfull from 'components/Screenfull';
  import ErrorLog from 'components/ErrLog';
  import errLogStore from 'store/errLog';

  export default {
    components: {
      Levelbar,
      TabsView,
      Hamburger,
      ErrorLog,
      Screenfull
    },
    data() {
		const validateRequireAll = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('输入不能为空'));
			} else {
				callback()
			}
		};
      return {
		  log: errLogStore.state.errLog,
		  homeSort: '',
		  homeSortOptions: [{
			  value: '0',
			  label: '默认'
		  },{
			  value: '1',
			  label: '1'
		  }],
		  postForm: {
			  name: '',
			  region: '女仆团'
		  },
		  regionOptions: [{
			  value: '0',
			  label: '女仆团'
		  },{
			  value: '1',
			  label: '1'
		  }],
		  dialogFormVisible: false,
		  rule: {
			  name: [{ validator: validateRequireAll, trigger: 'blur' }],
			  region: [{ validator: validateRequireAll, trigger: 'blur' }],
		  }
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'name',
        'avatar'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      },
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload();// 为了重新实例化vue-router对象 避免bug
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
	.navbar {
			height: 50px;
			line-height: 50px;
			border-radius: 0px !important;
			.hamburger-container {
					line-height: 58px;
					height: 50px;
					float: left;
					padding: 0 10px;
			}
			.errLog-container {
					display: inline-block;
					position: absolute;
					right: 150px;
			}
			.screenfull {
					position: absolute;
					right: 90px;
					top: 16px;
					color: red;
			}
			.avatar-container {
					height: 50px;
					display: inline-block;
					position: absolute;
					right: 35px;
					.avatar-wrapper {
							cursor: pointer;
							margin-top: 5px;
							position: relative;
							.user-avatar {
									width: 40px;
									height: 40px;
									border-radius: 10px;
							}
							.el-icon-caret-bottom {
									position: absolute;
									right: -20px;
									top: 25px;
									font-size: 12px;
							}
					}
			}
			.el-dialog__header {
				height:40px;
				padding:0 10px 0 0;
				text-align:center;
				line-height:40px;
				background-color:#1970cf;
			}
			.el-dialog__header .el-dialog__title {
				color:#fff;
				font-weight:500;
				font-size:14px;
			}
			.size .el-dialog--small {
				width: 30%;
			}
	}
</style>



