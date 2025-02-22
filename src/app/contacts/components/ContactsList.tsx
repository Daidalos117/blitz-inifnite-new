"use client"
import { useInfiniteQuery } from "@blitzjs/rpc"
import getContacts from "../queries/getContacts"
import React, { useCallback } from "react"
import { ContactForm } from "./ContactForm"

export const ContactsList = () => {
  const [contactPages, extraInfo] = useInfiniteQuery(
    getContacts,
    (page = { take: 3, skip: 0 }) => page,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      cacheTime: Infinity,
      staleTime: 111111,
    }
  )
  const { isFetching, isFetchingNextPage, fetchNextPage, hasNextPage, setQueryData } = extraInfo

  const onOnContactSave = (contactFormValues: { name: string }) => {
    // typescript throws error here, even tho it should be possible to return just old data
    setQueryData((oldData) => oldData)
    //
    // old data is in fact undefined
    setQueryData((oldData) => {
      console.log({ oldData })
    })
    //
    // it's typed like this but that doesn't work
    setQueryData(
      {
        ...contactPages[0],
        contacts: [{ ...contactFormValues, id: Math.random() }, ...contactPages[0].contacts],
      },
      { refetch: false }
    )

    // kinda make sense to use it like this, but also doesn't work
    const [firstPage, ...restPages] = contactPages
    setQueryData(
      [
        {
          ...firstPage,
          contacts: [{ ...contactFormValues, id: Math.random() }, ...firstPage.contacts],
        },
        ...restPages,
      ],
      { refetch: false }
    )
  }

  return (
    <div>
      {contactPages.map((page, i) => (
        <React.Fragment key={i}>
          {page.contacts.map((contact) => (
            <p key={contact.id}>{contact.name}</p>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage || !!isFetchingNextPage}>
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      <div style={{ marginTop: 40 }}>
        <ContactForm
          onSubmit={async (val) => {
            onOnContactSave(val)
          }}
        ></ContactForm>
      </div>
    </div>
  )
}
