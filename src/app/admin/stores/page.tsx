import { PageHeader } from "../_components/PageHeader"
import { StoreList } from "./_components/StoreList"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function StoresPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Stores</PageHeader>
        <Button asChild>
          <Link href="/admin/stores/new">Add Store</Link>
        </Button>
      </div>
      <StoreList />
    </>
  )
}
