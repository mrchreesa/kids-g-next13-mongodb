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
  const [slotIndex, setSlotIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  // Modal
  const isModalOpen = (i) => {
    setModalOpen(true);
    setSlotIndex(i);
  };
  const isModalClosed = () => {
    setModalOpen(false);
  };

  // Data sctructuring
  let allSlotsFromAdmin = [];
  data.forEach((item, index) => {
    allSlotsFromAdmin.push({
      username: item.username,
      slots: item.availability,
    });
  });
  // console.log(allSlotsFromAdmin);
  let slotsForSelectedDay = [];

  allSlotsFromAdmin.forEach((item, index) => {
    item.slots.forEach((slot, i) => {
      if (
        moment(slot).get("date") === moment(selectedDay).get("date") &&
        moment(slot).get("month") === moment(selectedDay).get("month")
      ) {
        slotsForSelectedDay.push({
          username: item.username,
          slot: slot,
        });
      }
    });
  });
  //Sorting slots in ascending order
  slotsForSelectedDay.sort(function (a, b) {
    var c = new Date(a.slot);
    var d = new Date(b.slot);
    return c - d;
  });

  //Removing duplicate slots
  const slotsWithoutDuplicates = [];

  let uniqueSlots = slotsForSelectedDay.filter((item) => {
    const isDuplicate = slotsWithoutDuplicates.includes(item.slot);
    if (!isDuplicate) {
      slotsWithoutDuplicates.push(item.slot);

      return true;
    }

    return false;
  });
  console.log(uniqueSlots);
  const slotDate = moment(selectedDay).format("dddd, Do MMMM YYYY");

  // const checkAvailableSlots = (admin) => {
  //   data.map((item) => {
  //     if (item.username === admin) {
  //       setCurrentAdmin(item);
  //       setAvailableSlots(
  //         item.availability.filter((date) => date.Date === slotDate)
  //       );
  //     }
  //   });
  // };

  // let availableAdmins = [];
  // data.forEach((item) =>
  //   availableAdmins.push({
  //     username: item.username,
  //     slot: item.availability.filter((date) => date.Date === slotDate),
  //   })
  // );

  // useEffect(() => {
  // }, [selectedDay]);

  useEffect(() => {
    setAvailableSlots(null);
  }, [selectedDay]);
  // console.log(data);

  //Calendar funtionality
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

  //Separation of the Date and Time for UI
  const dateToDate = (time) => {
    return moment(time).format("Do MMMM YYYY");
  };
  const dateToTime = (time) => {
    return moment(time).format("HH:mm");
  };

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
                      {allSlotsFromAdmin.map((slot, index) =>
                        slot.startDatetime ===
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
              <h1 className="items-center">Available slots</h1>

              <div className="flex items-center flex-wrap mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {uniqueSlots?.map((item, index) => (
                  <button
                    onClick={() => isModalOpen(index)}
                    key={index}
                    className="w-content px-4 py-2 border m-1  group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
                  >
                    {/* <p className=" text-gray-900">{dateToDate(item.slot)}</p> */}
                    <p className="font-semibold text-gray-900">
                      {dateToTime(item.slot)}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-64 w-max pt-10"></div>
      <AppointmentsModal
        isModalClosed={isModalClosed}
        modalOpen={modalOpen}
        uniqueSlots={uniqueSlots}
        slotIndex={slotIndex}
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
