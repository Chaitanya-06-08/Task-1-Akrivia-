export const baseUrl = 'http://localhost:3000/api/v1';
export const loginUrl = `${baseUrl}/login`;
export const signupUrl = `${baseUrl}/signup`;
export const logoutUrl = `${baseUrl}/logout`;
export const verifyTokenUrl = `${baseUrl}/verifyAccessToken`;
export const getUploadXlSheetUrl = (userId:number)=>{
    return `${baseUrl}/insertAirlinesRecords/${userId}`;
};
export const getUserTableDataUrl = (userId: number)=>{
    return `${baseUrl}/getAirlinesByUserId/${userId}`;
}  