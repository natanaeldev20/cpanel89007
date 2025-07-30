import { writeFile } from "fs/promises";
import path from "path";

export const processImage = async (image: File): Promise<string> => {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public", image.name);
  await writeFile(filePath, buffer);
  return filePath;
};
