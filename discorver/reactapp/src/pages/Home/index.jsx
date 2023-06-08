import React, {useState, useEffect} from "react";
import { Card } from "../../components/Card"

export function Home() {
  const [nomeEstudante, setNomeEstudante] = useState('');
  const [Estudantes, setEstudante] = useState([]);
  const [user, setUser] = useState({name:'', avatar: ''});

  function headleAddEstudante() {
    const newEstudante = {
      name: nomeEstudante,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: "2-digit",
      })
    }
    setEstudante(prevState => [...prevState, newEstudante])
  };

  useEffect(() => {
    fetch('https://api.github.com/users/victorxdaugusto')
    .then(response => response.json())
     .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        })
     })
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de presenca</h1>
        <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt="Foto de perfil"/>
      </div>
      </header>
      <input type="text" placeholder='Digite o nome' onChange={e => setNomeEstudante(e.target.value)} />
      <button type='button' onClick={headleAddEstudante}>Adicionar</button>

      {
        Estudantes.map(EstudanteAtual => (
          <Card
           key={EstudanteAtual.time}
           name={EstudanteAtual.name}
           time={EstudanteAtual.time}/> 
        ))
      }
    </div>
  )
}


