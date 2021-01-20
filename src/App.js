import "./App.css";
import { useState } from "react";
import Field from "./components/Field";

const visa = /^4\d{3}\d{4}\d{4}\d{4}$/;
const amex = /^3[4,7]\d{2}\d{6}\d{5}$/;

const isSerial = (serial) => visa.test(serial) || amex.test(serial);
const isCCV2 = (serial, ccv) =>
  (visa.test(serial) && ccv.length === 3) ||
  (amex.test(serial) && ccv.length === 4);

const tabForward = (e) => e.shiftKey === false && e.key === "Tab";
const notMeta = (e) =>
  [e.altKey, e.ctrlKey, e.metaKey, e.shiftKey].every((k) => k === false);

function App() {
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");

  const [serial, setSerial] = useState("");
  const [serialErr, setSerialErr] = useState("");

  const [ccv, setCCV] = useState("");
  const [ccvErr, setCCVErr] = useState("");

  const [month, setMonth] = useState("");
  const [monthErr, setMonthErr] = useState("");

  const [year, setYear] = useState("");
  const [yearErr, setYearErr] = useState("");

  return (
    <div className="App">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();

          const form = [
            [name, nameErr, setNameErr],
            [serial, serialErr, setSerialErr],
            [ccv, ccvErr, setCCVErr],
            [month, monthErr, setMonthErr],
            [year, yearErr, setYearErr],
          ];

          for (const [val, err, setErr] of form) {
            if (val === "" || err !== "") return setErr("Please enter a value");
          }

          alert(form.map(([first, ...rest]) => first).join("\n"));
        }}
      >
        <h4>Enter your credit card information</h4>

        <Field
          value={name}
          error={nameErr}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            console.log(e);
            if (e.key === "Tab" && e.target.value.length < 1)
              setNameErr("Please enter a valid name");
            else if (notMeta(e)) setNameErr("");
          }}
        />

        <Field
          valaue={serial}
          error={serialErr}
          placeholder="Card Number"
          onChange={(e) => setSerial(e.target.value)}
          onKeyDown={(e) => {
            if (tabForward(e) && !isSerial(e.target.value))
              setSerialErr("Please enter a valid credit card number");
            else if (notMeta(e)) setSerialErr("");
          }}
        />

        <Field
          value={ccv}
          error={ccvErr}
          placeholder="CVV2"
          onChange={(e) => setCCV(e.target.value)}
          onKeyDown={(e) => {
            if (tabForward(e) && !isCCV2(serial, ccv))
              setCCVErr("Please enter a valid CCV2 number");
            else if (notMeta(e)) setCCVErr("");
          }}
        />

        <Field
          value={month}
          error={monthErr}
          placeholder="Exp. Month"
          onChange={(e) => setMonth(e.target.value)}
          onKeyDown={(e) => {
            if (tabForward(e) && !/^\d{2}$/.test(month))
              setMonthErr("Please enter a valid month");
            else setMonthErr("");
          }}
        />

        <Field
          value={year}
          error={yearErr}
          placeholder="Exp. Year"
          onChange={(e) => setYear(e.target.value)}
          onKeyDown={(e) => {
            if (tabForward(e) && !/^\d{4}$/.test(year))
              setYearErr("Please enter a valid year");
            else setYearErr("");
          }}
        />
        <input type="submit" className="submit" />
      </form>
    </div>
  );
}

export default App;
