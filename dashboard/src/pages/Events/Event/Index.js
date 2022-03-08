import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Actions/Button";
import { useAppState } from "../../../contexts/AppContext";
import { getEvent } from "../../../helpers/firestore";

const Index = () => {
  const { id } = useParams();
  const { state } = useAppState();
  const [event, setEvent] = useState();
  const navigate = useNavigate();

  useEffect(async () => {
    if (state.currentOrganization?.id) {
      const event = await getEvent(state.currentOrganization.id, id);
      if (event.exists()) {
        setEvent(event.data());
        return;
      }
      setEvent();
    }
  }, [state.currentOrganization, id]);

  return (
    <div>
      <div className="mb-5">
        <h1 className="font-bold text-2xl">Arrangement info</h1>
      </div>

      {event && (
        <div>
          <p>{id}</p>
          <p>{event.name}</p>
          <p>{event.signup.open.seconds}</p>
        </div>
      )
        || (
          <div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-xl text-danger">404</h3>
              <p className="self-end">Fant ikke arrangement med id: <span className="italic">{id}</span></p>
            </div>
            <div className="w-40 mt-5">
              <Button onClick={() => navigate('/events')} style='secondary'>Tilbake</Button>
            </div>
          </div>
        )}
    </div>
  );
};

export default Index;