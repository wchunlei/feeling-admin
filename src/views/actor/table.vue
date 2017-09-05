<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="姓名" v-model="listQuery.title">
      </el-input>

      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.gender" placeholder="性别">
        <el-option v-for="item in  sexOptions" :key="item.label" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.status" placeholder="状态">
        <el-option v-for="item in  statusOptions" :key="item.label" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
      <el-checkbox class="filter-item" @change='tableKey=tableKey+1' v-model="showAuditor">显示审核人</el-checkbox>
    </div>

    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fithighlight-current-row style="width: 100%">

      <el-table-column align="center" label="序号" width="65" column-key="id">
        <template scope="scope">
          <span style="color:#337ab7;"><router-link :to="{ path: '/actor/form/' + scope.row.id }">{{scope.row.id}}</router-link></span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="姓名">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="性别">
        <template scope="scope">
          <span v-if="scope.row.gender==1">男</span>
          <span v-if="scope.row.gender==2">女</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" v-if='showAuditor' align="center" label="审核人">
        <template scope="scope">
          <span style='color:red;'>{{scope.row.auditor}}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" label="职业">
        <template scope="scope">
          <span>{{scope.row.job}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="性格" width="100px">
        <template scope="scope">
          <span>{{scope.row.nature}}</span>
          <!--<span class="link-type" @click='handleFetchPv(scope.row.pageviews)'>{{scope.row.pageviews}}</span>-->
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="类型" width="90px">
        <template scope="scope">
          <span>{{scope.row.style}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="180px" label="修改时间">
        <template scope="scope">
          <span>{{scope.row.modify_time}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250px">
        <template scope="scope">
          <el-button v-if="scope.row.status!='published'" size="small" type="success" @click="handleModifyStatus(scope.row,'published')">发布
          </el-button>
          <el-button v-if="scope.row.status!='draft'" size="small" @click="handleModifyStatus(scope.row,'draft')">草稿
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="small" type="danger" @click="handleModifyStatus(scope.row,'deleted')">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        
        <el-form-item label="姓名">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="temp.style"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-select class="filter-item" v-model="temp.gender" placeholder="请选择">
            <el-option v-for="item in  sexOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="身高">
          <el-input v-model="temp.height"></el-input>
        </el-form-item>
        <el-form-item label="体重">
          <el-input v-model="temp.weight"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="temp.age"></el-input>
        </el-form-item>

        <el-form-item label="胸围">
          <el-input v-model="temp.bust"></el-input>
        </el-form-item>
        <el-form-item label="职业">
          <el-input v-model="temp.job"></el-input>
        </el-form-item>
        <el-form-item label="性格">
          <el-input v-model="temp.nature"></el-input>
        </el-form-item>

        <el-form-item label="头像">
          <Upload v-model="temp.headurl"></Upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="阅读数统计" :visible.sync="dialogPvVisible" size="small">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="渠道"> </el-table-column>
        <el-table-column prop="pv" label="pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script type="text/ECMAScript-6">
  import { actorList, fetchPv } from 'api/actor';
  import { parseTime } from 'utils';
  import Upload from 'components/Upload/singleImage3';
  import { actorUpdate } from 'api/actor';
  import { actorstatus } from 'api/actor';
  import { actordel } from 'api/actor';

  const calendarTypeOptions = [
      { key: 'CN', display_name: '中国' },
      { key: 'US', display_name: '美国' },
      { key: 'JP', display_name: '日本' },
      { key: 'EU', display_name: '欧元区' }
  ];

  // arr to obj
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name;
    return acc
  }, {});

  export default {
    components: { Upload },
    name: 'table_demo',
    data() {
      return {
        isA: true,
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          gender: undefined,
          status: undefined,
          //sort: '+id'
        },
        temp: {
          id: undefined,
          importance: 0,
          remark: '',
          timestamp: 0,
          title: '',
          type: '',
          status: 'published'
        },
        importanceOptions: [1, 2, 3],
        calendarTypeOptions,
        sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
        statusOptions: ['published', 'draft', 'deleted'],
        sexOptions: [{
          value: '1',
          label: '男'
        }, {
          value: '2',
          label: '女'
        }],
        statusOptions: [{
          value: 'published',
          label: '发布'
        }, {
          value: 'draft',
          label: '草稿'
        }, {
          value: 'deleted',
          label: '删除'
        }, {
          value: '',
          label: '全部'
        }],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建'
        },
        dialogPvVisible: false,
        pvData: [],
        showAuditor: false,
        tableKey: 0
      }
    },
    created() {
      this.getList();
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        };
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      }
    },
    methods: {
      getList() {
        this.listLoading = true;
        actorList(this.listQuery).then(response => {
          this.list = response.data.content;
          this.total = response.data.total;
          this.listLoading = false;
        })
        this.listLoading = false;
      },
      handleFilter() {
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      timeFilter(time) {
        if (!time[0]) {
          this.listQuery.start = undefined;
          this.listQuery.end = undefined;
          return;
        }
        this.listQuery.start = parseInt(+time[0] / 1000);
        this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000);
      },
      handleModifyStatus(row, status) {
        this.listLoading = true;
        let delId = {
          id: parseInt(row.id)
        }
        actordel(delId).then(response => {
          console.log(response);
          this.getList();
        });
        /*let statusData = {
          id : row.id,
          status : status
        }
        actorstatus(statusData).then(response => {
          console.log(response)
        })*/
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        row.status = status;
        this.listLoading = false;
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row);
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        });
        const index = this.list.indexOf(row);
        this.list.splice(index, 1);
      },
      create() {
        this.temp.id = parseInt(Math.random() * 100) + 1024;
        this.temp.timestamp = +new Date();
        this.temp.author = '原创作者';
        this.list.unshift(this.temp);
        this.dialogFormVisible = false;
        this.$notify({
          title: '成功',
          message: '创建成功',
          type: 'success',
          duration: 2000
        });
      },
      update() {
        this.temp.timestamp = +this.temp.timestamp;
        for (const v of this.list) {
          if (v.id === this.temp.id) {
            const index = this.list.indexOf(v);
            this.list.splice(index, 1, this.temp);
            break;
          }
        }
        this.dialogFormVisible = false;

        var actorinfo;
        actorinfo = this.temp;
        actorUpdate(actorinfo).then(response => {
          if (!response.data.items) return;
          console.log(response)
          this.userLIstOptions = response.data.items.map(v => ({
            key: v.name
          }));
        });

        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        });
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 0,
          remark: '',
          timestamp: 0,
          title: '',
          status: 'published',
          type: ''
        };
      },
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData;
          this.dialogPvVisible = true;
        })
      },
      handleDownload() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('vendor/Export2Excel');
          const tHeader = ['时间', '地区', '类型', '标题', '重要性'];
          const filterVal = ['timestamp', 'province', 'type', 'title', 'importance'];
          const data = this.formatJson(filterVal, this.list);
          export_json_to_excel(tHeader, data, 'table数据');
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      }
    }
  }
</script>


