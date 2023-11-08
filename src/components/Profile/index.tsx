import Navbar from "../Navbar";
import ProfileCard from "../ProfileCard";
interface ProfileProps{
  email: string;
}
function Profile({ email }: { email: string }) {

  return (
    
    <>
      <Navbar email={email} />
      <h1 className='cards__header__text'>Profil adatok</h1>
      <ProfileCard text={email} />
    </>
  );
}

export default Profile;
