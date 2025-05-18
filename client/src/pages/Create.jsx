import { useState } from 'react';
import axios from 'axios';


function Create() {
  const [createClicked, setCreateClicked] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // NEW: for storing selected image
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !price || !image) {
      setMessage("❗ Please fill all fields including image.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('price', price);
    formData.append('image', image); // append image

    try {
      await axios.post('https://event-app-wf08.onrender.com/api/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('✅ Course created successfully!');
      // Reset form
      setTitle('');
      setDesc('');
      setPrice('');
      setImage(null);
      setCreateClicked(false);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to create course');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      {!createClicked ? (
        <button
          onClick={() => setCreateClicked(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
        >
          Create New Course
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Create Course</h2>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Course Title"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            className="w-full p-2 rounded bg-gray-800 text-white"
            rows="4"
          ></textarea>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (₹)"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />

          {/* 📸 Image Input */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold"
          >
            Create
          </button>
        </form>
      )}

      {message && (
        <p className="mt-4 text-center text-green-400 font-medium">{message}</p>
      )}
    </div>
  );
}

export default Create;
