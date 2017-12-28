<template>
  <div>
    <el-row>
      <el-col :span="3">
        <h5>管理中心</h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
        <div>
          <el-table
            :data="goodlist"
            stripe
            @selection-change="handleSelectionChange"
            style="width: 100%">

            <el-table-column
              type="selection"
              width="55">
            </el-table-column>

            <el-table-column
              prop="goodsId"
              label="商品序号"
              width="80">
            </el-table-column>

            <el-table-column
              prop="goodsSn"
              label="商品编号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="goodsName"
              label="商品名"
              width="580">
            </el-table-column>
            <el-table-column
              prop="shopPrice"
              label="价格"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="storeCount"
              label="库存"
              width="80"
             > </el-table-column>
            <el-table-column
              prop="marketPrice"
              label="市场价格"
              width="80"
            > </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="prev, pager, next"
              :total="1000">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible">
      <el-form :model="gooditem">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="gooditem.goodsName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="gooditem.shopPrice" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品内容" :label-width="formLabelWidth">
          <vue-wangeditor id="editor" v-bind:value="gooditem.goodsContent" width="140px"></vue-wangeditor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  import ApiManger from '@/managers/ApiManager.js'
  import vueWangeditor from 'vue-wangeditor'

  export default {
    data() {
      return {
        goodlist:[],
        activeIndex: '1',
        activeIndex2: '1',
        multipleSelection: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        gooditem:{},
        formLabelWidth: '120px'
      }
    },
    components: {
      vueWangeditor
    },
    methods: {
      handleSelect (key, keyPath) {

      },
      login(param) {
        return
      },
      handleOpen (key, keyPath) {

      },
      handleClose (key, keyPath) {

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val);
      },
      handleClick(row) {
        console.log(row.goodsId);
        this.gooditem =row;
        this.dialogFormVisible =true;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        //http://localhost:8080/goodlist?page=0
        ApiManger.get('/goodlist?page='+val).then(res => {
          this.goodlist = res.data;

        });
      }

    },
    created(){
      var param = {
        phone: 18339706056,
        password: 1
      }
      ApiManger.get('/goodlist?page=0').then(res => {
        this.goodlist = res.data;

      });

    },
    mounted(){

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
