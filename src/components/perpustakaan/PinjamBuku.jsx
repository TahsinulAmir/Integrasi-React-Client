import { Link } from 'react-router-dom'
import axios from "axios";
import React, { useState, useEffect } from "react";

const PinjamBuku = () => {
    const [peminjam, setPeminjam] = useState([]);
    const [loading, setLoading] = useState(false);

    // Hapus Data
    const deleteData = async (id) => {
        await fetch(`http://perpustakaan.tahsinulamir.my.id/api/peminjam/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
        setPeminjam(peminjam.filter((dataPeminjam) => dataPeminjam.id_peminjam !== id));
    };

    const getPeminjam = async () => {
        setLoading(true);
        // Using Axios
        try {
            let response = await axios.get('http://perpustakaan.tahsinulamir.my.id/api/peminjam')
            console.log(response.data);
            setPeminjam(response.data);
        } catch (error) {
            console.log(error.message);
        };
        setLoading(false);
    };

    useEffect(() => {
        getPeminjam();
    }, []);

    const colorStatus = (status) => {
        switch (status) {
            case "Dikembalikan":
                return "badge bg-success";
            case "Sedang Meminjam":
                return "badge bg-info";
            default:
                return "badge bg-secondary";
        }
    };

    return (
        <div className='m-3'>
            <div className="card shadow">
                <div className="card-header">
                    <h2 className="title is-2 text-center">Dalam Pengajuan</h2>
                </div>
                {!loading ? (
                    <div className="card-body">
                        <table className="table align-middle text-center">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Nim</th>
                                    <th>Nama</th>
                                    <th>Prodi</th>
                                    <th>No Hp</th>
                                    <th>Angkatan</th>
                                    <th>Buku Dipinjam</th>
                                    <th>Tanggal Pinjam</th>
                                    <th>Tanggal Kembali</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {peminjam.filter(item => item.status === 'Pengajuan').map((item, index) => {
                                    return (
                                        <tr key={item.id_peminjam} >
                                            <th>{index + 1}</th>
                                            <td>{item.nim_mhs}</td>
                                            <td>{item.nama_mhs}</td>
                                            <td>{item.prodi}</td>
                                            <td>{item.no_hp}</td>
                                            <td>{item.angkatan}</td>
                                            <td>{item.buku_dipinjam}</td>
                                            <td>{item.tgl_pinjam}</td>
                                            <td>{item.tgl_kembali}</td>
                                            <td><span className={colorStatus(item.status)}>{item.status}</span></td>
                                            <td>
                                                <div className="d-grid gap-2 d-md-flex justify-content-center">
                                                    <Link to={`/pinjam-buku/${item.id_peminjam}`} className="btn btn-primary">Edit</Link>
                                                    <button type="button" onClick={() => deleteData(item.id_peminjam)} className="btn btn-danger">Batal</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
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
    );

}
export default PinjamBuku