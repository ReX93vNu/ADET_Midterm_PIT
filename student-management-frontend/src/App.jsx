import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import { fetchRecords, fetchStudents, fetchCourses } from './api';

function App() {
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  
  const [editingRecord, setEditingRecord] = useState(null);

  const loadAllData = async () => {
    try {
      const [resRec, resStud, resCourse] = await Promise.all([
        fetchRecords(),
        fetchStudents(),
        fetchCourses()
      ]);
      setRecords(resRec.data);
      setStudents(resStud.data);
      setCourses(resCourse.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const filteredRecords = records.filter(record => {
    const firstName = record.student?.first_name || "";
    const lastName = record.student?.last_name || "";
    const fullName = `${firstName} ${lastName}`.toLowerCase();
    
    const matchesName = fullName.includes(searchQuery.toLowerCase());
    
    const matchesCourse = filterCourse === "" || record.course?.id.toString() === filterCourse;
    
    return matchesName && matchesCourse;
  });

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-container">
        
        <section className="card">
          <h2>{editingRecord ? "Edit Record" : "Enroll Student"}</h2>
          <StudentForm 
            refresh={loadAllData} 
            students={students} 
            courses={courses} 
            editingRecord={editingRecord}
            setEditingRecord={setEditingRecord}
          />
        </section>

        <section className="card">
          <h2>Student Records</h2>

          <div className="controls-bar" style={{ display: 'flex', gap: '15px', marginBottom: '20px', width: '100%' }}>
            <input 
              type="text" 
              placeholder="Search by student name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                flex: '2',
                padding: '10px', 
                borderRadius: '8px', 
                border: '1px solid #ccc',
                fontSize: '14px'
              }}
            />
            
            <select 
              value={filterCourse} 
              onChange={(e) => setFilterCourse(e.target.value)}
              style={{ 
                flex: '1', 
                padding: '10px', 
                borderRadius: '8px', 
                border: '1px solid #ccc',
                backgroundColor: '#fff'
              }}
            >
              <option value="">All Courses</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.course_name}</option>
              ))}
            </select>
          </div>

          <StudentTable 
            records={filteredRecords} 
            refresh={loadAllData} 
            setEditingRecord={setEditingRecord}
          />
        </section>

      </main>

      <footer style={{ textAlign: 'center', padding: '20px', marginTop: '20px', opacity: '0.7' }}>
        <p>Student Record System | Florence Amaro, David Sturdevant | IT3R2</p>
      </footer>

    </div>
  );
}

export default App;