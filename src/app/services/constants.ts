declare const LOCAL_IP;
export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;
export const API_BASE_URL: string = `http://${HOST}:8089`;
export const API_ADMIN_URL: string = `${API_BASE_URL}/admin`;
export const API_USER_URL: string = `${API_BASE_URL}/user`;
export const log = ENV === 'development' ? console.log.bind(console) : function() { };
