"use client";
// Importing specific UUID functions
import { v4 as uuidv4 } from "uuid";

import React, { ChangeEvent, useEffect, useState } from "react";
import ReusableInput from "./ReusableInput";
import { useAvailabilityCtx } from "../_hooks/AvailabilityCtx";
import ToggleButton from "./ToggleButton";
import Add from "../_icons/Add";
import Delete from "../_icons/Delete";
import Time from "./Time";
import { IAvailability } from "../_types/IAvailability";

export default function CreateAvailabilityForm({
  data,
}: {
  data?: IAvailability;
}) {
  const {
    name,
    setName,
    sunday,
    setSunday,
    tuesday,
    setTuesday,
    monday,
    setMonday,
    wednesday,
    thursday,
    setThursday,
    friday,
    setFriday,
    saturday,
    setSaturday,
    setWednesday,
    reset,
    id,
    setId,
  } = useAvailabilityCtx();

  const [activeTime, setActiveTime] = useState<{
    id: null | number;
    key: string;
    day: string;
  }>({
    id: null,
    key: "",
    day: "",
  });

  useEffect(() => {
    if (data) {
      const formatAvailabilityData = function (data) {
        const formattedData = { ...data };
        for (const day in formattedData) {
          if (formattedData[day].time) {
            formattedData[day].time = formattedData[day].time.map((entry) => {
              return {
                id: entry._id,
                from: entry.from,
                to: entry.to,
              };
            });
          }
        }

        delete formattedData._id;

        return formattedData;
      };

      const newData = formatAvailabilityData(data);
     
      if (newData.name !== name) setName(newData.name);
      if (newData.sunday !== sunday) setSunday(newData.sunday);
      if (newData.monday !== monday) setMonday(newData.monday);
      if (newData.thursday !== thursday) setThursday(newData.thursday);
      if (newData.tuesday !== tuesday) setTuesday(newData.tuesday);
      if (newData.wednesday !== wednesday) setWednesday(newData.wednesday);
      if (newData.saturday !== saturday) setSaturday(newData.saturday);
      if (newData.slug !== id) setId(newData.slug);
    } else {
      reset();
    }
  }, [data]);

  const handleAdd = (prev) => {
    return {
      ...prev,
      time: [
        ...prev.time,
        {
          from: "8:00am",
          to: "5:00am",
          id: uuidv4(),
        },
      ],
    };
  };
  const handleRemove = function (prev, id) {
    return {
      ...prev,
      time: prev.time.filter((t) => t.id !== id),
    };
  };
  const handleSelect = (prev, id, value, key) => {
    const updatedTime = prev.time.map((t) =>
      t.id === id ? { ...t, [key]: value } : t
    );

    return { ...prev, time: updatedTime };
  };

  const handleSetActive = function (id, key, day) {
    setActiveTime((prev) => ({
      id: prev.id === id && prev.key === key ? null : id,
      key,
      day,
    }));
  };
  return (
    <div>
      <div className="pb-4 mb-6 border-b-primary-400 border-b-2 ">
        <div className="max-w-[220px] px-4 ">
          {" "}
          <ReusableInput
            label=""
            name="name"
            placeholder="Enter the title"
            inputType="input"
            value={name}
            onChange={(
              e: ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
              >
            ) => setName(e.target.value)} // Ensuring the right event type
          />
        </div>
      </div>
      <div className="px-6 flex md:gap-4 gap-6 flex-col py-12">
        <div className="flex   flex-col md:flex-row">
          <div className=" min-w-[160px] flex items-center gap-4 h-[38px]">
            <ToggleButton
              hidden={false}
              isActive={sunday.isActive}
              onEnable={() =>
                setSunday((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
            />
            <span>Sunday</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {sunday.isActive &&
              sunday.time.map((t, index) => (
                <div className="flex gap-2 items-center" key={t.id}>
                  {" "}
                  <button
                    className="py-2 px-2 w-[120px] relative h-[38px] text-sm  grid place-items-start border border-grey-250 rounded"
                    onClick={() => handleSetActive(t.id, "from", "sunday")}
                  >
                    {t.from}
                    {activeTime.id === t.id &&
                      activeTime.day === "sunday" &&
                      activeTime.key === "from" && (
                        <Time
                          onSelect={(value: string) =>
                            setSunday((prev) =>
                              handleSelect(prev, t.id, value, "from")
                            )
                          }
                        />
                      )}
                  </button>
                  <span>-</span>
                  <button
                    className="py-2 px-2 relative w-[120px] h-[38px] text-sm  grid place-items-start border border-grey-250 rounded"
                    onClick={() => handleSetActive(t.id, "to", "sunday")}
                  >
                    {t.to}
                    {activeTime.id === t.id &&
                      activeTime.day === "sunday" &&
                      activeTime.key === "to" && (
                        <Time
                          onSelect={(value: string) =>
                            setSunday((prev) =>
                              handleSelect(prev, t.id, value, "to")
                            )
                          }
                        />
                      )}
                  </button>
                  {index === 0 ? (
                    <button
                      onClick={() => {
                        setSunday((prev) => handleAdd(prev));
                      }}
                    >
                      {" "}
                      <Add />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSunday((prev) => handleRemove(prev, t.id));
                      }}
                    >
                      {" "}
                      <Delete />
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="flex   flex-col md:flex-row">
          <div className=" min-w-[160px] flex items-center gap-4 h-[38px]">
            <ToggleButton
              hidden={false}
              isActive={monday.isActive}
              onEnable={() =>
                setMonday((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
            />
            <span>Monday</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {monday.isActive &&
              monday.time.map((t, index) => (
                <div className="flex gap-2 items-center" key={t.id}>
                  {" "}
                  <button
                    className="py-2 px-2 w-[120px] relative h-[38px] text-sm  grid place-items-start border border-grey-250 rounded"
                    onClick={() => handleSetActive(t.id, "from", "monday")}
                  >
                    {t.from}
                    {activeTime.id === t.id &&
                      activeTime.day === "monday" &&
                      activeTime.key === "from" && (
                        <Time
                          onSelect={(value: string) =>
                            setMonday((prev) =>
                              handleSelect(prev, t.id, value, "from")
                            )
                          }
                        />
                      )}
                  </button>
                  <span>-</span>
                  <button
                    className="py-2 px-2 relative w-[120px] h-[38px] text-sm  grid place-items-start border border-grey-250 rounded"
                    onClick={() => handleSetActive(t.id, "to", "monday")}
                  >
                    {t.to}
                    {activeTime.id === t.id &&
                      activeTime.day === "monday" &&
                      activeTime.key === "to" && (
                        <Time
                          onSelect={(value: string) =>
                            setMonday((prev) =>
                              handleSelect(prev, t.id, value, "to")
                            )
                          }
                        />
                      )}
                  </button>
                  {index === 0 ? (
                    <button
                      onClick={() => {
                        setMonday((prev) => handleAdd(prev));
                      }}
                    >
                      {" "}
                      <Add />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setMonday((prev) => handleRemove(prev, t.id));
                      }}
                    >
                      {" "}
                      <Delete />
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="flex   flex-col md:flex-row">
          <div className=" min-w-[160px] flex items-center gap-4 h-[38px]">
            <ToggleButton
              hidden={false}
              isActive={tuesday.isActive}
              onEnable={() =>
                setTuesday((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
            />
            <span>Tuesday</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {tuesday.isActive &&
              tuesday.time.map((t, index) => (
                <div className="flex gap-2 items-center" key={t.id}>
                  {" "}
                  <button
                    className="py-2 px-2 w-[120px] relative h-[38px] text-sm  grid place-items-start border border-grey-250 rounded"
                    onClick={() => handleSetActive(t.id, "from", "tuesday")}
                  >
                    {t.from}
                    {activeTime.id === t.id &&
                      activeTime.day === "tuesday" &&
                      activeTime.key === "from" && (
                        <Time
                          onSelect={(value: string) =>
                            setTuesday((prev) =>
                              handleSelect(prev, t.id, value, "from")
                            )
                          }
                        />
                      )}
                  </button>
                  <span>-</span>
                  <button
                    className="py-2 px-2 relative w-[120px] h-[38px] text-sm  grid place-items-start border border-grey-250 rounded"
                    onClick={() => handleSetActive(t.id, "to", "tuesday")}
                  >
                    {t.to}
                    {activeTime.id === t.id &&
                      activeTime.day === "tuesday" &&
                      activeTime.key === "to" && (
                        <Time
                          onSelect={(value: string) =>
                            setTuesday((prev) =>
                              handleSelect(prev, t.id, value, "to")
                            )
                          }
                        />
                      )}
                  </button>
                  {index === 0 ? (
                    <button
                      onClick={() => {
                        setTuesday((prev) => handleAdd(prev));
                      }}
                    >
                      {" "}
                      <Add />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setTuesday((prev) => handleRemove(prev, t.id));
                      }}
                    >
                      {" "}
                      <Delete />
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="flex   flex-col md:flex-row">
          <div className=" min-w-[160px] flex items-center gap-4 h-[38px]">
            <ToggleButton
              hidden={false}
              isActive={wednesday.isActive}
              onEnable={() =>
                setWednesday((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
            />
            <span>Wednesday</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {wednesday.isActive &&
              wednesday.time.map((t, index) => (
                <div className="flex gap-2 items-center" key={t.id}>
                  {" "}
                  <button
                    className="py-2 px-2 w-[120px] relative h-[38px] text-sm  grid place-items-start border border-grey-250 rounded"
                    onClick={() => handleSetActive(t.id, "from", "wednesday")}
                  >
                    {t.from}
                    {activeTime.id === t.id &&
                      activeTime.day === "wednesday" &&
                      activeTime.key === "from" && (
                        <Time
                          onSelect={(value: string) =>
                            setWednesday((prev) =>
                              handleSelect(prev, t.id, value, "from")
                            )
                          }
                        />
                      )}
                  </button>
                  <span>-</span>
                  <button
                    className="py-2 px-2 relative w-[120px] h-[38px] text-sm  grid place-items-start border border-grey-250 rounded"
                    onClick={() => handleSetActive(t.id, "to", "wednesday")}
                  >
                    {t.to}
                    {activeTime.id === t.id &&
                      activeTime.day === "wednesday" &&
                      activeTime.key === "to" && (
                        <Time
                          onSelect={(value: string) =>
                            setWednesday((prev) =>
                              handleSelect(prev, t.id, value, "to")
                            )
                          }
                        />
                      )}
                  </button>
                  {index === 0 ? (
                    <button
                      onClick={() => {
                        setWednesday((prev) => handleAdd(prev));
                      }}
                    >
                      {" "}
                      <Add />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setWednesday((prev) => handleRemove(prev, t.id));
                      }}
                    >
                      {" "}
                      <Delete />
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="flex   flex-col md:flex-row">
          <div className=" min-w-[160px] flex items-center gap-4 h-[38px]">
            <ToggleButton
              hidden={false}
              isActive={thursday.isActive}
              onEnable={() =>
                setThursday((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
            />
            <span>Thursday</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {thursday.isActive &&
              thursday.time.map((t, index) => (
                <div className="flex gap-2 items-center" key={t.id}>
                  {" "}
                  <button
                    className="py-2 px-2 w-[120px] relative h-[38px] text-sm  grid place-items-start border border-grey-250 rounded"
                    onClick={() => handleSetActive(t.id, "from", "thursday")}
                  >
                    {t.from}
                    {activeTime.id === t.id &&
                      activeTime.day === "thursday" &&
                      activeTime.key === "from" && (
                        <Time
                          onSelect={(value: string) =>
                            setThursday((prev) =>
                              handleSelect(prev, t.id, value, "from")
                            )
                          }
                        />
                      )}
                  </button>
                  <span>-</span>
                  <button
                    className="py-2 px-2 relative w-[120px] h-[38px] text-sm  grid place-items-start border border-grey-250 rounded"
                    onClick={() => handleSetActive(t.id, "to", "thursday")}
                  >
                    {t.to}
                    {activeTime.id === t.id &&
                      activeTime.day === "thursday" &&
                      activeTime.key === "to" && (
                        <Time
                          onSelect={(value: string) =>
                            setThursday((prev) =>
                              handleSelect(prev, t.id, value, "to")
                            )
                          }
                        />
                      )}
                  </button>
                  {index === 0 ? (
                    <button
                      onClick={() => {
                        setThursday((prev) => handleAdd(prev));
                      }}
                    >
                      {" "}
                      <Add />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setThursday((prev) => handleRemove(prev, t.id));
                      }}
                    >
                      {" "}
                      <Delete />
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="flex   flex-col md:flex-row">
          <div className=" min-w-[160px] flex items-center gap-4 h-[38px]">
            <ToggleButton
              hidden={false}
              isActive={friday.isActive}
              onEnable={() =>
                setFriday((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
            />
            <span>Friday</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {friday.isActive &&
              friday.time.map((t, index) => (
                <div className="flex gap-2 items-center" key={t.id}>
                  {" "}
                  <button
                    className="py-2 px-2 w-[120px] relative h-[38px] text-sm  grid place-items-start border border-grey-250 rounded"
                    onClick={() => handleSetActive(t.id, "from", "friday")}
                  >
                    {t.from}
                    {activeTime.id === t.id &&
                      activeTime.day === "friday" &&
                      activeTime.key === "from" && (
                        <Time
                          onSelect={(value: string) =>
                            setFriday((prev) =>
                              handleSelect(prev, t.id, value, "from")
                            )
                          }
                        />
                      )}
                  </button>
                  <span>-</span>
                  <button
                    className="py-2 px-2 relative w-[120px] h-[38px] text-sm  grid place-items-start border border-grey-250 rounded"
                    onClick={() => handleSetActive(t.id, "to", "friday")}
                  >
                    {t.to}
                    {activeTime.id === t.id &&
                      activeTime.day === "friday" &&
                      activeTime.key === "to" && (
                        <Time
                          onSelect={(value: string) =>
                            setFriday((prev) =>
                              handleSelect(prev, t.id, value, "to")
                            )
                          }
                        />
                      )}
                  </button>
                  {index === 0 ? (
                    <button
                      onClick={() => {
                        setFriday((prev) => handleAdd(prev));
                      }}
                    >
                      {" "}
                      <Add />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setFriday((prev) => handleRemove(prev, t.id));
                      }}
                    >
                      {" "}
                      <Delete />
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="flex   flex-col md:flex-row">
          <div className=" min-w-[160px] flex items-center gap-4 h-[38px]">
            <ToggleButton
              hidden={false}
              isActive={saturday.isActive}
              onEnable={() =>
                setSaturday((prev) => ({ ...prev, isActive: !prev.isActive }))
              }
            />
            <span>Saturday</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {saturday.isActive &&
              saturday.time.map((t, index) => (
                <div className="flex gap-2 items-center" key={t.id}>
                  {" "}
                  <button
                    className="py-2 px-2 w-[120px] relative h-[38px] text-sm  grid place-items-start border border-grey-250 rounded"
                    onClick={() => handleSetActive(t.id, "from", "saturday")}
                  >
                    {t.from}
                    {activeTime.id === t.id &&
                      activeTime.day === "saturday" &&
                      activeTime.key === "from" && (
                        <Time
                          onSelect={(value: string) =>
                            setSaturday((prev) =>
                              handleSelect(prev, t.id, value, "from")
                            )
                          }
                        />
                      )}
                  </button>
                  <span>-</span>
                  <button
                    className="py-2 px-2 relative w-[120px] h-[38px] text-sm  grid place-items-start border border-grey-250 rounded"
                    onClick={() => handleSetActive(t.id, "to", "saturday")}
                  >
                    {t.to}
                    {activeTime.id === t.id &&
                      activeTime.day === "saturday" &&
                      activeTime.key === "to" && (
                        <Time
                          onSelect={(value: string) =>
                            setSaturday((prev) =>
                              handleSelect(prev, t.id, value, "to")
                            )
                          }
                        />
                      )}
                  </button>
                  {index === 0 ? (
                    <button
                      onClick={() => {
                        setSaturday((prev) => handleAdd(prev));
                      }}
                    >
                      {" "}
                      <Add />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSaturday((prev) => handleRemove(prev, t.id));
                      }}
                    >
                      {" "}
                      <Delete />
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
