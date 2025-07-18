// lưu trữ accessToken vào sessionStorage
export default function setAuthToken(accessToken) {
    sessionStorage.setItem('accessToken',accessToken);
}
// tra cứu accessToken từ sessionStorage
export function getAuthToken() {
    return sessionStorage.getItem('accessToken');
}

export function clearAuthToken() {
    sessionStorage.removeItem('accessToken');
}