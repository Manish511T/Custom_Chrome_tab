import React, { useState, useEffect } from 'react';

const ShortcutDashboard = ({ showForm, setShowForm }) => {
  const [shortcuts, setShortcuts] = useState(() => {
    const saved = localStorage.getItem("shortcuts");
    return saved ? JSON.parse(saved) : [];
  });

  const [newShortcut, setNewShortcut] = useState({ name: "", url: "", icon: "" });

  useEffect(() => {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  }, [shortcuts]);

  const handleAddShortcut = () => {
    if (!newShortcut.name || !newShortcut.url) return;

    try {
      new URL(newShortcut.url);
    } catch {
      alert("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    const updated = [...shortcuts, newShortcut];
    setShortcuts(updated);
    setNewShortcut({ name: "", url: "", icon: "" });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    const updated = shortcuts.filter((_, i) => i !== index);
    setShortcuts(updated);
  };

  const getFavicon = (url, customIcon) => {
    if (customIcon) return customIcon;
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return "https://via.placeholder.com/32?text=%3F";
    }
  };

  return (
    <>
      {/* Modal Backdrop */}
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/70 z-40 transition-all duration-300" />
      )}

      {/* Shortcut Dashboard */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center px-4 py-8 text-green-400 transition-opacity ${
          showForm ? 'pointer-events-none opacity-30' : ''
        }`}
      >
        <div className="flex justify-evenly items-center flex-wrap gap-4">
          {shortcuts.map((sc, i) => (
            <div key={i} className="group relative">
              <a
                href={sc.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center p-2"
              >
                <div className="relative w-12 h-12 p-1 flex items-center justify-center shadow-md overflow-hidden">
                  <img
                    src={getFavicon(sc.url, sc.icon)}
                    alt="icon"
                    className="object-contain w-full h-full"
                  />
                  <button
                    type="button"
                    className="absolute  top-[15%] left-[90%] -translate-x-1/2 -translate-y-1/2 text-red-500 text-sm hidden group-hover:block z-10 bg-opacity-70 rounded-full p-0.5"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(i);
                    }}
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>
                <div className="text-[10px] text-center mt-1 text-green-300 leading-tight">
                  {sc.name}
                </div>
              </a>
            </div>
          ))}

          {/* Add Shortcut Button */}
          <button
            onClick={() => setShowForm(true)}
            className="flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition group"
          >
            <div className="w-12 h-12 rounded-full bg-green-800 flex items-center justify-center text-xl group-hover:shadow-[0_0_25px_#00ff00] transition-all duration-300">
              <i className="ri-add-fill text-white" />
            </div>
            <div className="text-[10px] text-center mt-1 text-green-300">Add Shortcut</div>
          </button>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#101c14] p-6 rounded-xl border border-green-600 shadow-lg">
          <h3 className="text-lg font-bold mb-3 text-green-300">Add New Shortcut</h3>
          <input
            type="text"
            placeholder="Name"
            value={newShortcut.name}
            onChange={(e) => setNewShortcut({ ...newShortcut, name: e.target.value })}
            className="w-full mb-2 p-2 bg-zinc-800 text-green-300 border border-green-700 rounded"
          />
          <input
            type="url"
            placeholder="URL (https://...)"
            value={newShortcut.url}
            onChange={(e) => setNewShortcut({ ...newShortcut, url: e.target.value })}
            className="w-full mb-2 p-2 bg-zinc-800 text-green-300 border border-green-700 rounded"
          />
          <input
            type="text"
            placeholder="Icon URL (optional)"
            value={newShortcut.icon}
            onChange={(e) => setNewShortcut({ ...newShortcut, icon: e.target.value })}
            className="w-full mb-4 p-2 bg-zinc-800 text-green-300 border border-green-700 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleAddShortcut}
              className="bg-green-700 px-4 py-2 rounded text-black font-bold hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-green-500 rounded text-red-400 hover:text-red-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShortcutDashboard;
