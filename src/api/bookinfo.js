import myaxios from "@/utils/myaxios";

export default {
  getBookInfoList() {
    return myaxios({
      url: "/bookinfo/list",
      method: "get",
    });
  },
};
