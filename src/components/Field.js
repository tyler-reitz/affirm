import "./Field.css";
import React from "react";

function Field({ error, ...rest }) {
  return (
    <div className="field">
      <input className="input" {...rest} />
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default Field;
