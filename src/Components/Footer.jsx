import { NavLink } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-6">
            <div className="max-w-screen-2xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                    © Кондитерские изделия «Кристалл», 2000–2023
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <NavLink to="#" className="hover:text-amber-800 duration-200">Политика конфиденциальности</NavLink>
                    <NavLink to="#" className="hover:text-amber-800 duration-200">+7 (8412) 709-900</NavLink>
                </div>
            </div>
        </footer>
    )
}

export default Footer