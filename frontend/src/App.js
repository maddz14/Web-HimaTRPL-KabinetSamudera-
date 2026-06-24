import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";

import Home from "@/pages/Home";
import Profil from "@/pages/Profil";
import VisiMisi from "@/pages/VisiMisi";
import Struktur from "@/pages/Struktur";
import Departemen from "@/pages/Departemen";
import ProgramKerja from "@/pages/ProgramKerja";
import Berita from "@/pages/Berita";
import BeritaDetail from "@/pages/BeritaDetail";
import Galeri from "@/pages/Galeri";
import Kontak from "@/pages/Kontak";
import Login from "@/pages/Login";
import Dosen from "@/pages/Dosen";
import Nettas from "@/pages/Nettas";
import LabRiset from "@/pages/LabRiset";
import Komunitas from "@/pages/Komunitas";
import OpenRecruitment from "@/pages/OpenRecruitment";
import Sejarah from "@/pages/Sejarah";
import Logo from "@/pages/Logo";
import Awards from "@/pages/Awards";
import SeminarWorkshop from "@/pages/SeminarWorkshop";
import Bootcamp from "@/pages/Bootcamp";
import Diesnatalis from "@/pages/Diesnatalis";
import Kalender from "@/pages/Kalender";
import InfoLomba from "@/pages/InfoLomba";
import Project from "@/pages/Project";

import AdminDashboard from "@/pages/admin/Dashboard";
import AdminBerita from "@/pages/admin/AdminBerita";
import AdminDepartemen from "@/pages/admin/AdminDepartemen";
import AdminAnggota from "@/pages/admin/AdminAnggota";
import AdminProgramKerja from "@/pages/admin/AdminProgramKerja";
import AdminGaleri from "@/pages/admin/AdminGaleri";
import AdminDosen from "@/pages/admin/AdminDosen";
import AdminPesan from "@/pages/admin/AdminPesan";
import AdminProject from "@/pages/admin/AdminProject";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              {/* Tentang Kami */}
              <Route path="/sejarah" element={<Sejarah />} />
              <Route path="/logo" element={<Logo />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/visi-misi" element={<VisiMisi />} />
              <Route path="/struktur" element={<Struktur />} />
              <Route path="/departemen" element={<Departemen />} />
              <Route path="/galeri" element={<Galeri />} />
              <Route path="/kontak" element={<Kontak />} />
              <Route path="/dosen" element={<Dosen />} />
              {/* Agenda */}
              <Route path="/awards" element={<Awards />} />
              {/* Events */}
              <Route path="/nettas" element={<Nettas />} />
              <Route path="/seminar-workshop" element={<SeminarWorkshop />} />
              <Route path="/bootcamp" element={<Bootcamp />} />
              <Route path="/diesnatalis" element={<Diesnatalis />} />
              {/* Aplikasi Publik */}
              <Route path="/berita" element={<Berita />} />
              <Route path="/berita/:slug" element={<BeritaDetail />} />
              <Route path="/kalender" element={<Kalender />} />
              <Route path="/info-lomba" element={<InfoLomba />} />
              <Route path="/project" element={<Project />} />
              <Route path="/program-kerja" element={<ProgramKerja />} />
              {/* Komunitas + Lab */}
              <Route path="/komunitas" element={<Komunitas />} />
              <Route path="/lab-riset" element={<LabRiset />} />
              {/* legacy alias */}
              <Route path="/open-recruitment" element={<OpenRecruitment />} />
            </Route>

            <Route path="/login" element={<Login />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="berita" element={<AdminBerita />} />
              <Route path="departemen" element={<AdminDepartemen />} />
              <Route path="anggota" element={<AdminAnggota />} />
              <Route path="program-kerja" element={<AdminProgramKerja />} />
              <Route path="galeri" element={<AdminGaleri />} />
              <Route path="project" element={<AdminProject />} />
              <Route path="dosen" element={<AdminDosen />} />
              <Route path="pesan" element={<AdminPesan />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
