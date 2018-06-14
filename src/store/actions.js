import * as types from "./mutation-types";
export default {
  [types.CART_NUMBER_SHOW](context) {
    context.commit([types.CART_NUMBER_SHOW]);
  },
  [types.CITY_NAME_SHOW](context) {
    context.commit([types.CITY_NAME_SHOW]);
  },
  [types.ENABLE_LOADING](context) {
    context.commit([types.ENABLE_LOADING]);
  },
  [types.ENABLE_EDIT](context) {
    context.commit([types.ENABLE_EDIT]);
  },
  [types.GET_CITY_CATEGORY_ID](context) {
    context.commit([types.GET_CITY_CATEGORY_ID]);
  },
  [types.POINT_TYPE](context) {
    context.commit([types.POINT_TYPE]);
  },
  [types.GIVEWAY_CONDITION](context) {
    context.commit([types.GIVEWAY_CONDITION]);
  },
  [types.INDOOR_CLIENT_ID](context) {
    context.commit([types.INDOOR_CLIENT_ID]);
  },
  [types.TOTAL_POINT_NUMBER](context) {
    context.commit([types.TOTAL_POINT_NUMBER]);
  },
  [types.ORDER_ID](context) {
    context.commit([types.ORDER_ID]);
  },
  [types.ORDER_TYPE](context) {
    context.commit([types.ORDER_TYPE]);
  },
  [types.EDIT_AGENT](context, data) {
    context.commit(types.EDIT_AGENT, data);
  },
  [types.EDIT_CUSTOMER](context, data) {
    context.commit(types.EDIT_CUSTOMER, data);
  },
  [types.FINANCE_INFO](context, data) {
    context.commit(types.FINANCE_INFO, data);
  },
  [types.PUBLIC_PATH](context, data) {
    context.commit(types.PUBLIC_PATH, data);
  },
  [types.OVERDUE_INFO](context, data) {
    context.commit(types.OVERDUE_INFO, data);
  },
  [types.NEWS_LIST](context, data) {
    context.commit(types.NEWS_LIST, data);
  },
  [types.SYSTEM_DATA](context, data) {
    context.commit(types.SYSTEM_DATA, data);
  },
  [types.MENU_DATA](context, data) {
    context.commit(types.MENU_DATA, data);
  }
};
