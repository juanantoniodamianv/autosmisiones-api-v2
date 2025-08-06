import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { 
  AWS_REGION, 
  AWS_ACCESS_KEY_ID, 
  AWS_SECRET_ACCESS_KEY, 
  AWS_S3_BUCKET_NAME 
} from "../env";

// Configurar el cliente S3
const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

// Tipos para las respuestas
export interface SignedUrlResponse {
  signedUrl: string;
  key: string;
  publicUrl: string;
}

export interface UploadResult {
  success: boolean;
  key?: string;
  publicUrl?: string;
  error?: string;
}

/**
 * Genera una URL firmada para subir un archivo directamente a S3
 * @param fileName - Nombre del archivo original
 * @param contentType - Tipo MIME del archivo
 * @param folder - Carpeta donde se guardará (opcional)
 * @param expiresIn - Tiempo de expiración en segundos (por defecto 300 = 5 minutos)
 * @returns Promise con la URL firmada y metadatos
 */
export async function generateSignedUploadUrl(
  fileName: string,
  contentType: string,
  folder: string = "uploads",
  expiresIn: number = 300
): Promise<SignedUrlResponse> {
  try {
    // Generar un nombre único para el archivo
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = fileName.split('.').pop();
    const key = `${folder}/${timestamp}-${randomString}.${fileExtension}`;

    // Crear el comando para subir el objeto
    const command = new PutObjectCommand({
      Bucket: AWS_S3_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
      // Configuraciones adicionales para optimizar la subida
      CacheControl: "max-age=31536000", // 1 año de cache
    });

    // Generar la URL firmada
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn,
    });

    const publicUrl = `https://${AWS_S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;

    return {
      signedUrl,
      key,
      publicUrl,
    };
  } catch (error) {
    console.error("Error generating signed URL:", error);
    throw new Error("Failed to generate signed upload URL");
  }
}

/**
 * Elimina un archivo de S3
 * @param key - Clave del archivo en S3
 * @returns Promise con el resultado de la eliminación
 */
export async function deleteFileFromS3(key: string): Promise<UploadResult> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: AWS_S3_BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);

    return {
      success: true,
      key,
    };
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    return {
      success: false,
      error: "Failed to delete file from S3",
    };
  }
}

/**
 * Valida si un archivo es una imagen válida
 * @param contentType - Tipo MIME del archivo
 * @param fileName - Nombre del archivo
 * @returns boolean indicando si es válido
 */
export function isValidImageFile(contentType: string, fileName: string): boolean {
  const validTypes = [
    "image/jpeg",
    "image/jpg", 
    "image/png",
    "image/webp",
    "image/gif"
  ];
  
  const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  const fileExtension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
  
  return validTypes.includes(contentType) && validExtensions.includes(fileExtension);
}

/**
 * Obtiene la URL pública de un archivo en S3
 * @param key - Clave del archivo en S3
 * @returns URL pública del archivo
 */
export function getPublicUrl(key: string): string {
  return `https://${AWS_S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
}

/**
 * Genera múltiples URLs firmadas para subir varios archivos
 * @param files - Array de objetos con información de archivos
 * @param folder - Carpeta donde se guardarán
 * @param expiresIn - Tiempo de expiración en segundos
 * @returns Promise con array de URLs firmadas
 */
export async function generateMultipleSignedUrls(
  files: Array<{ fileName: string; contentType: string }>,
  folder: string = "uploads",
  expiresIn: number = 300
): Promise<SignedUrlResponse[]> {
  const promises = files.map(file => 
    generateSignedUploadUrl(file.fileName, file.contentType, folder, expiresIn)
  );
  
  return Promise.all(promises);
}
