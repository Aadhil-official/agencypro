export async function isAdminUser(email: string | undefined | null): Promise<boolean> {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();

  const envList = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  if (envList.includes(normalized)) {
    return true;
  }

  if (!process.env.COSMIC_DATABASE_SECRET) {
    return false;
  }

  const { db } = await import("cosmic-database");
  const snapshot = await db
    .collection("adminUsers")
    .where("email", "==", normalized)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return false;
  }

  const data = snapshot.docs[0].data();
  if (data?.status && data.status !== "active") {
    return false;
  }

  return true;
}
