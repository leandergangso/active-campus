import { useAppState } from "../../contexts/AppContext";
import { Link } from "react-router-dom";
// import { useEffect } from "react";

import Input from "../../components/Actions/Input";
import Button from "../../components/Actions/Button";
import Dropdown from "../../components/Actions/Dropdown";
import UserRoleList from "./components/UserRoleList";

const Index = () => {
  const { state } = useAppState();

  // useEffect() - firestore, state
  const userList = [
    { name: 'Brukerens navn', email: 'bruker@epost.no', role: 'Administrator' },
    { name: 'Brukerens navn', email: 'bruker@epost.no', role: 'Administrator' },
    { name: 'Brukerens navn', email: 'bruker@epost.no', role: 'Administrator' },
    { name: 'Brukerens navn', email: 'bruker@epost.no', role: 'Moderator' },
  ];

  // ! get from state
  const roles = ['Administrator', 'Moderator', 'Hjelper'];

  if (state.organizations.length === 0) {
    return (
      <div>
        <h1 className="font-bold text-2xl mb-5">Bruker roller</h1>
        <div>
          <p className="text-xl text-placeholder">Ingen bruker roller tilgjengelig.</p>
          <p className="text-xl text-placeholder">Bli invitert eller opprett en organisasjon <Link to='/organizations/create' className='text-primary'>her</Link>.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-14">
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-2xl">Bruker roller</h1>

        <div>
          <UserRoleList users={userList} />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 mb-10">
          <h1 className="font-bold text-2xl">Legg til bruker</h1>

          <div>
            <label htmlFor="">Epost</label>
            <Input placeholder='brukers@epost.no' />
          </div>
          <div>
            <label htmlFor="">Rolle</label>
            <Dropdown options={roles} />
          </div>

          <Button>Legg til</Button>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-2xl">Endre bruker rolle</h1>

          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="">Epost</label>
              <Input placeholder='brukers@epost.no' />
            </div>
            <div>
              <label htmlFor="">Rolle</label>
              <Dropdown options={roles} />
            </div>

            <Button>Oppdater</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;