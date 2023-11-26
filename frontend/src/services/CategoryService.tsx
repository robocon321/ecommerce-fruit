export const getCategories = async () : Promise<any> => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/category`, {
            method: "GET"
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