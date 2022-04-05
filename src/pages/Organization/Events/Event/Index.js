import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "components/Actions/Button";
import { useAppState } from "contexts/AppContext";
import { getEvent } from "helpers/firestore";

const Index = () => {
  const { id } = useParams();
  const { state } = useAppState();
  const [event, setEvent] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      if (state.currentOrganization?.id) {
        const event = await getEvent(state.currentOrganization.id, id);
        if (event.exists()) {
          setEvent(event.data());
          return;
        }
        setEvent();
      }
    };
    return run();
  }, [state.currentOrganization, id]);

  if (!event) {
    return (
      <div>
        <h1 className="font-bold text-2xl mb-5">Ugylding arrangement</h1>
        <p className="text-xl">Fant ikke arrangement med id: {id}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-bold text-2xl">Arrangement info</h1>
      </div>

      <div>
        <p>{id}</p>
        <p>{event.name}</p>
        <p>{event.signup.open.seconds}</p>
      </div>
    </div>
  );
};

export default Index;