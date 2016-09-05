declare const LOCAL_IP;
export const MOBILE = (screen.availWidth < 800);
export const API_BASE_URL: string = `http://${LOCAL_IP}:8088`;
export const API_ADMIN_URL: string = `${API_BASE_URL}/admin`;
export const API_USER_URL: string = `${API_BASE_URL}/user`;
