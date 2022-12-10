import { CaretDown, User } from "phosphor-react";

export function Profile() {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return (
      <button className="text-rotion-100 group mx-5 flex items-center gap-2 text-sm font-medium">
        <div className="bg-rotion-500 h-5 w-5 rounded-sm p-1">
          <User className="text-rotion-300 h-3 w-3" />
        </div>
        Fazer login
      </button>
    );
  }

  return (
    <button className="text-rotion-50 group mx-5 flex items-center gap-2 text-sm font-medium">
      <img
        className="h-5 w-5 rounded-sm"
        src="https://avatars.githubusercontent.com/u/2254731?v=4"
        alt=""
      />
      Diego Fernandes
      <CaretDown className="text-rotion-100 group-hover:text-rotion-50 h-4 w-4" />
    </button>
  );
}
