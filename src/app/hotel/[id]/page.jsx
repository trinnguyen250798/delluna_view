'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getHotelDetail } from '@/services/hotelService';
import {MdDateRange} from "react-icons/md";
import {format, isSameDay} from "date-fns";
import {AnimatePresence, motion} from "framer-motion";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import {vi} from "date-fns/locale";
import {FaUserFriends} from "react-icons/fa"; // đường dẫn tới file chứa hàm
import { useRef } from 'react';
export default function HotelDetailPage()
{

    const [state, setState] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
        number_adults: 2,
        number_children: 0,
    });
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    useEffect(() => {
        if (id) {
            getHotelDetail(id).then(setHotel);
        }
    }, [id]);


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

    if (!hotel) return <div>Đang tải dữ liệu...</div>;
    return (
        <div className=" mx-auto mt-[38px] p-4">
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
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-[2]">
                        <img
                            src={hotel.thumbnail || "https://placehold.jp/400x160.png"}
                            alt={hotel.name}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                    </div>
                    <div className="flex-[3]">
                        <h1 className="text-2xl font-bold mb-2">{hotel.name}</h1>
                        <p className="text-gray-600 mb-4">{hotel.description}</p>
                        <p className="text-gray-800 font-semibold mb-2">
                            {hotel.city}, {hotel.country}
                        </p>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-yellow-500">★</span>
                            <span>{hotel.rating} ({hotel.review_count} đánh giá)</span>
                        </div>
                        <p className="text-lg font-bold text-orange-500">
                            Từ {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(hotel.rooms_min_price_per_night)} / đêm
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
