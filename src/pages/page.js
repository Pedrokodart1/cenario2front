import styles from "@/styles/Home.module.css";
import axios from "axios";
import { Rubik_Iso } from "next/font/google";
import Head from "next/head";
import { useState } from "react";


const rubik = Rubik_Iso({ weight: "400", subsets: ["latin"] });

  const apiUrl = "https://back-include-find-api.onrender.com";

export default function Home() {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);

  // const apiUrl = process.env.API_URL;

  function changeInput(e) {
    setName(e.target.value);
  }

  function include() {
    if (name === "") return alert("Digite um nome!");
   axios
      .post(`${apiUrl}/user`,{ name: name })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 422) {
          alert("Nome já cadastrado!");
        }
        if(error.response.status === 500){
          alert("Erro no servidor!")
        }
      });
  }

  function find() {
    if (name === "") return alert("Digite um nome!");
    axios
      .get(`${apiUrl}/user`,name)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function findAll() {
    axios
      .get(`${apiUrl}/users`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <div className={styles.top}>
        <p className={rubik.className}>Include-Find App</p>
      </div>
      <div className={styles.middle}>
        <div className={styles.containerOptions}>
          <form className={styles.form}>
            <input
              maxLength={20}
              className={styles.input}
              type="text"
              placeholder="Nome"
              name="name"
              onChange={changeInput}
            />
          </form>
          <div className={styles.containerButtons}>
            <div className={styles.optionInclude} onClick={include}>
              Cadastrar
            </div>
            <div className={styles.optionFindAll} onClick={findAll}>
              Buscar Todos
            </div>
            <div className={styles.optionFind} onClick={find}>
              Buscar
            </div>
          </div>
        </div>
        <div className={styles.containerItems}>
          <p className={styles.list}>Resultado:</p>
          {items.length > 0 ? items.map((item, index) => (
            <div className={styles.item} key={index}>
              {item.name}
            </div>
          )) : "Não há usuários cadastrados!"}
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={rubik.className}>2023 &copy;</p>
      </div>
    </main>
    </>
  );
}
