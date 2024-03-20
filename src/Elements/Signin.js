import axios from "axios";
import { useState } from "react"

export default function SignIn() {

    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const hadnleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = values;
        axios.post('http://localhost:8081/signin', { username, password })
            .then(resp => { console.log("Sign in Seccessful") })
            .catch(err => {
                console.log("Sign in faild: ", err)
            })
    }

    const handleChange = (e) => { 
        const {name, value} = e.target;
        setValues(prevValue => ({
            ...prevValue, 
            [name]: value
        }));
    }


    return (
        <div
            class="container max-w-md mx-auto xl:max-w-3xl h-full flex bg-white rounded-lg shadow overflow-hidden m-7"
        >
            <div class="relative hidden xl:block xl:w-1/2 h-full">
                <img
                    class="absolute h-auto w-full object-cover"
                    src="https://images.unsplash.com/photo-1541233349642-6e425fe6190e"
                    alt="my zomato"
                />
            </div>
            <div class="w-full xl:w-1/2 p-8">
                <form method="post" action="#" onSubmit="return false">
                    <h1 class=" text-2xl font-bold text-black">Sign in to your account</h1>
                    <div>
                        <span class="text-gray-600 text-sm">
                            Don't have an account?
                        </span>
                        <span class="text-gray-700 text-sm font-semibold">
                            <a href="/Login">
                                Sign up
                            </a>
                        </span>
                    </div>
                    <div class="mb-4 mt-6">
                        <label
                            class="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            class="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            type="text"
                            placeholder="Your email address"
                        />
                    </div>
                    <div class="mb-6 mt-6">
                        <label
                            class="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            class="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                            id="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Your password"
                        />
                        <a
                            class="inline-block align-baseline text-sm text-gray-600 hover:text-gray-800"
                            href="#"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <div class="flex w-full mt-8">
                        <button
                            class="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                            type="button"
                            onClick={hadnleSubmit}
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}