import Container from "@/shared/ui/custom/container";
import { useNavigate } from "react-router-dom";
import ListItem from "./item";

const List = () => {
  const navgate = useNavigate();
  const handleClick = () => {
    navgate("/investors/1");
  };
  return (
    <Container>
      <ul>
        <ListItem onClick={handleClick} />
        <ListItem onClick={handleClick} />
        <ListItem onClick={handleClick} />
      </ul>
    </Container>
  );
};

export default List;
