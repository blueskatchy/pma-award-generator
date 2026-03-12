import React, { useEffect, useState } from "react";
import TableLayout from "../components/TableLayout";

const Saber = () => {
  const [presidential, setPresidential] = useState([]);
  const [vicePresidential, setVicePresidential] = useState([]);
  const [secretaryND, setSecretaryND] = useState([]);
  const [armySaber, setArmySaber] = useState([]);
  const [navySaber, setNavySaber] = useState([]);
  const [airForceSaber, setAirForceSaber] = useState([]);
  const [athleticSaber, setAthleticSaber] = useState([]);
  const [aguinaldoSaber, setAguinaldoSaber] = useState([]);

  useEffect(() => {
    const fetchSaberAwards = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/saber-awards");
        const data = await res.json();
        console.log("Saber Awards API data:", data); 
        setPresidential(data.presidential ? [data.presidential] : []);
        setVicePresidential(data.vicePresidential ? [data.vicePresidential] : []);
        setSecretaryND(data.secretaryNationalDefense ? [data.secretaryNationalDefense] : []);
        setArmySaber(data.philippineArmySaber ? [data.philippineArmySaber] : []);
        setNavySaber(data.philippineNavySaber ? [data.philippineNavySaber] : []);
        setAirForceSaber(data.philippineAirForceSaber ? [data.philippineAirForceSaber] : []);
        setAthleticSaber(data.athleticSaber ? [data.athleticSaber] : []);
        setAguinaldoSaber(data.aguinaldoSaber ? [data.aguinaldoSaber] : []);
      } catch (err) {
        console.error("Failed to fetch saber awards:", err);
      }
    };
    fetchSaberAwards();
  }, []);

  const sections = [
    { title: "PRESIDENTIAL",                   data: presidential },
    { title: "VICE-PRESIDENTIAL",              data: vicePresidential },
    { title: "SECRETARY OF NATIONAL DEFENSE",  data: secretaryND },
    { title: "CHIEF OF STAFF",                 data: [] },
    { title: "SUPERINTENDENT'S SABER",         data: [] },
    { title: "PHILIPPINE ARMY SABER",          data: armySaber },
    { title: "PHILIPPINE NAVY SABER",          data: navySaber },
    { title: "PHILIPPINE AIR FORCE SABER",     data: airForceSaber },
    { title: "ATHLETIC SABER",                 data: athleticSaber },
    { title: "CHIEF JUSTICE SABER",            data: [] },
    { title: "AGUINALDO SABER",                data: aguinaldoSaber },
  ];

  return (
    <TableLayout 
      pageTitle="Saber Awards"
      pageName="saber"
      sections={sections}
      clickableNames={true}
    />
  );
};

export default Saber;