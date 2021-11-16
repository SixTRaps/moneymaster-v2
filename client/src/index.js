import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

const userTarget = document.querySelector("#user");
const signupTarget = document.querySelector("#signup");

function User() {
  return (
    <div>
      <a href="signin.html" className="btn">
        Sign in
      </a>
      <a href="signup.html" className="btn">
        Sign up
      </a>
    </div>
  );
}

function Signup() {
  const { register, handleSumbit } = useForm();
  const onSubmit = (d) => alert(JSON.stringify(d));

  return (
    <form onSubmit={handleSumbit(onSubmit)}>
      <label>
        Username:
        <input {...register("username")} />
      </label>
      <label>
        Password:
        <input type="Password" {...register("password")} />
      </label>
      <label>
        Firstname:
        <input {...register("firstname")} />
      </label>
      <label>
        Lastname:
        <input {...register("lastname")} />
      </label>
    </form>
  );
}

ReactDOM.render(<User />, userTarget);
ReactDOM.render(<Signup />, signupTarget);
