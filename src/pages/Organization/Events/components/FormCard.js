import { Draggable } from 'react-beautiful-dnd';
import { MdRemoveCircle, MdDragIndicator, MdDelete } from 'react-icons/md';
import Checkbox from "components/Actions/Checkbox";
import Dropdown from "components/Actions/Dropdown";
import Input from "components/Actions/Input";

const FormCard = ({ data, updateData, id, index, question, type, options, required }) => {
  const typeOptions = [
    { id: 'Tekst', name: 'Tekst' },
    { id: 'Flervalg', name: 'Flervalg' },
    { id: 'Enkelvalg', name: 'Enkelvalg' },
  ];

  const removeForm = () => {
    let formData = data.forms;
    formData = formData.filter(form => {
      return form.id !== id;
    });
    updateData('forms', formData);
  };

  const curryUpdate = (type, checked) => {
    return (e) => {
      let formData = data.forms;
      let index = formData.findIndex(form => form.id === id);
      formData[index][type] = checked ? e.target.checked : e.target.value;
      updateData('forms', formData);
    };
  };

  const curryReset = (type, checked) => {
    return (e) => {
      let formData = data.forms;
      let index = formData.findIndex(form => form.id === id);
      formData[index][type] = checked ? e.target.checked : e.target.value;
      formData[index].options.filter(option => {
        return option.checked = false;
      });
      updateData('forms', formData);
    };
  };

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="relative bg-background rounded-md mb-5 px-4 py-4 border-2 border-border"
        >
          <div className='flex flex-wrap sm:flex-nowrap gap-5'>
            <Input value={question} onChange={curryUpdate('question')} name={question} placeholder='Spørsmål' />
            <Dropdown value={type} onChange={curryReset('type')} options={typeOptions} />
            <div className='flex gap-2'>
              <MdRemoveCircle onClick={removeForm} className="fill-danger self-center w-8 h-8 hover:cursor-pointer" />
              <div {...provided.dragHandleProps} className='self-center hover:cursor-move'>
                <MdDragIndicator className='w-8 h-8 fill-dark' />
              </div>
            </div>
          </div>

          <div className='flex justify-end gap-5'>
            <div className='w-full self-center h-full'>

              {type === 'Flervalg' && <Select options={options} id={id} data={data} updateData={updateData} />}
              {type === 'Enkelvalg' && <Radio options={options} id={id} data={data} updateData={updateData} />}

              <div className={type !== 'Tekst' ? 'mt-10' : 'mt-5'}>
                <Checkbox
                  label="Obligatorisk"
                  checked={required}
                  onChange={curryUpdate('required', true)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

const Select = ({ options, id, data, updateData }) => {
  const getId = () => {
    return + new Date();
  };

  const delOption = (optionID) => {
    return (e) => {
      let formData = data.forms;
      let index = formData.findIndex(form => form.id === id);
      formData[index].options = formData[index].options.filter(option => {
        return option.id !== optionID;
      });
      updateData('forms', formData);
    };
  };

  const addOption = () => {
    let formData = data.forms;
    let index = formData.findIndex(form => form.id === id);
    formData[index].options.push({
      id: getId(),
      name: '',
      checked: false,
    });
    updateData('forms', formData);
  };

  const curryUpdate = (optionID, type, checked) => {
    return (e) => {
      let formData = data.forms;
      let index = formData.findIndex(form => form.id === id);
      let optionIndex = formData[index].options.findIndex(option => option.id === optionID);
      formData[index].options[optionIndex][type] = checked ? e.target.checked : e.target.value;
      updateData('forms', formData);
    };
  };

  return (
    <div className='relative rounded-md bg-light border-2 border-border my-4'>
      <div onClick={addOption} className='absolute right-4 -bottom-8 rounded-b-md bg-light text-secondary text-sm font-bold px-6 py-1 border-2 border-border hover:cursor-pointer'>
        Legg til
      </div>

      {options.map(option => (
        <div key={option.id} className='relative px-4 py-2 border-b border-border'>
          <div className='flex'>
            <Checkbox value={option.checked} onChange={curryUpdate(option.id, 'checked', true)} />
            <input
              className='w-full mr-10 outline-none border-b border-transparent focus:border-border'
              type="text"
              placeholder='Ett valg ...'
              value={option.name}
              onChange={curryUpdate(option.id, 'name')}
            />
          </div>
          {options.length > 1 &&
            <MdDelete onClick={delOption(option.id)} className='absolute right-5 top-0 bottom-0 m-auto fill-danger w-6 h-6 hover:cursor-pointer' />
          }
        </div>
      ))}
    </div>
  );
};

const Radio = ({ options, id, data, updateData }) => {
  const getId = () => {
    return + new Date();
  };

  const delOption = (optionID) => {
    return (e) => {
      let formData = data.forms;
      let index = formData.findIndex(form => form.id === id);
      formData[index].options = formData[index].options.filter(option => {
        return option.id !== optionID;
      });
      updateData('forms', formData);
    };
  };

  const addOption = () => {
    let formData = data.forms;
    let index = formData.findIndex(form => form.id === id);
    formData[index].options.push({
      id: getId(),
      name: '',
      checked: false,
    });
    updateData('forms', formData);
  };

  const curryUpdate = (optionID, type, checked) => {
    return (e) => {
      let formData = data.forms;
      let index = formData.findIndex(form => form.id === id);
      let optionIndex = formData[index].options.findIndex(option => option.id === optionID);
      formData[index].options[optionIndex][type] = checked ? e.target.checked : e.target.value;
      updateData('forms', formData);
    };
  };

  const curryReset = (optionID, type, checked) => {
    return (e) => {
      let formData = data.forms;
      let index = formData.findIndex(form => form.id === id);
      let optionIndex = formData[index].options.findIndex(option => option.id === optionID);
      formData[index].options.filter(option => {
        return option.checked = false;
      });
      formData[index].options[optionIndex][type] = checked ? e.target.checked : e.target.value;
      updateData('forms', formData);
    };
  };

  return (
    <div className='relative rounded-md bg-light border-2 border-border my-4'>
      <div onClick={addOption} className='absolute right-4 -bottom-8 rounded-b-md bg-light text-secondary text-sm font-bold px-6 py-1 border-2 border-border hover:cursor-pointer'>
        Legg til
      </div>

      {options.map(option => (
        <div key={option.id} className='relative px-4 py-2 border-b border-border'>
          <div className='flex'>
            <input value={option.checked} onChange={curryReset(option.id, 'checked', true)} type="radio" name={id} className='mr-4' />
            <input
              className='w-full mr-10 outline-none border-b border-transparent focus:border-border'
              type="text"
              placeholder='Ett valg ...'
              value={option.name}
              onChange={curryUpdate(option.id, 'name')}
            />
          </div>
          {options.length > 1 &&
            <MdDelete onClick={delOption(option.id)} className='absolute right-5 top-0 bottom-0 m-auto fill-danger w-6 h-6 hover:cursor-pointer' />
          }
        </div>
      ))}
    </div>
  );
};

export default FormCard;
