import { ReviewProductRequest } from "@/types/request/ReviewProductRequest";

export const saveReviewProduct = async (request: ReviewProductRequest) : Promise<any> => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/review-product`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": token + ""
            },
            body: JSON.stringify(request),
        });
        const status = response.status;        
        const data = await response.json();

        if(status == 201) {            
            return data;
        } else {
            throw new Error(data);
        }
    } catch (error) {
        throw error;
    }
};
