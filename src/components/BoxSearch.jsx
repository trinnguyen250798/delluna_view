'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import { MdDateRange } from "react-icons/md";
import { format, isSameDay } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { DateRangePicker } from "react-date-range";
import { vi } from "date-fns/locale";
import { FaUserFriends } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import AsyncSelect from 'react-select/async';
import { getCitys } from '@/services/cityService';

export default function BoxSearch({ onSearch }) {
    const [state, setState] = useState({
        city_id: null,
        startDate: new Date(),
        endDate: new Date(),
        number_adults: 2,
        number_children: 0,
    });

    const [showCalendar, setShowCalendar] = useState(false);
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

    const handleSelect = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        setState((prev) => ({
            ...prev,
            startDate,
            endDate,
        }));
        if (!isSameDay(startDate, endDate)) {
            setTimeout(() => {
                setShowCalendar(false);
            }, 200);
        }
    };
    const [defaultCityOptions, setDefaultCityOptions] = useState([]);
    useEffect(() => {
        const fetchInitialCities = async () => {
            try {
                const cities = await getCitys(); // truyền rỗng là lấy top 10 city
                const options = cities.map(city => ({
                    value: city.id,
                    label: city.name
                }));
                setDefaultCityOptions(options);
            } catch (err) {
                console.error("Lỗi khi tải danh sách city mặc định:", err);
            }
        };

        fetchInitialCities();
    }, []);
    const loadCityOptions = async (inputValue, callback) => {
        try {
            // Nếu inputValue trống, lấy 10 city đầu tiên
            const keyword = inputValue || '';
            const cities = await getCitys(inputValue, 10, 0);
            const options = cities.map(city => ({
                value: city.id,
                label: city.name
            }));
            callback(options);
        } catch (err) {
            console.error('Lỗi khi load city:', err);
            callback([]);
        }
    };

    const handleSearchClick = () => {
        const searchData = {
            city_id: state.city_id,
            start_date: format(state.startDate, "dd/MM/yyyy"),
            end_date: format(state.endDate, "dd/MM/yyyy"),
            number_adults: state.number_adults,
            number_children: state.number_children,
        };
        if (onSearch) {
            onSearch(searchData);
        }
    };

    return (
        <div className="bg-white relative z-30 rounded-lg border border-gray-200 shadow-2xl p-5 flex items-center max-w-4xl mx-auto mb-5 mt-[-50px]">
            {/* Dropdown city */}
            <div className="flex-[2] pr-[10px]">
                <AsyncSelect
                    cacheOptions
                    defaultOptions={defaultCityOptions}
                    loadOptions={loadCityOptions}
                    placeholder="Chọn thành phố..."
                    onChange={(selected) =>
                        setState((prev) => ({ ...prev, city_id: selected?.value }))
                    }
                    styles={{
                        menu: (base) => ({
                            ...base,
                            maxHeight: 300,
                            overflowY: 'auto',
                        }),
                        control: (base) => ({
                            ...base,
                            minHeight: '71px',
                            borderRadius: '2.5rem',
                            backgroundColor: '#f9fafb',
                            borderColor: 'transparent',
                            boxShadow: 'none',
                            '&:hover': { borderColor: '#d1d5db' },
                        }),
                    }}
                />
            </div>

            {/* Ngày checkin / checkout */}
            <div className="flex">
                <div className="flex-[1] ml-0 border-r border-gray-400 pr-[10px] pl-[10px] cursor-pointer"
                     onClick={() => setShowCalendar((prev) => !prev)}>
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

                <div className="flex-[1] ml-0 pr-[10px] pl-[10px] cursor-pointer"
                     onClick={() => setShowCalendar((prev) => !prev)}>
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
            </div>

            {/* Calendar popup */}
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

            {/* Số lượng người */}
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

            {/* Button search */}
            <button
                className="bg-orange-500 font-bold text-white px-4 py-2 ml-2 rounded-lg hover:bg-orange-600"
                onClick={handleSearchClick}
            >
                Let's go! →
            </button>
        </div>
    );
}
