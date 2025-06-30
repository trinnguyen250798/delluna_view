"use client";

// api
import { getHotels } from '@/services/hotelService';
//
import HotelList from "@/components/HotelList";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import { Carousel } from "flowbite"; // Import Carousel from Flowbite
import { MdDateRange } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { format, isSameDay } from "date-fns";
import { vi } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
export default function Page() {
    const [state, setState] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
        number_adults: 2,
        number_children: 0,
    });
    const carouselRef = useRef(null);
    useEffect(() => {
        let carouselInstance = null;

        if (typeof window !== "undefined" && carouselRef.current) {
            // Khởi tạo Carousel với các tùy chọn
            carouselInstance = new Carousel(carouselRef.current, {
                defaultPosition: 0,
                interval: 3000, // Auto slide mỗi 3 giây
                pauseOnHover: true, // Tạm dừng khi hover
                loop: true, // Lặp vô hạn
            });

            // Optional: Thêm sự kiện (event listeners) nếu cần
            carouselRef.current.addEventListener("slide", (e) => {
                console.log("Slide changed:", e.detail);
            });
        }

        // Cleanup để tránh memory leak
        return () => {
            if (carouselInstance && typeof carouselInstance.destroy === "function") {
                carouselInstance.destroy(); // Hủy instance nếu Flowbite hỗ trợ
            }
            if (carouselRef.current) {
                carouselRef.current.removeEventListener("slide", () => {});
            }
        };
    }, []);
    // Handle date selection
    const [showCalendar, setShowCalendar] = useState(false);
    const handleSelect = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        setState((prev) => ({
            ...prev,
            startDate,
            endDate,
        }));
        // Nếu ngày bắt đầu và kết thúc KHÁC NHAU thì đóng lịch (tức là đã chọn xong khoảng ngày)
        if (!isSameDay(startDate, endDate)) {
            setTimeout(() => {
                setShowCalendar(false);
            }, 200); // đợi 1 chút để tránh bug flicker
        }
    };
    // guide
    const [showGuestOptions, setShowGuestOptions] = useState(false);
    const guestWrapperRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (guestWrapperRef.current && !guestWrapperRef.current.contains(event.target)) {
                setShowGuestOptions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // dataa api
    const fetchedRef = useRef(false);
    const [hotels, setHotels] = useState([]);
    const [citys, setCitys] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        const fetchHotels = async () => {
            try {
                const data = await getHotels();
                if(data.codeStatus == 200){
                    setHotels(data.data);
                    citys(data.city);
                    console.log(citys)
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách khách sạn:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);
    //

    return (
        <div className=" mx-auto p-4">
            {/* Carousel */}
            <div
                ref={carouselRef}
                id="animation-carousel"
                className="relative w-full mx-auto h-96"
                data-carousel="slide" // Sử dụng 'slide' để bật auto-slide
            >
                <div className="relative h-full overflow-hidden rounded-lg">
                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                        <Image
                            src="/carousel-4.svg"
                            alt="Slide 1"
                            className="object-cover"
                            fill
                            priority={true} // Nếu là hình ảnh chính trên trang
                        />
                    </div>
                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                        <Image
                            src="/carousel-4.svg"
                            alt="Slide 1"
                            fill
                            className="object-cover"
                            priority={true} // Nếu là hình ảnh chính trên trang
                        />
                    </div>
                    <div
                        className="hidden duration-700 ease-in-out"
                        data-carousel-item="active"
                    >
                        <Image
                            src="/carousel-4.svg"
                            alt="Slide 1"
                            fill
                            className="object-cover"
                            priority={true} // Nếu là hình ảnh chính trên trang
                        />
                    </div>
                </div>

                {/* Nút điều hướng */}



            </div>
            {/* Search Box */}
            <div className="bg-white relative z-30 rounded-lg border border-gray-200 shadow-2xl p-5 flex items-center max-w-4xl mx-auto mb-5 mt-[-50px]">
                <div className="flex-[2] pr-[10px]">
                    <input
                        type="text"
                        placeholder="Where do you want to go?"
                        className="bg-gray-50 border min-h-[71px] border-transparent hover:border-gray-300 text-gray-900 text-sm rounded-[2.5rem] focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                {/* Check in */}
                <div className="flex">
                    <div className="flex-[1] ml-0 border-r border-gray-400 pr-[10px] pl-[10px] cursor-pointer"
                         onClick={() => setShowCalendar((prev)=> !prev  )} >
                        <div className="min-h-[71px] bg-gray-50 p-3 rounded-[2.5rem] border border-transparent hover:border-gray-300 flex items-center gap-3">
                            <MdDateRange className="text-[20px]" />
                            <div>
                                <p className="text-[12px] text-center">Check in</p>
                                <p className="text-[14px] text-center">
                                    {format(state.startDate, "dd/MM/yyyy")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Check out */}
                    <div
                        className="flex-[1] ml-0 pr-[10px] pl-[10px] cursor-pointer"
                        onClick={() => setShowCalendar((prev)=> !prev  )}
                    >
                        <div className="min-h-[71px] bg-gray-50 p-3 rounded-[2.5rem] border border-transparent hover:border-gray-300 flex items-center gap-3">
                            <MdDateRange className="text-[20px]" />
                            <div>
                                <p className="text-[12px] text-center">Check out</p>
                                <p className="text-[14px] text-center">
                                    {format(state.endDate, "dd/MM/yyyy")}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Calendar */}

                </div>
                <AnimatePresence>
                    {showCalendar && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-[100px] left-[10%] z-40 bg-white border rounded-xl hover:border-gray-300 border-gray-200 shadow-2xl p-4 "
                        >
                            <DateRangePicker
                                ranges={[{
                                    startDate: state.startDate,
                                    endDate: state.endDate,
                                    key: "selection",
                                }]}
                                onChange={handleSelect}
                                months={typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 2}
                                direction="horizontal"
                                moveRangeOnFirstSelection={false}
                                retainEndDateOnFirstSelection={true}
                                minDate={new Date()}
                                locale={vi}
                                staticRanges={[]}
                                inputRanges={[]}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Guests */}
                <div className="relative w-[100px] ml-0 pr-[10px] pl-[10px]" ref={guestWrapperRef}>
                    <div
                        className="min-h-[71px] bg-gray-50 p-3 rounded-[2.5rem] border border-transparent hover:border-gray-300 flex items-center gap-3 cursor-pointer"
                        onClick={() => setShowGuestOptions((prev) => !prev)}
                    >
                        <FaUserFriends className="text-[20px]" />
                        <p className="text-center">
                            {state.number_adults + state.number_children}
                        </p>
                    </div>

                    {/* Dropdown hiển thị khi click */}
                    <AnimatePresence>
                        {showGuestOptions && (
                            <motion.div

                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-[80px] left-0 z-40 w-64 bg-white shadow-lg rounded-xl p-4 border border-gray-200"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span>Người lớn</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                setState((prev) => ({
                                                    ...prev,
                                                    number_adults: Math.max(0, prev.number_adults - 1),
                                                }))
                                            }
                                            className="px-2 py-1 bg-gray-200 rounded"
                                        >
                                            -
                                        </button>
                                        <span>{state.number_adults}</span>
                                        <button
                                            onClick={() =>
                                                setState((prev) => ({
                                                    ...prev,
                                                    number_adults: prev.number_adults + 1,
                                                }))
                                            }
                                            className="px-2 py-1 bg-gray-200 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span>Trẻ em</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                setState((prev) => ({
                                                    ...prev,
                                                    number_children: Math.max(0, prev.number_children - 1),
                                                }))
                                            }
                                            className="px-2 py-1 bg-gray-200 rounded"
                                        >
                                            -
                                        </button>
                                        <span>{state.number_children}</span>
                                        <button
                                            onClick={() =>
                                                setState((prev) => ({
                                                    ...prev,
                                                    number_children: prev.number_children + 1,
                                                }))
                                            }
                                            className="px-2 py-1 bg-gray-200 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>


                <button className="bg-orange-500 font-bold text-white px-4 py-2 ml-2 rounded-lg hover:bg-orange-600">
                    Let's go! →
                </button>
            </div>


            <div className="">
                <h2 className="text-[30px] mb-2 font-bold">Điểm đến đang thịnh hành</h2>
                <div className="flex justify-between">
                    <div>
                        <Image src="/da-nang.webp" alt="Delluna" width={50} height={50} />
                    </div>
                    <div>
                        <Image src="/hcm.jpg" alt="Delluna" width={50} height={50} />
                    </div>
                </div>
            </div>
            <div className="">
                <h2 className="text-[30px] mb-2 font-bold">Lưu trú mà khách yêu thích</h2>
                {loading ? <p>Đang tải...</p> : <HotelList hotels={hotels} />}
            </div>


        </div>
    );
}