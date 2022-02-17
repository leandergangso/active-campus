import Input from "../../components/Actions/Input"
import Button from "../../components/Actions/Button"
import Dropdown from "../../components/Actions/Dropdown"
import UserRoleList from "./components/UserRoleList"

const Index = () => {
  const userList = [
    { name: 'Brukerens navn', email: 'bruker@epost.no', role: 'Administrator' },
    { name: 'Brukerens navn', email: 'bruker@epost.no', role: 'Administrator' },
    { name: 'Brukerens navn', email: 'bruker@epost.no', role: 'Administrator' },
    { name: 'Brukerens navn', email: 'bruker@epost.no', role: 'Moderator' },
  ]

  const roles = ['Administrator', 'Moderator', 'Hjelper']

  return (
    <div className="flex gap-14">
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-2xl">Alle brukere</h1>

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
  )
}

export default Index