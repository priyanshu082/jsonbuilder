import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"

const Navbar = () => {
  return (
    <nav className={cn("w-full flex items-center justify-between px-12 py-[15px] bg-foreground text-secondary")}>
      <div className="font-bold text-lg">HRone</div>
      <ul className=" gap-6 flex justify-center items-center text-accent ">
        <li>
          <a href="#" className="hover:text-gray-400 transition-colors">Home</a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400 transition-colors">About</a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-400 transition-colors">Contact</a>
        </li>
        <ModeToggle/>
      </ul>
    </nav>
  )
}

export default Navbar
