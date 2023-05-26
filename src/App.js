import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home';
import Kuliah from './components/jadwal/Kuliah';
import Uts from './components/jadwal/Uts';
import Uas from './components/jadwal/Uas';
import Presensi from './components/hasilstudi/Presensi';
import Ips from './components/hasilstudi/Ips';
import Transkip from './components/hasilstudi/Transkip';
import RiwayatPinjam from './components/perpustakaan/RiwayatPinjam';
import PinjamBuku from './components/perpustakaan/PinjamBuku';
import CariBuku from './components/perpustakaan/CariBuku';
import AjukanPinjam from './components/perpustakaan/AjukanPinjam';
import DetailBuku from './components/perpustakaan/DetailBuku';
import EditPengajuan from './components/perpustakaan/EditPengajuan';
/* eslint-disable jsx-a11y/anchor-is-valid */

function App() {
  return (
    <>
      <nav className="navbar sticky-top navbar-dark bg-primary navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand">Portal XYZ</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to='/'>Home</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Jadwal
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="nav-link text-dark" to='/jadwal-kuliah'>Kuliah</Link></li>
                  <li><Link className="nav-link text-dark" to='/jadwal-uts'>UTS</Link></li>
                  <li><Link className="nav-link text-dark" to='/jadwal-uas'>UAS</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Hasil Studi
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="nav-link text-dark" to='/presensi'>Presensi</Link></li>
                  <li><Link className="nav-link text-dark" to='/nilai-ips'>Nilai Per Semester</Link></li>
                  <li><Link className="nav-link text-dark" to='/transkip'>Transkip Nilai</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Perpustakaan
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="nav-link text-dark" to='/cari-buku'>Cari Buku</Link></li>
                  <li><Link className="nav-link text-dark" to='/pinjam-buku'>Pengajuan Peminjaman</Link></li>
                  <li><Link className="nav-link text-dark" to='/riwayat-pinjam'>Riwayat Peminjaman</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jadwal-kuliah" element={<Kuliah />} />
        <Route path="/jadwal-uts" element={<Uts />} />
        <Route path="/jadwal-uas" element={<Uas />} />
        <Route path="/presensi" element={<Presensi />} />
        <Route path="/nilai-ips" element={<Ips />} />
        <Route path="/transkip" element={<Transkip />} />
        <Route path="/cari-buku">
          <Route index element={<CariBuku />} />
          <Route path=":id" element={<DetailBuku />} />
        </Route>
        <Route path="/pinjam-buku">
          <Route index element={<PinjamBuku />} />
          <Route path=":id" element={<EditPengajuan />} />
        </Route>
        <Route path="/ajukan-pinjam" element={<AjukanPinjam />} />
        <Route path="/riwayat-pinjam" element={<RiwayatPinjam />} />
      </Routes>
    </>
  );
}

export default App;
