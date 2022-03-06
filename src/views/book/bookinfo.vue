<template>
  <div>
    <!-- 条件查询：inline=“true”表示行内显示/一行显示；：model绑定查询条件（在data里要） -->
    <el-form
      :model="searchWhere"
      ref="searchForm"
      :inline="true"
      class="demo-form-inline"
      style="margin-top: 20px"
    >
      <el-form-item label="书名" size="mini" prop="bookName"
        ><el-input
          v-model="searchWhere.bookName"
          placeholder="书名"
          style="width: 150px"
        ></el-input
      ></el-form-item>
      <el-form-item label="出版社" size="mini" prop="press"
        ><el-input
          v-model="searchWhere.press"
          placeholder="出版社"
          style="width: 150px"
        ></el-input
      ></el-form-item>
      <el-form-item label="图书类型" size="mini" prop="bookType"
        ><el-select
          v-model="searchWhere.bookType"
          placeholder="图书类型"
          style="width: 120px"
          ><el-option
            v-for="option in bookTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option></el-select
      ></el-form-item>
      <el-form-item label="出版日期" size="mini" prop="publicationdate"
        ><el-date-picker
          v-model="searchWhere.publicationdate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholde="开始日期"
          end-placeholde="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker
      ></el-form-item>
      <el-form-item size="mini"
        ><el-button type="primary" @click="fetchData">查询</el-button
        ><el-button @click="resetForm('searchForm')"></el-button
      ></el-form-item>
    </el-form>
    <!-- data为要绑定的数据，border为显示表格边框（本列不加），max-height为表格最大高度，由于数据多，大于此高度会自动显示滚动条 -->
    <el-table
      :data="bookinfolist"
      :key="itemKey"
      style="width: 100%"
      max-height="680"
    >
      <!-- fixed为固定此列；prop为字段名；label为表头名；type设置为index就会自动添加索引（即序号），从1开始 -->
      <el-table-column
        label="序号"
        fixed
        type="index"
        width="60"
      ></el-table-column>
      <el-table-column
        label="书号"
        prop="bookISBN"
        width="150"
      ></el-table-column>
      <el-table-column
        label="书名"
        prop="bookName"
        width="200"
      ></el-table-column>
      <el-table-column label="作者" prop="author" width="100"></el-table-column>
      <el-table-column
        label="出版社"
        prop="press"
        width="150"
      ></el-table-column>
      <el-table-column
        label="出版日期"
        prop="publicationdate"
        width="150"
      ></el-table-column>
      <el-table-column label="价格" prop="price" width="100"></el-table-column>
      <el-table-column
        label="数量"
        prop="quantity"
        width="100"
      ></el-table-column>
      <el-table-column label="图书类型" prop="bookType" width="100"
        ><template slot-scope="scope"
          ><span>{{ scope.row.bookType | bookTypefilter }}</span></template
        ></el-table-column
      >
      <!-- fixed为固定 -->
      <el-table-column label="操作" fixed="right" width="150">
        <!-- scope.$index为获取当前行的索引，scope.row为获取当前数据，编辑修改时只要传一个行对应的id即可，说明id虽然没有显示出来，但是bookinfolist中是含有id的 -->
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <div>{{ bookinfolist }}</div> -->
    <el-pagination
      :total="total"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>
<script>
import bookinfoApi from "@/api/bookinfo";
const bookTypeOptions = [
  { type: "1", name: "编程类" },
  { type: "2", name: "前端类" },
  { type: "3", name: "设计类" },
  { type: "4", name: "移动开发类" },
];

export default {
  data() {
    return {
      bookinfolist: [],
      total: 0,
      itemKey: "",
      currentPage: 1,
      pageSize: 10,
      searchWhere: {
        bookName: "",
        press: "",
        bookType: "",
        publicationdate: "",
      },
      bookTypeOptions,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // bookinfoApi.getBookInfoList().then((response) => {
      bookinfoApi
        .search(this.currentPage, this.pageSize, this.searchWhere)
        .then((response) => {
          const resp = response.data;
          this.bookinfolist = resp.data.booklists;
          this.total = resp.data.total;
          this.itemKey = Math.random();
          console.log(this.itemKey);
          console.log(resp);
        });
    },
    handleSizeChange: function (size) {
      this.pageSize = size;
      console.log(this.pageSize);
      this.fetchData();
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage);
      this.fetchData();
    },
    handleEdit(id) {
      console.log("编辑" + id);
    },
    handleDelete(id) {
      console.log("删除" + id);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  filters: {
    bookTypefilter(type) {
      const booktypeobj = bookTypeOptions.find((obj) => obj.type === type);
      return booktypeobj ? booktypeobj.name : null;
    },
  },
};
</script>
<style scoped>
h1 {
  color: antiquewhite;
  text-align: center;
}
</style>
