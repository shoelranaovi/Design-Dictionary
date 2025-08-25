import React, { useState, useRef } from "react";
import axios from "axios";
import { FaTimes, FaVideo, FaCloudUploadAlt } from "react-icons/fa";

const ReelUploader = ({ onClose, onUploadComplete, currentUser }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if file is a video
    if (!file.type.startsWith("video/")) {
      setError("Please select a video file");
      return;
    }

    // Check file size (limit to 100MB as an example)
    if (file.size > 100 * 1024 * 1024) {
      setError("Video size should be less than 100MB");
      return;
    }

    setSelectedFile(file);
    setError("");

    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const uploadToCloudinary = async (file) => {
    // Create form data for upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "social_app_reels"); // Set your Cloudinary upload preset

    try {
      // Direct upload to Cloudinary
      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/video/upload`, // Replace YOUR_CLOUD_NAME with your Cloudinary cloud name
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      return cloudinaryResponse.data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new Error("Failed to upload video to cloud storage");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a video file");
      return;
    }

    if (!caption.trim()) {
      setError("Please add a caption");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Upload to Cloudinary
      const videoUrl = await uploadToCloudinary(selectedFile);

      // Save reel information to your backend
      const response = await axios.post("/api/reels", {
        videoUrl,
        caption,
      });

      // Clean up the preview URL
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      // Call the completion handler with the new reel data
      onUploadComplete(response.data);
    } catch (err) {
      console.error("Error uploading reel:", err);
      setError(err.message || "Failed to upload reel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black opacity-75"
          onClick={onClose}></div>

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto z-10">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">Create New Reel</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <FaTimes />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {!preview ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-md p-12 text-center cursor-pointer hover:bg-gray-50"
                onClick={() => fileInputRef.current.click()}>
                <FaVideo className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Click to upload a video or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    MP4, WebM or MOV (max. 100MB)
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative">
                <video
                  src={preview}
                  className="w-full h-64 object-cover rounded-md"
                  controls
                />
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreview(null);
                    URL.revokeObjectURL(preview);
                  }}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none">
                  <FaTimes size={16} />
                </button>
              </div>
            )}

            <div className="mt-4">
              <label
                htmlFor="caption"
                className="block text-sm font-medium text-gray-700 mb-1">
                Caption
              </label>
              <textarea
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write a caption..."
                disabled={loading}
              />
            </div>

            {loading && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1 text-center">
                  Uploading: {uploadProgress}%
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <button
              onClick={handleUpload}
              disabled={loading || !selectedFile}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none disabled:opacity-50">
              {loading ? (
                <span>Uploading...</span>
              ) : (
                <>
                  <FaCloudUploadAlt className="mr-2" />
                  <span>Upload Reel</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelUploader;
