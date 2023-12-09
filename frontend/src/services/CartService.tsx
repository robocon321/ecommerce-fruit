import { CartResponse } from "@/types/response/CartResponse";

export const saveCart = async (
  product_id: number,
  quantity: number
): Promise<CartResponse> => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/cart`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: token + "",
      },
      body: JSON.stringify({product_id, quantity})
    });
    const status = response.status;
    const data = await response.json();
    if (status == 201) {
      return data;
    } else {
      throw new Error(data);
    }
  } catch (error) {
    throw error;
  }
};

export const removeCart = async (
  product_id: number
): Promise<any> => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/cart`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: token + "",
      },
      body: JSON.stringify({product_id: product_id + ""})
    });
    const status = response.status;
    const data = await response.text();
    if (status == 204) {
      return data;
    } else {
      throw new Error(data);
    }
  } catch (error) {
    throw error;
  }
};
