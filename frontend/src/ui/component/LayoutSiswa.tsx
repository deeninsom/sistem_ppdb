/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from "react"
import logo from "../../assets/SMP-removebg-preview.jpg"
import { useNavigate } from "react-router-dom"
import { useLogout } from "../../service/hooks/useLogout"
import axiosInstance from "../../service/_api"

export const LayoutSiswa = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const [user, setUser]: any = useState({})


  const { logout } = useLogout()
  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = localStorage.getItem("user");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const response = await axiosInstance.get(`/siswa?user_id=${parsedData.data.data.id}&&page=1&&limit=1`);
          response.data.data.map((val: any) => {
            setUser(val)
          })
        }
      } catch (error: any) {
        alert(error.response.data.message);
      }
    };

    fetchUserData();
  }, []);

  const handlePage = (route: string) => {
    navigate(route)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top" style={{ backgroundColor: "#004040" }}>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand mt-lg-0 d-flex align-items-center" href="/siswa-panel" style={{ color: "white", fontWeight: "bold", marginLeft: "3%" }}>
            <img
              src={logo}
              height="25"
              alt="Logo Sekolah"
              loading="lazy"
              className="me-2"
            />
            PPDB ONLINE
          </a>
        </div>
      </nav>
      <section style={{ overflow: "hidden" }}>
        <div className="row ms-2 mt-4">
          <div className="col-sm-3">
            <div className="card p-4">
              <div className="tittle" style={{ fontWeight: "bold", fontSize: "17px" }}>MENU DASHBOARD</div>
              <div className="content-header d-flex gap-4 mt-4 align-items-center" style={{ marginLeft: "20px" }}>
                <img src={logo} style={{ width: "50px", height: "50%" }} alt="" />
                <div className="content-text" style={{ display: "block", width: "50%" }}>
                  <div className="text-tittle d-flex align-items-center gap-1" style={{ color: "GrayText", fontSize: "10px", fontWeight: "bold" }}>
                    <i className="fa-solid fa-user"></i>
                    <span>calon siswa</span>
                  </div>
                  <div className="text-name">
                    <span style={{ fontSize: "15px" }}>{user.nama_lengkap}</span>
                  </div>
                </div>
              </div>
              <div className="content-menu mt-4">
                <span style={{ fontSize: "13px", fontWeight: "bolder", color: "GrayText" }}>UTAMA</span>
                <ul style={{ listStyle: "none", marginLeft: "-20px" }}>
                  <li className="my-3 d-flex align-items-center gap-3" onClick={() => handlePage(`/siswa-panel/${user.user_id.id}`)} style={{ cursor: "pointer" }}>
                    <i className="fa fa-solid fa-house"></i>
                    <span>HOME</span>
                  </li>
                  <li className="my-3 d-flex align-items-center gap-3" onClick={() => handlePage(`/siswa-panel/biodata/${user.user_id.id}`)} style={{ cursor: "pointer" }}>
                    <i className="ms-1 fa fa-solid fa-file"></i>
                    <span style={{ marginLeft: "2px" }}>BIODATA</span>
                  </li>
                  <li className="my-3 d-flex align-items-center gap-3" onClick={() => handlePage(`/siswa-panel/pengumuman/${user.user_id.id}`)} style={{ cursor: "pointer" }}>
                    <i className="fa fa-solid fa-volume-high"></i>
                    <span style={{ marginLeft: "-2px" }}>PENGUMUMAN</span>
                  </li>
                  <li className="my-3 d-flex align-items-center gap-3" onClick={() => handlePage(`/siswa-panel/pengumuman-ujian/${user.user_id.id}`)} style={{ cursor: "pointer" }}>
                    <i className="fa fa-solid fa-volume-high"></i>
                    <span>Ujian</span>
                  </li>
                  <li className="my-3 d-flex align-items-center gap-3" style={{ cursor: "pointer" }} onClick={() => handlePage(`/siswa-panel/print-seleksi/${user.user_id.id}`)} >
                    <i className="fa fa-solid fa-print" style={{ marginLeft: "2px" }} ></i>
                    <span style={{ marginLeft: "2px" }}>PRINT HASIL SELEKSI</span>
                  </li>
                </ul>
                <span style={{ fontSize: "13px", fontWeight: "bolder", color: "GrayText" }}>LAINYA</span>
                <ul style={{ listStyle: "none", marginLeft: "-20px" }}>
                  <li className="my-3 d-flex align-items-center gap-3" onClick={handleLogout} style={{ cursor: "pointer" }}>
                    <i style={{ marginLeft: "4px" }} className="fa fa-solid fa-right-from-bracket"></i>
                    <span>KELUAR</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-8 ms-3">
            <main>{children}</main>
          </div>
        </div>
      </section>
      {/* <footer className="footer mt-auto fixed-bottom  py-2" style={{ backgroundColor: "#004040" }}>
      <div className="container text-center">
        <span className="text-center text-white">&copy; 2023 SMP ISLAM WALISONGO.</span>
      </div>
    </footer> */}
    </>
  )
}
