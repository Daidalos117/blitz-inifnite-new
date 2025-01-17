import { invoke } from "@/src/app/blitz-server"
import getCurrentUser from "@/src/app/users/queries/getCurrentUser"
import Link from "next/link"
import { ContactsList } from "@/src/app/contacts/components/ContactsList"


export default async function Contacts() {

  return (
    <>
      <ContactsList />
    </>
  )
}
