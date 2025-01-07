"use client"

import { useToast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"

export function ToastWithTitle() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={(event) => {
        console.log(event)
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      }}
    >
      Show Toasta
    </Button>
  )
}
