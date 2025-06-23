import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-red-500">
                    Delluna
                </Link>

                {/* Menu chính */}
                <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <Link href="/hotels" className="hover:text-red-500">Hotels</Link>
                    <Link href="/destinations" className="hover:text-red-500">Destinations</Link>
                    <Link href="/deals" className="hover:text-red-500">Deals</Link>
                    <Link href="/about" className="hover:text-red-500">About</Link>
                </nav>

                {/* Đăng nhập / Đăng ký */}
                <div className="space-x-3">
                    <Link href="/login" className="text-gray-700 hover:text-red-500 font-medium">Login</Link>
                    <Link href="/register" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm">Sign up</Link>
                </div>
            </div>
        </header>
    );
}
