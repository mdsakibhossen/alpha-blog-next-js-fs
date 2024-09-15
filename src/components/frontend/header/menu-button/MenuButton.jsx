import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const MenuButton = ({ isMenuOpened, setIsMenuOpened }) => {
  return (
    <button className="lg:hidden text-2xl relative z-50" onClick={()=> setIsMenuOpened(!isMenuOpened)}>
      {isMenuOpened ? <IoMdClose /> : <FaBars />}
    </button>
  );
};

export default MenuButton;
