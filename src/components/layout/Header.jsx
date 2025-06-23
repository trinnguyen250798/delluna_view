import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
                <Link href="/" className="text-2xl font-bold text-blue-600">Delluna</Link>
                <nav className="space-x-6">
                    <Link href="/" className="text-gray-700 hover:text-blue-500">Trang chủ</Link>
                    <Link href="/hotels" className="text-gray-700 hover:text-blue-500">Khách sạn</Link>
                    <Link href="/about" className="text-gray-700 hover:text-blue-500">Giới thiệu</Link>
                </nav>
                <div>
                    <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Đăng nhập</Link>
                </div>
            </div>
        </header>
    );
}
