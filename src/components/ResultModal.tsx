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
        <div className="dark">
            <div className="modal">
                <div>{children}</div>
                <button className="button__secondary" onClick={onClose}>
                    Wróć do stwierdzeń
                </button>
                <button className="modal-close" onClick={onClose}>
                    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12H20M12 4V20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ResultModal;