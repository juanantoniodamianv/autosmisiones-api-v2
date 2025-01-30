// // src/controllers/ProvinceController.ts
// import { Request, Response } from "express";
// import { Province } from "../models/Province";

// class ProvinceController {
//   // Obtener todas las provincias
//   public async getAllProvinces(req: Request, res: Response): Promise<void> {
//     try {
//       const provinces = await Province.findAll();
//       res.json(provinces);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Obtener una provincia por ID
//   public async getProvinceById(req: Request, res: Response): Promise<void> {
//     try {
//       const province = await Province.findByPk(req.params.id);
//       if (province) {
//         res.json(province);
//       } else {
//         res.status(404).json({ error: "Province not found" });
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Crear una nueva provincia
//   public async createProvince(req: Request, res: Response): Promise<void> {
//     try {
//       const province = await Province.create(req.body);
//       res.status(201).json(province);
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Actualizar una provincia por ID
//   public async updateProvince(req: Request, res: Response): Promise<void> {
//     try {
//       const province = await Province.findByPk(req.params.id);
//       if (province) {
//         await province.update(req.body);
//         res.json(province);
//       } else {
//         res.status(404).json({ error: "Province not found" });
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }

//   // Eliminar una provincia por ID
//   public async deleteProvince(req: Request, res: Response): Promise<void> {
//     try {
//       const province = await Province.findByPk(req.params.id);
//       if (province) {
//         await province.destroy();
//         res.status(204).send();
//       } else {
//         res.status(404).json({ error: "Province not found" });
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   }
// }

// export const provinceController = new ProvinceController();
