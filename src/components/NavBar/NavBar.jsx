import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  function handleLogout() {
    userService.logOut();
    setUser(null);
  }
  return(
    
  <nav className="NavBar navbar navbar-expand-lg rounded " aria-label="Thirteenth navbar example">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"><i class="fa-solid fa-bars"></i></span>
        </button>

        <div class="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          <a class="navbar-brand col-lg-3 me-0 text-white logo" href="/flights">Calmify.</a>
          <ul class="navbar-nav col-lg-6 justify-content-lg-center">
            <li><Link to="/psychologist" class="nav-link px-2  text-light">Psychologist</Link></li>
            <li><Link to="/calendar" class="nav-link px-2  text-light">Mood calendar</Link></li>
          </ul>
          <div class="d-lg-flex col-lg-3 justify-content-lg-end">
          <button className="logout-btn" onClick={handleLogout}>Log out</button>
          </div>
        </div>
      </div>
    </nav>
  );
}