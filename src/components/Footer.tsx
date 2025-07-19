import { cn } from "@/lib/utils"

const Footer = () => {
  return (
    <footer className={cn("w-full flex items-center justify-center px-6 py-4 bg-gray-900 text-white")}>
      <span className="text-sm">&copy; {new Date().getFullYear()} HRone. All rights reserved.</span>
    </footer>
  )
}

export default Footer
