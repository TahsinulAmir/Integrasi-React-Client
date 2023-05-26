import { Link } from 'react-router-dom'
import axios from "axios";
import React, { useState, useEffect } from "react";

const CariBuku = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const getBooks = async () => {
        // Using Fetch
        // try {
        //     await fetch(`http://127.0.0.1:8000/api/buku`, {
        //         method: 'GET',
        //     })
        //         .then((response) => response.json())
        //         .then((json) => setBooks(json))
        //     console.log(setBooks);

        // } catch (error) {
        //     console.log(error.message);
        // }

        // Using Axios
        setLoading(true);
        try {
            let response = await axios.get('http://perpustakaan.tahsinulamir.my.id/api/buku')
            console.log(response.data);
            setBooks(response.data);
        } catch (error) {
            console.log(error.message);
        }
        setLoading(false);
    }
    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div className="container mx-auto">
            <div className="row centered text-center">
                <h2 className="title is-2 my-2">Daftar Buku Tersedia</h2>
            </div>
            <div className='card shadow col-10 mx-auto'>
                <div className="card-header">
                    <Link className="btn btn-primary" to='/ajukan-pinjam'>Ajukan Pinjam Buku</Link>
                </div>
                <div className='card-body text-center'>
                    {!loading ? (
                        <table className="table align-middle">
                            <thead >
                                <tr>
                                    <th>No</th>
                                    <th>Judul</th>
                                    <th>Penulis</th>
                                    <th>Tahun Terbit</th>
                                    <th>Jumlah Halaman</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book, index) => {
                                    return (
                                        <tr key={book.id_buku}>
                                            <th>{index + 1}</th>
                                            <td>{book.judul}</td>
                                            <td>{book.penulis}</td>
                                            <td>{book.thn_terbit}</td>
                                            <td>{book.jml_halaman} Halaman</td>
                                            <td>
                                                <Link to={`/cari-buku/${book.id_buku}`}><button type="button" className="btn btn-primary">Lihat</button></Link>
                                                {/* <Link className="nav-link" to={`${book.id_buku}`}><button type="button" class="btn btn-primary">Lihat Buku</button></Link> */}
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    ) : (
                        <div className="d-flex align-center m-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default CariBuku