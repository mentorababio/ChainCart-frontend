import React from "react";
import Modal from "react-modal";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react"; // Close icon

// Set the app element to avoid accessibility issues
Modal.setAppElement("#root");

interface SearchModalProps {
  query: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ query, isOpen, setIsOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg mx-auto outline-none"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
    >
      {/* Close Button */}
      <Button 
        variant="ghost" 
        className="absolute top-2 right-2 p-2 rounded-full" 
        onClick={() => setIsOpen(false)}
      >
        <X className="w-5 h-5" />
      </Button>

      {/* Modal Header */}
      <h2 className="text-xl font-semibold text-gray-900 text-center">Search Results</h2>
      <p className="text-center text-gray-600 mt-2">
        Showing results for: <span className="font-semibold">{query}</span>
      </p>

      {/* Search Results Placeholder */}
      <div className="mt-4 text-gray-700 text-center">
        <p className="text-gray-500">No matching properties found. 🏡 Try a different search term!</p>
      </div>
    </Modal>
  );
};

export default SearchModal;
