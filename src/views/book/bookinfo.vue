<template>
  <div>
    <!-- data为要绑定的数据，border为显示表格边框（本列不加），max-height为表格最大高度，由于数据多，大于此高度会自动显示滚动条 -->
    <el-table :data="bookinfolist" style="width: 100%" max-height="380">
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
      <el-table-column
        label="图书类型"
        prop="bookType"
        width="100"
      ></el-table-column>
      <!-- fixed为固定 -->
      <el-table-column label="操作" fixed="right" width="150"></el-table-column>
      <!-- scope.$index为获取当前行的索引，scope.row为获取当前数据，编辑修改时只要传一个行对应的id即可，说明id虽然没有显示出来，但是bookinfolist中是含有id的 -->
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)"
          >编辑</el-button
        >
        <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table>
  </div>
</template>
<script>
import bookinfoApi from "@/api/bookinfo";

export default {
  data() {
    return {
      bookinfolist: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      bookinfoApi.getBookInfoList().then((response) => {
        const resp = response.data;
        this.bookinfolist = resp.data.bookinfolist;
        console.log(resp);
      });
    },
    handleEdit(id) {
      console.log("编辑" + id);
    },
    handleDelete(id) {
      console.log("删除" + id);
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
