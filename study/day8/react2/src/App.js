import logo from './logo.svg';
import './App.css';

function App() {
  const arr = [
    {id: 1, name: 'kim'},
    {id: 2, name: 'lee'},
    {id: 3, name: 'park'},
    {id: 4, name: 'choi'},
    {id: 5, name: 'yang'},
  ]
  return (
    <>
      <ul>
        {
          arr.map((item) => 
            <li key={item.id}>{item.name}</li>
          )
        }
      </ul>
    </>
  );
}

export default App;
