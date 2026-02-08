import React from 'react';
import { useParams } from 'react-router-dom';
import './MyTable.css';

const MyTable = () => {
  const { tableNo } = useParams();
  console.log(useParams());

  if (!tableNo) {
    return (
      <div className="my-table">
        <h1>Table Not Found</h1>
        <p>Please go back and select a table to reserve.</p>
      </div>
    );
  }

  return (
    <div className="my-table">
      <h1>Reservation Confirmed</h1>
      <div className="table-card">
        <div className="table-icon">🪑</div>
        <h2>Table {tableNo} Reserved Successfully</h2>
        <div className="confirmation-message">
          <p>Thank you for your reservation!</p>
          <p>Your table is now ready. Please arrive within the next 15 minutes.</p>
          <p>Enjoy your dining experience.</p>
        </div>
        <div className="table-details">
          <span className="detail-label">Table Number:</span>
          <span className="detail-value">{tableNo}</span>
        </div>
      </div>
    </div>
  );
};

export default MyTable;



// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./MyTable.css";

// const MyTable = () => {
//   const { tableNo } = useParams();   // ✅ must match route
//   const navigate = useNavigate();

//   if (!tableNo) {
//     return (
//       <div className="my-table">
//         <h1>Table Not Found</h1>
//         <button onClick={() => navigate("/")}>Go Back</button>
//       </div>
//     );
//   }

//   return (
//     <div className="my-table">
//       <h1>🎉 Reservation Confirmed</h1>

//       <div className="table-card">
//         <div className="table-icon">🪑</div>

//         <h2>Table {tableNo} Reserved Successfully</h2>

//         <p>Your table is ready. Enjoy your meal!</p>

//         <button onClick={() => navigate("/menu")}>
//           View Menu
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MyTable;
