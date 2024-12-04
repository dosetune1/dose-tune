import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/logo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-20 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="DoseTune Logo" className="h-16" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-secondary hover:text-primary">Home</Link>
            <Link to="/services" className="text-secondary hover:text-primary">Services</Link>
            <Link to="/about" className="text-secondary hover:text-primary">About</Link>
            <Link to="/contact" className="text-secondary hover:text-primary">Contact</Link>
            <Link to="/order" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80">
              Order Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link to="/" className="block text-secondary hover:text-primary">Home</Link>
            <Link to="/services" className="block text-secondary hover:text-primary">Services</Link>
            <Link to="/about" className="block text-secondary hover:text-primary">About</Link>
            <Link to="/contact" className="block text-secondary hover:text-primary">Contact</Link>
            <Link to="/order" className="block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 text-center">
              Order Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};