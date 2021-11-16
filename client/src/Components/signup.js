import React from "react";
import { useForm } from "react-hook-form";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (d) => alert(JSON.stringify(d));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <input type="submit" />
    </form>
  );
}
