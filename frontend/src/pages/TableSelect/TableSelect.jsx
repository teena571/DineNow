// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import './TableSelect.css';

// const TableSelect = () => {
//   const [tables, setTables] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedTable, setSelectedTable] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     guests: 1,
//     phone: '',
//     notes: ''
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const fetchTables = async () => {
//     const response = await fetch('http://10.48.105.158:5000/api/tables');
//     const data = await response.json();
//     if (data.success) {
//       setTables(data.tables);
//     }
//   };

//   const handleTableClick = (table) => {
//     if (table.status === 'available') {
//       setSelectedTable(table);
//       setShowModal(true);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     let hasError = false;
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//       hasError = true;
//     }

//     if (!formData.guests) {
//       newErrors.guests = 'Guests is required';
//       hasError = true;
//     }

//     if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = 'Phone must be exactly 10 digits';
//       hasError = true;
//     }

//     if (hasError) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const response = await fetch(`http://10.48.105.158:5000/api/tables/reserve/${selectedTable.tableNo}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setShowModal(false);
//         navigate(`/my-table/${selectedTable.tableNo}`);
//       } else {
//         toast.error(data.message || 'Error reserving table');
//       }
//     } catch (error) {
//       toast.error('Network error');
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedTable(null);
//     setFormData({ name: '', guests: 1, phone: '', notes: '' });
//     setErrors({});
//   };

//   useEffect(() => {
//     fetchTables();
//   }, []);

//   return (
//     <div className="table-select">
//       <h1>Select Your Table</h1>
//       <div className="tables-grid">
//         {Array.isArray(tables) && tables.map((table, index) => (
//           <div
//             key={table._id || table.id || `table-${table.tableNo || index}`}
//             className={`table-card ${table.status === 'available' ? 'available' : 'occupied'}`}
//             onClick={() => handleTableClick(table)}
//           >
//             <div className="table-icon">🪑</div>
//             <div className="table-number">Table {table.tableNo || 'N/A'}</div>
//             <div className="table-status">{table.status || 'unknown'}</div>
//           </div>
//         ))}
//       </div>

//       {showModal && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h2>Reserve Table {selectedTable?.tableNo}</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="name">Name *</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="guests">Number of Guests *</label>
//                 <select
//                   id="guests"
//                   name="guests"
//                   value={formData.guests}
//                   onChange={handleInputChange}
//                   required
//                 >
//                   {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
//                     <option key={num} value={num}>{num}</option>
//                   ))}
//                 </select>
//                 {errors.guests && <p className="text-red-500 text-sm">{errors.guests}</p>}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="phone">Phone</label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                 />
//                 {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="notes">Special Instructions</label>
//                 <textarea
//                   id="notes"
//                   name="notes"
//                   value={formData.notes}
//                   onChange={handleInputChange}
//                   rows="3"
//                 />
//               </div>
//               <div className="modal-buttons">
//                 <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
//                 <button type="submit" className="confirm-btn">Confirm Reservation</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TableSelect;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './TableSelect.css';

const TableSelect = () => {
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    guests: 1,
    phone: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  // ================= FETCH TABLES =================
  const fetchTables = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/tables`);
      const data = await response.json();

      if (data.success) {
        setTables(data.tables);
      } else {
        toast.error("Failed to fetch tables");
      }
    } catch {
      toast.error("Network error fetching tables");
    }
  };


  // ================= CLICK TABLE =================
  const handleTableClick = (table) => {
    if (table.status !== 'available') return;

    setSelectedTable(table);
    setShowModal(true);
  };


  // ================= INPUT =================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = '10 digit phone required';

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(
        `${API_URL}/tables/reserve/${selectedTable.tableNo}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Reservation successful");
        setShowModal(false);

        // ✅ guaranteed number now
        localStorage.setItem("tableNo", selectedTable.tableNo);

        // Refetch tables to update status in UI
        fetchTables();

        navigate(`/home?table=${selectedTable.tableNo}`);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Network error");
    }
  };


  const closeModal = () => {
    setShowModal(false);
    setSelectedTable(null);
    setErrors({});
    setFormData({ name: '', guests: 1, phone: '', notes: '' });
  };


  useEffect(() => {
    fetchTables();
  }, []);


  // ================= UI =================
  return (
    <div className="table-select">
      <h1>Select Your Table</h1>

      <div className="tables-grid">
        {tables.map((table) => (
          <div
            key={table.tableNo}
            className={`table-card ${table.status}`}
            onClick={() => handleTableClick(table)}
          >
            <div className="table-icon">🪑</div>
            <div className="table-number">Table {table.tableNo}</div>
            <div className="table-status">{table.status}</div>
          </div>
        ))}
      </div>


      {/* ========== MODAL ========== */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Reserve Table {selectedTable?.tableNo}</h2>

            <form onSubmit={handleSubmit}>

              <input
                name="name"
                placeholder="Name"
                onChange={handleInputChange}
              />
              {errors.name && <p>{errors.name}</p>}

              <input
                name="phone"
                placeholder="Phone"
                onChange={handleInputChange}
              />
              {errors.phone && <p>{errors.phone}</p>}

              <button type="submit">Confirm</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableSelect;
