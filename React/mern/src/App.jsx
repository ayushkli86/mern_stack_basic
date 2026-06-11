import Address from './assets/Address.jsx'
import Info from './assets/Info.jsx'
import Father from './assets/Father.jsx'
import Mother from './assets/Mother.jsx'
import CosmosApp from './CosmosApp.jsx'


const App = () => {
  let name = "ayush";
  let surname = "katuwal";
  let products = [
    { name: "laptop", price: 50000, _id: 1, quantity: 10 },
    { name: "mobile", price: 20000, _id: 2, quantity: 20 },
    { name: "tablet", price: 30000, _id: 3, quantity: 30 },
  ];
  let users = [
    { name: "nitan", surname: "thapa", _id: 1, age: 20, gender: "male", email: "nitanthapa425@gmail.com", image: "image.png", father: "ram", mother: "sita", info: "student" },
    { name: "sita", surname: "thapa", _id: 2, age: 30, gender: "female", email: "sitathapa425@gmail.com", image: "image.png", father: "shyam", mother: "gita", info: "teacher" },
    { name: "rita", surname: "thapa", _id: 2, age: 30, gender: "female", email: "ritathapa425@gmail.com", image: "image.png", father: "hari", mother: "mina", info: "engineer" },
    { name: "anusha", surname: "thapa", _id: 2, age: 30, gender: "female", email: "anushathapa425@gmail.com", image: "image.png", father: "krishna", mother: "radha", info: "doctor" },
  ];

  return (
    <div>
      <p>ronish jhutke piche pagal he</p>
      <p style={{ color: "yellow" }}>instagram id dedo isko koi</p>
      <p style={{ border: "solid red 2px" }}>my name is {name} and surname is {surname} and 1+1 is {1 + 1 - 1 * 1}</p>
      <img src="image.png" width="200px" height="200px" />

      {products.map((item) => {
        return (
          <div style={{ border: "solid red 2px" }}>
            <p>product name is {item.name}</p>
            <p>the price is {item.price}</p>
            <p>the quantity is {item.quantity}</p>
          </div>
        )
      })}

      {users.map((item) => {
        return (
          <div style={{ border: "solid blue 3px" }}>
            <img src="image.png" width="200px" height="200px" />
            <p>name is {item.name}</p>
            <p>father is {item.father}</p>
            <p>mother is {item.mother}</p>
            <p>info is {item.info}</p>
          </div>
        )
      })}

     
    <Info name="ayush" surname="katuwal" ward={1} />
    <Address country ="nepal" city="sankhuwasabha" province ={1}/>
    <Father name="kamal" surname="katuwal" role="pitaji" />
    <Mother name ="maiya"/>

    <p className="success">this is success message</p>
    <p className="error"> this is error message </p>
    <p className="warning">this is warning message </p>
    <CosmosApp>hello</CosmosApp>
    
      
    </div>
  )
};





export default App