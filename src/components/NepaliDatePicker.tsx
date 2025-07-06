import React, { useEffect, useState } from 'react';
import { getDaysInMonth, availableYears } from '../utils/calenderUtils';
import { ADToBS, BSToAD } from 'bikram-sambat-js';
import { NepaliCalendarProps } from '../types/types';
import { getBSStartDay } from '../utils/calenderStartDay';
import { days, adDays } from '../constants/days';
import { months, adMonths } from '../constants/months';

export const NepaliCalendar: React.FC<NepaliCalendarProps> = ({
    label,
    name = 'date',
    maxAge,
    maxDate,
    variant = 'light',
    selectTodayDate = false,
    dynamicDate = false,
    size = 6,
    formValues,
    onChange,
}) => {
    const getCurrentADDate = () => {
        const today = new Date();
        return {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate(),
        };
    };

    const getCurrentBSDate = () => {
        const today = new Date();
        const gregorianDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const bsDate = ADToBS(gregorianDate);
        const [year, month, day] = bsDate.split('-').map(Number);
        return { year, month, day };
    };

    const currentADDate = getCurrentADDate();
    const currentBSDate = getCurrentBSDate();

    const [calendarType, setCalendarType] = useState<'AD' | 'BS'>('BS');
    const [adYear, setADYear] = useState(currentADDate.year);
    const [adMonth, setADMonth] = useState(currentADDate.month);
    const [bsYear, setBSYear] = useState(currentBSDate.year);
    const [bsMonth, setBSMonth] = useState(currentBSDate.month);
    const [selectedDay, setSelectedDay] = useState<number | null>(
        selectTodayDate ? (calendarType === 'AD' ? currentADDate.day : currentBSDate.day) : null
    );
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const maxAgeObj = parseDateConstraint(maxAge, calendarType === 'AD');
    const maxDateObj = parseDateConstraint(maxDate, calendarType === 'AD');

    function parseDateConstraint(constraint?: string, isAD: boolean = false) {
        if (!constraint) return null;
        if (constraint === 'futureDate') return isAD ? getCurrentADDate() : getCurrentBSDate();
        if (/^\d+$/.test(constraint)) {
            const yearsAgo = parseInt(constraint);
            const date = isAD ? getCurrentADDate() : getCurrentBSDate();
            return { year: date.year - yearsAgo, month: date.month, day: date.day };
        }
        if (constraint.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = constraint.split('-').map(Number);
            return { year, month, day };
        }
        return null;
    }

    const adYears = Array.from({ length: currentADDate.year + 20 - 1900 }, (_, i) => 1893 + i);
    const filteredYears = calendarType === 'AD'
        ? adYears.filter((y) => (!maxAgeObj || y <= maxAgeObj.year) && (!maxDateObj || y <= maxDateObj.year))
        : availableYears.filter((y) => (!maxAgeObj || y <= maxAgeObj.year) && (!maxDateObj || y <= maxDateObj.year));
    
    const getADDaysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();

    useEffect(() => {
        if (selectedDay !== null) {
            let adDate = '';
            let bsDate = '';
            try {
                if (calendarType === 'AD') {
                    adDate = `${adYear}-${String(adMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
                    bsDate = ADToBS(adDate);
                    setInputValue(`${adMonths[adMonth - 1]} ${selectedDay}, ${adYear}`);
                } else {
                    bsDate = `${bsYear}-${String(bsMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
                    adDate = BSToAD(bsDate);
                    setInputValue(`${months[bsMonth - 1]} ${selectedDay}, ${bsYear}`);
                }
                onChange?.({ target: {name, value: { ad: dynamicDate ? adDate : '', bs: bsDate } }});
            } catch {
                setInputValue('');
                onChange?.({ target: {name, value: { ad: '', bs: '' }} });
            }
        } else {
            setInputValue('');
            onChange?.({ target: { name, value: { ad: '', bs: '' } }});
        }
    }, [selectedDay, calendarType]);

    useEffect(() => {
        if (!formValues) return;

        const bs = formValues[name];
        if (calendarType === 'BS' && bs) {
            const [year, month, day] = bs.split('-').map(Number);
            if (year && month && day) {
                setBSYear(year);
                setBSMonth(month);
                setSelectedDay(day);
            }
        }

        const ad = formValues?.date2;
        if (calendarType === 'AD' && ad) {
            const [year, month, day] = ad.split('-').map(Number);
            if (year && month && day) {
                setADYear(year);
                setADMonth(month);
                setSelectedDay(day);
            }
        }
    }, [calendarType]);


    const isDaySelectable = (day: number) => {
        const selectedDate = calendarType === 'AD'
            ? { year: adYear, month: adMonth, day }
            : { year: bsYear, month: bsMonth, day };

        const compare = (limit: any) => {
            if (!limit) return true;
            const { year, month, day: d } = selectedDate;
            return (
                year < limit.year ||
                (year === limit.year && month < limit.month) ||
                (year === limit.year && month === limit.month && d <= limit.day)
            );
        };

        return compare(maxAgeObj) && compare(maxDateObj);
    };



    // for showing emply calender cell in month
    // const totalDays = calendarType === 'AD'
    //     ? getADDaysInMonth(adYear, adMonth)
    //     : getDaysInMonth(bsYear, bsMonth);

    // const startDay = calendarType === 'AD'
    //     ? new Date(adYear, adMonth - 1, 1).getDay()
    //     : getBSStartDay(bsYear, bsMonth);

    // const daysArray = [];

    // for (let i = 0; i < startDay; i++) {
    //     daysArray.push(<div key={`empty-${i}`} className="calendar-day-cell empty" />);
    // }

    // for (let day = 1; day <= totalDays; day++) {
    //     const isSelectable = isDaySelectable(day);
    //     daysArray.push(
    //         <div
    //             key={day}
    //             className={`calendar-day-cell ${selectedDay === day ? 'selected' : ''} ${!isSelectable ? 'disabled' : ''}`}
    //             onClick={() => {
    //                 if (isSelectable) {
    //                     setSelectedDay(day);
    //                     setCalendarVisible(false);
    //                 }
    //             }}
    //         >
    //             <p>{day}</p>
    //         </div>
    //     );
    // }

    //  for showing full calender
    const totalDays = getDaysInMonth(bsYear, bsMonth);
    const startDay = getBSStartDay(bsYear, bsMonth);

    let prevMonth = bsMonth - 1;
    let prevYear = bsYear;
    if (prevMonth < 1) {
        prevMonth = 12;
        prevYear -= 1;
    }
    const prevMonthDays = getDaysInMonth(prevYear, prevMonth);

    let nextMonth = bsMonth + 1;
    let nextYear = bsYear;
    if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
    }

    const cells = [];

    for (let i = startDay - 1; i >= 0; i--) {
        const day = prevMonthDays - i;
        cells.push(
            <div key={`prev-${day}`} className="calendar-day-cell disabled other-month">
                <p>{day}</p>
            </div>
        );
    }

    for (let day = 1; day <= totalDays; day++) {
        const isSelectable = isDaySelectable(day);
        const weekdayIndex = (startDay + day - 1) % 7;
        const isSaturday = weekdayIndex === 6;

        cells.push(
            <div
                key={`curr-${day}`}
                className={`calendar-day-cell 
              ${selectedDay === day ? 'selected' : ''} 
              ${!isSelectable ? 'disabled' : ''} 
              ${isSaturday ? 'saturday' : ''}`}
                onClick={() => {
                    if (isSelectable) {
                        setSelectedDay(day);
                        setCalendarVisible(false);
                    }
                }}
            >
                <p>{day}</p>
            </div>
        );
    }

    const totalGrid = 42;
    const remainingCells = totalGrid - cells.length;
    for (let i = 1; i <= remainingCells; i++) {
        cells.push(
            <div key={`next-${i}`} className="calendar-day-cell disabled other-month">
                <p>{i}</p>
            </div>
        );
    }

    return (
        <div className={`calendar-wrapper ${variant} lg-${size}`}>
            <div className='calendar-wrapper-inner'>
                {label && <label className="label-input">{label}</label>}
                <div className="main-textfield">
                    {dynamicDate && (
                        <div className="calendar-radio-group">
                            <label className="calendar-radio-label">
                                <input
                                    type="radio"
                                    checked={calendarType === 'BS'}
                                    onChange={() => {
                                        setCalendarType('BS');
                                        setSelectedDay(null);
                                    }}
                                />
                                B.S.
                            </label>
                            <label className="calendar-radio-label">
                                <input
                                    type="radio"
                                    checked={calendarType === 'AD'}
                                    onChange={() => {
                                        setCalendarType('AD');
                                        setSelectedDay(null);
                                    }}
                                />
                                A.D.
                            </label>
                        </div>
                    )}
                    <div className="calendar-input-wrapper">
                        <input
                            type="text"
                            readOnly
                            value={inputValue}
                            onClick={() => setCalendarVisible((prev) => !prev)}
                            className="calendar-input"
                        />
                        <span className="calendar-input-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>

            {isCalendarVisible && (
                <div className='calendar-wrapper-new'>
                    <div className="calendar-container">
                        <div className="calendar-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div className='calender-header-button'>
                                <button
                                    type="button"
                                    className="calendar-button-arrow"
                                    onClick={() => {
                                        if (calendarType === 'AD') {
                                            if (adMonth === 1) {
                                                setADYear(adYear - 1);
                                                setADMonth(12);
                                            } else {
                                                setADMonth(adMonth - 1);
                                            }
                                        } else {
                                            if (bsMonth === 1) {
                                                setBSYear(bsYear - 1);
                                                setBSMonth(12);
                                            } else {
                                                setBSMonth(bsMonth - 1);
                                            }
                                        }
                                        setSelectedDay(null);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.707 14.707a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 1 1 1.414 1.414L10.414 10l2.293 2.293a1 1 0 0 1 0 1.414z" />
                                    </svg>
                                </button>
                                <select
                                    value={calendarType === 'AD' ? adMonth : bsMonth}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        calendarType === 'AD' ? setADMonth(value) : setBSMonth(value);
                                        setSelectedDay(null);
                                    }}
                                    className="calendar-select"
                                >
                                    {(calendarType === 'AD' ? adMonths : months).map((m, idx) => (
                                        <option key={idx} value={idx + 1}>{m}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='calender-header-button'>
                                <select
                                    value={calendarType === 'AD' ? adYear : bsYear}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value);
                                        calendarType === 'AD' ? setADYear(value) : setBSYear(value);
                                        setSelectedDay(null);
                                    }}
                                    className="calendar-select"
                                >
                                    {filteredYears.map((y) => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    className='calendar-button-arrow'
                                    onClick={() => {
                                        if (calendarType === 'AD') {
                                            if (adMonth === 12) {
                                                setADYear(adYear + 1);
                                                setADMonth(1);
                                            } else {
                                                setADMonth(adMonth + 1);
                                            }
                                        } else {
                                            if (bsMonth === 12) {
                                                setBSYear(bsYear + 1);
                                                setBSMonth(1);
                                            } else {
                                                setBSMonth(bsMonth + 1);
                                            }
                                        }
                                        setSelectedDay(null);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 0 1 0-1.414L9.586 11 7.293 8.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="calendar-grid">
                            {(calendarType === 'AD' ? adDays : days).map((d, i) => (
                                <div key={i} className="calendar-day-name">{d}</div>
                            ))}
                            {/* show calender days only */}
                            {/* {daysArray} */}
                            {(() => {
                                const isBS = calendarType === 'BS';

                                const year = isBS ? bsYear : adYear;
                                const month = isBS ? bsMonth : adMonth;
                                const getDays = isBS ? getDaysInMonth : getADDaysInMonth;
                                const startDay = isBS ? getBSStartDay(bsYear, bsMonth) : new Date(adYear, adMonth - 1, 1).getDay();
                                const totalDays = getDays(year, month);

                                let prevMonth = month - 1;
                                let prevYear = year;
                                if (prevMonth < 1) {
                                    prevMonth = 12;
                                    prevYear -= 1;
                                }
                                const prevMonthDays = getDays(prevYear, prevMonth);

                                let nextMonth = month + 1;
                                let nextYear = year;
                                if (nextMonth > 12) {
                                    nextMonth = 1;
                                    nextYear += 1;
                                }

                                const cells = [];

                                for (let i = startDay - 1; i >= 0; i--) {
                                    const day = prevMonthDays - i;
                                    cells.push(
                                        <div key={`prev-${day}`} className="calendar-day-cell disabled other-month">
                                            <p>{day}</p>
                                        </div>
                                    );
                                }

                                for (let day = 1; day <= totalDays; day++) {
                                    const isSelectable = isDaySelectable(day);
                                    const weekdayIndex = (startDay + day - 1) % 7;
                                    const isSaturday = weekdayIndex === 6;

                                    cells.push(
                                        <div
                                            key={`curr-${day}`}
                                            className={`calendar-day-cell ${selectedDay === day ? 'selected' : ''} ${!isSelectable ? 'disabled' : ''} ${isSaturday ? 'saturday' : ''}`}
                                            onClick={() => {
                                                if (isSelectable) {
                                                    setSelectedDay(day);
                                                    setCalendarVisible(false);
                                                }
                                            }}
                                        >
                                            <p>{day}</p>
                                        </div>
                                    );
                                }

                                const totalGrid = 42;
                                const remaining = totalGrid - cells.length;
                                for (let i = 1; i <= remaining; i++) {
                                    cells.push(
                                        <div key={`next-${i}`} className="calendar-day-cell disabled other-month">
                                            <p>{i}</p>
                                        </div>
                                    );
                                }

                                return cells;
                            })()}

                        </div>
                        {selectedDay !== null && (
                            <div className="calendar-selected-info">
                                Selected Date:{' '}
                                {calendarType === 'AD'
                                    ? `${adMonths[adMonth - 1]} ${selectedDay}, ${adYear}`
                                    : `${months[bsMonth - 1]} ${selectedDay}, ${bsYear}`}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default {
    NepaliCalendar,
    ADToBS,
    BSToAD,
};
