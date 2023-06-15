"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { IconArrowLeft } from "@tabler/icons-react"

export const BackButton = () => {
  const router = useRouter()

  return (
    <button
      className="absolute left-4 top-4"
      onClick={() => {
        return router.back()
      }}
    >
      <IconArrowLeft size={36} color="white" />
    </button>
  )
}
