import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
import { Logo } from '../components'


// const StyledBtn = styled.button`
// font-size: 1.5rem;
// background: red;
// color: white;
// `

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ipsa consequuntur non quas in natus sunt necessitatibus? Tempore ad vel distinctio sequi, beatae pariatur quis, nulla, perspiciatis tempora quod culpa!</p>
          <Link to='/register' className='btn register-link'>
              Register
          </Link>
          <Link to='/login' className='btn '>
              Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className='img main-img' />
      </div>
    </Wrapper>
  );
}


export default Landing


