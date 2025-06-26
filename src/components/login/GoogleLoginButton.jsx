'use client';

import { GoogleLogin } from '@react-oauth/google';
import { useToast } from '@/context/ToastContext';

export default function GoogleLoginButton({ setIsLoggedIn }) {
    const { showToast } = useToast();

    const handleSuccess = async (credentialResponse) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BARE_URL_API}api/auth/google/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: credentialResponse.credential }),
                credentials: 'include',
            });
            const data = await res.json();
            if (data.token) {
                localStorage.setItem('auth_token', data.token);
                setIsLoggedIn(true);
                showToast('Đăng nhập thành công');
            } else {
                showToast('Đăng nhập thất bại: ' + data.error, 'error');
            }
        } catch (e) {
            showToast('Lỗi kết nối. Vui lòng thử lại.', 'error');
        }
    };

    const handleError = () => {
        showToast('Đăng nhập thất bại. Vui lòng thử lại.', 'error');
    };

    return (
        <div className="flex justify-center">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                theme="filled_blue"
                size="medium"
                text="signin_with"
            />
        </div>
    );
}
