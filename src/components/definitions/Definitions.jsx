import React from "react";
import "./definitions.css";

function Definitions({ word, meanings, language, lightMode }) {
  return (
    <div className="meanings">
      {meanings[0] && word && language === "en" && (
        <audio
          src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
          controls
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          Your Browser doesn't support audio
        </audio>
      )}
      {word === "" ? (
        <span className="subtitle">Start by typing a word in Search</span>
      ) : (
        meanings.map(m =>
          m.meanings.map(item =>
            item.definitions.map(def => (
              <div
                style={{
                  backgroundColor: lightMode ? "#f9f9f9" : "#111",
                  color: lightMode ? "#111" : "#fff",
                }}
                className="singleMeaning"
              >
                <b>{def.definition}</b>
                <hr style={{ backgroundColor: "#111", width: "100%" }} />
                {def.example && (
                  <span>
                    <b>Example :</b>
                    {def.example}
                  </span>
                )}
                {def.synonyms.length > 0 && (
                  <span>
                    <b>Synonyms :</b>
                    {def.synonyms.map(syn => (
                      <span>{syn},</span>
                    ))}
                  </span>
                )}
              </div>
            ))
          )
        )
      )}
    </div>
  );
}

export default Definitions;
