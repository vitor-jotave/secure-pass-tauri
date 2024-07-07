import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2500); // fade-out dps de 2.5s

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 3500); // Termina tela de inicio dps de 3.5s

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-fullblack text-white z-50 ${fadeOut ? 'fade-out' : ''}`}>
      <div className="text-center">
        <h1 className={`text-4xl font-bold mb-4 ${fadeOut ? 'fade-out' : 'fade-in'}`}>SecurePass</h1>
      </div>
    </div>
  );
};

export default SplashScreen;
