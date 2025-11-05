
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const navUser = document.getElementById("nav-user");

  if (!navUser) return; // Nada que hacer si no existe el contenedor

  if (token) {
    try {
      // Decodificar el JWT (solo el payload) de forma segura
      const parts = token.split(".");
      const payload = parts.length > 1 ? JSON.parse(atob(parts[1])) : {};
      const nombreUsuario = payload && payload.nombre ? payload.nombre : "Usuario";

      // Insertar menú desplegable con el nombre del usuario
      navUser.innerHTML = `
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="userMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            👤 ${nombreUsuario}
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
            <li><a class="dropdown-item" href="perfil.html">Mi perfil</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" id="logoutBtn">Cerrar sesión</a></li>
          </ul>
        </li>
      `;

      // Añadimos listener de logout usando querySelector sobre navUser
      const logoutBtn = navUser.querySelector("#logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("token");
          window.location.href = "login.html";
        });
      }

    } catch (err) {
      console.error("Token inválido o dañado:", err);
      localStorage.removeItem("token");
      navUser.innerHTML = `<li class="nav-item"><a class="nav-link" href="login.html">Iniciar Sesión</a></li>`;
    }
  } else {
    // Si no hay token → mostrar el botón de login
    navUser.innerHTML = `<li class="nav-item"><a class="nav-link" href="login.html">Iniciar Sesión</a></li>`;
  }
});