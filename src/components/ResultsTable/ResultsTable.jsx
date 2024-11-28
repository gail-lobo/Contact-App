// This component renders a data table displaying contact information.
// Features include sortable columns, pagination, and row navigation for editing a contact.
// Accessibility: Added ARIA labels for screen reader support.

import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import "./ResultsTable.css";

const ResultsTable = ({ results }) => {
  const navigate = useNavigate();

  // Navigate to the edit contact page when a checkbox is clicked
  const handleCheckboxClick = (contact) => {
    navigate(`/edit-contact/${contact.id}`, { state: { contact } });
  };

  // Define table columns with ARIA labels for accessibility
  const columns = [
    {
      name: "",
      selector: (row) => (
        <input
          type="checkbox"
          onClick={() => handleCheckboxClick(row)}
          aria-label="row checkbox"
        />
      ),
      width: "50px",
    },
    {
      name: "Name",
      selector: (row) => (
        <span aria-label={`Name: ${row.firstName} ${row.lastName}`}>
          {row.firstName} {row.lastName}
        </span>
      ),
      sortable: true,
    },
    {
      name: "DOB",
      selector: (row) => (
        <span aria-label={`Date of Birth: ${row.dob}`}>{row.dob}</span>
      ),
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => (
        <span aria-label={`Address: ${row.streetAddress}`}>
          {row.streetAddress}
        </span>
      ),
    },
    {
      name: "City",
      selector: (row) => (
        <span aria-label={`City: ${row.city}`}>{row.city}</span>
      ),
    },
    {
      name: "State",
      selector: (row) => (
        <span aria-label={`State: ${row.state}`}>{row.state}</span>
      ),
    },
    {
      name: "Zip",
      selector: (row) => (
        <span aria-label={`Zip Code: ${row.zipCode}`}>{row.zipCode}</span>
      ),
    },
    {
      name: "Email",
      selector: (row) => (
        <span aria-label={`Email: ${row.email}`}>{row.email}</span>
      ),
      width: "20%",
    },
    {
      name: "Phone",
      selector: (row) => (
        <span aria-label={`Phone: ${row.phone}`}>{row.phone}</span>
      ),
    },
  ];

  return (
    <div className="results-section">
      <DataTable
        columns={columns}
        data={results}
        pagination
        paginationRowsPerPageOptions={[5, 10, 15]}
        paginationPerPage={5}
        highlightOnHover
      />
    </div>
  );
};

export default ResultsTable;
