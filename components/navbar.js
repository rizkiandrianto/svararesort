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
    function updateScrollPosition() {
      const offset = 56;
      const scrolled = (window.scrollY + offset) >= (document.querySelector('.above-the-fold') ? document.querySelector('.above-the-fold').clientHeight : window.visualViewport.height / 2);
      setScrolled(scrolled);
    }

    if (typeof document !== 'undefined') {
      document.addEventListener('scroll', updateScrollPosition, false);
    }

    await fetch(`/wp-api-menus/v2/menus/${process.env.NEXT_PUBLIC_NAVBAR_ID}`, { baseUrl: `${process.env.NEXT_PUBLIC_API_HOST}/wp-json` })
      .then((menu) => {
        setMenus(menu.items)
        window.menus = menus;
      })
      .catch(() => false);

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
          <img src={process.env.NEXT_PUBLIC_IMAGE_CDN + 'https://api.svararesort.com/logotype?w=100&h=35'} />
        </div>
        <ul className="m-0 p-0 d-flex">
          {
            menus.map((menu, index) => (
              <li key={index} className="d-none d-sm-block" key={index}>
                <Link href={menu.url}>
                  {menu.title}
                </Link>
              </li>
            ))
          }
          <li className="d-block d-sm-none">
            <a onClick={() => setSidenav(!sidenav)} className={`btn btn-outline-${scrolled || sidenav ? 'dark' : 'light'} text-${(scrolled || sidenav) && 'dark'}`}>
              <div className="fas fa-bars" />
            </a>
          </li>
        </ul>
      </nav>

      <Sidenav menus={menus} show={sidenav} />
    </>
  );
};

export default Navbar;