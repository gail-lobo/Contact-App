// This file allows users to edit an existing contact's details.
// Features include form validation, error handling, a confirmation modal, and toast notifications.
// Accessibility: Includes ARIA labels and accessible error messages.

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ConfirmationModal from "../../components/ConfirmationModal.jsx";
import { getTodayDate } from "../../utils/dateUtils";
import { validateField } from "../../utils/validationUtils";

import states from "../../data/states";
import "./EditContact.css";

const EditContact = ({ updateContact }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const contact = location.state?.contact;

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: contact?.firstName || "",
    lastName: contact?.lastName || "",
    dob: contact?.dob || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    streetAddress: contact?.streetAddress || "",
    city: contact?.city || "",
    state: contact?.state || "",
    zipCode: contact?.zipCode || "",
  });

  const [open, setOpen] = useState(false);

  // Save the updated contact and navigate to the home page
  const handleSave = () => {
    updateContact({ ...formData });
    toast.success("Contact successfully saved!", {
      position: "bottom-right",
      autoClose: 1000,
    });
    setOpen(false);
    setTimeout(() => navigate("/"), 2000);
  };

  // Cancel editing and navigate back to the home page
  const handleCancel = () => {
    navigate("/");
  };

  // Validate the form before submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setOpen(true); // Open the confirmation modal
    }
  };

  // Validate a specific field on blur
  const handleBlur = (field, value) => {
    const updatedErrors = validateField(field, value, errors);
    setErrors(updatedErrors);
  };

  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate the entire form
  const validateForm = () => {
    const requiredFields = ["firstName", "lastName", "dob", "email"];
    requiredFields.forEach((field) => handleBlur(field, formData[field]));
    return Object.keys(errors).length === 0;
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.dob &&
    /\S+@\S+\.\S+/.test(formData.email);

  return (
    <div>
      <Header />
      {contact ? (
        <div className="editContactContainer">
          <h2>Edit Contact</h2>
          <div className="formContainer">
            <form onSubmit={handleSubmit} className="innerform">
              <div>
                <label htmlFor="firstName">
                  <span className="required">*</span>First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={(e) => handleBlur("firstName", e.target.value)}
                  aria-label="First Name"
                />
                {errors.firstName && (
                  <p className="error-message">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName">
                  <span className="required">*</span>Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={(e) => handleBlur("lastName", e.target.value)}
                  aria-label="Last Name"
                />
                {errors.lastName && (
                  <p className="error-message">{errors.lastName}</p>
                )}
              </div>
              <div>
                <label htmlFor="dob">
                  <span className="required">*</span>Date of Birth:
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  onBlur={(e) => handleBlur("dob", e.target.value)}
                  max={getTodayDate()}
                  aria-label="Date of Birth"
                />
                {errors.dob && <p className="error-message">{errors.dob}</p>}
              </div>
              <div>
                <label htmlFor="email">
                  <span className="required">*</span>Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={(e) => handleBlur("email", e.target.value)}
                  aria-label="Email"
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={(e) => handleBlur("phone", e.target.value)}
                  aria-label="Phone"
                />
                {errors.phone && (
                  <p className="error-message">{errors.phone}</p>
                )}
              </div>
              <div className="streetaddress">
                <label htmlFor="streetAddress">Street Address:</label>
                <input
                  type="text"
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  aria-label="Street Address"
                />
              </div>
              <div className="city">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  aria-label="City"
                />
              </div>
              <div>
                <label htmlFor="state">State:</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
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
              <div>
                <label htmlFor="zipCode">Zip Code:</label>
                <input
                  type="number"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  onBlur={(e) => handleBlur("zipCode", e.target.value)}
                  aria-label="Zip Code"
                />
                {errors.zipCode && (
                  <p className="error-message">{errors.zipCode}</p>
                )}
              </div>
              <div className="buttonGroup">
                <button
                  type="submit"
                  id="saveButton"
                  disabled={!isFormValid}
                  aria-disabled={!isFormValid}
                  title={
                    !isFormValid
                      ? "Please complete all required fields to enable save"
                      : "Save contact details"
                  }
                >
                  Save
                </button>
                <button
                  type="button"
                  id="cancelButton"
                  onClick={handleCancel}
                  title="Go back without saving changes"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="noContactContainer">
          <p>No contact selected.</p>
        </div>
      )}
      <Footer />

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleSave}
        title="Confirm Save"
        message="Are you sure you want to save the changes?"
        confirmText="Save"
        cancelText="Cancel"
      />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default EditContact;
