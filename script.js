const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");

// Backup quotes (used only if API fails)
const fallbackQuotes = [
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" }
];

async function fetchRandomQuote() {
  // remove animation
  quoteText.classList.remove("show");
  quoteAuthor.classList.remove("show");

  let quote;

  try {
    const response = await fetch("https://dummyjson.com/quotes/random", {
      cache: "no-cache"
    });

    if (!response.ok) throw new Error("API failed");

    const data = await response.json();

    quote = {
      text: data.quote,
      author: data.author
    };

  } catch (error) {
    // silently fallback
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    quote = fallbackQuotes[randomIndex];
  }

  // show quote with animation
  setTimeout(() => {
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = "— " + quote.author;

    quoteText.classList.add("show");
    quoteAuthor.classList.add("show");
  }, 200);
}

// Load quote on page load
fetchRandomQuote();

// New quote button
newQuoteBtn.addEventListener("click", fetchRandomQuote);
