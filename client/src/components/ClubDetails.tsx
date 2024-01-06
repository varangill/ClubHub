import React from 'react';
import { useParams } from 'react-router-dom';

export default function ClubDetails() {
  // Use useParams to get the clubId from URL parameters
  const { clubId } = useParams();

  // You can use the clubId to fetch the club details or display them as needed
  // Example:
  // const clubDetails = fetchClubDetails(clubId);

  return (
    <div>
      <h2>Club Details Page</h2>
      <p>Club ID: {clubId}</p>
      {/* Display other club details here */}
    </div>
  );
}
