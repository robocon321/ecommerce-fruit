import AuthRequest from "@/types/request/AuthRequest";
import { UserDetailResponse } from "@/types/response/UserResponse";

export const login = async (request: AuthRequest): Promise<any> => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const status = response.status;
    const data = await response.json();
    console.log(data);

    if (status == 200) {
      return data;
    } else {
      throw new Error(data);
    }
  } catch (error) {
    throw error;
  }
};

export const register = async (request: AuthRequest): Promise<any> => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
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

export const loadUser = async (): Promise<UserDetailResponse | null> => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/loadUser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: token + "",
      },
    });
    const status = response.status;
    const data = await response.json();
    if (status == 200) {
      (data as UserDetailResponse).products_cart.forEach((item) => {
        item.images = item.images.toString().split(",");
      });
      (data as UserDetailResponse).products_wishlist.forEach((item) => {
        item.images = item.images.toString().split(",");
      });
      return data;
    } else {
      localStorage.removeItem("token");
      throw new Error(data);
    }
  } catch (error) {
    throw error;
  }
};
