import Navbar from "../Navbar";
import ProfileCard from "../ProfileCard";
interface Props {
  email: string;
  logout: () => void;
}

function Profile({ email, logout }: Props ) {

  return (
    
    <>
      <Navbar email={email} />
      <h1 className='cards__header__text'>Profil adatok</h1>
      <ProfileCard text={email} logout={logout}/>
    </>
  );
}

export default Profile;
