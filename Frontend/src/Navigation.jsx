import { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from "./components/ui/button";
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router';

function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleScrollTo = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <nav className="sticky top-0 z-50 px-4 py-2 shadow-md bg-blue-950/90 backdrop-blur-md">
            <div className="flex items-center justify-between mx-auto max-w-7xl">

                {/* Logo */}
                <Link to="/" className="text-xl font-bold tracking-wide text-white hover:text-slate-300">
                    LFRS
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-6 text-white font-medium text-base">
                    <li><Link to="/" className="hover:text-slate-300 transition">Home</Link></li>
                    <li><Link to="/reports" className="hover:text-slate-300 transition">Reports</Link></li>
                    <li><button onClick={() => handleScrollTo('aboutUs')} className="hover:text-slate-300 transition">About</button></li>
                    <li><button onClick={() => handleScrollTo('footer')} className="hover:text-slate-300 transition">Contact</button></li>
                </ul>

                {/* Desktop Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        <Link to="/signin">
                            <Button variant="link" className="text-white">Signin</Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900">Signup</Button>
                        </Link>
                    </SignedOut>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden text-white" onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>

            {/* Mobile Dropdown Menu - Compact */}
            {isOpen && (
                <div className="md:hidden mt-2 px-3 py-2 space-y-1 bg-blue-900/95 text-white rounded-md shadow-md max-h-[60vh] overflow-y-auto text-sm">
                    <ul className="space-y-1">
                        <li><Link to="/" onClick={toggleMenu} className="block py-1 hover:text-slate-300">Home</Link></li>
                        <li><Link to="/reports" onClick={toggleMenu} className="block py-1 hover:text-slate-300">Reports</Link></li>
                        <li><button onClick={() => handleScrollTo('aboutUs')} className="block w-full text-left py-1 hover:text-slate-300">About</button></li>
                        <li><button onClick={() => handleScrollTo('footer')} className="block w-full text-left py-1 hover:text-slate-300">Contact</button></li>
                    </ul>

                    <div className="pt-2 border-t border-slate-600 flex flex-col gap-1">
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                        <SignedOut>
                            <Link to="/signin">
                                <Button
                                    variant="link"
                                    className="w-full text-white text-xs px-2 py-1"
                                >
                                    Signin
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button
                                    variant="outline"
                                    className="w-full text-white text-xs px-2 py-1 border-white hover:bg-white hover:text-blue-900"
                                >
                                    Signup
                                </Button>
                            </Link>
                        </SignedOut>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navigation;
