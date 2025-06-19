import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUser, logout } from "../utils/auth";
import ProductTable from "../components/ProductTable";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      router.replace("/signin");
    } else {
      setUser(u);
    }
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Welcome, <span className="text-blue-700">{user.username}</span>
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <ProductTable role={user.role} />
    </div>
  );
}
