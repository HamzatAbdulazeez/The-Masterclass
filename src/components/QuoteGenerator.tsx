import React, { useState, useEffect } from "react";

interface QuoteItem {
  quote: string;
  author: string;
}

const QuoteGenerator: React.FC = () => {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [bgStyle, setBgStyle] = useState<string>("");

  const colors: [string, string][] = [
    ["#0c7dee", "#db9d9d"],
    ["#e6e677", "#773a51"],
    ["#3e1010", "#3c08fa"],
    ["#bf54bd", "#12a8d1"],
    ["#0f5003", "#f8d800"],
  ];

  const getRandomColorCombo = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const fetchNewQuote = async () => {
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) throw new Error("Failed to fetch");

      const data: QuoteItem = await response.json();

      setQuote(`"${data.quote}"`);
      setAuthor(data.author);

      const [color1, color2] = getRandomColorCombo();
      setBgStyle(`linear-gradient(45deg, ${color1}, ${color2})`);
    } catch (error) {
      console.error("Error:", error);
      setQuote("Couldn't load quote... 😔");
      setAuthor("");
    }
  };

  useEffect(() => {
    fetchNewQuote();
  }, []); 

  return (
    <section id="quote-section">
      <div className="container">
        <h2>Random Quote Generator</h2>

        <div id="random-quote-generator" style={{ background: bgStyle }}>
          <div id="random-quote-text">{quote}</div>
          <div id="random-quote-author">{author}</div>

          <button id="new-quote-btn" onClick={fetchNewQuote}>
            NEW QUOTE
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuoteGenerator;
