import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";


const AjukanPinjam = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get('http://perpustakaan.tahsinulamir.my.id/api/buku');
            setBooks(response.data); // menyimpan data dari API ke state
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const addData = async (data) => {
        try {
            const response = await axios.post('http://perpustakaan.tahsinulamir.my.id/api/peminjam', data);
            console.log(response.data); // response data dari API
            navigate("/pinjam-buku");
        } catch (error) {
            console.error(error);
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            nim_mhs: event.target.nim_mhs.value,
            nama_mhs: event.target.nama_mhs.value,
            prodi: event.target.prodi.value,
            no_hp: event.target.no_hp.value,
            angkatan: event.target.angkatan.value,
            buku_dipinjam: event.target.buku_dipinjam.value,
            tgl_pinjam: event.target.tgl_pinjam.value,
            tgl_kembali: event.target.tgl_kembali.value,
        };
        addData(data);
    }
    return (
        <>
            <div className='container mt-3 mb-3'>
                <div className="card shadow col-6 mx-auto">
                    <div className="card-header">
                        <h2 className="title text-center">Ajukan Pinjam Buku</h2>
                    </div>
                    <div className="card-body">
                        <form className='container mt-3' onSubmit={handleSubmit}>
                            <div className="mb-3 row">
                                <label htmlFor="nim_mhs" className="col-sm-3 col-form-label">Nim</label>
                                <div className="col-sm-9">
                                    <input placeholder='Masukkan Nim' maxlength="9" type="text" className="form-control" id="nim_mhs" name="nim_mhs" required />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="nama_mhs" className="col-sm-3 col-form-label">Nama</label>
                                <div className="col-sm-9">
                                    <input placeholder='Masukkan Nama' type="text" className="form-control" id="nama_mhs" name="nama_mhs" required />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="prodi" className="col-sm-3 col-form-label">Prodi</label>
                                <div className="col-sm-9">
                                    <select name="prodi" id="prodi" className="form-control">
                                        <option selected>--Pilih Prodi--</option>
                                        <option>Sistem Informasi</option>
                                        <option>Informatika</option>
                                        <option>Perbankan Syariah</option>
                                        <option>Ekonomi Syariah</option>
                                        <option>Manajemen</option>
                                        <option>Akuntansi</option>
                                        <option>Pendidikan Matematika</option>
                                        <option>PGSD</option>
                                        <option>PGMI</option>
                                        <option>Pendidika Agama Islam</option>
                                        <option>Kebidanan</option>
                                        <option>Keperawatan</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="no_hp" className="col-sm-3 col-form-label">No HP</label>
                                <div className="col-sm-9">
                                    <input placeholder='Masukkan No HP' type="tel" className="form-control" id="no_hp" maxlength="15" name="no_hp" required />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="angkatan" className="col-sm-3 col-form-label">Angkatan</label>
                                <div className="col-sm-9">
                                    <select name="angkatan" id="angkatan" className="form-control">
                                        <option selected>--Pilih Angkatan--</option>
                                        <option>2023</option>
                                        <option>2022</option>
                                        <option>2021</option>
                                        <option>2020</option>
                                        <option>2019</option>
                                        <option>2018</option>
                                        <option>2017</option>
                                        <option>2016</option>
                                        <option>2015</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="buku_dipinjam" className="col-sm-3 col-form-label">Buku Dipinjam</label>
                                <div className="col-sm-9">
                                    <select name="buku_dipinjam" id="buku_dipinjam" className="form-control">
                                        <option selected>--Pilih Buku Yang Akan Dipinjam--</option>
                                        {books.map(item => (

                                            <option key={item.id_buku} >{item.judul}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="tgl_pinjam" className="col-sm-3 col-form-label">Tanggal Pinjam</label>
                                <div className="col-sm-9">
                                    <input type="date" className="form-control" id="tgl_pinjam" name="tgl_pinjam" required />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="tgl_kembali" className="col-sm-3 col-form-label">Tanggal Kembali</label>
                                <div className="col-sm-9">
                                    <input type="date" className="form-control" id="tgl_kembali" name="tgl_kembali" required />
                                </div>
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button class="btn btn-success me-md-2" type="submit">Add Data</button>
                                <Link className="btn btn-danger" to='/cari-buku'>Batal</Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <script>
            </script>
        </>
    )
}

export default AjukanPinjam