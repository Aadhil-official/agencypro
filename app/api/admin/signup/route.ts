import { NextResponse } from "next/server";

async function getDb() {
  const { db } = await import("cosmic-database");
  return db;
}

export async function POST(request: Request) {
  if (!process.env.COSMIC_DATABASE_SECRET) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  try {
    const data = await request.json();
    const name = String(data?.name || "").trim();
    const email = String(data?.email || "").trim().toLowerCase();
    const phone = String(data?.phone || "").trim();
    const note = String(data?.note || "").trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const existing = await db
      .collection("adminUsers")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (!existing.empty) {
      return NextResponse.json({ success: true, exists: true });
    }

    await db.collection("adminUsers").add({
      name,
      email,
      phone,
      note,
      status: "active",
      createdAt: db.FieldValue.serverTimestamp(),
      updatedAt: db.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ success: true, exists: false });
  } catch (error) {
    console.error("Admin signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
