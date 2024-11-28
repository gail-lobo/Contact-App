// This file serves as the entry point for the application, setting up routing and managing state for contacts.
// Routes defined:
// 1. "/" for the Home page displaying contact list.
// 2. "/edit-contact/:id" for editing a specific contact.
// State: Manages contact list state and updates contacts through a callback.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/HomePage/HomePage.jsx";
import EditContact from "./pages/EditContact/EditContact.jsx";
import contactsData from "./data/contacts.json";
import "./App.css";

const App = () => {
  const [contacts, setContacts] = useState(contactsData);

  const updateContact = (updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  return (
    <Router>
      {/* ARIA role added to indicate that the Router contains navigational elements */}
      <div role="navigation">
        <Routes>
          <Route path="/" element={<Home contacts={contacts} />} />
          <Route
            path="/edit-contact/:id"
            element={<EditContact updateContact={updateContact} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
