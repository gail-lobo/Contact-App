import { getTodayDate } from "../utils/dateUtils";
/**
 * Validates a specific field value and updates the error messages.
 * @param {string} field - The field name to validate.
 * @param {string} value - The field value to validate.
 * @param {object} currentErrors - The current errors object.
 * @returns {object} - Updated errors object after validation.
 */
export const validateField = (field, value, currentErrors) => {
  const errorMessages = { ...currentErrors };

  // Field-specific validation rules
  if (field === "firstName" && !value.trim()) {
    errorMessages.firstName = "First Name cannot be empty.";
  } else if (field === "lastName" && !value.trim()) {
    errorMessages.lastName = "Last Name cannot be empty.";
  } else if (field === "dob" && (value > getTodayDate() || !value)) {
    errorMessages.dob = "Enter a valid date of birth";
  } else if (field === "email" && !/\S+@\S+\.\S+/.test(value)) {
    errorMessages.email = "Invalid email format.";
  } else if (field === "phone" && value && !/^\d{10}$/.test(value)) {
    errorMessages.phone = "Phone must be 10 digits or empty.";
  } else if (field === "zipCode" && value && !/^\d{5}$/.test(value)) {
    errorMessages.zipCode = "Zip Code must be 5 digits or empty.";
  } else {
    delete errorMessages[field]; // Clear error if validation passes
  }

  return errorMessages;
};
