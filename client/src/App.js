import './App.css';
import { useState } from 'react'
import Axios from 'axios'

function App() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [country, setCountry] = useState('')
  const [employees, setEmployees] = useState([])

  const [showEmployees, setShowEmployees] = useState(false)

  const [newAge, setNewAge] = useState(0)

  const addEmployee = () => {
    Axios
      .post('http://localhost:3001/create', { name, age, country })
      .then((response) => {
        setEmployees([...employees, { name, age, country }])
      })
  }

  const getEmployees = () => {
    Axios
      .get('http://localhost:3001/employees', { name, age, country })
      .then((response) => {
        setEmployees(response.data)
        setShowEmployees(!showEmployees)
      })
  }

  const updateEmployeeAge = (id) => {
    Axios
      .put('http://localhost:3001/update', { age, id })
      .then((response) => {
        const newEmployees = employees.map(em => (em.id === id) ? { ...em, age: newAge } : em)
        setEmployees(newEmployees)
      })
  }

  const removeEmployee = (id) => {
    Axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then((response) => {
        const newEmployees = employees.filter(em => em.id !== id)
        setEmployees(newEmployees)
      })
  };

  return (
    <div className="App">
      <div><label htmlFor="">Name:</label><input onChange={(e) => setName(e.target.value)} type="text" /></div>
      <div><label htmlFor="">Age :</label><input onChange={(e) => setAge(e.target.value)} type="number" /></div>
      <div><label htmlFor="">Country:</label><input onChange={(e) => setCountry(e.target.value)} type="text" /></div>
      <button onClick={addEmployee}>Add Employee</button>
      <hr></hr>
      <button onClick={getEmployees}>Show all employees</button>
      <hr></hr>
      <div className="employeeList">
        {showEmployees && employees.map((employee) => {
          const { id, name, age, country } = employee
          return <div key={employee.id} className="employee">
            <ul>
              <li>Name: {name}</li>
              <li>Age: {age}</li>
              <li>Country: {country}</li>
            </ul>
            <div className='update-age'>
              <input onChange={(e) => setNewAge(e.target.value)} type="number" placeholder='update age' />
              <button onClick={() => updateEmployeeAge(id)}>Update</button>
            </div>
            <button onClick={() => removeEmployee(id)}>Remove</button>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;