import path from "path";
import fs from "fs/promises";

export async function getProducts() {
  // Resolve the correct path to products.json
  const filePath = path.join(process.cwd(), "app", "data", "products.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(jsonData);
}
