import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Lấy token từ cookie
        // Token lưu ở dạng "token=token_value; path=/", nên cần tách chuỗi để lấy giá trị token
        // Tách chuỗi bằng cách split chuỗi thành mảng các chuỗi con (với ngăn cách là dấu ;), sau đó tìm phần tử
        // bắt đầu bằng "token=" và lấy phần tử đó
        const token = document.cookie.split(';').find((item) => item.trim().startsWith('token=')).replace("token=", "").trim();
        if (token) {
            // Sau đó lấy giá trị token bằng cách cắt chuỗi từ vị trí thứ 6 (vì "token=" có 6 ký tự)
            // config.headers.Authorization = `Bearer ${token.slice(6)}`;
            config.headers.Authorization = `Bearer ${token}`;

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;