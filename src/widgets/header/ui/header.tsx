import Container from "@/shared/ui/custom/container";

type Properties = {
  title: string;
};

export const Header: React.FC<Properties> = ({ title }) => {
  return (
    <div className="relative z-20 border-b">
      <Container className="py-3">
        <h1 className="text-primary text-center font-mono text-xl font-semibold">
          {title}
        </h1>
      </Container>
    </div>
  );
};
