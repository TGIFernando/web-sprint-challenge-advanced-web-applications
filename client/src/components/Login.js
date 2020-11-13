import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const intialState = {
  username:'',
  password: ''
}
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [formValues, setFormValues] = useState(intialState)
  const { push } = useHistory()
  const onChange = e => {setFormValues({
    ...formValues, [e.target.name]: e.target.value
  })
    console.log(formValues)
  }
  const onSubmit = e => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/login', formValues)
      .then(res => {
        console.log('response:', res)
        localStorage.setItem('token', res.data.payload)
        push('/bubblepage')
      }).catch( err => {
        console.log('error', err)
      })

  }
  return (
  <div>
    <form onSubmit={onSubmit}>
      <label>Username: </label>
      <input value={formValues.username} onChange={onChange} name='username' type='text'/>
      <label>Password: </label>
      <input value={formValues.password} onChange={onChange} name='password' type='text'/>
      <button>Sign In</button>
    </form>
  </div>
  );
};

export default Login;