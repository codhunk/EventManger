import React, { useEffect, useRef, useState } from "react";
import "./AddEvent.css";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate("");

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [event, setEvent] = useState({
    name: "",
    start: getCurrentDateTime(),
    end: getCurrentDateTime(),
    location: "",
    ticket: "Free",
    approve: false,
    capacity: "Unlimited",
    visibility: "Public",
    title: "YOU ARE INVITED",
    font: "Segoe UI",
    color: "black",
    gradient: "linear-gradient(to bottom,rgb(253, 224, 56),rgb(250, 139, 13))",
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };

  // Handling input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    // Function to adjust textarea height based on content
    const adjustHeight = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    adjustHeight();
  }, [event?.title]);

  const thumbnailGradient = [
    {
      gradient:
        "linear-gradient(to bottom,rgb(214, 210, 196),rgb(223, 220, 218))",
      heading: "Minimal",
    },
    {
      gradient:
        "linear-gradient(to bottom,rgb(253, 224, 56),rgb(250, 139, 13))",
      heading: "Holiday",
    },
    {
      gradient: "linear-gradient(to bottom,rgb(41, 201, 250),rgb(45, 97, 209))",
      heading: "Abstract",
    },
    {
      gradient:
        "linear-gradient(to bottom,rgb(53, 225, 255),rgb(45, 209, 127))",
      heading: "Quantum",
    },
  ];

  const colorList = ["black", "gray", "blue", "green", "yellow", "violet"];

  const [cIdx, setCIdx] = useState(0);

  const fontList = [
    "Segoe UI",
    "Courier New",
    "Franklin Gothic Medium",
    "Gill Sans",
    "Lucida Sans",
    "Segoe UI",
    "Times New Roman",
    "Arial",
  ];

  const [fIdx, setFIdx] = useState(0);

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (
      event?.name !== "" &&
      event?.start !== "" &&
      event?.end !== "" &&
      event?.location !== "" &&
      event?.ticket !== "" &&
      event?.capacity !== "" &&
      event?.visibility !== "" &&
      event?.title !== "" &&
      event?.font !== "" &&
      event?.color !== "" &&
      event?.gradient !== ""
    ) {
      let data = localStorage.getItem("data");

      if (!data) {
        data = [event];
        localStorage.setItem("data", JSON.stringify(data));
      } else {
        data = JSON.parse(data);
        data.push(event);
        localStorage.setItem("data", JSON.stringify(data));
      }

      alert("Event created successfully.");
      navigate("/events");
    } else {
      alert("Please fill the data.");
    }
  };

  return (
    <>
      <div className="addEventBox">
        <div className="left">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Event Name"
            autoFocus
            value={event?.name}
            onChange={handleInputChange}
          />

          <div className="time">
            <div className="calBox">
              <span
                style={{
                  backgroundColor: "#ededed",
                }}
              >
                {formatDate(event?.start).split(" ")[1]}
              </span>

              <span>
                {formatDate(event?.start).split(" ")[2].split(",")[0]}
              </span>
            </div>

            <div className="timeBox">
              <div className="start">
                <span>Start</span>

                <div className="dateTimeCont">
                  <input
                    type="datetime-local"
                    name="start"
                    id="start"
                    onChange={handleInputChange}
                    value={event?.start}
                  />
                  <p>{formatDate(event?.start)}</p>
                </div>
              </div>

              <div className="end">
                <span>End</span>
                <div className="dateTimeCont">
                  <input
                    type="datetime-local"
                    name="end"
                    id="end"
                    onChange={handleInputChange}
                    value={event?.end}
                  />
                  <p>{formatDate(event?.end)}</p>
                </div>
              </div>

              <div className="gmt">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                  style={{
                    width: "1.3rem",
                    marginRight: "10px",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>

                {new Date().toString().match(/GMT[^)]+\)/)[0]}
              </div>

              <hr />

              <div className="gmt">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                  style={{
                    width: "1.3rem",
                    marginRight: "10px",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"
                  />
                </svg>
                {"Create Multi-Session Event"}
              </div>
            </div>
          </div>

          <div className="location">
            <div
              className="locBox"
              style={{
                padding: "10px 0",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                style={{
                  width: "25px",
                  color: "#6f6f70",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>

            <div className="locSecBox">
              <label htmlFor="location">Add Event Location</label>
              <input
                type="text"
                name="location"
                id="location"
                onChange={handleInputChange}
                value={event.location}
                placeholder="Offline location or virtual link"
              />
            </div>
          </div>
{/* event container */}
          <div className="events">
            <p>Event Options</p>
            <div className="eventBox">
              <div className="box">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    style={{
                      width: "1.3rem",
                      marginRight: "10px",
                      color: "#6f6f70",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                    />
                  </svg>
                  {"Tickets"}
                </div>
                <div className="edit">
                  <input
                    type="text"
                    name="ticket"
                    id="ticket"
                    onChange={handleInputChange}
                    value={event?.ticket}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    style={{
                      width: "1rem",
                      marginLeft: "5px",
                      color: "#6f6f70",
                      cursor: "pointer",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </div>
              </div>

              <hr />

              <div className="box">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    style={{
                      width: "1.3rem",
                      marginRight: "10px",
                      color: "#6f6f70",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  {"Require Approval"}
                </div>

                <div className="edit">
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="approve"
                      id="approve"
                      checked={event?.approve || false}
                      onChange={(e) => {
                        if (event) {
                          setEvent({
                            ...event,
                            approve: e.target.checked,
                          });
                        }
                      }}
                    />

                    <span className="slider round"></span>
                  </label>
                </div>
              </div>

              <hr />

              <div className="box">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    style={{
                      width: "1.3rem",
                      marginRight: "10px",
                      color: "#6f6f70",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                    />
                  </svg>
                  {"Capacity"}
                </div>
                <div className="edit">
                  <input
                    type="text"
                    name="capacity"
                    id="capacity"
                    onChange={handleInputChange}
                    value={event?.capacity}
                    style={{
                      width: "75px",
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    style={{
                      width: "1rem",
                      marginLeft: "5px",
                      color: "#6f6f70",
                      cursor: "pointer",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </div>
              </div>

              <hr />

              <div className="box">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    style={{
                      width: "1.3rem",
                      marginRight: "10px",
                      color: "#6f6f70",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                  {"Visibility"}
                </div>
                <div className="edit">
                  <input
                    type="text"
                    name="visibility"
                    id="visibility"
                    onChange={handleInputChange}
                    value={event?.visibility}
                    style={{
                      width: "50px",
                    }}
                    readOnly
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                      style={{
                        width: "0.9rem",
                        marginLeft: "10px",
                        color: "#6f6f70",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (event?.visibility === "Public") {
                          setEvent({
                            ...event,
                            visibility: "Private",
                          });
                        } else {
                          setEvent({
                            ...event,
                            visibility: "Public",
                          });
                        }
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                      style={{
                        width: "0.9rem",
                        marginLeft: "10px",
                        color: "#6f6f70",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (event?.visibility === "Public") {
                          setEvent({
                            ...event,
                            visibility: "Private",
                          });
                        } else {
                          setEvent({
                            ...event,
                            visibility: "Public",
                          });
                        }
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" onClick={handleEventSubmit}>
            Create Event
          </button>
        </div>

        <div className="right">
          <div
            className="thumbnail"
            style={{
              background: event?.gradient,
            }}
          >
            <textarea
              type="text"
              wrap="soft"
              name="title"
              id="title"
              value={event?.title}
              onChange={handleInputChange}
              rows="1"
              ref={textareaRef}
              style={{
                width: "80%",
                border: "none",
                resize: "none",
                overflow: "hidden",
                minHeight: "fit-content",
                maxHeight: "80%",
                color: event?.color,
                fontFamily: event?.font,
              }}
            />
          </div>

          <div className="theme">
            <p>Theme</p>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                margin: "5px 0",
              }}
            >
              {thumbnailGradient.map((d, i) => (
                <div
                  className="tBox"
                  key={i}
                  onClick={() => {
                    setEvent({
                      ...event,
                      gradient: d?.gradient,
                    });
                  }}
                >
                  <div
                    style={{
                      background: d?.gradient,
                      width: "80%",
                      borderRadius: "10px",
                      height: "60px",
                      padding: "10px",
                      border:
                        d?.gradient === event?.gradient
                          ? "2px solid #333537"
                          : "none",
                    }}
                  >
                    <span>Title</span>
                  </div>

                  <span
                    style={{
                      margin: "5px 0",
                      fontWeight: "600",
                      color:
                        d?.gradient === event?.gradient ? "#333537" : "#cac9c9",
                    }}
                  >
                    {d?.heading}
                  </span>
                </div>
              ))}
            </div>

            <div className="tBoxText">
              <div className="top">
                <div className="color">
                  <span
                    style={{
                      backgroundColor: event?.color,
                    }}
                  ></span>
                  {"Color"}
                </div>
                <div className="font">
                  <span
                    style={{
                      textTransform: "capitalize",
                      userSelect: "none",
                    }}
                  >
                    {event?.color}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                      style={{
                        width: "0.9rem",
                        marginLeft: "10px",
                        color: "#6f6f70",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        let idx = cIdx + 1;
                        if (idx === colorList.length) {
                          idx = 0;
                          setCIdx(idx);
                        } else {
                          setCIdx(idx);
                        }
                        setEvent({
                          ...event,
                          color: colorList[idx],
                        });
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                      style={{
                        width: "0.9rem",
                        marginLeft: "10px",
                        color: "#6f6f70",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        let idx = cIdx - 1;
                        if (idx === -1) {
                          idx = colorList.length - 1;
                          setCIdx(idx);
                        } else {
                          setCIdx(idx);
                        }
                        setEvent({
                          ...event,
                          color: colorList[idx],
                        });
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <hr />

              <div className="top">
                <div className="color">
                  <span
                    style={{
                      color: "black",
                      fontWeight: "600",
                    }}
                  >
                    Ag
                  </span>
                  {"Font"}
                </div>
                <div className="font">
                  <span
                    style={{
                      textTransform: "capitalize",
                      userSelect: "none",
                    }}
                  >
                    {event?.font}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                      style={{
                        width: "0.9rem",
                        marginLeft: "10px",
                        color: "#6f6f70",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        let idx = fIdx + 1;
                        if (idx === fontList.length) {
                          idx = 0;
                          setFIdx(idx);
                        } else {
                          setFIdx(idx);
                        }
                        setEvent({
                          ...event,
                          font: fontList[idx],
                        });
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                      style={{
                        width: "0.9rem",
                        marginLeft: "10px",
                        color: "#6f6f70",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        let idx = fIdx - 1;
                        if (idx === -1) {
                          idx = fontList.length - 1;
                          setFIdx(idx);
                        } else {
                          setFIdx(idx);
                        }
                        setEvent({
                          ...event,
                          font: fontList[idx],
                        });
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEvent;
