import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import db from "@/db/db"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { DeleteStoreDropdownItem } from "./StoreActions"

async function getStores() {
  return db.store.findMany({
    select: {
      id: true,
      name: true,
      domain: true,
      _count: { select: { products: true, orders: true } },
    },
    orderBy: { name: "asc" },
  })
}

export async function StoreList() {
  const stores = await getStores()

  if (stores.length === 0) return <p>No stores found</p>

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Products</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stores.map(store => (
          <TableRow key={store.id}>
            <TableCell>{store.name}</TableCell>
            <TableCell>{store.domain}</TableCell>
            <TableCell>{store._count.products}</TableCell>
            <TableCell>{store._count.orders}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/stores/${store.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <DeleteStoreDropdownItem id={store.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
