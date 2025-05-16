import { useState, useEffect } from 'react';
import axios from 'axios';

function Create() {
  const [createClicked, setCreateClicked] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('https://event-app-wf08.onrender.com/api/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !price || !image) {
      setMessage('Please fill all fields and select an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('price', price);
    formData.append('image', image);

    try {
      await axios.post('https://event-app-wf08.onrender.com/api/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('✅ Course created successfully!');
      setTitle('');
      setDesc('');
      setPrice('');
      setImage(null);
      setCreateClicked(false);
      fetchCourses();
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
          encType="multipart/form-data"
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

      {message && <p className="mt-4 text-center text-green-400 font-medium">{message}</p>}

      {/* Course List */}
      <div className="mt-8 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-center">📚 Your Courses</h3>
        {courses.length === 0 ? (
          <p className="text-center text-gray-400">No courses created yet.</p>
        ) : (
          <ul className="space-y-4">
            {courses.map((course) => (
              <li key={course._id} className="bg-gray-800 p-4 rounded shadow">
                <h4 className="text-lg font-bold">{course.title}</h4>
                <p>{course.desc}</p>
                <p className="text-sm text-gray-400">₹{course.price}</p>
                {course.imageUrl && (
                  <img
                    src={`https://event-app-wf08.onrender.com/uploads/${course.imageUrl}`}
                    alt={course.title}
                    className="mt-2 rounded w-full max-h-60 object-cover"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Create;
