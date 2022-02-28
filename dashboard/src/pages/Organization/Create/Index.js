import { useNavigate } from "react-router-dom";
import OrganizationForm from "../components/OrganizationForm";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className='mb-10'>
        <div className='mb-5'>
          <h1 className="text-2xl font-bold">Ny organisasjon</h1>
        </div>
        <OrganizationForm
          submitName='Opprett'
          secondaryName='Avbryt'
          onSecondary={() => navigate('/organizations')}
        />
      </section>
    </div>
  );
};


export default Index;
