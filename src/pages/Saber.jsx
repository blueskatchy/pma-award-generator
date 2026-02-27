import React, { useEffect, useState } from "react";
import TableLayout from "../components/TableLayout";

const Saber = () => {
  const [presidential, setPresidential] = useState([]);
  const [vicePresidential, setVicePresidential] = useState([]);
  const [secretaryND, setSecretaryND] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/saber-awards")
      .then(res => res.json())
      .then(data => {
        console.log("Saber data:", JSON.stringify(data));
        setPresidential(data.presidential ? [data.presidential] : []);
        setVicePresidential(data.vicePresidential ? [data.vicePresidential] : []);
        setSecretaryND(data.secretaryNationalDefense ? [data.secretaryNationalDefense] : []);
      })
      .catch(err => console.error("Error fetching saber awards:", err));
  }, []);

  const sections = [
    { title: "PRESIDENTIAL",                    data: presidential },
    { title: "VICE-PRESIDENTIAL",               data: vicePresidential },
    { title: "SECREATARY OF NATIONAL DEFENSE",  data: secretaryND },
    { title: "CHIEF OF STAFF", data: [], searchable: true, placeholder: "Search Chief of Staff student..."},
    { title: "SUPERINTENDENT'S SABER", data: [], searchable: true, placeholder: "Search Superintendent's Saber student..."},
    { title: "PHILIPPINE ARMY SABER",           data: [] },
    { title: "PHILIPPINE NAVY SABER",           data: [] },
    { title: "PHILIPPINE AIR FORCE SABER",      data: [] },
    { title: "ATHLETIC SABER",                  data: [] },
    { title: "CHIEF JUSTICE SABER",             data: [] },
    { title: "AGUINALDO SABER",                 data: [] },
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