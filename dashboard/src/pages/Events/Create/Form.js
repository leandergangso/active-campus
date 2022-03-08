import { Droppable, DragDropContext } from "react-beautiful-dnd";
import Button from "../../../components/Actions/Button";
import FormCard from "../components/FormCard";

const Form = ({ prevStep, submit, error, updateData, data }) => {
  const getId = () => {
    return + new Date();
  };

  const addForm = () => {
    const formData = data.forms;
    formData.push({
      id: getId(),
      question: '',
      type: 'Tekst',
      options: [{
        id: getId(),
        name: '',
        checked: false,
      }],
      required: false,
    });
    updateData('forms', formData);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const forms = Array.from(data.forms);
    const [reorderedForms] = forms.splice(source.index, 1);
    forms.splice(destination.index, 0, reorderedForms);

    updateData('forms', forms);
  };

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">Påmeldings skjema</h1>

      <div className="flex flex-col">
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-5 w-full max-w-lg">

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='forms'>
                {provided => (
                  <ul className="flex flex-col" {...provided.droppableProps} ref={provided.innerRef}>
                    {data.forms.map((form, index) => (
                      <FormCard key={form.id} data={data} updateData={updateData} index={index} {...form} />
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>

            <Button onClick={addForm}>Legg til nytt felt</Button>

            <div className="flex flex-col gap-5 mt-5">
              {error && <p className="text-center text-danger">{error}</p>}

              <div className="flex gap-5 w-full sm:w-80 flex-wrap sm:flex-nowrap">
                <Button onClick={submit}>Opprett</Button>
                <Button style='secondary' onClick={prevStep}>Forrige</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Form;
