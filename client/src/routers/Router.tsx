import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import ClubPage from "../components/ClubPage";
import AllClubs from "../components/AllClubs";
import MyClubs from "../components/MyClubs";
import Profile from "../components/Profile";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import ApplicationForm from "../components/ApplicationForm"
import ApplicationFormCreation from "../components/ApplicationFormCreation"
import ConfirmAccount from "../components/ConfirmAccount";
import RegisterUser from "../components/RegisterUser";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/club/:id" element={<ClubPage />} />
        <Route path="/all_clubs" element={<AllClubs />} />
        <Route path="/my_clubs" element={<MyClubs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/application_form/:id" element={<ApplicationForm />} />
        <Route path="/application_form_creation/:id" element={<ApplicationFormCreation />} />
        <Route path="/account-confirm/:email" element={<ConfirmAccount />} />
        <Route path="/register-user/:email" element={<RegisterUser />} />
      </Routes>
    </BrowserRouter>
  );
}
