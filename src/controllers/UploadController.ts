import { Request, Response } from "express";
import { 
  generateSignedUploadUrl, 
  generateMultipleSignedUrls,
  isValidImageFile,
  deleteFileFromS3 
} from "../utils/aws-s3.helpers";

export class UploadController {
  /**
   * Genera una URL firmada para subir una imagen
   */
  static async generateSignedUrl(req: Request, res: Response) {
    try {
      const { fileName, contentType, folder } = req.body;

      // Validar parámetros requeridos
      if (!fileName || !contentType) {
        return res.status(400).json({
          success: false,
          error: "fileName y contentType son requeridos"
        });
      }

      // Validar que sea una imagen válida
      if (!isValidImageFile(contentType, fileName)) {
        return res.status(400).json({
          success: false,
          error: "Tipo de archivo no válido. Solo se permiten imágenes (JPEG, PNG, WebP, GIF)"
        });
      }

      // Generar la URL firmada
      const result = await generateSignedUploadUrl(
        fileName,
        contentType,
        folder || "uploads"
      );

      res.json({
        success: true,
        data: result
      });

    } catch (error) {
      console.error("Error generating signed URL:", error);
      res.status(500).json({
        success: false,
        error: "Error interno del servidor"
      });
    }
  }

  /**
   * Genera múltiples URLs firmadas para subir varias imágenes
   */
  static async generateMultipleSignedUrls(req: Request, res: Response) {
    try {
      const { files, folder } = req.body;

      // Validar parámetros requeridos
      if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({
          success: false,
          error: "files debe ser un array no vacío"
        });
      }

      // Validar cada archivo
      for (const file of files) {
        if (!file.fileName || !file.contentType) {
          return res.status(400).json({
            success: false,
            error: "Cada archivo debe tener fileName y contentType"
          });
        }

        if (!isValidImageFile(file.contentType, file.fileName)) {
          return res.status(400).json({
            success: false,
            error: `Archivo ${file.fileName} no es una imagen válida`
          });
        }
      }

      // Generar las URLs firmadas
      const results = await generateMultipleSignedUrls(
        files,
        folder || "uploads"
      );

      res.json({
        success: true,
        data: results
      });

    } catch (error) {
      console.error("Error generating multiple signed URLs:", error);
      res.status(500).json({
        success: false,
        error: "Error interno del servidor"
      });
    }
  }

  /**
   * Elimina un archivo de S3
   */
  static async deleteFile(req: Request, res: Response) {
    try {
      const { key } = req.body;

      if (!key) {
        return res.status(400).json({
          success: false,
          error: "key es requerido"
        });
      }

      const result = await deleteFileFromS3(key);

      if (result.success) {
        res.json({
          success: true,
          message: "Archivo eliminado correctamente"
        });
      } else {
        res.status(500).json({
          success: false,
          error: result.error || "Error al eliminar el archivo"
        });
      }

    } catch (error) {
      console.error("Error deleting file:", error);
      res.status(500).json({
        success: false,
        error: "Error interno del servidor"
      });
    }
  }

  /**
   * Confirma que las imágenes fueron subidas exitosamente
   * Este endpoint se llama después de que el frontend sube las imágenes
   */
  static async confirmUpload(req: Request, res: Response) {
    try {
      const { uploadedFiles } = req.body;

      if (!uploadedFiles || !Array.isArray(uploadedFiles)) {
        return res.status(400).json({
          success: false,
          error: "uploadedFiles debe ser un array"
        });
      }

      // Aquí podrías hacer validaciones adicionales
      // Por ejemplo, verificar que los archivos realmente existen en S3
      // o registrar las URLs en la base de datos

      res.json({
        success: true,
        message: "Upload confirmado",
        uploadedFiles: uploadedFiles.length
      });

    } catch (error) {
      console.error("Error confirming upload:", error);
      res.status(500).json({
        success: false,
        error: "Error interno del servidor"
      });
    }
  }
} 