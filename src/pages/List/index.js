import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import api from "../../services/api";
import "./style.css";

export default function List() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState(0);
  const [page, setPage] = useState(1);
  const [pgTot, setPgtot] = useState(0);
  // eslint-disable-next-line
  useEffect(() => {
    async function getList() {
      const res = await api.get(`/publicacoes?page=${page}`);
      setPosts(res.data.docs);
      setPgtot(res.data.pages)

      console.log(res.data);
    }
    getList();
  }, [page, status]);

  async function remover(id) {
    let r = window.confirm(`Confirma a exclusão do id ${id}?`);
    if (r) {
      const res = await api.delete(`/publicacoes/${id}`);
      setStatus(res.data.status);
    }
  }

  function handlePageBack(pg){
    if (pg === page) {
      return
    }
    const pagina = page - pg; 
    setPage(pagina)

  }

  function handlePage(pg){
    if (pg !== page) {
      return
    }
    const pagina = page + pg; 
    setPage(pagina)
  }

  return (
    <div className="container">
      {posts.map((e , i) => (
        <section key={e._id}>
          <header>{e.nome}</header>

          <div className="descricao">
            <label htmlFor="">Descricao</label>
            <p>{e.descricao}</p>
          </div>

          <div className="local">
            <label htmlFor="">Local</label>
            <p>{e.local}</p>
          </div>

          <div className="hashtags">
            <label htmlFor="">Hashtags</label>
            <p>{e.hashtags}</p>
          </div>

          <div className="images">
            <img height="300" width="400" src={e.url_img} alt={e._id} />
          </div>

          <div className="btn-actions">
            <Link to={"#"} onClick={() => remover(e._id)}>
              Excluir
            </Link>
            <Link to={`/edit/${e._id}`}>Editar</Link>
          </div>
        </section>
      ))}

      <div className="paginate">
        <button className={page === 1 ? "pageDisabled" :""} onClick={() => handlePageBack(1)}>Anterior</button>
        <button className={page === pgTot ? "pageDisabled" :""} onClick={() => handlePage(1)}>Proximo</button>
      </div>
    </div>
  );
}
