const { useEffect, useState } = require('react')
const fetch = require('../utils/fetch').fetch

const Footbar = () => {
  const [menus, setMenus] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  useEffect(async () => {
    await fetch(`/wp-api-menus/v2/menus/''`, { baseUrl: `${process.env.NEXT_PUBLIC_API_HOST}/wp-json` })
      .then((menu) => setMenus(menu.items || []))

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
  }, [])

  if (menus == 0) return null;

  return (
    <>
      <style jsx>
        {`
          #footbar-wrapper {
            position: fixed;
            bottom: -100%;
            z-index: 9;
            width: 100vw;
            height: 48px;
            transition: bottom .3s ease;

            ul {
              li {
                list-style: none;
                margin-right: 20px;

                a {
                  color: white;
                }
              }
            }

            &.scrolled {
              bottom: 0;
            }
          }
        `}
      </style>
      <div id="footbar-wrapper" className={`bg-dark ${scrolled && 'scrolled'}`}>
        <ul className="d-flex p-0 m-0 justify-content-center align-items-center w-100 h-100">
          {
            menus.map((menu, index) => (
              <li key={index}>
                <a href={menu.url} title={menu.attr}>
                  <span className={`fa${menu.title === 'envelope' ? 's' : 'b'} fa-${menu.title}`} />
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default Footbar;