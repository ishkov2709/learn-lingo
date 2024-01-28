import dynamic from "next/dynamic";

const Header = dynamic(() => import("./header"));

export default Header;
