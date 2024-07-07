import React from 'react';

const PasswordAlert: React.FC = () => (
  <div className="my-4 p-4 rounded bg-red-600 flex items-center">
    <div className="flex-grow">
      <div className="text-lg">100%</div>
      <div>Todas tus contraseñas son vulnerables.</div>
    </div>
    <button className="ml-4 p-2 bg-white text-red-600 rounded">
      Cambialas ahora →
    </button>
  </div>
);

export default PasswordAlert;
