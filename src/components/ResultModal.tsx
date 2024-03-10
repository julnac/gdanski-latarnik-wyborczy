import React from 'react';
import "../styles/resultModal.scss";

interface ResultModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ children, isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div>{children}</div>
            <button className="button__secondary" onClick={onClose}>
                Wróć do stwierdzeń
            </button>
            <button className="modal-close" onClick={onClose}>
                Zamknij
            </button>
        </div>
    );
};

export default ResultModal;