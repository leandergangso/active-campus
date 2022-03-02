import CreateOrganizationForm from "../components/CreateOrganizationForm";

const Index = () => {
  return (
    <div>
      <section className='mb-10'>
        <div className='mb-5'>
          <h1 className="text-2xl font-bold">Ny organisasjon</h1>
        </div>
        <CreateOrganizationForm />
      </section>
    </div>
  );
};


export default Index;
