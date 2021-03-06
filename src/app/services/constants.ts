export const MOBILE = typeof window !== 'undefined' ? window.screen.availWidth < 800 : true;
export const SERVICE_WORKER_SUPPORT =
  typeof navigator !== 'undefined' ? 'serviceWorker' in navigator : false;
export const PUSH_MANAGER_SUPPORT = typeof window !== 'undefined' ? 'PushManager' in window : false;
export const API_BASE_URL: string = `${PUBLISH ? 'https' : 'http'}://${HOST}${
  PUBLISH ? '' : ':8089'
}`; // tslint:disable-line: max-line-length
export const API_ADMIN_URL: string = `${API_BASE_URL}${PUBLISH ? ':8443' : ''}/admin`;
export const API_USER_URL: string = `${API_BASE_URL}/user`;
export const log = ENV === 'development' ? console.log.bind(console) : function() {};
