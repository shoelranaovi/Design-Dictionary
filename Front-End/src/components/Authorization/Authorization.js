const login = async (email, password) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data.token) {
    localStorage.setItem("token", data.token); // Store token
  }
};

const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/user/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Attach token
    },
  });

  const data = await response.json();
  console.log(data);
};
