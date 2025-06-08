"use client";

import MiniChat from "@components/MiniChat";
// ...other sidebar imports

export default function Sidebar() {
  return (
    <aside className="flex flex-col h-auto w-10 bg-gray-100 dark:bg-gray-900 p-4 border-r border-gray-300 dark:border-gray-700">
      {/* Your existing sidebar content */}
      {/* Example: Navigation, user info, stats, etc. */}

      <div className="flex-grow overflow-auto">
        {/* Sidebar main scrollable content */}
      </div>

      {/* MiniChat fixed inside sidebar, sticky at bottom */}
      <div className="mt-4 sticky bottom-0">
        <MiniChat />
      </div>
    </aside>
  );
}
