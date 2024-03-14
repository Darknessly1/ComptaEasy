import React, { useState } from "react";
import '../Styles/Logincss.css'
import axios from "axios";

export default function LoginForm() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = values; 
    axios.post('http://localhost:8081/login', { username, email, password })
      .then(resp => console.log("Registered Successfully"))
      .catch(err => console.log(err));
  };

  const handleChange = (e) => {
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="container w-full max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden m-5">
      <div className="relative hidden xl:block xl:w-1/2 h-full">
        <img
          className="absolute h-auto w-full "
          src="https://images.unsplash.com/photo-1541233349642-6e425fe6190e"
          alt="my zomato"
        />
      </div>
      <div className="w-full xl:w-1/2 p-8">
        <form method="post" action="#" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <div>
            <span className="text-gray-600 text-sm">
              Do you have an account?  
            </span>
            <button className="text-gray-700 text-sm font-semibold">
              Sign in
            </button>
          </div>
          <div className="mb-4 mt-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="username"
            >
              User Name
            </label>
            <input
              name="username"
              value={values.username}
              className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
              id="username"
              type="text"
              placeholder="Your Username"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 mt-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              name="email"
              value={values.email}
              className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
              id="email"
              type="text"
              placeholder="Your email address"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6 mt-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              name="password"
              value={values.password}
              className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
              id="password"
              type="password"
              placeholder="Your password"
              onChange={handleChange}
            />
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Conferme you password
            </label>
            <input
              name="password"
              value={values.password}
              className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
              id="password"
              type="password"
              placeholder="Your password"
              onChange={handleChange}
            />

            <a
              className="inline-block align-baseline text-sm text-gray-600 hover:text-gray-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex w-full mt-8">
            <button
              className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
