import Link from 'next/link';
import { useEffect, useState } from 'react';
import Sidenav from './sidenav';
import { fetch } from '../utils/fetch';


const Navbar = () => {
  const [menus, setMenus] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [sidenav, setSidenav] = useState(false);
  const height = 56;

  useEffect(async () => {
    const localMenus = (localStorage.getItem('menus') && JSON.parse(localStorage.getItem('menus'))) || await fetch(`/wp-api-menus/v2/menus/${process.env.NEXT_PUBLIC_NAVBAR_ID}`, { baseUrl: `${process.env.NEXT_PUBLIC_API_HOST}/wp-json` })
      .then((menu) => menu.items)
      .catch(() => []);

    setMenus(localMenus);
    localStorage.setItem('menus', JSON.stringify(localMenus));

    function updateScrollPosition() {
      const offset = 56;
      const scrolled = (window.scrollY + offset) >= (document.querySelector('.above-the-fold') ? document.querySelector('.above-the-fold').clientHeight : window.visualViewport.height / 2);
      setScrolled(scrolled);
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('scroll', updateScrollPosition, false);
    }

    return function () {
      document.removeEventListener('scroll', updateScrollPosition, false);
    }
  }, []);

  useEffect(() => {
    document.body.classList[sidenav ? 'add' : 'remove']('overflow-hidden')
  }, [sidenav]);

  return (
    <>
      <style jsx>
        {`
          #navbar-wrapper {
            position: fixed;
            width: 100vw;
            height: ${height * 2}px;
            z-index: 9;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all .3s ease;

            &.scrolled {
              height: ${height}px;
              background: #fff;
              box-shadow: 0px 2px 10px -7px rgba(0, 0, 0, 0.3);

              .logo-wrapper {
                img {
                  filter: none;
                }
              }
            }

            [class*="btn-outline"] {
              &:hover {
                background: transparent;
              }
            }

            ul {
              display: flex;
              padding: 0;
              margin-bottom: 0;
              align-items: center;
  
              li {
                list-style: none;
                margin-right: 20px;
                font-size: 16px;
              }
            }

            .logo-wrapper {
              img {
                filter: contrast(100);
              }
            }
          }
        `}
      </style>
      <style jsx global>
        {`
          #navbar-wrapper {
            ul {
              li {
                a {
                  color: #fff;
                }
              }
            }

            &.scrolled {
              ul {
                li {
                  a {
                    color: black;
                  }
                }
              }
            }
          }
        `}
      </style>
      <nav id="navbar-wrapper" className={scrolled && !sidenav && 'scrolled'}>
        <div className="logo-wrapper pl-4">
          <Link href="/">
            <img src={process.env.NEXT_PUBLIC_IMAGE_CDN + 'https://api.svararesort.com/logotype?w=100&h=35'} />
          </Link>
        </div>
        <ul className="m-0 p-0 d-flex">
          <li>
            <a onClick={() => setSidenav(!sidenav)} className={`btn btn-outline-${scrolled || sidenav ? 'dark' : 'light'} text-${(scrolled || sidenav) && 'dark'}`}>
              <div className={`fas fa-${sidenav ? 'times' : 'bars'}`} />
            </a>
          </li>
        </ul>
      </nav>

      <Sidenav menus={menus} show={sidenav} onChange={() => setSidenav(!sidenav)} />
    </>
  );
};

export default Navbar;