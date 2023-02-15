"use client";
import moment from "moment";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  isBefore,
  startOfToday,
} from "date-fns";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import TimePicker from "./TimePicker";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AvailabilityAdmin({ adminList, jwtDecoded }) {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [availableSlots, setAvailableSlots] = useState(null);
  const [customInput, setCustomInput] = useState(null);
  const [loading, setLoading] = useState(false);

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  //Data
  let x = {
    slotInterval: 30,
    openTime: "10:00",
    closeTime: "17:00",
  };

  //Format the time
  let startTime = moment(x.openTime, "HH:mm");

  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
  }
  //Format the end time and the next day to it
  let endTime = moment(x.closeTime, "HH:mm");

  //Times
  let allSlots = [];

  //Loop over the times - only pushes time with 30 minutes interval
  while (startTime < endTime) {
    //Push times
    allSlots.push(startTime.format("HH:mm"));
    //Add interval of 30 minutes
    startTime.add(x.slotInterval, "minutes");
  }

  // const slotDate = moment(selectedDay).format("dddd, Do MMMM YYYY");

  const dateToDate = (time) => {
    return moment(time).format("Do MMMM YYYY");
  };
  const dateToTime = (time) => {
    return moment(time).format("HH:mm");
  };

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  useEffect(() => {
    setLoading(true);
    getAvailableSlots();
  }, []);

  // let updatedSlots;

  const getAvailableSlots = () => {
    axios
      .get("/api/availability")
      .then((response) => {
        let slots = response.data[0].availability;
        setAvailableSlots(slots);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Slots not available" + error.message);
      });
  };

  let updatedAvailableSlots = availableSlots;
  updatedAvailableSlots?.forEach((slot) => {
    if (isBefore(parseISO(slot), today)) {
      axios
        .patch("/api/availability", slot)
        .then((response) => {
          console.log("slot deleted successfully" + response);
          setAvailableSlots(updatedAvailableSlots);
        })
        .catch((error) => {
          console.log("slot didn't delete" + error.message);
        });
    }
  });

  const setAvailability = (time) => {
    let dateTime = moment(selectedDay).add(moment.duration(time));
    console.log(dateTime._d);
    axios
      .post("/api/availability", dateTime._d)
      .then((response) => {
        getAvailableSlots();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleDelete = (slot) => {
    axios
      .patch("/api/availability", slot)
      .then((response) => {
        // console.log(response);
        getAvailableSlots();
      })
      .catch((error) => {
        console.log("slot didn't delete'" + error.message);
      });
  };

  // Merging all slots into array and formatting for comaprison
  let mergedSlots = allSlots.flat(1);

  let updatedMergedSlots = [];
  mergedSlots.forEach((slot) => {
    let m = moment(slot).format("DD MM");
    updatedMergedSlots.push(m);
  });

  //Handling custom availibility
  const handleCustomSlotsInput = (time) => {
    setCustomInput(time);
  };
  const handleCustomSlotsSubmit = () => {
    setAvailability(customInput);
  };
  return (
    <>
      <div className="pt-16 ml-64">
        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
          <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div className="sm:pr-10">
              <div className="flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900">
                  {format(firstDayCurrentMonth, "MMMM yyyy")}
                </h2>
                <button
                  type="button"
                  onClick={previousMonth}
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Previous month</span>
                  <div className="w-7 h-7" aria-hidden="true">
                    <AiOutlineLeft />
                  </div>
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <div className="w-7 h-7" aria-hidden="true">
                    <AiOutlineRight />
                  </div>
                </button>
              </div>
              <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              <div className="grid grid-cols-7 mt-2 text-sm">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      "py-1.5"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDay(day);
                      }}
                      className={classNames(
                        updatedMergedSlots.includes(
                          moment(day).format("DD MM")
                        ) &&
                          !isToday(day) &&
                          "text-green",
                        isEqual(day, selectedDay) && "text-white",

                        isBefore(day, today) &&
                          "text-gray-300 hover:bg-white cursor-default",
                        isEqual(day, selectedDay) &&
                          isBefore(day, today) &&
                          !isToday(day) &&
                          "bg-gray-50",
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "text-sky-500",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-900",
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          updatedMergedSlots.includes(
                            moment(day).format("DD")
                          ) &&
                          "text-gray-50",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-400",
                        isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "bg-sky-500",
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          "bg-gray-900",
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          updatedMergedSlots.includes(
                            moment(day).format("DD")
                          ) &&
                          "bg-green",
                        !isEqual(day, selectedDay) && "hover:bg-gray-200",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          "font-semibold",
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <section className="mt-12 md:mt-0 md:pl-12">
              <h2 className="font-semibold text-gray-900">
                Schedule for{" "}
                <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                  {format(selectedDay, "MMM dd, yyy")}
                </time>
              </h2>
              <div className="flex items-center flex-wrap mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {allSlots.map((slotTime, index) => (
                  <div key={index}>
                    <button
                      onClick={() => setAvailability(slotTime)}
                      className="w-[10vw] px-4 py-2 border m-1  group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
                    >
                      <div className="flex-auto">
                        <p className="mt-0.5">{formatTime(slotTime)}</p>
                      </div>
                    </button>
                  </div>
                ))}
                {/* <div>
                  <TimePicker
                    className="my-4 "
                    customInput={customInput}
                    handleCustomSlotsInput={handleCustomSlotsInput}
                  />
                </div>
                <button
                  onClick={handleCustomSlotsSubmit}
                  className="w-[10vw] px-4 py-2 border m-1   group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
                >
                  Submit
                </button> */}
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="flex ml-64  h-80 flex-col  pt-10 ">
        <div className="mx-4">
          <p className="text-center mb-5  font-semibold text-gray-900">
            Available slots
          </p>
          {!loading ? (
            <div className="flex flex-wrap ">
              {availableSlots?.map((slot, index) => (
                <button
                  onClick={() => handleDelete(slot)}
                  key={index}
                  className=" min-w-[96px] w-[10vw] px-2 py-1 border m-1  group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
                >
                  <p className=" text-gray-900">{dateToDate(slot)}</p>
                  <p className="font-semibold text-gray-900">
                    {formatTime(dateToTime(slot))}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex justify-center align-center" role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-blue"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

let colStartClasses = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
