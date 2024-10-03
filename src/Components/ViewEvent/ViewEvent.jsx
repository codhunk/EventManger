import React, { useEffect, useState } from "react";
import "./ViewEvent.css";

const ViewEvent = () => {
  const [tab, setTab] = useState("Upcoming");

  const [eventDetails, setEventDetails] = useState();
  const [eventFilterDetails, setEventFilterDetails] = useState();

  const handleFilter = (data) => {
    if (eventDetails && data) {
      if (data === "Upcoming") {
        let filterData = eventDetails?.filter(
          (e) => new Date(e?.start) >= new Date()
        );
        setEventFilterDetails(filterData);
      } else {
        let filterData = eventDetails?.filter(
          (e) => new Date(e?.start) < new Date()
        );
        setEventFilterDetails(filterData);
      }
    }
  };

  useEffect(() => {
    let data = localStorage.getItem("data");
    if (data) {
      setEventDetails(JSON.parse(data));
      setEventFilterDetails(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (eventDetails) {
      handleFilter("Upcoming");
    }
  }, [eventDetails]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  };

  const peopleList = [
    "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg?fit=640%2C427",
    "https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg",
    "https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg",
    "https://www.opticalexpress.co.uk/media/1064/man-with-glasses-smiling-looking-into-distance.jpg",
    "https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944",
  ];

  return (
    <>
      <div className="viewEventBox">
        <div className="details">
          <h1>Events</h1>
          <div className="btn">
            <button
              onClick={() => {
                setTab("Upcoming");
                handleFilter("Upcoming");
              }}
              style={{
                backgroundColor: tab === "Upcoming" ? "#fff" : "#e3e9ec",
                color: tab === "Upcoming" ? "#000" : "#9ea6aa",
              }}
            >
              Upcoming
            </button>
            <button
              onClick={() => {
                setTab("Past");
                handleFilter("Past");
              }}
              style={{
                backgroundColor: tab === "Past" ? "#fff" : "#e3e9ec",
                color: tab === "Past" ? "#000" : "#9ea6aa",
              }}
            >
              Past
            </button>
          </div>
        </div>
        {eventFilterDetails?.map((e, i) => (
          <div className="eventDetails">
            <div className="dateData">
              <p>
                {formatDate(e?.start)?.split(" ")[1] +
                  " " +
                  formatDate(e?.start)?.split(" ")[2].replace(",", "")}
              </p>
              <span>{formatDate(e?.start)?.split(" ")[0]}</span>
            </div>
            <div className="bar">
              <span></span>
              <div className="line"></div>
            </div>
            <div className="eventDataBox">
              <div className="eventLeft">
                <span>
                  {formatDate(e?.start)?.split(" ")[3] +
                    " " +
                    formatDate(e?.start)?.split(" ")[4]}
                </span>
                <h2
                  style={{
                    color: "#000",
                  }}
                >
                  {e?.name}
                </h2>
                <div
                  style={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    textAlign: "center",
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
                      backgroundColor: "#3d87f4",
                      color: "#fff",
                      borderRadius: "50%",
                      padding: "5px",
                      width: "15px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
                  {"By OctoML"}
                </div>

                <div
                  style={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    textAlign: "center",
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
                      width: "1.5rem",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                  {e?.location}
                </div>

                <div
                  style={{
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    textAlign: "center",
                  }}
                >
                  <button>Invited</button>
                  <div className="people">
                    {peopleList?.map((p, i) => (
                      <img
                        src={p}
                        alt=""
                        key={i}
                        style={{
                          left: `${i * 20}px`,
                        }}
                        draggable="false"
                      />
                    ))}
                    <span>+136</span>
                  </div>
                </div>
              </div>

              <div
                className="eventRight"
                style={{
                  background: e?.gradient,
                }}
              >
                <span
                  style={{
                    fontFamily: e?.font,
                    color: e?.color,
                  }}
                >
                  {e?.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewEvent;
