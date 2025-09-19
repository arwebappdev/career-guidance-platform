import React, { useState, useEffect } from "react";
import { Book, Search, Download } from "lucide-react";

const mockEbooks = [
  {
    id: 1,
    title: "Guide to Public Health Initiatives",
    description:
      "An overview of current government-led public health programs and their impact on communities.",
    url: "#",
    category: "Health",
  },
  {
    id: 2,
    title: "National Economic Survey 2024",
    description:
      "A comprehensive report on the nation's economic performance and fiscal policy.",
    url: "#",
    category: "Economy",
  },
  {
    id: 3,
    title: "Future of Digital Infrastructure",
    description:
      "Exploring the strategic plan for expanding broadband access and digital literacy across the country.",
    url: "#",
    category: "Technology",
  },
  {
    id: 4,
    title: "Clean Energy Policy Framework",
    description:
      "Details on the regulatory and financial incentives for renewable energy projects.",
    url: "#",
    category: "Environment",
  },
  {
    id: 5,
    title: "Modernizing Education for the 21st Century",
    description:
      "A report on new educational policies, curriculum reforms, and digital learning initiatives.",
    url: "#",
    category: "Education",
  },
  {
    id: 6,
    title: "Sustainable Agriculture Practices",
    description:
      "A guide for farmers on adopting sustainable methods to improve crop yield and protect the environment.",
    url: "#",
    category: "Agriculture",
  },
  {
    id: 7,
    title: "Preserving National Heritage: A Cultural Report",
    description:
      "An annual review of efforts to protect and promote the nation's historical sites and cultural traditions.",
    url: "#",
    category: "Arts & Culture",
  },
  {
    id: 8,
    title: "Urban Development and Smart Cities",
    description:
      "An analysis of urban planning strategies and the development of smart, connected cities.",
    url: "#",
    category: "Urban Planning",
  },
];

// Main App component
const App = () => {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEbooks, setFilteredEbooks] = useState([]);

  // Simulate an API call to fetch e-book data
  useEffect(() => {
    // In a real application, you would fetch data from a government API here.
    // Example: fetch('https://api.govt-website.gov/ebooks').then(res => res.json()).then(data => setEbooks(data));

    // For this example, we use a timeout to simulate a network delay.
    const timer = setTimeout(() => {
      setEbooks(mockEbooks);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter e-books based on search query
  useEffect(() => {
    const results = ebooks.filter(
      (ebook) =>
        ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ebook.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ebook.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEbooks(results);
  }, [searchQuery, ebooks]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4 sm:p-8 font-sans transition-colors duration-300">
      <div className="container mx-auto max-w-7xl">
        {/* Header and Search */}
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2">
            Government E-Book Dashboard
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Explore and download official publications and reports.
          </p>
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search for titles, topics, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 pr-12 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-600 transition-shadow"
            />
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </header>

        {/* E-book Grid */}
        <main>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-600"></div>
            </div>
          ) : (
            <>
              {filteredEbooks.length === 0 ? (
                <div className="text-center text-gray-500 py-16">
                  <p>No e-books found matching your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEbooks.map((ebook) => (
                    <div
                      key={ebook.id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center mb-3 text-yellow-600">
                          <Book size={24} className="mr-2" />
                          <span className="text-sm font-semibold uppercase">
                            {ebook.category}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold mb-2 leading-tight">
                          {ebook.title}
                        </h2>
                        <p className="text-gray-600 mb-4 text-sm">
                          {ebook.description}
                        </p>
                      </div>
                      <a
                        href={ebook.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 mt-4"
                      >
                        <Download size={18} className="mr-2" />
                        Download E-book
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
