"use client";
import { Menu, Transition } from "@headlessui/react";
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
  startOfToday,
} from "date-fns";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../Sidebar/SideBar";
import LoginPage from "../Login/LoginPage";

const meetings = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-12-06T13:00",
    endDatetime: "2022-12-06T14:30",
  },
  {
    id: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-05-20T09:00",
    endDatetime: "2022-05-20T11:30",
  },
  {
    id: 3,
    name: "Dries Vincent",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-05-20T17:00",
    endDatetime: "2022-05-20T18:30",
  },
  {
    id: 4,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-06-09T13:00",
    endDatetime: "2022-06-09T14:30",
  },
  {
    id: 5,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2022-05-13T14:00",
    endDatetime: "2022-05-13T14:30",
  },
];

//Data
let x = {
  slotInterval: 30,
  openTime: "10:00",
  closeTime: "17:00",
};

//Format the time
let startTime = moment(x.openTime, "HH:mm");

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AvailabilityAdmin({ adminList, jwtDecoded }) {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [availableSlots, setAvailableSlots] = useState(null);

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let currentAdminAvailability;

  if (jwtDecoded) {
    const adminName = jwtDecoded.username;

    const currentAdmin = adminList.find(
      ({ username }) => username === adminName
    );
    currentAdminAvailability = currentAdmin.availability;
  }

  const slotDate = moment(selectedDay).format("dddd, Do MMMM YYYY");

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

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  );

  useEffect(() => {
    getAvailableSlots();
  }, []);

  const getAvailableSlots = () => {
    axios
      .get("/api/availability")
      .then((response) => {
        setAvailableSlots(response.data[0].availability);
      })
      .catch((error) => {
        console.log("Slots not available" + error.message);
      });
  };

  console.log(availableSlots);

  const setAvailability = (Time, Date) => {
    axios
      .post("/api/availability", { Time, Date })
      .then((response) => {
        getAvailableSlots();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleDelete = (slot) => {
    axios
      .delete("/api/availability", slot)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("slot didn't delete'" + error.message);
      });
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
                  <div className="w-5 h-5" aria-hidden="true">
                    left
                  </div>
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <div className="w-5 h-5" aria-hidden="true">
                    right
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
                      onClick={() => setSelectedDay(day)}
                      className={classNames(
                        isEqual(day, selectedDay) && "text-white",
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "text-red-500",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-900",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-400",
                        isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "bg-red-500",
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          "bg-gray-900",
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

                    <div className="w-1 h-1 mx-auto mt-1">
                      {meetings.some((meeting) =>
                        isSameDay(parseISO(meeting.startDatetime), day)
                      ) && (
                        <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                      )}
                    </div>
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
                      onClick={() => setAvailability(slotTime, slotDate)}
                      className="w-[10vw] px-4 py-2 border m-1  group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
                    >
                      <div className="flex-auto">
                        <p className="mt-0.5">{slotTime}</p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-64 w-max pt-10">
        <h1>slots</h1>
        {availableSlots?.map((slot, index) => (
          <button
            onClick={() => handleDelete(slot)}
            key={index}
            className="w-content px-4 py-2 border m-1  group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
          >
            <p>{slot?.Date}</p>
            <p className="font-semibold text-gray-900">{slot?.Time}</p>
          </button>
        ))}
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
