import { MdDelete, MdModeEdit } from 'react-icons/md';

const UserRoleList = ({ roleList, onClick }) => {
  return (
    <div className="rounded-md shadow-sm border border-border bg-light max-h-[550px] md:h-full overflow-y-auto overflow-x-hidden">
      {roleList.map(item => (
        <div key={item.role}>
          <h3 className="bg-background text-placeholder text-sm font-bold px-4 py-2 border-b border-border">{item.role}</h3>
          {item.users.map(user => (
            <User key={user.email} username={user.name} email={user.email} role={item.role} onClick={onClick} />
          ))}
        </div>
      ))}
    </div>
  );
};

const User = ({ username, email, role, onClick }) => {
  let n = 31;
  if (email.length > n) {
    email = email.substring(0, n) + '...';
  }
  if (username.length > n) {
    username = username.substring(0, n) + '...';
  }

  return (
    <div className="flex gap-5 sm:w-80 justify-between px-4 border-b border-border">
      <div className="flex flex-col py-2">
        <h2 className='text-base'>{username}</h2>
        <h3 className='text-sm'>{email}</h3>
      </div>

      {role && onclick && (
        <div className="flex gap-5 justify-end items-center px-2">
          <MdModeEdit onClick={() => onClick(email, role)} size={24} className='fill-primary hover:cursor-pointer' />
          <MdDelete size={24} className='fill-danger hover:cursor-pointer' />
        </div>
      )}
    </div>
  );
};

export default UserRoleList;