
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, Upload, LogIn, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

const Navbar = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  const navItems = [
    {
      label: 'Home',
      path: '/',
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: 'Browse',
      path: '/browse',
      icon: <Search className="w-5 h-5" />,
    },
    {
      label: 'Library',
      path: '/library',
      icon: <Library className="w-5 h-5" />,
      requiresAuth: true,
    },
    {
      label: 'Upload',
      path: '/upload',
      icon: <Upload className="w-5 h-5" />,
      requiresAuth: true,
    },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const filteredNavItems = navItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && isAuthenticated)
  );
  
  return (
    <nav className="fixed top-0 z-40 w-full bg-podcast-dark/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-podcast-green rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-white font-bold text-xl hidden sm:inline-block">PodPulse</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {filteredNavItems.map((item) => (
              <TooltipProvider key={item.path}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isActive(item.path)
                          ? 'text-podcast-green bg-podcast-dark'
                          : 'text-gray-300 hover:text-white hover:bg-podcast-dark'
                      } transition-colors`}
                    >
                      <div className="flex items-center space-x-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            
            {isAuthenticated ? (
              <div className="relative ml-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => logout()}
                        variant="ghost"
                        className="flex items-center space-x-2 text-gray-300 hover:text-white"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="hidden lg:inline-block">Logout</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Logout</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <Link to="/profile">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar className="h-8 w-8 border border-gray-700">
                          <AvatarImage src={user?.avatar} alt={user?.name} />
                          <AvatarFallback>{user?.name[0]}</AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Profile</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            ) : (
              <Button 
                onClick={() => login()} 
                variant="default" 
                className="bg-podcast-green hover:bg-podcast-green/90 text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] bg-podcast-dark border-r border-gray-800">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-10 mt-4">
                    <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                      <div className="w-8 h-8 bg-podcast-green rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">P</span>
                      </div>
                      <span className="text-white font-bold text-xl">PodPulse</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={closeMobileMenu} className="text-gray-300">
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    {filteredNavItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`px-3 py-3 rounded-md text-base font-medium ${
                          isActive(item.path)
                            ? 'text-podcast-green bg-podcast-dark/50'
                            : 'text-gray-300 hover:text-white hover:bg-podcast-dark/50'
                        } transition-colors`}
                        onClick={closeMobileMenu}
                      >
                        <div className="flex items-center space-x-4">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-auto pb-6">
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <Link
                          to="/profile"
                          className="flex items-center px-3 py-3 space-x-4 text-gray-300 hover:text-white"
                          onClick={closeMobileMenu}
                        >
                          <Avatar className="h-8 w-8 border border-gray-700">
                            <AvatarImage src={user?.avatar} alt={user?.name} />
                            <AvatarFallback>{user?.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-base">{user?.name}</span>
                        </Link>
                        <Button
                          onClick={() => {
                            logout();
                            closeMobileMenu();
                          }}
                          variant="outline"
                          className="flex w-full items-center justify-center space-x-2 border-gray-700"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => {
                          login();
                          closeMobileMenu();
                        }} 
                        className="w-full bg-podcast-green hover:bg-podcast-green/90 text-white"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
