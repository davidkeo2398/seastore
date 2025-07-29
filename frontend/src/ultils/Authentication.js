export default function setAuthToken(accessToken) {
    sessionStorage.setItem('accessToken',accessToken);
}

export function getAuthToken() {
    return sessionStorage.getItem('accessToken');
}

export function clearAuthToken() {
    sessionStorage.removeItem('accessToken');
}

export function setUserId(userId) {
    sessionStorage.setItem('userId', userId);
}

export function getUserId() {
    return sessionStorage.getItem('userId');
}

export function clearUserId() {
    sessionStorage.removeItem('userId');
}