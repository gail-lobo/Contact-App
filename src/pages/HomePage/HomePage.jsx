// This file renders the Home Page of the application.
// Features include a header, a footer, a filter section for searching contacts, and a results table displaying the filtered contacts.
// Accessibility: Uses ARIA attributes like aria-live for dynamic content updates.

import React, { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import FilterSection from "../../components/FilterSection/FilterSection.jsx";
import ResultsTable from "../../components/ResultsTable/ResultsTable.jsx";
import "./HomePage.css";

const HomePage = ({ contacts }) => {
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const handleSearchResults = (results) => {
    setFilteredContacts(results);
  };

  return (
    <div className="mainContainer">
      <Header />

      <main>
        <FilterSection
          contacts={contacts}
          onSearchResults={handleSearchResults}
        />

        {/* Conditionally render the results table or a no-results message */}
        {filteredContacts.length > 0 ? (
          <ResultsTable results={filteredContacts} />
        ) : (
          <p className="no-results" aria-live="polite">
            No records found!
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
