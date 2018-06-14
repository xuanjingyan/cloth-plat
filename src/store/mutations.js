import * as types from "./mutation-types";
export default {
  [types.CART_NUMBER_SHOW]: (state, n) => (state.cartNumber = n),
  [types.CITY_NAME_SHOW]: (state, oneCity) => (state.oneCity = oneCity),
  [types.ENABLE_LOADING]: (state, n) => (state.loading = n),
  [types.ENABLE_EDIT]: (state, n) => (state.edit = n),
  [types.UPDATE_HEADER]: (state, n) => (state.headerInfo = n),
  [types.GET_CITY_CATEGORY_ID]: (state, n) => (state.cityCategoryId = n),
  [types.POINT_TYPE]: (state, n) => (state.pointType = n),
  [types.GIVEWAY_CONDITION]: (state, n) => (state.giveWayCondition = n),
  [types.INDOOR_CLIENT_ID]: (state, n) => (state.indoorClientId = n),
  [types.TOTAL_POINT_NUMBER]: (state, n) => (state.totalPointNumber = n),
  [types.ORDER_ID]: (state, n) => (state.orderId = n),
  [types.ORDER_TYPE]: (state, n) => (state.orderType = n),
  [types.EDIT_AGENT]: (state, n) => (state.agentInfo = n),
  [types.VIEW_AGENT]: (state, n) => (state.agentInfo = n),
  [types.EDIT_CUSTOMER]: (state, n) => (state.customerInfo = n),
  [types.FINANCIAL_VIEW]: (state, n) => (state.financial = n),
  [types.TRANSFER_VIEW]: (state, n) => (state.transferId = n),
  [types.FINANCE_INFO]: (state, n) => (state.financeInfo = n),
  [types.MENU_DATA]: (state, n) => (state.menuData = n),
  [types.PUBLIC_PATH]: (state, n) => (state.publicPath = n),
  [types.QUIT_COMPANY]: (state, n) => (state.isVip = n),
  [types.OVERDUE_INFO]: (state, n) => (state.overdueInfo = n),
  [types.SALE_REPORT_VIEW]: (state, n) => (state.saleReportId = n),
  [types.NEWS_LIST]: (state, data) => (state.newsList = data),
  [types.SYSTEM_DATA]: (state, data) => (state.systemData = data),
  [types.NEWS_LIST]: (state, data) => {
    state.haveUnreadMessage = data;
  }
};
