import Logo  from '../images/logo.svg';

function Header() {
    return (
      <header className="header">
        <img className="header__logo" src={Logo} alt="Around the US" />
      </header>
    )
}

export default Header;