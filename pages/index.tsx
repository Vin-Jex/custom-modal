import React, { useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const index: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center'>
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm'></div>
        <div
          ref={modalRef}
          className='relative bg-white rounded-lg shadow-lg dark:bg-gray-700'
        >
          <button
            type='button'
            className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
            onClick={onClose}
          >
            &times;
          </button>
          <div className='px-6 py-4 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-base font-semibold text-gray-900 lg:text-xl dark:text-white'>
              Connect wallet
            </h3>
          </div>
          <div className='p-6'>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
