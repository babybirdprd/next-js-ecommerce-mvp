"use server"

import db from "@/db/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createStore(prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string
  const domain = formData.get("domain") as string

  if (!name || !domain) {
    return { error: "Name and domain are required" }
  }

  try {
    await db.store.create({
      data: { name, domain },
    })

    revalidatePath("/admin/stores")
    redirect("/admin/stores")
  } catch (error) {
    return { error: "Failed to create store. The domain might already be in use." }
  }
}

export async function updateStore(id: string, prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string
  const domain = formData.get("domain") as string

  if (!name || !domain) {
    return { error: "Name and domain are required" }
  }

  try {
    await db.store.update({
      where: { id },
      data: { name, domain },
    })

    revalidatePath("/admin/stores")
    redirect("/admin/stores")
  } catch (error) {
    return { error: "Failed to update store. The domain might already be in use." }
  }
}

export async function deleteStore(id: string) {
  try {
    await db.store.delete({ where: { id } })
    revalidatePath("/admin/stores")
  } catch (error) {
    return { error: "Failed to delete store. It might have associated data." }
  }
}
