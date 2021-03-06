import { OrderStatus } from "./__generated__/globalTypes";

export const LOCAL_STORAGE_TOKEN = "nuber-token";

export const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const VALIDATION_ERROR_MESSAGE = "please enter a valid email";

export const ORDER_STATUS_TEXT = {
  [OrderStatus.Pending]: "주문을 확인하고 있어요.",
  [OrderStatus.Cooking]: "조리를 시작했어요.",
  [OrderStatus.Cooked]: "조리가 완료되었어요.",
  [OrderStatus.PickUp]: "배달을 시작했어요.",
  [OrderStatus.Drivered]: "배달이 완료되었어요.",
};

export const DRIVER_ORDER_STATUS_TEXT = {
  [OrderStatus.Pending]: "메뉴 준비전",
  [OrderStatus.Cooking]: "메뉴 준비중",
  [OrderStatus.Cooked]: "메뉴 준비끝",
  [OrderStatus.PickUp]: "배달 중",
  [OrderStatus.Drivered]: "배달 완료",
};
