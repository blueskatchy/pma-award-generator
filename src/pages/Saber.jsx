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

  useEffect(() => {
    // Fetch main saber awards
    fetch("http://localhost:3001/api/saber-awards")
      .then(res => res.json())
      .then(data => {
        setPresidential(data.presidential ? [data.presidential] : []);
        setVicePresidential(data.vicePresidential ? [data.vicePresidential] : []);
        setSecretaryND(data.secretaryNationalDefense ? [data.secretaryNationalDefense] : []);
        setArmySaber(data.philippineArmySaber ? [data.philippineArmySaber] : []);
        setNavySaber(data.philippineNavySaber ? [data.philippineNavySaber] : []);
        setAirForceSaber(data.philippineAirForceSaber ? [data.philippineAirForceSaber] : []);
        setAthleticSaber(data.athleticSaber ? [data.athleticSaber] : []);
      })
      
  }, []);

  const sections = [
    { title: "PRESIDENTIAL",                   data: presidential },
    { title: "VICE-PRESIDENTIAL",              data: vicePresidential },
    { title: "SECREATARY OF NATIONAL DEFENSE", data: secretaryND },
    { title: "CHIEF OF STAFF",                 data: [] },
    { title: "SUPERINTENDENT'S SABER",         data: [] },
    { title: "PHILIPPINE ARMY SABER",          data: armySaber },
    { title: "PHILIPPINE NAVY SABER",          data: navySaber },
    { title: "PHILIPPINE AIR FORCE SABER",     data: airForceSaber },
    { title: "ATHLETIC SABER",                 data: athleticSaber },
    { title: "CHIEF JUSTICE SABER",            data: [] },
    { title: "AGUINALDO SABER",                data: [] },
  ];

  return (
    <TableLayout
      pageTitle="Saber Awards"
      pageName="saber"
      sections={sections}
    />
  );
};

export default Saber;