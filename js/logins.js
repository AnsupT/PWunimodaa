 function showForm(formType) {
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            const loginBtn = document.querySelector('.card-header .btn-danger');
            const registerBtn = document.querySelector('.card-header .btn-outline-secondary');

            if (formType === 'login') {
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
                loginBtn.classList.add('btn-danger');
                loginBtn.classList.remove('btn-outline-secondary');
                registerBtn.classList.remove('btn-danger');
                registerBtn.classList.add('btn-outline-secondary');
            } else {
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
                registerBtn.classList.add('btn-danger');
                registerBtn.classList.remove('btn-outline-secondary');
                loginBtn.classList.remove('btn-danger');
                loginBtn.classList.add('btn-outline-secondary');
            }
        }

        // Mostrar/ocultar contraseña
        document.getElementById('toggleLoginPassword').addEventListener('click', function (e) {
            const password = document.getElementById('loginPassword');
            togglePasswordVisibility(password, this);
        });

        document.getElementById('toggleRegisterPassword').addEventListener('click', function (e) {
            const password = document.getElementById('registerPassword');
            togglePasswordVisibility(password, this);
        });

        function togglePasswordVisibility(password, button) {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            const icon = button.querySelector('i');
            icon.classList.toggle('bi-eye');
            icon.classList.toggle('bi-eye-slash');
        }



// Registro de nuevo usuario //
const registerForm = document.querySelector("#registerForm form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Tomar los valores del formulario
  const nombre = document.querySelector("#registerNombre").value.trim();
  const telefono = document.querySelector("#registerTelefono").value.trim();
  const email = document.querySelector("#registerEmail").value.trim();
  const password = document.querySelector("#registerPassword").value.trim();
  const confirm = document.querySelector("#confirmPassword").value.trim();

  // Validaciones básicas
  if (password !== confirm) {
    alert("Las contraseñas no coinciden");
    return;
  }

  // Enviar datos al backend
  try {
    const response = await fetch("http://localhost:5000/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, telefono, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Registro exitoso");
      registerForm.reset();
    } else {
      alert("⚠️ " + data.mensaje);
    }
  } catch (error) {
    console.error("Error al registrar:", error);
    alert("Error del servidor. Intenta más tarde.");
  }
});



// LOGIN ///
const loginForm = document.querySelector("#loginForm form");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#loginEmail").value.trim();
  const password = document.querySelector("#loginPassword").value.trim();

  try {
    const response = await fetch("http://localhost:5000/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar token
      localStorage.setItem("token", data.token);

      alert("✅ Inicio de sesión exitoso");

      // Redirigir a la página principal
      window.location.href = "index.html";
    } else {
      alert("⚠️ " + data.mensaje);
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Error de conexión");
  }
});

    
