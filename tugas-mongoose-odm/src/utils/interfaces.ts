export interface IProduct {
    _id: string; // ID produk
    name: string; // Nama produk
    description: string; // Deskripsi produk
    images: string[]; // Daftar URL gambar produk
    price: number; // Harga produk
    qty: number; // Jumlah produk
    slug?: string; // Slug produk (opsional)
    category: string; // ID kategori produk
    createdAt?: Date; // Tanggal dibuat (opsional)
    updatedAt?: Date; // Tanggal diperbarui (opsional)
}