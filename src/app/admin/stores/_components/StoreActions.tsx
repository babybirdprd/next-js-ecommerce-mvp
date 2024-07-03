"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { deleteStore } from "../../_actions/stores"
import { useRouter } from "next/navigation"

export function DeleteStoreDropdownItem({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await deleteStore(id)
          router.refresh()
        })
      }
    >
      Delete
    </DropdownMenuItem>
  )
}
