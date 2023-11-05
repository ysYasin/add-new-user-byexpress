import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5200/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handlemakeNewUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const age = form.age.value;
    const newUser = { name, age };
    fetch(`http://localhost:5200/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Error :");
        } else {
          res.json();
        }
      })
      .then((data) => {
        const newUsers = [...users, data];
        setUsers(newUsers);
        console.log(users);
        form.reset();
      });
  };

  return (
    <div>
      <h3>Users Manegment</h3>
      <p>Users number {users.length}</p>

      <form onSubmit={handlemakeNewUser}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name" style={{ marginRight: "10px" }}>
            Name
          </label>
          <input type="text" placeholder="name" name="name" />
        </div>
        <div>
          <label htmlFor="age" style={{ marginRight: "10px" }}>
            Age
          </label>
          <input type="age" placeholder="Age" name="age" />
        </div>
        <button type="submit">Add User</button>
      </form>
      {users.map((user) => (
        <p key={user._id}>{`${user._id} : ${user.name} : Age ${user.age}`}</p>
      ))}
    </div>
  );
}

export default App;
