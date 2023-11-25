import AuthRequest from "@/types/AuthRequest";

export const login = async (request: AuthRequest) : Promise<any> => {
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

        if(status == 200) {            
            return data;
        } else {
            throw new Error(data);
        }
    } catch (error) {
        throw error;
    }
};

export const register = async (request: AuthRequest) : Promise<any> => {
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

        if(status == 201) {            
            return data;
        } else {
            throw new Error(data);
        }
    } catch (error) {
        throw error;
    }
};
