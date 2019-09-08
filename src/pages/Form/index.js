import React, { useState } from "react";
import { storage } from "../../firebase/fbAuth";
import api from "../../services/api";
import { Link } from "react-router-dom";

import AddPhoto from "../../assets/img/add-photo-r.png";
import "./style.css";
import img400 from "../../assets/img/400x300.png";

export default function Image() {
  const [img, setImg] = useState(null);
  const [url, setUrl] = useState(img400);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [local, setLocal] = useState("");
  const [tags, setTags] = useState("");
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState("")
  const [progress, setProgress] = useState(0);

  function handleChange(file) {
    if (file) {
      setImg(file);
    }
  }

  function limpaCampos() {
    setName("");
    setDescription("");
    setLocal("");
    setTags("");

    setMsg("Dados salvos com sucesso !!!");
  }

  async function handleUpload(e) {
    e.preventDefault();

    if (!name || !description || !local) {
      setError("Informe os campos obrigatorios");
      return;
    }

    const uploadTask = storage.ref(`images/${img.name}`).put(img);
    await uploadTask.on(
      "state_changed",
      //progress
      async snapshot => {
        const progre = await Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progre);
      },
      //error
      err => {
        console.log(err);
      },
      //complete
      async () => {
        await storage
          .ref("images")
          .child(img.name)
          .getDownloadURL()
          .then(async url => {
            console.log(url);

            let infos = {
              nome: name,
              descricao: description,
              local,
              hashtags: tags,
              url_img: url
            };
            await api.post("/publicacoes", infos);
            setUrl(url);

            limpaCampos();
          });
      }
    );
  }

  return (
    <div className="container">
      <form>

      {error ? (
          <div className="center estMsg">{error}</div>
        ) : ""}
        {msg ? (
          <div className="center estMsg">{msg}</div>
        ) : (
          <>
            <div className="center">
              <input
                placeholder="Nome"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                id="name"
              />
            </div>
            <div className="center">
              <input
                placeholder="Descrição"
                type="text"
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                id="description"
              />
            </div>

            <div className="center">
              <input
                placeholder="Local"
                type="text"
                required
                value={local}
                onChange={e => setLocal(e.target.value)}
                id="local"
              />
            </div>

            <div className="center">
              <input
                placeholder="Hashtags"
                type="text"
                value={tags}
                onChange={e => setTags(e.target.value)}
                id="hashtags"
              />
            </div>
          </>
        )}
        <div className="center">
          <progress value={progress} max="100" />
        </div>

        <div className="center">
          <label htmlFor="file">
            <img src={AddPhoto} alt="addphoto" />
            Escolha um Arquivo
          </label>
          <input
            id="file"
            type="file"
            onChange={e => handleChange(e.target.files[0])}
          />
        </div>

        <div className="center">
          <img height="300" width="400" src={url} alt="Uploaded images" />
        </div>

        {msg ? (
          <div className="list">
            <Link to="/list">Listar</Link>
          </div>
        ) : (
          <div className="center btnSend">
            <button onClick={e => handleUpload(e)}>Enviar</button>
          </div>
        )}
      </form>
    </div>
  );
}
