import { useEffect, useState } from "react"

import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario}) => {
    const [repos, setRepos] = useState([]);
    const [estaCarregando, setEtaCarregando] = useState(true);

    useEffect(() => {
        setEtaCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => res.json())
            .then(resJson => {
                setTimeout(() => {
                    setEtaCarregando(false);
                    setRepos(resJson);
                }, 2000)
            })
    }, [nomeUsuario]);

    return (
        <div className="container"> 
            {estaCarregando ? (
                <h1>Carregando...</h1>
            ) : (
            <ul className={styles.list}>
                {repos.map(({ id, name, language, html_url }) => (
                    <li className={styles.listItem} key={id}>
                        <div className={styles.listName}>
                            <b>Nome:</b>
                            {name}
                        </div>
                        <div className={styles.listLanguage}>
                            <b>Linguagem:</b>
                            {language}
                        </div>
                        <a className={styles.listLink} target='_blank' href={html_url}>Visitar no GitHub</a>
                    </li>
                ))}
            </ul>
            )}
        </div>
    )
}

export default ReposList