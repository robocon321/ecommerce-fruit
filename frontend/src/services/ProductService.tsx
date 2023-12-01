export const getProductsByCategories = async (categoryIds: number[]) : Promise<any> => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/product/getByCategories` + new URLSearchParams({
            categories: categoryIds.join(',')
        }), {
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