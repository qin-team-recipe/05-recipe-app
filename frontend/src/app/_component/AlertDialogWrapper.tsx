"use client"

import React, { FC, ReactNode } from "react"

import * as AlertDialog from "@radix-ui/react-alert-dialog"
import { tv } from "tailwind-variants"

import { STitle } from "@/app/(app)/_component/label"

type AlertDialogWrapperProps = {
  alertDescription: string | ReactNode
  alertTitle: string
  cancelButton: ReactNode
  children: ReactNode
  isOpen: boolean
  okButton: ReactNode
  setIsOpen: (open: boolean) => void
}

const SAlertDialogWrapper = tv({
  slots: {
    content: `
    background-white 
    fixed left-[50%] top-[50%] 
    max-h-[85vh] w-[90vw] max-w-[500px] 
    translate-x-[-50%] translate-y-[-50%] 
    rounded-[6px] p-[25px] 
    shadow-xl
    focus:outline-none
    `,
    description: "pt-8",
    overlay: "bg-mauve-10 bg-opacity-25 fixed inset-0",
    title: STitle({ size: "xl" }),
  },
})

/** @package */
export const AlertDialogWrapper: FC<AlertDialogWrapperProps> = (props) => {
  const {
    alertDescription,
    alertTitle,
    cancelButton,
    children,
    isOpen,
    okButton,
    setIsOpen,
  } = props

  const {
    content: sContent,
    description: sDescription,
    overlay: sOverlay,
    title: sTitle,
  } = SAlertDialogWrapper()

  return (
    <AlertDialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={sOverlay()} />
        <AlertDialog.Content className={sContent()}>
          <AlertDialog.Title className={sTitle()}>
            {alertTitle}
          </AlertDialog.Title>
          <AlertDialog.Description className={sDescription()}>
            {alertDescription}
          </AlertDialog.Description>

          <div className="flex justify-between gap-4 pt-8">
            <AlertDialog.Cancel asChild>{cancelButton}</AlertDialog.Cancel>
            <AlertDialog.Action asChild>{okButton}</AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
