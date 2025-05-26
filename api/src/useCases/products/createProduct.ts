import { Request, Response } from "express";
import { Product } from "../../models/product";

export async function createProduct(req: Request, res: Response) {
  const { name, description, price, category, ingredients, imagePath } = req.body;

  const finalImagePath = req.file?.filename || imagePath || "";

  if (!finalImagePath) {
    return res.status(400).json({ error: "imagePath é obrigatório" });
  }

  try {
    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      imagePath: finalImagePath,
      ingredients: ingredients || [],
    });

    res.status(201).json(product);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Internal Error" });
    }
  }
}
