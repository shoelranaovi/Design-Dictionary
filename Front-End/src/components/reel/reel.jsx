import React, { useState, useRef, useEffect } from "react";
import { FaHeart, FaRegHeart, FaComment, FaShare } from "react-icons/fa";
import axios from "axios";

const Reel = ({ reel, currentUser, onLike, onComment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(reel.likes?.length || 0);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (reel.likes && currentUser) {
      setIsLiked(reel.likes.includes(currentUser._id));
    }
  }, [reel.likes, currentUser]);

  const handleVideoPress = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `/api/reels/${reel._id}/like`,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setIsLiked(res.data.isLiked);
      setLikesCount(res.data.likesCount);

      if (onLike) onLike(reel._id, res.data.isLiked);
    } catch (err) {
      console.error("Error liking reel:", err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const res = await axios.post(
        `/api/reels/${reel._id}/comment`,
        { text: comment },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setComment("");
      if (onComment) onComment(reel._id, res.data.comment);
    } catch (err) {
      console.error("Error commenting on reel:", err);
    }
  };

  const handleShare = async () => {
    try {
      // Generate a shareable link
      const shareLink = `${window.location.origin}/reel/${reel._id}`;

      // Use Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: `Reel by ${reel.user.username}`,
          text: "Check out this reel!",
          url: shareLink,
        });
      } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing reel:", err);
    }
  };

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-black mb-6 relative h-[80vh] max-w-md mx-auto">
      {/* Video */}
      <div
        className="relative flex-1 flex items-center justify-center"
        onClick={handleVideoPress}>
        <video
          ref={videoRef}
          src={reel.videoUrl}
          className="absolute w-full h-full object-cover"
          loop
          muted={false}
          playsInline
        />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Reel Info & Actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
        <div className="flex items-center mb-2">
          <img
            src={reel.user.profileImage || "https://via.placeholder.com/40"}
            alt={reel.user.username}
            className="w-10 h-10 rounded-full mr-2 border-2 border-white"
          />
          <span className="font-semibold">{reel.user.username}</span>
        </div>
        <p className="mb-4 line-clamp-2">{reel.caption}</p>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <button onClick={handleLike} className="focus:outline-none">
              {isLiked ? (
                <FaHeart className="text-2xl text-red-500" />
              ) : (
                <FaRegHeart className="text-2xl" />
              )}
            </button>
            <span className="text-sm mt-1">{likesCount}</span>
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowComments(!showComments)}
              className="focus:outline-none">
              <FaComment className="text-2xl" />
            </button>
            <span className="text-sm mt-1">{reel.comments?.length || 0}</span>
          </div>

          <div className="flex flex-col items-center">
            <button onClick={handleShare} className="focus:outline-none">
              <FaShare className="text-2xl" />
            </button>
            <span className="text-sm mt-1">Share</span>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="absolute top-0 right-0 bottom-0 bg-black bg-opacity-90 w-full p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-lg font-semibold">Comments</h3>
            <button
              onClick={() => setShowComments(false)}
              className="text-white text-xl">
              ×
            </button>
          </div>

          <div className="space-y-3 mb-4 max-h-[60vh] overflow-y-auto">
            {reel.comments && reel.comments.length > 0 ? (
              reel.comments.map((comment) => (
                <div key={comment._id} className="flex items-start space-x-2">
                  <img
                    src={
                      comment.user.profileImage ||
                      "https://via.placeholder.com/30"
                    }
                    alt={comment.user.username}
                    className="w-8 h-8 rounded-full mt-1"
                  />
                  <div className="bg-gray-800 rounded-lg p-2 flex-1">
                    <p className="text-white text-sm font-semibold">
                      {comment.user.username}
                    </p>
                    <p className="text-white text-sm">{comment.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No comments yet</p>
            )}
          </div>

          <form
            onSubmit={handleComment}
            className="flex items-center space-x-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="bg-gray-800 text-white rounded-full px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              className="bg-blue-500 text-white rounded-full px-4 py-2 disabled:opacity-50 focus:outline-none">
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Reel;
