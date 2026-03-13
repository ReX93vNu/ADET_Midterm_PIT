import React from 'react';
import { deleteRecord } from '../api';

const StudentTable = ({ records, refresh, setEditingRecord }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Delete this record?")) {
      try {
        await deleteRecord(id);
        refresh();
      } catch (err) {
        console.error("Delete failed:", err);
        alert("Could not delete record.");
      }
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>College</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                No records found.
              </td>
            </tr>
          ) : (
            records.map((r) => (
              <tr key={r.id}>
                <td>{r.student?.last_name}, {r.student?.first_name}</td>
                <td>{r.course?.course_name}</td>
                <td>{r.course?.college}</td>
                <td>{r.year_level}</td>
                <td>
                  <div className="actions">
                    <button 
                      className="btn-edit" 
                      onClick={() => setEditingRecord(r)}
                    >
                      Edit
                    </button>

                    <button 
                      className="btn-delete" 
                      onClick={() => handleDelete(r.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;