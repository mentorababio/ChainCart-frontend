import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Set the app element to avoid accessibility issues
Modal.setAppElement("#root");

interface SearchModalProps {
  query: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// Predefined property listings
const properties = [
  {
    title: "Swamp Land",
    size: "1 acre",
    price: "0.1 XION",
    location: "leave this, fill it later",
    availability: "Available",
  },
  {
    title: "Duplex Islands",
    size: "Duplex Apartment",
    price: "0.2 XION",
    location: "leave this, fill it later",
    availability: "Available",
  },
  {
    title: "Mansion Islands",
    size: "Mansion Apartment",
    price: "0.25 XION",
    location: "leave this, fill it later",
    availability: "Available",
  },
];

const SearchModal: React.FC<SearchModalProps> = ({ query, isOpen, setIsOpen }) => {
  const [results, setResults] = useState<string>("");

  useEffect(() => {
    if (isOpen && query.trim() !== "") {
      searchProperties(query);
    }
  }, [isOpen, query]);

  const searchProperties = (query: string) => {
    const formattedQuery = query.toLowerCase();

    // Check if the query contains the exact title of any property
    const matchingProperties = properties.filter((property) =>
      formattedQuery.includes(property.title.toLowerCase())
    );

    if (matchingProperties.length > 0) {
      const formattedResults = matchingProperties
        .map((property) => `
          **Title of the Land:** ${property.title}
          **Size of Land:** ${property.size}
          **Price of the Land:** ${property.price}
          **Location:** ${property.location}
          **Availability:** ${property.availability}
        `)
        .join("\n\n");

      setResults(formattedResults);
    } else {
      setResults("🚫 Land not currently available at the moment.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg mx-auto outline-none relative"
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

      {/* Modal Header (Fixed) */}
      <div className="sticky top-0 bg-white z-10 pb-2 border-b">
        <h2 className="text-xl font-semibold text-gray-900 text-center">Search Results</h2>
        <p className="text-center text-gray-600 mt-2">
          Query: <span className="font-semibold">{query}</span>
        </p>
      </div>

      {/* Scrollable Search Results */}
      <div className="mt-4 text-gray-700 whitespace-pre-line max-h-80 overflow-y-auto p-2">
        {results}
      </div>
    </Modal>
  );
};

export default SearchModal;
 