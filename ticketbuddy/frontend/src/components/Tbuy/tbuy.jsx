import React, { useState, useEffect } from "react";
import axios from "axios";
import Headert from "../headert";
import Banner from "./banner";
import Footer from "../footer";
import View1 from "./view1";
import View2 from "./view2";
import { bidlist } from "../../data";

function Tbuy() {
  useEffect(() => {
    // Dynamically import the CSS file when the component is mounted
    const removeStyles = import("./tbuystyles.css");

    // Cleanup function to remove styles when component is unmounted
    return () => {
      removeStyles.then((module) => module.default);
    };
  }, []);
  const [tickets, setTickets] = useState([]);
  const selectedEventId = localStorage.getItem("selectedEventId");
  useEffect(() => {
    // Fetch tickets based on e_id from backend
    axios
      .get(`http://localhost:5000/api/tickets?e_id=${selectedEventId}`)
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, []);

  // Check if all tickets have f_owner not null

  const allTicketsHaveFOwner = tickets.every(
    (ticket) => ticket.f_owner !== null
  );
  var allf;
  allf = allTicketsHaveFOwner;
  return (
    <div>
      <Headert />
      <Banner />

      {!allTicketsHaveFOwner && <View1 />}
      {allTicketsHaveFOwner && <View2 />}
      {/*<Footer year={new Date().getFullYear()} />*/}
    </div>
  );
}

export default Tbuy;
