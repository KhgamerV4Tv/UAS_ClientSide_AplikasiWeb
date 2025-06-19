import { useState, useEffect } from "react";

export default function ProductForm({ refresh, editProduct, setEditProduct }) {
  const [form, setForm] = useState({
    nama_produk: "",
    harga_satuan: "",
    quantity: "",
  });

  useEffect(() => {
    if (editProduct) setForm(editProduct);
    else setForm({ nama_produk: "", harga_satuan: "", quantity: "" });
  }, [editProduct]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editProduct) {
      await fetch(`http://localhost:3001/products/${editProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditProduct(null);
    } else {
      await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    refresh();
    setForm({ nama_produk: "", harga_satuan: "", quantity: "" });
  };

  return (
    <form className="mb-4 flex flex-wrap gap-2 items-center" onSubmit={handleSubmit}>
      <input
        name="nama_produk"
        placeholder="Nama Produk"
        className="border p-2 rounded bg-white dark:bg-zinc-800 text-black dark:text-white shadow"
        value={form.nama_produk}
        onChange={handleChange}
        required
      />
      <input
        name="harga_satuan"
        type="number"
        placeholder="Harga Satuan"
        className="border p-2 rounded bg-white dark:bg-zinc-800 text-black dark:text-white shadow"
        value={form.harga_satuan}
        onChange={handleChange}
        required
      />
      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        className="border p-2 rounded bg-white dark:bg-zinc-800 text-black dark:text-white shadow"
        value={form.quantity}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded font-semibold transition"
      >
        {editProduct ? "Update" : "Tambah"}
      </button>
      {editProduct && (
        <button
          type="button"
          className="ml-2 px-3 py-2 bg-gray-400 hover:bg-gray-500 rounded text-white font-semibold transition"
          onClick={() => setEditProduct(null)}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
