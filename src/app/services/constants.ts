/* tslint:disable max-line-length */
declare const LOCAL_IP;
export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;
export const SERVICE_WORKER_PUSH_SUPPORT = ('serviceWorker' in navigator && 'PushManager' in window);
export const API_BASE_URL: string = `${PUBLISH ? 'https' : 'http'}://${HOST}:${PUBLISH ? '8443' : '8089'}`; // tslint:disable-line: max-line-length
export const API_ADMIN_URL: string = `${API_BASE_URL}/admin`;
export const API_USER_URL: string = `${API_BASE_URL}/user`;
export const log = ENV === 'development' ? console.log.bind(console) : function() { };
