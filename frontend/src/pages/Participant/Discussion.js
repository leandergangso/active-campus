import { useParams } from "react-router-dom";

const Discussion = () => {
  const { id } = useParams();

  return (
    <div>Discussion for event with id: {id}</div>
  );
};

export default Discussion;