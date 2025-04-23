import bcrypt from "bcryptjs";  // ✅ Nombre correcto

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);  // ✅ 10 es el número de salt rounds
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);  // ✅ Comparación segura
}