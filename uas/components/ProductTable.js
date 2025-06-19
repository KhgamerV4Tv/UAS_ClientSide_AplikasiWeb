import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";

export default function ProductTable({ role }) {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3001/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin hapus produk ini?")) {
      await fetch(`http://localhost:3001/products/${id}`, { method: "DELETE" });
      fetchProducts();
    }
  };

  return (
    <div>
      {role === "admin" && (
        <ProductForm
          refresh={fetchProducts}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
        />
      )}
      <div className="overflow-x-auto rounded shadow mt-4">
        <table className="min-w-full bg-white dark:bg-zinc-900 rounded-lg shadow overflow-hidden">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 text-left font-bold">Nama Produk</th>
              <th className="px-4 py-2 border-b-2 text-left font-bold">Harga Satuan</th>
              <th className="px-4 py-2 border-b-2 text-left font-bold">Quantity</th>
              {role === "admin" && <th className="px-4 py-2 border-b-2 text-left font-bold">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr
                key={p.id}
                className={idx % 2 === 0 ? "bg-zinc-50 dark:bg-zinc-800" : "bg-white dark:bg-zinc-900"}
              >
                <td className="px-4 py-2 border-b">{p.nama_produk}</td>
                <td className="px-4 py-2 border-b">{p.harga_satuan}</td>
                <td className="px-4 py-2 border-b">{p.quantity}</td>
                {role === "admin" && (
                  <td className="px-4 py-2 border-b flex gap-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded transition"
                      onClick={() => setEditProduct(p)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded transition"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
