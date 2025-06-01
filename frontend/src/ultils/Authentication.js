export default function setAuthToken(accessToken) {
    sessionStorage.setItem('accessToken',accessToken);
}

export function getAuthToken() {
    return sessionStorage.getItem('accessToken');
}

export function clearAuthToken() {
    sessionStorage.removeItem('accessToken');
}