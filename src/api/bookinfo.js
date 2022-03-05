import myaxios from "@/utils/myaxios";

export default {
  getBookInfoList() {
    return myaxios({
      url: "/bookinfo/list",
      method: "get",
    });
  },
  search(page, size, searchWhere) {
    return myaxios({
      url: `/bookinfo/list/search/${page}/${size}`,
      method: "post",
      data: searchWhere,
    });
  },
};
