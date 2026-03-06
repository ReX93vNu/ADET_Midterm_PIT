import React, { useState, useEffect } from 'react';
import { createStudent, updateStudent } from '../api';

const StudentForm = ({ refresh, editingStudent, setEditingStudent }) => {
  const [formData, setFormData] = useState({
    student_number: '', first_name: '', last_name: '', course: '', year_level: ''
  });

  useEffect(() => {
    if (editingStudent) setFormData(editingStudent);
  }, [editingStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, formData);
        setEditingStudent(null);
      } else {
        await createStudent(formData);
      }
      setFormData({ student_number: '', first_name: '', last_name: '', course: '', year_level: '' });
      refresh();
      alert("Success!");
    } catch (error) {
      alert("Error saving student. Check if Student Number is unique.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <input type="text" placeholder="Student Number" value={formData.student_number} 
        onChange={(e) => setFormData({...formData, student_number: e.target.value})} required />
      <input type="text" placeholder="First Name" value={formData.first_name} 
        onChange={(e) => setFormData({...formData, first_name: e.target.value})} required />
      <input type="text" placeholder="Last Name" value={formData.last_name} 
        onChange={(e) => setFormData({...formData, last_name: e.target.value})} required />
      <select value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} required>
        <option value="">Select Course</option>
        <option value="BSIT">BSIT</option>
        <option value="BSCS">BSCS</option>
        <option value="BSCPE">BSCPE</option>
      </select>
      <input type="number" placeholder="Year Level" value={formData.year_level} 
        onChange={(e) => setFormData({...formData, year_level: e.target.value})} required />
      <button type="submit" className="btn-submit">{editingStudent ? 'Update' : 'Add'} Student</button>
      {editingStudent && <button onClick={() => setEditingStudent(null)}>Cancel</button>}
    </form>
  );
};

export default StudentForm;