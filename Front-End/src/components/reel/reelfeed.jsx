import React, { useState, useEffect } from "react";
import axios from "axios";
import Reel from "./Reel";
import ReelUploader from "./ReelUploader";

const ReelsFeed = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUploader, setShowUploader] = useState(false);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        setLoading(true);

        // Fetch current user info
        const userRes = await axios.get("/api/auth/me");
        setCurrentUser(userRes.data);

        // Fetch reels
        const reelsRes = await axios.get("/api/reels");
        setReels(reelsRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reels:", err);
        setError("Failed to load reels. Please try again later.");
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  const handleReelUploaded = (newReel) => {
    setReels((prevReels) => [newReel, ...prevReels]);
    setShowUploader(false);
  };

  const handleLike = (reelId, isLiked) => {
    setReels((prevReels) =>
      prevReels.map((reel) =>
        reel._id === reelId
          ? {
              ...reel,
              likes: isLiked
                ? [...(reel.likes || []), currentUser._id]
                : (reel.likes || []).filter((id) => id !== currentUser._id),
            }
          : reel
      )
    );
  };

  const handleComment = (reelId, newComment) => {
    setReels((prevReels) =>
      prevReels.map((reel) =>
        reel._id === reelId
          ? {
              ...reel,
              comments: [...(reel.comments || []), newComment],
            }
          : reel
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Reels</h1>
        <button
          onClick={() => setShowUploader(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none hover:bg-blue-600">
          Create Reel
        </button>
      </div>

      {/* Reels List */}
      <div className="px-4 py-2 space-y-4">
        {reels.length > 0 ? (
          reels.map((reel) => (
            <Reel
              key={reel._id}
              reel={reel}
              currentUser={currentUser}
              onLike={handleLike}
              onComment={handleComment}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500 mb-4">No reels available</p>
            <button
              onClick={() => setShowUploader(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-full focus:outline-none hover:bg-blue-600">
              Create Your First Reel
            </button>
          </div>
        )}
      </div>

      {/* Reel Uploader Modal */}
      {showUploader && (
        <ReelUploader
          onClose={() => setShowUploader(false)}
          onUploadComplete={handleReelUploaded}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default ReelsFeed;
