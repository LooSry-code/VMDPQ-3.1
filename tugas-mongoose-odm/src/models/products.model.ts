import mongoose, { Document, Model, Schema } from 'mongoose';

// Interface untuk produk
export interface IProduct extends Document {
  name: string; // Nama produk
  description: string; // Deskripsi produk
  images: string[]; // Array URL gambar produk
  price: number; // Harga produk
  qty: number; // Jumlah produk
  slug?: string; // Slug produk (opsional)
  category: string; // ID kategori produk
  createdAt?: Date; // Tanggal dibuat (opsional)
  updatedAt?: Date; // Tanggal diperbarui (opsional)
}

// Skema untuk produk
const ProductsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less than 1"],
    },
    slug: {
      type: String,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  },
  {
    timestamps: true,
  }
);

// Middleware untuk slug sebelum menyimpan
ProductsSchema.pre<IProduct>("save", function (next) {
  const product = this;

  if (!product.slug) {
    product.slug = product.name.toLowerCase().split(" ").join("-"); // Membuat slug berdasarkan nama produk
  }

  next();
});

// Model untuk produk
const ProductsModel: Model<IProduct> = mongoose.model<IProduct>('Products', ProductsSchema);

export default ProductsModel;