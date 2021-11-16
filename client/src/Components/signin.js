import React from "react";
import { useForm } from "react-hook-form";

export default function Signin() {
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
      <input type="submit" />
    </form>
  );
}
