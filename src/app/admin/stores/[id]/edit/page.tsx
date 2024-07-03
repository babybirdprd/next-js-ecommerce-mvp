import db from "@/db/db"
import { PageHeader } from "../../../_components/PageHeader"
import { StoreForm } from "../../_components/StoreForm"
import { notFound } from "next/navigation"

export default async function EditStorePage({
  params: { id },
}: {
  params: { id: string }
}) {
  const store = await db.store.findUnique({ where: { id } })

  if (store == null) return notFound()

  return (
    <>
      <PageHeader>Edit Store</PageHeader>
      <StoreForm store={store} />
    </>
  )
}
