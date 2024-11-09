import { Request, Response } from "express";
import * as Yup from 'yup';
import { create, findAll, findOne, update, remove } from "../services/product.service"; // Pastikan path ini sesuai
import { IPaginationQuery } from '../utils/IPaginationQuery';
import ProductsModel from "@/models/products.model";

// Schema Validasi untuk Create Product
const createValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number().required('Price is required'),
  category: Yup.string().required('Category is required'),
  description: Yup.string().required('Description is required'),
  images: Yup.array().of(Yup.string()).required('Images are required').min(1, 'At least one image is required'),
  qty: Yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
});

export default {
  async create(req: Request, res: Response) {
    try {
      await createValidationSchema.validate(req.body);
      const result = await create(req.body);
      res.status(201).json({
        data: result,
        message: "Success create product",
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        res.status(400).json({
          data: error.errors,
          message: "Failed create product",
        });
        return;
      }

      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed create product",
      });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const {
        limit = 10,
        page = 1,
        search = "",
      } = req.query as unknown as IPaginationQuery;

      const query: any = {};

      if (search) {
        Object.assign(query, {
          name: { $regex: search, $options: "i" },
        });
      }

      const result = await findAll(query, limit, page);
      const total = await ProductsModel.countDocuments(query);

      res.status(200).json({
        data: result,
        message: "Success get all products",
        page: +page,
        limit: +limit,
        total,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get all products",
      });
    }
  },

  async findOne(req: Request, res: Response) {
    try {
      const product = await findOne(req.params.id);
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      res.status(200).json({
        data: product,
        message: "Success get product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get product",
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const updatedProduct = await update(req.params.id, req.body);
      if (!updatedProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      res.status(200).json({
        data: updatedProduct,
        message: "Success update product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed update product",
      });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      const deletedProduct = await remove(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      res.status(200).json({
        data: deletedProduct,
        message: "Success delete product",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed delete product",
      });
    }
  },
};