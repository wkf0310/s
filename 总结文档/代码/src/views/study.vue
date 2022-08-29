<template>
  <div class="study-wrapper">
    <tou/>
    <div class="input-box">
      <el-select v-model="status" slot="prepend" placeholder="请选择">
        <el-option label="启用" value="1"></el-option>
        <el-option label="禁用" value="0"></el-option>
      </el-select>
      <el-input v-model="nickname" placeholder="请输入学生关键字"></el-input>
      <el-input v-model="tel" placeholder="请输入电话号"></el-input>
      <el-button type="primary" @click="search"
        ><i class="el-icon-search" />搜索</el-button
      >
      <el-button type="primary" @click="reset"
        ><i class="el-icon-loading" />重置</el-button
      >
    </div>
    <div class="button-box">
      <el-button type="primary">新增学员</el-button>
      <el-button type="primary">批量导入</el-button>
      <el-button type="primary">批量导出</el-button>
      <el-button type="primary">查看报表</el-button>
    </div>
    <div class="table-box">
      <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        height="300px"
        border
      >
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column prop="nickname" label="学生名称">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" alt="" />&emsp;{{ scope.row.nickname }}
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          align="center"
        ></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 1">启用</el-tag>
            <el-tag type="error" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_at" label="创建时间" align="center">
          <template slot-scope="scope">
            <!-- {{ new Date(Number(created_at)).toLocaleString() }} -->
            {{ scope.row.create_at | dateFormat(scope.row.create_at * 1000) }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text">详情</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">
              {{ scope.row.status === 1 ? "禁用" : "启用" }}
            </el-button>
            <el-button type="text">删除</el-button>
            <el-button type="text">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer-box">
      <div class="left-box">
        <el-button type="text">导出所选</el-button>
      </div>
      <div class="right-box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="pagesizes"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Tou from '../components/AsideBar/tou.vue'
export default {
  components:{ Tou },
  data() {
    return {
      // 渲染数据
      list: [],
      // 数据拷贝
      listCopy: [],
      // 状态  为0时禁用，为1时启用
      status: "",
      // 姓名搜索关键字
      nickname: "",
      // 手机号关键字
      tel: "",
      // 总条数
      total: 0,
      // 每页条数
      pagesize: 10,
      // 页码
      pagenum: 1,
      pagesizes: [1, 3, 5, 10],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 渲染
    getList() {
      this.$axios.get("/studylist/query").then((res) => {
        this.list = res.data.data.data;
        this.listCopy = res.data.data.data;
        this.total = this.list.length;
        let startIndex = (this.pagenum - 1) * this.pagesize;
        let endIndex = this.pagenum * this.pagesize;
        this.list = this.listCopy.slice(startIndex, endIndex);
      });
    },
    // 重置
    reset() {
      (this.status = ""), (this.nickname = ""), (this.tel = "");
      this.getList();
    },
    // 搜索
    search() {
      let status = this.status;
      let nickname = this.nickname;
      let tel = this.tel;
      // if(status || (status == 0 && nickname && tel)){
      //   this.uniteSearch();
      // }else if(status || (status == 0 && nickname && !tel)){
      //   this.nameStatus();
      // }else if(status || (status == 0 && tel && !nickname)){
      //   this.telStatus();
      // }else if(nickname && tel && !status){
      //   this.nameTel();
      // }else if(status || status === 0 && !nickname && !tel){
      //   this.stateSearch();
      // }else if(nickname && !tel && !status){
      //   this.nameSearch();
      // }else if(tel && !status && !nickname){
      //   this.telSearch();
      // }
      this.list = this.listCopy.filter( item => {
        item.status.toString().includes(status) && 
        item.nickname.includes(nickname) && 
        item.mobile.includes(tel)
      })

    },  
    // 状态搜索
    stateSearch() {
      // console.log(123);
      this.list = this.listCopy.filter((item) => {
        return item.status == this.status;
      });
    },
    // 姓名搜索
    nameSearch() {
      this.list = this.listCopy.filter((item) => {
        return item.nickname.includes(this.nickname);
      });
    },
    // 手机号搜索
    telSearch() {
      this.list = this.listCopy.filter((item) => {
        return item.mobile.includes(this.tel);
      });
    },
    // 状态和姓名搜索
    nameStatus() {
      const statusList = this.listCopy.filter((item) => {
        return item.status == this.status;
      });
      this.list = statusList.filter((item) => {
        return item.nickname.includes(this.nickname);
      });
    },
    // 状态和手机号搜索
    telStatus() {
      const statusList = this.listCopy.filter((item) => {
        return item.status == this.status;
      });
      this.list = statusList.filter((item) => {
        return item.mobile.includes(this.tel);
      });
    },
    // 姓名加手机号搜索
    nameTel() {
      const nameList = this.listCopy.filter((item) => {
        return item.nickname.includes(this.nickname);
      });
      this.list = nameList.filter((item) => {
        return item.mobile.includes(this.tel);
      });
    },
    // 联合搜索
    uniteSearch() {
      const tableList = this.listCopy.filter((item) => {
        return item.status == this.status;
      });
      const tableList1 = tableList.filter((item) => {
        return item.nickname.includes(this.nickname);
      });
      this.list = tableList1.filter((item) => {
        return item.mobile.includes(this.tel);
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getList();
    },
  },
};
</script>


<style lang="scss" scoped>
.study-wrapper {
  .input-box {
    padding: 20px 20px;
    .el-input {
      width: 150px;
      margin-left: 20px;
    }
    .el-button {
      margin-left: 20px;
    }
    i {
      margin-right: 5px;
    }
  }
  .button-box {
    .el-button {
      margin: 0 20px;
    }
  }
  .table-box {
    padding: 10px;
    img {
      width: 55px;
      height: 55px;
      vertical-align: middle;
    }
  }
  .footer-box {
    display: flex;
    justify-content: space-between;
  }
}
</style>