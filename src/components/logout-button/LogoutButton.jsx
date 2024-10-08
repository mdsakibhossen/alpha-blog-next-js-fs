"use client";
import { signOut } from "next-auth/react";
const LogoutButton = () => {
  return (
    <button onClick={signOut} className="bg-green-400 transition-all duration-300 hover:bg-green-500 active:bg-green-600 px-8 py-2.5 rounded text-white">
      Logout
    </button>
  );
}

export default LogoutButton