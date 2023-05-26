import axios from "axios";
import React, { useState, useEffect } from "react";

const RiwayatPinjam = () => {
    const [peminjam, setPeminjam] = useState([]);
    const [loading, setLoading] = useState(false);

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
            case "Pengajuan":
                return "badge bg-secondary";
            case "Sedang Meminjam":
                return "badge bg-info";
            default:
                return "badge bg-success";
        }
    };

    return (
        <div className='m-3'>
            <div className="card shadow">
                <div className="card-header">
                    <h2 className="title is-2 text-center">Riwayat Peminjaman</h2>
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
                                </tr>
                            </thead>
                            <tbody>
                                {peminjam.filter(item => item.status === 'Dikembalikan' || item.status === 'Sedang Meminjam').map((item, index) => {
                                    return (
                                        <tr key={item.id_peminjam}>
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

export default RiwayatPinjam