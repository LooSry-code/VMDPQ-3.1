export interface IPaginationQuery {
    page: number; // Halaman saat ini
    limit: number; // Jumlah item per halaman
    search?: string; // Pencarian produk berdasarkan nama (opsional)
}