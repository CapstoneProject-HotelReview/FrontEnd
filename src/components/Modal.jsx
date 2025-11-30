import ImageCropper from "./ImageCropper";

export default function Modal({ closeModal }) {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* close icon */}
        <button 
          type="button" 
          className="close-x" 
          onClick={closeModal} 
          aria-label="Close"
        >
          &times;
        </button>
        <ImageCropper />
      </div>
    </div>
  );
}
