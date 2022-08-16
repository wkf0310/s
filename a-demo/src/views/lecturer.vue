<template>
  <div>
    <div class="box">
      <h4>学员管理</h4>
      <!-- 搜索 -->
      <div class="con">
        <div>
          <span>学员状态</span>
          <el-select v-model="value" placeholder="请选择" @change="seach(value)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <span>学生姓名</span>
          <el-input
            class="inp"
            v-model="names"
            placeholder="请输入学生姓名"
          ></el-input>
        </div>
        <div>
          <span>手机号</span>
          <el-input
            v-model="tel"
            class="inp"
            placeholder="请输入手机号"
          ></el-input>
        </div>
        <div class="p">
          <el-button icon="el-icon-search" @click="seachs">搜索</el-button>
          <el-button icon="el-icon-star-off" @click="reset">重置</el-button>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="btn">
        <el-button type="primary">新增学员</el-button>
        <el-button type="primary">批量导入</el-button>
        <el-button type="primary">批量导出</el-button>
        <el-button type="primary">查看报表</el-button>
      </div>
      <!-- 表格 -->
      <div class="table">
        <el-table
          :data="tableData.slice((currentPage - 1) * page, currentPage * page)"
          stripe
          border
          style="width: 100%"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="nickname" label="学生姓名">
            <template slot-scope="scope">
              <img :src="scope.row.avatar" alt="" />
              <span>{{ scope.row.nickname }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="手机号"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status == 0">禁用</el-tag>
              <el-tag type="success" v-else>开启</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="updated_at" label="创建时间">
            <template slot-scope="scope">
              {{ scope.row.created_at | data }}
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="260px">
            <div class="sp">
              <span>详情</span>- <span>编辑</span>- <span>禁用</span>-
              <span>删除</span>-
              <span>重置密码</span>
            </div>
          </el-table-column>
        </el-table>
        <div class="bom">
          <div class="z">
            <span>导出所选</span>
          </div>
          <!-- 分页 -->
          <div class="y">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[3, 5, 6, 8]"
              :page-size="page"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  data() {
    return {
      tableData: [],
      tab: [],
      value: "",
      names: "",
      tel: "",
      currentPage: 1,
      page: 3,
      options: [
        {
          value: "0",
          label: "禁用",
        },
        {
          value: "1",
          label: "开启",
        },
      ],
    };
  },
  created() {
    this.req();
  },
  //   过滤器
  filters: {
      data(val){
          return new Date(val*1000).toLocaleString()
      }
  },
  mounted() {},
  methods: {
    //   请求数据
    req() {
      axios.get("/api/user").then((res) => {
        console.log(res.data.data);
        this.tableData = res.data.data;
        this.tab = res.data.data;
      });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    // 状态搜索
    seach(val){
        console.log(val);
        this.tableData=this.tab.filter(item=>item.status==val)
    },
    // 重置
    reset(){
        this.req()
        this.names='',
        this.value='',
        this.tel=''
    },
    // 全部搜索
    seachs(){
        console.log(1);
        if(this.names=='' && this.tel==''){
            return alert('为空')
        }
        if(this.names!=''){
            this.tableData=this.tab.filter(item=>item.nickname.includes(this.names))
        }
        if(this.tel!=''){
            this.tableData=this.tab.filter(item=>item.mobile.includes(this.tel))
        }
    }
  },
};
</script>
<style scoped lang="scss">
.bom {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  .z {
    color: #39f;
  }
}
.sp {
  color: #39f;
}
img {
  width: 20px;
  height: 20px;
  position: relative;
  top: 5px;
}
.inp {
  width: 200px;
}
.box {
  height: 100vh;
  border-left: 1px solid #e4e4e4;
  .table {
    margin: 10px 0 0 15px;
  }
  .btn {
    margin: 15px 0 0 13px;
  }
  .con {
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-left: 10px;
    div {
      span {
        margin: 5px;
      }
    }
    .p {
      margin-left: 8px;
    }
  }
}
h4 {
  padding: 0px 0 10px 15px;
  border-bottom: 1px solid #e4e4e4;
}
</style>
