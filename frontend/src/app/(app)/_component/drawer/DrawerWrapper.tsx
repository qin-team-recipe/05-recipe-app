"use client"

import React, { FC, ReactNode, useState } from "react"

import { IconX } from "@tabler/icons-react"
import { tv } from "tailwind-variants"
import { Drawer } from "vaul"

type DrawerWrapperProps = {
  children: ReactNode
  drawerContent: ReactNode
}

const drawerWrapper = tv({
  slots: {
    closeButton: "absolute right-0 top-0.5 p-1 bg-mauve-4 rounded-full z-10",
    content: `
      fixed bottom-0 left-0 right-0 
      mt-24 flex h-[50%] flex-col p-4
      rounded-t-[10px] bg-[#FAFAFA] shadow-drawer`,
    overlay: "bg-black/40 fixed inset-0",
  },
})

/** @package */
export const DrawerWrapper: FC<DrawerWrapperProps> = (props) => {
  const { children, drawerContent } = props

  const { closeButton, content, overlay } = drawerWrapper()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer.Root shouldScaleBackground open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger>{children}</Drawer.Trigger>
      <Drawer.Overlay className={overlay()} />
      <Drawer.Portal>
        <Drawer.Content className={content()}>
          <div className="relative">
            <button
              className={closeButton()}
              onClick={() => {
                return setIsOpen(false)
              }}
            >
              <IconX className="h-4 w-4" />
            </button>
          </div>
          <div className="overflow-auto pr-4">{drawerContent}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
