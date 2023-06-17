"use client"

import React, { FC } from "react"

import * as ScrollArea from "@radix-ui/react-scroll-area"

type ScrollAreaWrapperProps = {
  children: React.ReactNode
  orientation?: "horizontal" | "vertical"
}

/** @package */
export const ScrollAreaWrapper: FC<ScrollAreaWrapperProps> = (
  props,
) => {
  const { children, orientation = "horizontal" } = props

  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport>{children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation={orientation}>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  )
}
