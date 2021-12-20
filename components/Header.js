import Link from 'next/link';

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Company Not listed ?', href: '/post' },
    currentUser &&
      currentUser.email == 'rahul@gmail.com' && {
        label: 'Admin',
        href: '/admin-home-page',
      },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className='nav-item'>
          <Link href={href}>
            <a className='nav-link'>{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className='navbar navbar-light bg-light'>
      <Link href='/'>
        <a className='navbar-brand'>speakup</a>
      </Link>

      <div className='d-flex justify-content-end'>
        <ul className='nav d-flex align-items-center'>{links}</ul>
      </div>
      <hr></hr>
    </nav>
  );
};
