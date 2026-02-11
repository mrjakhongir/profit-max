import Container from "@/shared/ui/custom/container";
import ListItem from "./item";

const List = () => {
  return (
    <Container className="z-20">
      <ul>
        <ListItem />
        <ListItem />
        <ListItem />
      </ul>
    </Container>
  );
};

export default List;
