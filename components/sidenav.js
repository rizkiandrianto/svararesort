import Link from 'next/link';

const Sidenav = ({ menus, show, onChange }) => (
  <>
    <style jsx>
      {`
        #sidebar {
          width: 100vw;
          height: 100vh;
          position: fixed;
          z-index: 8;
          right: -100%;
          top: 0;
          background: rgb(255, 255, 255);
          transition: right 0.5s ease;
          max-width: 500px;

          &.show {
            right: 0;
          }

          ul {
            padding: 100px 20% !important;
            height: 100%;

            li {
              list-style: none;
              padding: 10px;
              border-bottom: 1px solid black;

              &:first-child {
                border-top: 1px solid black;
              }
            }
          }
        }
      `}
    </style>

    <style jsx global>
      {`
        #sidebar {
          ul {
            li {
              a {
                color: #000;
                display: block;
                text-align: center;
              }
            }
          }
        }
      `}
    </style>
    <div id="sidebar" className={show && 'show'}>
      <ul className="m-0 p-0 overflow-auto">
        {
          menus.map((menu, index) => (
            <li onClick={onChange} className="m-0" key={index}>
              <Link href={menu.url}>
                {menu.title}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  </>
);

export default Sidenav;