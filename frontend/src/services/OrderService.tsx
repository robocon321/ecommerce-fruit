import { OrderRequest } from "@/types/request/OrderRequest";
import { CreateOrderResponse } from "@/types/response/OrderResponse";


export const orderProduct = async (orders: OrderRequest[]): Promise<CreateOrderResponse> => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: token + "",
      },
      body: JSON.stringify(orders)
    });
    const status = response.status;
    const data = await response.json();
    if (status == 200) {
      return data;
    } else {
      throw new Error(data);
    }
  } catch (error) {
    throw error;
  }
};