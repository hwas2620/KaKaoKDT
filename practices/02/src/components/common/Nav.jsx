import './Nav.css';

function Nav() {
    return (
        <nav>
          <ul>
              <li>
                  <a href="#header">
                      <img src="/imgs/icon-home.webp" alt="HOME" />
                      <span>HOME</span>
                  </a>
              </li>
              <li>
                  <a href="#explore">
                      <img src="/imgs/icon-explore.webp" alt="탐색" />
                      <span>EXPLORE</span>
                  </a>
              </li>
              <li>
                  <a href="#category">
                      <img src="/imgs/icon-category.webp" alt="카테고리" />
                      <span>CATEGORY</span>
                  </a>
              </li>
              <li>
                  <a href="#my-soak">
                      <img src="/imgs/icon-my-soak.webp" alt="내 정보" />
                      <span>MY SOAK</span>
                  </a>
              </li>
          </ul>
      </nav>
    );
}

export default Nav;