import request from "@/utils/request";

// 列表
export function getList(data) {
  return request({
    url: "/order/list",
    data
  });
}
