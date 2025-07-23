import axios from "axios";

const TOKEN_TYPE = localStorage.getItem("tokenType");
let ACCESS_TOKEN = localStorage.getItem("accessToken");
let REFRESH_TOKEN = localStorage.getItem("refreshToken");

/* CREATE CUSTO AXIOS INSTANCE */
export const UserApi = axios.create({
    baseURL: 'http://localhost',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN_TYPE} ${ACCESS_TOKEN}`,
        'REFRESH_TOKEN': REFRESH_TOKEN,
    },
});

// 토큰 갱신
const refreshAccessToken = async () => {
    const response = await UserApi.get(`/api/v1/auth/refresh`);
    ACCESS_TOKEN = response.data;
    localStorage.setItem('accessToken', ACCESS_TOKEN);
    UserApi.defaults.headers.common['Authorization'] = `${TOKEN_TYPE} ${ACCESS_TOKEN}`;
}

// 토큰 유효성 검사
UserApi.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    console.log("토큰 유효성 검사 에러내용: ",error);
    const originalRequest = error.config;

    // 1. 먼저 error.response가 존재하는지 확인
    // 2. Network Error (ERR_NETWORK)인 경우를 명시적으로 처리
    if (error.response) {
        // HTTP 응답이 있을 때 (예: 401, 403, 500 등 서버가 응답을 보냈을 때)
        if (error.response.status === 403 && !originalRequest._retry) {
            // 무한 루프 방지를 위해 재시도 플래그 설정
            originalRequest._retry = true;
            try {
                //토큰 갱신 함수 (refreshAccessToken 구현에 따라 달라짐)
                await refreshAccessToken();
                // 토큰 갱신 성공 후, 원래 요청을 재시도
                return UserApi(originalRequest);
            }catch (refreshError) {
                // 토큰 갱신 실패 시 (예: 리프레시 토큰 만료) 로그인 페이지로 리다이렉션
                console.error("Refresh token failed:", refreshError);
                window.location.href = '/login';  // 또는 React
                // Router의 useNavigate 사용 (권장방식)
                return Promise.reject(refreshError); //갱신 실패 에러반환
            }
        }
        // 다른 HTTP 에러 ( 400, 401, 500등)는 여기서 처리하거나 그대로 반환
        return Promise.reject(error);
    }else if (error.code === 'ERR_NETWORK') {
        //서버에 아예 연결되지 않은 경우 (Network Error)
        console.error("네트워크 에러: 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.");
        // 사용자에게 메시지 표시 (예: alert, Toast 메시지 등)
        //alert("네트웨크 오류가 발생했습니다. 잠시 후 다시 시도 해주세요.");
        return Promise.reject(new Error("네트워크 연결 실패")); //더 명확한 에러 메시지 반환
    } else {
        //그 외 예상치 못한 에러
        console.error("예상치 못한 에러 발생: ", error.message);
        return Promise.reject(error);

    }
});

/* 회원조회 API */
export const fetchUser = async () => {
    const response = await UserApi.get(`api/v1/user`);
    console.log('fetchUser response: ', response);
    return response;
}

/* 회원수정 API */
export const updateUser = async (data) => {
    const response = await UserApi.put(`/api/v1/user`, data);
    return response.data;
}
/* 회원탈퇴 API */
export const deleteUser = async () => {
    await UserApi.delete(`/api/v1/user`);
}