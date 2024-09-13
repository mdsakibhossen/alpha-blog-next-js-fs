import Logo from "@/components/logo/Logo"

const Header = () => {
  return (
    <header className="header w-full sticky top-0 left-0 z-50 border-b border-b-gray-200">
        <div className="container mx-auto px-3 py-5">
            <Logo/>
        </div>
    </header>
  )
}

export default Header