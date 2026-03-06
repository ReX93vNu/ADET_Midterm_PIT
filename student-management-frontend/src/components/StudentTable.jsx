import React from 'react';
import { deleteStudent } from '../api';

const StudentTable = ({ students, refresh, setEditingStudent }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await deleteStudent(id);
      refresh();
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.student_number}</td>
              <td>{student.last_name}, {student.first_name}</td>
              <td>{student.course}</td>
              <td>{student.year_level}</td>
              <td className="actions">
                <button className="btn-edit" onClick={() => setEditingStudent(student)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;