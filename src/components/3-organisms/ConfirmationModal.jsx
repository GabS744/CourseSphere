import Button from "../1-atoms/Button.jsx";

function ConfirmationModal({ title, message, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-8">{message}</p>
        <div className="flex justify-end space-x-4">
          <Button onClick={onClose} variant="secondary">
            Cancelar
          </Button>
          <Button onClick={onConfirm} variant="danger">
            Sim, Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ConfirmationModal;
