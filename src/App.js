// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
import React from 'react';
import Amplify, { Auth } from "aws-amplify";
import awsmobile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import ToDoApp from "./components/ToDoApp";

// export default App;
// Amplifyの設定を行う
Amplify.configure(awsmobile)

// SingUp時に、メールアドレスとパスワードを要求する
const signUpConfig = {
    header: 'Sign Up',
    hideAllDefaults: true,
    defaultCountyCode: '1',
    signUpFields: [
        {
            label: 'User Name',
            key: 'username',
            required: true,
            displayOrder: 1,
            type: 'string'
        },
        {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 2,
            type: 'string'
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 3,
            type: 'password'
        }
    ]
}

// SingOut
function signOut(){
    Auth.signOut()
    .then()
    .catch();
}

	
function App() {
    return (
        <div className="container is-fluid">
        <ToDoApp />
        </div>
    );
}

// export default App;
// Appコンポーネントをラップする
export default withAuthenticator(App,{signUpConfig});