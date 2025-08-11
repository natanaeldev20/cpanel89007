import { writeFile } from "fs/promises";
import path from "path";

export const processImage = async (image: File): Promise<string> => {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Guardar en carpeta temporal de Vercel en vez de public/
  const filePath = path.join("/tmp", image.name);
  await writeFile(filePath, buffer);
  return filePath;
};
