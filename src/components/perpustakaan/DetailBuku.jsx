import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailBuku = () => {
    const [detailbuku, setDetailBuku] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const loadDetail = async () => {
            setLoading(true);
            try {
                await fetch("http://perpustakaan.tahsinulamir.my.id/api/buku/" + id)
                    .then((response) => response.json())
                    .then((json) => {
                        setDetailBuku(json[0]);
                        console.log(json);
                    });
                // const data = await response.json()
                // setDetailBuku(data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        loadDetail();
    }, [id]);

    return (
        <>
            <div className="container mt-3">
                {!loading ? (
                    <div className="card shadow mb-3">
                        <div className="card ">
                            <div className="card-header text-center">
                                <h3>{detailbuku?.judul}</h3>
                            </div>
                            <div className="row g-0 mt-3">
                                <div className="col-md-3 text-center">
                                    <img src={detailbuku?.gambar} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-9">
                                    <div className="row card-body">
                                        <p className="col-md-2 card-title">Penulis</p>
                                        <h5 className="col-md-10 card-title">: {detailbuku?.penulis}</h5>
                                        <p className="col-md-2 card-title">Penerbit</p>
                                        <h5 className="col-md-10 card-title">: {detailbuku?.penerbit}</h5>
                                        <p className="col-md-2 card-title">No Rak</p>
                                        <h5 className="col-md-10 card-title">: {detailbuku?.no_rak}</h5>
                                        <p className="col-md-2 card-title">Tahun Terbit</p>
                                        <h5 className="col-md-10 card-title">: Tahun {detailbuku?.thn_terbit}</h5>
                                        <p className="col-md-2 card-title">Jumlah Halaman</p>
                                        <h5 className="col-md-10 card-title">: {detailbuku?.jml_halaman} Halaman</h5>
                                        <p className="col-md-2 card-title">Sinopsis</p>
                                        <p className="col-md-10 card-title">: {detailbuku?.sinopsis}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center m-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default DetailBuku