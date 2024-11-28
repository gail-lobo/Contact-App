// This component provides a search/filter form for contacts, allowing users to search based on multiple fields.
// Features include form validation, error handling, and clear/reset functionality.
// Accessibility: Includes ARIA labels and error messages for screen readers.

import "./FilterSection.css";
import states from "../../data/states";
import { useState } from "react";
import { getTodayDate } from "../../utils/dateUtils";

const FilterSection = ({ contacts, onSearchResults }) => {
  const [searchData, setSearchData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    state: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  // Handle state selection
  const handleStateChange = (event) => {
    setSearchData({
      ...searchData,
      state: event.target.value,
    });
  };

  // Handle validation on blur
  const handleBlur = (event) => {
    const { name, value } = event.target;

    if (name === "dob") {
      const today = getTodayDate();
      if (value > today) {
        setErrorMessage("Date of birth cannot be in the future.");
      } else {
        setErrorMessage("");
      }
    }
  };

  // Clear search data and reset filters
  const handleClear = () => {
    setSearchData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      dob: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      state: "",
    });
    setErrorMessage("");
    onSearchResults(contacts); // Reset table data
  };

  // Handle Search functionality
  const handleSearch = () => {
    const trimmedSearchData = Object.fromEntries(
      Object.entries(searchData).map(([key, value]) => [key, value.trim()])
    );

    if (!trimmedSearchData.lastName) {
      setErrorMessage(`Must include at least a "Last name" to search!!`);
      return;
    }

    setErrorMessage("");

    const filteredResults = contacts.filter((contact) => {
      return Object.keys(trimmedSearchData).every((key) => {
        if (!trimmedSearchData[key]) return true;
        const searchValue = trimmedSearchData[key].toLowerCase();

        if (key === "dob") {
          return contact[key] === searchValue;
        }

        return String(contact[key] ?? "")
          .toLowerCase()
          .includes(searchValue);
      });
    });

    onSearchResults(filteredResults.length > 0 ? filteredResults : []);
  };

  return (
    <div className="container">
      <h2 className="search-title">Search for a contact</h2>
      <div className="filter-section">
        <div className="left-filter-section">
          <div id="firstNameSection" className="searchFieldSection">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={searchData.firstName}
              onChange={handleInputChange}
              aria-label="First name"
            />
          </div>
          <div id="lastNameSection" className="searchFieldSection">
            <label htmlFor="lastName">
              <span className="required">*</span>Last name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={searchData.lastName}
              onChange={handleInputChange}
              aria-label="Last name"
            />
          </div>
          <div id="phoneSection" className="searchFieldSection">
            <label htmlFor="phone">Phone number</label>
            <input
              type="number"
              name="phone"
              id="phone"
              value={searchData.phone}
              onChange={handleInputChange}
              aria-label="Phone Number"
            />
          </div>
          <div id="emailSection" className="searchFieldSection">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={searchData.email}
              onChange={handleInputChange}
              aria-label="Email Address"
            />
          </div>
          <div id="dobSection" className="searchFieldSection">
            <label htmlFor="dob">Date of birth</label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={searchData.dob}
              onChange={handleInputChange}
              onBlur={handleBlur}
              max={getTodayDate()}
              aria-label="Date of birth"
            />
          </div>
        </div>
        <div className="right-filter-section">
          <div id="streetAddressSection" className="searchFieldSection">
            <label htmlFor="streetAddress">Street address</label>
            <input
              type="text"
              name="streetAddress"
              id="streetAddress"
              value={searchData.streetAddress}
              onChange={handleInputChange}
              aria-label="Street Address"
            />
          </div>
          <div id="citySection" className="searchFieldSection">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              value={searchData.city}
              onChange={handleInputChange}
              aria-label="City"
            />
          </div>
          <div id="stateSection" className="searchFieldSection">
            <label htmlFor="state">State</label>
            <select
              name="state"
              id="state"
              value={searchData.state}
              onChange={handleStateChange}
              aria-label="State"
            >
              <option value=""></option>
              {states.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.value}
                </option>
              ))}
            </select>
          </div>
          <div id="zipCodeSection" className="searchFieldSection">
            <label htmlFor="zipCode">Zip code</label>
            <input
              type="number"
              name="zipCode"
              id="zipCode"
              value={searchData.zipCode}
              onChange={handleInputChange}
              aria-label="Zip code"
            />
          </div>
        </div>
      </div>
      {errorMessage && (
        <p className="error-message" aria-live="polite">
          {errorMessage}
        </p>
      )}
      <div className="actionButtonsSection">
        <button
          className="searchButton"
          onClick={handleSearch}
          aria-label="Search contacts"
          title="Search contacts"
        >
          Search
        </button>
        <button
          className="clearButton"
          onClick={handleClear}
          aria-label="Clear search fields"
          title="Clear search fields"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
