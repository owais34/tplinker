import Button from "../components/Button";
import Header from "../components/Header";
import FlexContainer from "../components/FlexContainer";

const Home = () => {
  return (
    <>
      <Header />
      <FlexContainer>
        <Button text={"Login with Oauth"} />
        <Button text={"Login Customized auth"} />
      </FlexContainer>
    </>
  );
};

export default Home;
