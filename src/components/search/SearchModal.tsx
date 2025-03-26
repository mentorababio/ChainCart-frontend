import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Set the app element to avoid accessibility issues
Modal.setAppElement("#root");

interface SearchModalProps {
  query: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ query, isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string>("");

  useEffect(() => {
    if (isOpen && query.trim() !== "") {
      fetchHouseHistory(query);
    }
  }, [isOpen, query]);

  const fetchHouseHistory = async (address: string) => {
    setLoading(true);
    setHistory("");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a real estate historian. Provide a brief but detailed history of a given house address, including past owners, major events, and any notable architectural changes."
            },
            {
              role: "user",
              content: `Give me the history of this house address: ${address}`
            }
          ],
          max_tokens: 300
        },
        {
          headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      setHistory(response.data.choices[0]?.message?.content || "No history found.");
    } catch (error) {
      console.error("Error fetching house history:", error);
      setHistory("Failed to retrieve history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      <h2 className="text-xl font-semibold text-gray-900 text-center">House History</h2>
      <p className="text-center text-gray-600 mt-2">
        Address: <span className="font-semibold">{query}</span>
      </p>

      {/* Loading State */}
      {loading ? (
        <div className="text-center mt-4 text-gray-500">Fetching history... ⏳</div>
      ) : (
        <div className="mt-4 text-gray-700 text-center">
          <p className="text-gray-500">{history}</p>
        </div>
      )}
    </Modal>
  );
};

export default SearchModal;
