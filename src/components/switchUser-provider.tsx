import { createContext, useContext, useState } from "react"
import { toast } from "sonner"

type Author = "student" | "mentor" | "tutor"|string

type SwitchProviderProps = {
  children: React.ReactNode
  defaultAuthor?: Author
  storageKey?: string
}

export type SwitchUserProviderState = {
  author: Author
  setAuthor: (theme: Author) => void
}

const initialState: SwitchUserProviderState = {
  author: "student",
  setAuthor: () => null,
}

const SwitchUserProviderContext = createContext<SwitchUserProviderState>(initialState)

export function SwitchUserProvider({
  children,
  defaultAuthor = "student",
  storageKey = "switch-user",
  ...props
}: SwitchProviderProps) {
  const [author, setAuthor] = useState<Author>(
    () => (localStorage.getItem(storageKey) as Author) || defaultAuthor
  )

  const value = {
    author,
    setAuthor: (author: Author) => {
      localStorage.setItem(storageKey, author)
      setAuthor(author)
      toast.success(`Theme changed to ${author}!`)
    },
  }

  return (
    <SwitchUserProviderContext.Provider {...props} value={value}>
      {children}
    </SwitchUserProviderContext.Provider>
  )
}

export const useAuthor = () => {
  const context = useContext(SwitchUserProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a SwitchUserProviderContext")

  return context
}
