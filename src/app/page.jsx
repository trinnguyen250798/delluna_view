export default function HomePage() {
    return (
        <>
            <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/bg-city.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">Meet the world</h1>
                    <p className="text-xl">Book hotels and hostels worldwide</p>

                    <div className="mt-6 bg-white p-4 rounded-xl flex flex-wrap justify-between items-center shadow-md w-full max-w-4xl gap-2">
                        <input type="text" placeholder="Where are you going?" className="flex-1 border px-4 py-2 rounded w-full md:w-auto" />
                        <input type="date" className="border px-4 py-2 rounded w-full md:w-auto" />
                        <input type="date" className="border px-4 py-2 rounded w-full md:w-auto" />
                        <input type="number" min="1" placeholder="Guests" className="border px-4 py-2 rounded w-full md:w-auto" />
                        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded">Search</button>
                    </div>
                </div>
            </section>

            <section className="bg-white py-12">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center px-4">
                    <div>
                        <div className="text-3xl mb-2">👍</div>
                        <h3 className="font-bold text-lg">Our Benefits</h3>
                        <p className="text-sm text-gray-600">Great value prices</p>
                    </div>
                    <div>
                        <div className="text-3xl mb-2">🕒</div>
                        <h3 className="font-bold text-lg">24/7 Support</h3>
                        <p className="text-sm text-gray-600">Easy help anytime</p>
                    </div>
                    <div>
                        <div className="text-3xl mb-2">📱</div>
                        <h3 className="font-bold text-lg">Our App</h3>
                        <p className="text-sm text-gray-600">Top-rated & flexible</p>
                    </div>
                    <div>
                        <div className="text-3xl mb-2">🔒</div>
                        <h3 className="font-bold text-lg">Sustainable Travel</h3>
                        <p className="text-sm text-gray-600">Commitment to community</p>
                    </div>
                </div>
            </section>
            <main>

            </main>
        </>
    );
}
