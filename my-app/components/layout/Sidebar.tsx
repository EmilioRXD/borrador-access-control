'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import "./Sidebar.css";
import Image from "next/image";

function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const overlay = document.querySelector('.mobile-menu-overlay');
      if (isMobileMenuOpen && overlay && event.target === overlay) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}></div>
        <div className={`mobile-menu-container ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <div className="logo_name">Menu</div>
            <button className="mobile-menu-close" onClick={toggleMobileMenu}>
              <i className='bx bx-x'></i>
            </button>
          </div>
          <ul className="mobile-menu-items">
            <li>
              <Link className="active" href="/dashboard">
                <i className='bx bx-line-chart'></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/usuarios">
                <i className='bx bx-group'></i>
                <span>Usuarios</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/estudiantes">
                <i className='bx bx-user-pin'></i>
                <span>Estudiantes</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/tarjetas">
                <i className='bx bx-credit-card'></i>
                <span>Tarjetas</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/registros">
                <i className='bx bx-book-alt'></i>
                <span>Registros</span>
              </Link>
            </li>
          </ul>
          <div className="mobile-menu-footer">
            <div className="mobile-user-info">
              <Image src="/img/profile.jpg" alt="profileImg" width={40} height={40} />
              <div className="mobile-user-details">
                <div className="mobile-user-name">Chuo</div>
                <div className="mobile-user-role">Administrador</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo-details">
          <i className='bx bx-grid-alt icon'></i>
          <div className="logo_name">Menu</div>
          <i className='bx bx-menu' id="btn" onClick={toggleSidebar}></i>
        </div>
        <ul className="nav-list">
          <li>
            <Link className="active" href="/dashboard">
              <i className='bx bx-line-chart'></i>
              <span className="links_name">Dashboard</span>
            </Link>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <Link href="/dashboard/usuarios">
              <i className='bx bx-group'></i>
              <span className="links_name">Usuarios</span>
            </Link>
            <span className="tooltip">Usuarios</span>
          </li>
          <li>
            <Link href="/dashboard/estudiantes">
              <i className='bx bx-user-pin'></i>
              <span className="links_name">Estudiantes</span>
            </Link>
            <span className="tooltip">Estudiantes</span>
          </li>
          <li>
            <Link href="/dashboard/tarjetas">
              <i className='bx bx-credit-card'></i>
              <span className="links_name">Tarjetas</span>
            </Link>
            <span className="tooltip">Tarjetas</span>
          </li>
          <li>
            <Link href="/dashboard/registros">
              <i className='bx bx-book-alt'></i>
              <span className="links_name">Registros</span>
            </Link>
            <span className="tooltip">Registros</span>
          </li>
          <li className="profile">
            <div className="profile-details">
              <Image src="/img/profile.jpg" alt="profileImg" width={40} height={40} />
              <div className="name_job">
                <div className="name">Chuo</div>
                <div className="job">Administrador</div>
              </div>
            </div>
            <i className='bx bx-log-out' id="log_out"></i>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
