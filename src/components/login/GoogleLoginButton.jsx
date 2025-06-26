'use client';

import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
const BASE_URL_API = process.env.NEXT_PUBLIC_BARE_URL_API;
export default function GoogleLoginButton({ setIsLoggedIn }) {
    const router = useRouter();
    const handleSuccess = async (credentialResponse) => {
        try {
            const res = await fetch(`${BASE_URL_API}/api/auth/google/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: credentialResponse.credential }),
                credentials: 'include', // Gửi cookie nếu backend set HttpOnly cookie
            });
            const data = await res.json();
            if (data.token) {
                // Lưu JWT vào localStorage
                localStorage.setItem('auth_token', data.token); // Sử dụng key 'auth_token' để khớp với Header
                console.log('User:', data.user);
                // Cập nhật trạng thái đăng nhập
                setIsLoggedIn(true);
                // Chuyển hướng đến trang dashboard
                // router.push('/dashboard');
            } else {
                console.error('Login failed:', data.error);
                alert('Đăng nhập bằng Google thất bại: ' + data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.');
        }
    };

    const handleError = () => {
        console.log('Google Login Failed');
        alert('Đăng nhập bằng Google thất bại. Vui lòng thử lại.');
    };

    return (
        <div className="flex justify-center">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                theme="filled_blue"
                size="medium" // Kích thước nhỏ hơn để phù hợp với header
                text="signin_with"
            />
        </div>
    );
}