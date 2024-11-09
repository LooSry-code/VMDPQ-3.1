import ProductsModel, { IProduct } from '../models/products.model'; // Pastikan path ini sesuai
import { IProduct as Product } from '../utils/interfaces'; // Pastikan path ini sesuai

// Fungsi untuk membuat produk baru
export const create = async (data: Partial<IProduct>): Promise<IProduct> => {
  try {
    const newProduct = new ProductsModel(data);
    const savedProduct = await newProduct.save();
    return savedProduct;    // Mengembalikan produk yang disimpan
  } catch (error: unknown) {
    throw new Error(`Failed to create product: ${(error as Error).message}`);
  }
};

// Fungsi untuk mendapatkan semua produk dengan pagination
export const findAll = async (
  query: any,
  limit: number = 10,
  page: number = 1
): Promise<IProduct[]> => {
  try {
    const result = await ProductsModel.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .populate("category");
    return result; // Mengembalikan daftar produk
  } catch (error: unknown) {
    throw new Error(`Failed to create product: ${(error as Error).message}`);
  }
};

// Fungsi untuk mendapatkan satu produk berdasarkan ID
export const findOne = async (id: string): Promise<IProduct | null> => {
  try {
    const product = await ProductsModel.findById(id).populate("category");
    return product; // Mengembalikan produk yang ditemukan
  } catch (error: unknown) {
    throw new Error(`Failed to create product: ${(error as Error).message}`);
  }
};

// Fungsi untuk memperbarui produk berdasarkan ID
export const update = async (
  id: string,
  data: Partial<IProduct>
): Promise<IProduct | null> => {
  try {
    const updatedProduct = await ProductsModel.findByIdAndUpdate(id, data, {
      new: true, // Mengembalikan dokumen yang diperbarui
      runValidators: true, // Menjalankan validasi sebelum menyimpan
    }).populate("category");
    return updatedProduct; // Mengembalikan produk yang diperbarui
  } catch (error: unknown) {
    throw new Error(`Failed to create product: ${(error as Error).message}`);
  }
};

// Fungsi untuk menghapus produk berdasarkan ID
export const remove = async (id: string): Promise<IProduct | null> => {
  try {
    const deletedProduct = await ProductsModel.findByIdAndDelete(id).populate("category");
    return deletedProduct; // Mengembalikan produk yang dihapus
  } catch (error: unknown) {
    throw new Error(`Failed to create product: ${(error as Error).message}`);
  }
};