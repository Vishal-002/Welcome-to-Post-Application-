
"use client";
// components/SignUp.tsx
import React, { useState } from "react";
import { signUpWithEmailAndPassword } from "../firebase-config";
import { addUserToFirestore } from "../firebase-config";
import Layout from "../Laayout/Layout";
import { useRouter } from "next/navigation"; // Import useRouter from next/router

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const router = useRouter(); // Initialize the router

  const handleSignUp = async () => {
    try {
      // Create a new user with email and password
      const user = await signUpWithEmailAndPassword(email, password);

      // Add user details to Firestore
      await addUserToFirestore(email, password, name);

      console.log("User registered successfully:", email, name, profession);
      // You can also redirect to another page or display a success message to the user
      
    } catch (error) {
      if (password.length < 6) 
      {
        alert("Password length must be greater than 5")
      }
      else {
        // alert(password)
        alert("User is Already Registered");

      }

      

      // alert(password)
      
      console.log(error);
      // console.log(error.message)
      // Handle error (display error message to the user, etc.)
    }

    
  };

  const handleLoginRedirect = () => {
    // Redirect to the sign-up page when the user clicks the link/button
    router.push("/");
  };
  
  

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
      <form>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 w-full border rounded text-black"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded text-black"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="profession"
            className="block text-sm font-medium text-gray-600"
          >
            Profession
          </label>
          <input
            type="text"
            id="profession"
            className="mt-1 p-2 w-full border rounded text-black"
            placeholder="Enter your profession"
            onChange={(e) => setProfession(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded text-black"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>
          
          

        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSignUp}
        >
          Sign Up
          </button>
          
          {/* Link or button to redirect to the sign-up page */}
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-500 hover:underline focus:outline-none"
            onClick={handleLoginRedirect}
          >
            Sign in here
          </button>
        </p>
      </div>
      </form>
    </div>
    </Layout>
  );
};

export default SignUp;
