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
import AppointmentsModal from "./AppointmentsModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AppointmentsCalender({ data }) {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [availableSlots, setAvailableSlots] = useState(null);
  const [availableAdminState, setAvailableAdminState] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const isModalOpen = () => {
    setModalOpen(true);
  };
  const isModalClosed = () => {
    setModalOpen(false);
  };

  let meetings = [];
  data.forEach((item, index) => {
    item.availability.forEach((item, index) => {
      meetings.push({ startDatetime: item.Date });
    });
  });
  // console.log(meetings);
  const availabilities = [];
  data?.forEach((item) => {
    availabilities.push(item.availability);
  });
  const slotDate = moment(selectedDay).format("dddd, Do MMMM YYYY");
  // console.log(slotDate);

  // const checkAvailableSlots = (admin) => {
  //   data.map((item) => {
  //     item.availability.filter((date) => date.Date === slotDate);
  //     console.log(item.availability.filter((date) => date.Date === slotDate));
  //   });
  //   console.log(availableSlots);
  // };

  const checkAvailableSlots = (admin) => {
    data.map((item) => {
      if (item.username === admin) {
        setCurrentAdmin(item);
        setAvailableSlots(
          item.availability.filter((date) => date.Date === slotDate)
        );
      }
    });
  };

  let availableAdmins = [];
  data.forEach((item) =>
    availableAdmins.push({
      username: item.username,
      slot: item.availability.filter((date) => date.Date === slotDate),
    })
  );

  const getAvailableAdmins = () => {
    if (availableAdmins.some((slot) => slot.slot.length)) {
      setAvailableAdminState(availableAdmins);
    } else {
      setAvailableAdminState(null);
    }
  };

  useEffect(() => {
    getAvailableAdmins();
  }, [selectedDay]);

  useEffect(() => {
    setAvailableSlots(null);
  }, [selectedDay]);
  // console.log(data);

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

  // let selectedDayMeetings = meetings.filter((meeting) =>
  //   isSameDay(parseISO(meeting.startDatetime), slotDate)
  // );
  return (
    <>
      <div className="pt-16">
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
                      onClick={() => {
                        setSelectedDay(day);
                      }}
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
                      {meetings.map((meeting, index) =>
                        meeting.startDatetime ===
                        moment(day).format("dddd, Do MMMM YYYY") ? (
                          <div
                            key={index}
                            className="w-1 h-1 rounded-full bg-sky-500"
                          ></div>
                        ) : null
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
                {availableAdminState?.map((admin, index) =>
                  admin.slot.length ? (
                    <div key={index}>
                      <button
                        onClick={() => checkAvailableSlots(admin?.username)}
                        className="w-[10vw] px-4 py-2 border m-1  group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
                      >
                        <div className="flex-auto">
                          <p className="mt-0.5">{admin.username}</p>
                        </div>
                      </button>
                    </div>
                  ) : null
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-64 w-max pt-10">
        <h1 className="items-center">Available slots</h1>
        {availableSlots?.map((slot, index) => (
          <button
            onClick={isModalOpen}
            key={index}
            className="w-content px-4 py-2 border m-1  group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
          >
            <p>{slot?.Date}</p>
            <p className="font-semibold text-gray-900">{slot?.Time}</p>
          </button>
        ))}
      </div>
      <AppointmentsModal
        isModalClosed={isModalClosed}
        modalOpen={modalOpen}
        availableSlots={availableSlots}
        currentAdmin={currentAdmin}
      />
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
