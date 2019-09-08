import React from "react";
import "./style.css";

export default function Main() {
  return (
    <section className="intro">
      <h1>PostNode</h1>
      <p>
        PostNode é uma aplicação para postagem de fotos e conteudos diversos, um
        pouco similar ao <i>Instagram</i>.
      </p>
      <p>
        {" "}
        Sua criação foi utilizando as seguintes Tecnologias.:{" "}
        <b>
          NodeJs, Firebase (Api Google), Banco de dados NoSql: MongoDB, ReactJs
        </b>{" "}
        como linguagem o <b>JavaScript.</b>{" "}
      </p>
      <p>
        {" "}
        O intuito da aplicação, é a utilização dos serviços da{" "}
        <b>(API Google) Firebase</b> , como a construção da nossa própria{" "}
        <b>API</b> <i><a target="_blanck" href="https://api-publicacao.herokuapp.com/">(Link)</a></i> com NodeJS e a Biblio do{" "}
        <b>(Facebook) ReactJS </b>para o <i>Front-End.</i>
      </p>
      <p>Fazendo assim a integração dessas ferramentas como aprendizado.</p>
    </section>
  );
}
