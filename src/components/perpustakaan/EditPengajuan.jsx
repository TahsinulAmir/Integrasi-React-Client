import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";


const EditPengajuan = () => {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [nim_mhs, setNim] = useState('');
    const [nama_mhs, setNama] = useState('');
    const [prodi, setProdi] = useState('');
    const [no_hp, setNoHp] = useState('');
    const [angkatan, setAngkatan] = useState('');
    const [buku_dipinjam, setBukuDipinjam] = useState('');
    const [tgl_pinjam, setTglPinjam] = useState('');
    const [tgl_kembali, setTglKembali] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getDataById = async () => {
            setLoading(true);
            try {
                await fetch("http://perpustakaan.tahsinulamir.my.id/api/peminjam/" + id)
                    .then((response) => response.json())
                    .then((json) => {
                        setNim(json[0].nim_mhs); // menyimpan data dari API ke state
                        setNama(json[0].nama_mhs);
                        setProdi(json[0].prodi);
                        setNoHp(json[0].no_hp);
                        setAngkatan(json[0].angkatan);
                        setBukuDipinjam(json[0].buku_dipinjam);
                        setTglPinjam(json[0].tgl_pinjam);
                        setTglKembali(json[0].tgl_kembali);
                        setStatus(json[0].status);

                        console.log(json[0]);
                        console.log(json[0].buku_dipinjam);
                    });
                // const data = await response.json()
                // setDetailBuku(data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        getDataById();
    }, [id]);

    const getDataBooks = async () => {
        try {
            const response = await axios.get('http://perpustakaan.tahsinulamir.my.id/api/buku');
            setBooks(response.data); // menyimpan data dari API ke state
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDataBooks();
    }, []);

    const updatePengajuan = async (e) => {
        e.preventDefault();

        await fetch(`http://perpustakaan.tahsinulamir.my.id/api/peminjam/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nim_mhs,
                nama_mhs,
                prodi,
                no_hp,
                angkatan,
                buku_dipinjam,
                tgl_pinjam,
                tgl_kembali,
                status
            }),
        });
        navigate("/pinjam-buku");
    }

    return (

        <div className='container my-4'>
            <div className="card shadow col-6 mx-auto">
                <div className="card-header centered text-center">
                    <h2 className="title is-2 is-centered">Edit Peminjaman Buku</h2>
                </div>
                {!loading ? (
                    <div className="card-body">
                        <form className='container mt-3' onSubmit={updatePengajuan}>
                            <div className="mb-3 row">
                                <label htmlFor="nim_mhs" className="col-sm-3 col-form-label">Nim</label>
                                <div className="col-sm-9">
                                    <input
                                        maxlength="9"
                                        type="text"
                                        className="form-control"
                                        id="nim_mhs"
                                        value={nim_mhs}
                                        onChange={(e) => setNim(e.target.value)}
                                        required />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="nama_mhs" className="col-sm-3 col-form-label">Nama</label>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nama_mhs" name="nama_mhs"
                                        value={nama_mhs}
                                        onChange={(e) => setNama(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="prodi" className="col-sm-3 col-form-label">Prodi</label>
                                <div className="col-sm-9">
                                    <select type="text"
                                        className="form-control"
                                        id="prodi"
                                        name="prodi"
                                        value={prodi}
                                        onChange={(e) => setProdi(e.target.value)}
                                        required>
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
                                    <input
                                        type="text"
                                        maxlength="15"
                                        className="form-control"
                                        id="no_hp"
                                        name="no_hp"
                                        value={no_hp}
                                        onChange={(e) => setNoHp(e.target.value)}
                                        required />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="angkatan" className="col-sm-3 col-form-label">Angkatan</label>
                                <div className="col-sm-9">
                                    <select type="text"
                                        className="form-control"
                                        id="angkatan"
                                        name="angkatan"
                                        value={angkatan}
                                        onChange={(e) => setAngkatan(e.target.value)}
                                        required>
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
                                    <select
                                        name="buku_dipinjam"
                                        id="buku_dipinjam"
                                        className="form-control"
                                        value={buku_dipinjam}
                                        onChange={(e) => setBukuDipinjam(e.target.value)}>
                                        {books.map(item => (
                                            <option key={item.id_buku} >{item.judul}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="tgl_pinjam" className="col-sm-3 col-form-label">Tanggal Pinjam</label>
                                <div className="col-sm-9">
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="tgl_pinjam"
                                        name="tgl_pinjam"
                                        value={tgl_pinjam}
                                        onChange={(e) => setTglPinjam(e.target.value)}
                                        required />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="tgl_kembali" className="col-sm-3 col-form-label">Tanggal Kembali</label>
                                <div className="col-sm-9">
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="tgl_kembali"
                                        name="tgl_kembali"
                                        value={tgl_kembali}
                                        onChange={(e) => setTglKembali(e.target.value)}
                                        required />
                                </div>
                            </div>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn-success me-md-2" type="submit">Save</button>
                                <Link className="btn btn-danger" to='/pinjam-buku'>Batal</Link>
                            </div>
                        </form>

                    </div>
                ) : (
                    <div className="d-flex justify-content-center m-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>


    )
}

export default EditPengajuan