import React, { useState, useEffect } from 'react';
import { createRecord, updateRecord } from '../api';

const StudentForm = ({ refresh, students, courses, editingRecord, setEditingRecord }) => {
  const [formData, setFormData] = useState({
    student_id: '',
    course_id: '',
    year_level: ''
  });

  useEffect(() => {
    if (editingRecord) {
      setFormData({
        student_id: editingRecord.student?.id || '',
        course_id: editingRecord.course?.id || '',
        year_level: editingRecord.year_level || ''
      });
    } else {
      setFormData({ student_id: '', course_id: '', year_level: '' });
    }
  }, [editingRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRecord) {
        await updateRecord(editingRecord.id, formData);
        alert("Record updated successfully!");
        setEditingRecord(null); 
      } else {
        await createRecord(formData);
        alert("Enrolled successfully!");
      }
      refresh();
      setFormData({ student_id: '', course_id: '', year_level: '' });
    } catch (err) {
      console.error("Submission Error:", err.response?.data);
      alert("Action failed. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <div className="form-group">
        <label>Select Student</label>
        <select 
          value={formData.student_id}
          onChange={(e) => setFormData({...formData, student_id: e.target.value})} 
          required
        >
          <option value="">-- Choose Student --</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.last_name}, {s.first_name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Select Course</label>
        <select 
          value={formData.course_id}
          onChange={(e) => setFormData({...formData, course_id: e.target.value})} 
          required
        >
          <option value="">-- Choose Course --</option>
          {courses.map(c => (
            <option key={c.id} value={c.id}>{c.course_name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Year Level</label>
        <input 
          type="number" 
          value={formData.year_level}
          onChange={(e) => setFormData({...formData, year_level: e.target.value})} 
          required 
        />
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" className="btn-submit">
          {editingRecord ? "Update Record" : "Add Record"}
        </button>
        
        {editingRecord && (
          <button 
            type="button" 
            className="btn-cancel"
            onClick={() => setEditingRecord(null)}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;