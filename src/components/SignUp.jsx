import React, { useState } from 'react';

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [Pass, setPass] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    const HandleSubmit = () => {
        fetch("https://transfire.onrender.com/SignUp", {
            method: 'POST',
            body: JSON.stringify({
                Name: name,
                Email: email,
                Password: Pass
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then(() => {
                console.log("Posted");
            })
            .catch((err) => {
                console.log("Error While Posting , ", err);
            })
    }

    return (
        <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg mt-[2rem]  m-auto">
            <h2 className="text-[#D83F31] text-2xl font-bold mb-4">SignIn</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-[#D83F31] text-sm font-semibold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-fit m-auto px-4 py-2 rounded-md bg-white border border-[#D83F31] focus:ring-[#D83F31] focus:outline-none"
                        required
                        placeholder='Enter Your Name...'
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-[#D83F31] text-sm font-semibold mb-2">
                        Email
                    </label>
                    <input
                        placeholder='Enter Your Email...'

                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-fit m-auto px-4 py-2 rounded-md bg-white border border-[#D83F31] focus:ring-[#D83F31] focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-[#D83F31] text-sm font-semibold mb-2">
                        Password
                    </label>
                    <input
                        placeholder='Enter Your Password...'

                        type="password"
                        id="email"
                        name="email"
                        value={Pass}
                        onChange={(e) => setPass(e.target.value)}
                        className="w-fit m-auto px-4 py-2 rounded-md bg-white border border-[#D83F31] focus:ring-[#D83F31] focus:outline-none"
                        required
                    />
                </div>
                <div className="text-center">
                    <button
                        onClick={HandleSubmit}
                        className="bg-[#D83F31] text-white py-2 px-6 rounded-md hover:bg-red-700 focus:outline-none"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
