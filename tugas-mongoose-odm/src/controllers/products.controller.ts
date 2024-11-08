import { Request, Response } from "express";
import * as Yup from 'yup';
import { create, findAll, findOne, update, remove } from "../services/product.service";
import { IPaginationQuery } from '../utils/interfaces';

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