import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import { fetchStudents, searchStudents } from './api';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const loadData = async () => {
    try {
      const response = await fetchStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };


  const handleSearch = async (keyword) => {
    if (!keyword || keyword.trim() === "") {
      loadData();
      return;
    }

    try {
      const response = await searchStudents(keyword);
      setStudents(response.data); 
    } catch (error) {
      console.error("Search failed. Check if the URL is correct in api.js", error);
      alert("Search failed. Make sure the backend search endpoint is active.");
    }
  };

  const handleFilter = async (course) => {
    if (course === "") {
      loadData();
    } else {
      try {
        const response = await fetchStudents();
        const filtered = response.data.filter(student => student.course === course);
        setStudents(filtered);
      } catch (error) {
        console.error("Filtering failed:", error);
      }
    }
  };


  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-container">
        <section className="card">
          <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
          <StudentForm 
            refresh={loadData} 
            editingStudent={editingStudent} 
            setEditingStudent={setEditingStudent} 
          />
        </section>
        <section className="card">
          <div className="table-header">
            <h2>Student List</h2>
            <div className="controls">
              <input 
                type="text" 
                placeholder="Search by name..." 
                className="search-bar" 
                id="search-input"
              />
              <button className="btn-search" onClick={() => {
                const val = document.getElementById('search-input').value;
                handleSearch(val);
              }}>Search</button>
              
              <button className="btn-clear" onClick={() => {
                document.getElementById('search-input').value = '';
                loadData();
              }}>Clear</button>

              <select className="filter-dropdown" onChange={(e) => handleFilter(e.target.value)}>
                <option value="">All Courses</option>
                <option value="BSIT">BSIT</option>
                <option value="BSCS">BSCS</option>
                <option value="BSCPE">BSCPE</option>
              </select>
            </div>
          </div>
          <StudentTable 
            students={students} 
            refresh={loadData} 
            setEditingStudent={setEditingStudent} 
          />
        </section>
      </main>
      <footer>
        <p>&copy; Student Management System | Amaro, Dibdib, Sturdevant</p>
      </footer>
    </div>
  );
}

export default App;