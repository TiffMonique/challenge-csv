import { IModal } from './Modal.interface';
import { GrClose } from 'react-icons/gr';

const Modal = ({ isOpen, onClose, title, children }: IModal) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="relative bg-white-500 rounded-lg shadow max-w-md w-full mx-4">
                <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                    onClick={() => onClose(true)}
                >
                    <GrClose />
                </button>
                <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900">{title}</h3>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
