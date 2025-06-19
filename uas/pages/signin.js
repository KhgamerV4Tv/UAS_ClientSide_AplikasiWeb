import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "../utils/auth";

export default function SignIn() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.username, form.password);
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <form className="bg-white p-8 rounded shadow" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-xl font-bold">Sign In</h1>
        <input
          name="username"
          placeholder="Username"
          className="block mb-2 p-2 border rounded w-full"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="block mb-2 p-2 border rounded w-full"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">Login</button>
      </form>
    </div>
  );
}
