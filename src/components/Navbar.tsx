import React from 'react';
import { Zap, Github, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ModeToggle } from './mode-toggle';

const Navbar: React.FC = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 rounded-xl shadow-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HRone-JSON Schema Builder
                </h1>
                <p className="text-xs text-muted-foreground hidden md:block">
                  Professional schema development tool
                </p>
              </div>
              <div className="block sm:hidden">
                <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Schema Builder
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
             
              <a
                href="https://github.com/priyanshu082/jsonbuilder"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="lg" className="p-2 border-[1px] ">
                  <Github className="h-4 w-4" />
                </Button>
              </a>

              <ModeToggle/>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Theme Toggle for Mobile */}
              <ModeToggle/>

              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="container mx-auto px-4 py-4 space-y-2">
             
              <div className="pt-2 border-t">
                <a
                  href="https://github.com/priyanshu082/jsonbuilder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block"
                >
                  <Button variant="ghost" className="w-full justify-start">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub Repository
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;