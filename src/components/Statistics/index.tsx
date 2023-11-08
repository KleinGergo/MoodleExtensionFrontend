
import Navbar from "../Navbar";
import Cards from "../Cards"

function Statistic({ email }: { email: string }) {
    
// Make 'email' optional with 'email?'
  
    return (
    <><Navbar email={email || ''} />
    <div className="cards">
     <div className="cards__container">
      <div className="cards__wrapper">
        <ul className="cards__item">
        <Cards ></Cards>
        </ul>
      </div>
     </div>
     
    </div>
      </>
      
    );
  };

export default Statistic;